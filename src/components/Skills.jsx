import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  FiCheckSquare,
  FiCode,
  FiTrendingUp,
} from 'react-icons/fi'
import { LuLightbulb } from 'react-icons/lu'
import { RxRocket } from 'react-icons/rx'
import {
  DAILY_STACK,
  getDailyStackSkillDetail,
  getRadarSkillsByCategory,
  PROCESS_STEPS,
  SKILL_CATEGORIES,
  SKILL_CATEGORY_TABS,
} from '../data/skillsShowcase'
import { SECTION_REVEAL_EVENT, elementIntersectsViewport } from '../utils/sectionReveal'
import '../skills.css'
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal'
import TechRadar, {
  ICON_RADIAL_OFFSET,
  polarToPercent,
  SkillIcon,
  SPOKE_HUB_COLOR,
} from './TechRadar'

const DEFAULT_CATEGORY = 'frontend'

const processIcons = {
  idea: LuLightbulb,
  code: FiCode,
  test: FiCheckSquare,
  deploy: RxRocket,
  evolution: FiTrendingUp,
}

const SkillDetailCard = ({ skill, layout = 'horizontal' }) => (
  <article
    className={`skills-detail-card skills-detail-card--${layout}`}
    style={{ '--skill-color': skill.glow }}
    aria-live="polite"
  >
    <p className="skills-detail-card__category terminal-gradient-label">
      {SKILL_CATEGORIES[skill.category] ?? skill.category}
    </p>
    <h3 className="skills-detail-card__name">{skill.name}</h3>
    <p className="skills-detail-card__desc">{skill.description}</p>
  </article>
)

const BRIDGE_ENTRY_RATIO = 0.26
const SKILL_CARD_EXTRA_DOWN_PX = 15

const SKILL_CARD_EXTRA_DOWN = new Set(['React', 'PHP'])

/** Spostamento simbolico della card lungo l’arco del radar (rispetto a JavaScript) */
const SKILL_CARD_OFFSET = {
  CSS: { x: -5, y: -15 },
  JavaScript: { x: 0, y: 0 },
  GitHub: { x: 0, y: -20 },
  'Tailwind CSS': { x: -10, y: 0 },
  TypeScript: { x: 0, y: -20 },
  React: { x: -20, y: 0 },
  Redux: { x: 30, y: 0 },
  Figma: { x: 30, y: 0 },
  PHP: { x: 0, y: 0 },
  Postman: { x: -20, y: 0 },
}

const getSkillCardOffset = (skill) => SKILL_CARD_OFFSET[skill.name] ?? { x: 0, y: 0 }

const isLeftSideSkill = (skill) => Math.cos((skill.angle * Math.PI) / 180) < 0

const STRAIGHT_HORIZONTAL_BRIDGE_SKILLS = new Set(['JavaScript', 'VS Code'])

const isStraightBridgeSkill = (skill) =>
  STRAIGHT_HORIZONTAL_BRIDGE_SKILLS.has(skill.name) ||
  Math.abs(Math.cos((skill.angle * Math.PI) / 180)) < 0.2

const REACT_BRIDGE_NODE_GAP_PX = 15
const REACT_BRIDGE_VERTICAL_SHORTEN_PX = 30
const REACT_TAILWIND_ANGLE_STEP = 36
const REACT_CARD_CORNER_RADIUS_PX = 20
const REACT_CARD_SHIFT_RIGHT_PX = 45
const REACT_CARD_SHIFT_UP_PX = 20
const REACT_BRIDGE_ATTACH_LIFT_PX = 15
const PHP_MONGODB_ANGLE_STEP = 60
const PHP_CARD_RIGHT_OF_ICON_PX = 36
const PHP_CARD_BELOW_MONGODB_GAP_PX = 8
const PHP_CARD_SHIFT_DOWN_PX = 40
const PHP_BRIDGE_NODE_GAP_PX = 15
const PHP_CARD_CORNER_RADIUS_PX = 20
const PHP_BRIDGE_ATTACH_LIFT_PX = 15
const NODE_BRIDGE_ICON_GAP_PX = 10
const NODE_BRIDGE_VERTICAL_UP_PX = 15
const NODE_BRIDGE_HORIZONTAL_RIGHT_PX = 40
const NODE_BRIDGE_SHIFT_UP_PX = 30
const NODE_CARD_SHIFT_UP_PX = 70
const JAVASCRIPT_BRIDGE_ICON_GAP_PX = 10
const TYPESCRIPT_BRIDGE_ICON_GAP_PX = 10
const REDUX_BRIDGE_ICON_GAP_PX = 15
const ICON_ANCHORED_LEFT_BRIDGE_SKILLS = new Set(['Redux', 'Figma', 'Render'])
const ICON_ANCHORED_RIGHT_BRIDGE_SKILLS = new Set(['Postman', 'GitHub'])
const NETLIFY_CARD_SHIFT_UP_PX = 20
const NETLIFY_BRIDGE_JOINT_SHIFT_DOWN_PX = 30
const CSS_BRIDGE_ICON_GAP_PX = 15

const usesLeftDetailSlot = (skill) => isLeftSideSkill(skill)

/** Spostamento verticale del collegamento (card invariata) */
const SKILL_BRIDGE_SHIFT_DOWN = {
  MySQL: 20,
  Express: 30,
}

/** Offset extra sul bordo destro del radar, per skill basse */
const SKILL_BRIDGE_EXTRA_DOWN = {
  React: 0.055,
  PHP: 0.05,
}

const getBridgeVerticalOffset = (skill, iconY, stageTop, stageSpan, stagePad) => {
  const stageMidY = stageTop + stagePad + stageSpan * 0.5
  const isUpperIcon = iconY < stageMidY
  const named = SKILL_BRIDGE_EXTRA_DOWN[skill.name] ?? 0

  if (isUpperIcon) {
    return {
      offset: Math.max(0.11, named) * stageSpan,
      fromAbove: true,
    }
  }

  return {
    offset: Math.max(0.048, named) * stageSpan,
    fromAbove: false,
  }
}

const getSkillNodeY = (skill, radarEl, stageRect, toClusterY) => {
  const nodeEl = radarEl.querySelector('.tech-radar__node--active')

  if (nodeEl) {
    const nodeRect = nodeEl.getBoundingClientRect()
    return toClusterY(nodeRect.top + nodeRect.height / 2)
  }

  const point = polarToPercent(skill.radius + ICON_RADIAL_OFFSET, skill.angle)
  return toClusterY(stageRect.top + (point.y / 100) * stageRect.height)
}

const ESTIMATED_NODE_HEIGHT_RATIO = 0.12
const ESTIMATED_ICON_HALF_WIDTH_RATIO = 0.048

const mapNodeElementLayout = (nodeEl, toClusterX, toClusterY) => {
  const nodeRect = nodeEl.getBoundingClientRect()
  const iconEl = nodeEl.querySelector('.tech-radar__node-icon')
  const iconRect = iconEl?.getBoundingClientRect()

  return {
    topY: toClusterY(nodeRect.top),
    bottomY: toClusterY(nodeRect.bottom),
    centerY: toClusterY(nodeRect.top + nodeRect.height / 2),
    centerX: toClusterX(nodeRect.left + nodeRect.width / 2),
    height: nodeRect.height,
    iconCenterX: iconRect
      ? toClusterX(iconRect.left + iconRect.width / 2)
      : toClusterX(nodeRect.left + nodeRect.width / 2),
    iconCenterY: iconRect
      ? toClusterY(iconRect.top + iconRect.height / 2)
      : toClusterY(nodeRect.top + nodeRect.height / 2),
    iconLeftX: iconRect
      ? toClusterX(iconRect.left)
      : toClusterX(nodeRect.left + nodeRect.width * 0.15),
    iconRightX: iconRect
      ? toClusterX(iconRect.right)
      : toClusterX(nodeRect.left + nodeRect.width * 0.85),
  }
}

const getPolarNodeLayout = (stageRect, radius, angle, toClusterX, toClusterY) => {
  const point = polarToPercent(radius, angle)
  const estimatedHeight = stageRect.height * ESTIMATED_NODE_HEIGHT_RATIO
  const centerY = stageRect.top + (point.y / 100) * stageRect.height

  return {
    topY: toClusterY(centerY - estimatedHeight / 2),
    bottomY: toClusterY(centerY + estimatedHeight / 2),
    centerY: toClusterY(centerY),
    centerX: toClusterX(stageRect.left + (point.x / 100) * stageRect.width),
    height: estimatedHeight,
    iconCenterX: toClusterX(stageRect.left + (point.x / 100) * stageRect.width),
    iconCenterY: toClusterY(centerY),
    iconLeftX:
      toClusterX(stageRect.left + (point.x / 100) * stageRect.width) -
      stageRect.width * ESTIMATED_ICON_HALF_WIDTH_RATIO,
    iconRightX:
      toClusterX(stageRect.left + (point.x / 100) * stageRect.width) +
      stageRect.width * ESTIMATED_ICON_HALF_WIDTH_RATIO,
  }
}

const getNamedNodeLayout = (radarEl, skillName, stageRect, toClusterX, toClusterY) => {
  const nodeEl = [...radarEl.querySelectorAll('.tech-radar__node')].find(
    (el) => el.getAttribute('aria-label') === skillName,
  )

  if (nodeEl) {
    return mapNodeElementLayout(nodeEl, toClusterX, toClusterY)
  }

  return null
}

const getSkillNodeLayout = (skill, radarEl, stageRect, toClusterX, toClusterY) => {
  const nodeEl = radarEl.querySelector('.tech-radar__node--active')

  if (nodeEl) {
    return mapNodeElementLayout(nodeEl, toClusterX, toClusterY)
  }

  return getPolarNodeLayout(
    stageRect,
    skill.radius + ICON_RADIAL_OFFSET,
    skill.angle,
    toClusterX,
    toClusterY,
  )
}

/** Distanza label ↔ linea (riferimento Tailwind CSS) */
const getLabelBridgeClearance = (nodeHeight, bridgeExtra) =>
  Math.max(8, nodeHeight / 2 - bridgeExtra)

const getNodeLabelBounds = (nodeEl, toClusterY) => {
  const labelEl = nodeEl?.querySelector('.tech-radar__node-label')
  if (!labelEl) return null

  const labelRect = labelEl.getBoundingClientRect()
  return {
    topY: toClusterY(labelRect.top),
    bottomY: toClusterY(labelRect.bottom),
  }
}

const buildReactDetailLayout = (
  skill,
  radarEl,
  clusterRect,
  stageRect,
  cardEl,
  toClusterX,
  toClusterY,
) => {
  const reactNode = radarEl.querySelector('.tech-radar__node--active')
  if (!reactNode) return null

  const tailwindNode = [...radarEl.querySelectorAll('.tech-radar__node')].find(
    (el) => el.getAttribute('aria-label') === 'Tailwind CSS',
  )

  const reactLayout = mapNodeElementLayout(reactNode, toClusterX, toClusterY)
  const tailwindLayout = tailwindNode
    ? mapNodeElementLayout(tailwindNode, toClusterX, toClusterY)
    : getPolarNodeLayout(
        stageRect,
        skill.radius + ICON_RADIAL_OFFSET,
        skill.angle - REACT_TAILWIND_ANGLE_STEP,
        toClusterX,
        toClusterY,
      )

  const reactLabel = getNodeLabelBounds(reactNode, toClusterY)
  const tailwindLabel = tailwindNode ? getNodeLabelBounds(tailwindNode, toClusterY) : null

  const cardWidth = cardEl.offsetWidth
  const cardHeight = cardEl.offsetHeight
  if (cardWidth < 1 || cardHeight < 1) return null

  const cardOffset = getSkillCardOffset(skill)
  const reactLabelBottom = reactLabel?.bottomY ?? reactLayout.bottomY
  const tailwindLabelBottom = tailwindLabel?.bottomY ?? tailwindLayout.bottomY

  // A destra di React, nel corridoio verso Tailwind (non tra Redux e CSS)
  const cardLeftX =
    reactLayout.iconCenterX + 36 + cardOffset.x + REACT_CARD_SHIFT_RIGHT_PX

  // Sotto la scritta React, nel varco tra Tailwind e React
  const detailTop = Math.max(
    4,
    Math.max(tailwindLabelBottom + 8, reactLabelBottom + 10) - REACT_CARD_SHIFT_UP_PX,
  )

  const cardAttachY =
    detailTop +
    cardHeight -
    REACT_CARD_CORNER_RADIUS_PX -
    REACT_BRIDGE_ATTACH_LIFT_PX -
    REACT_BRIDGE_VERTICAL_SHORTEN_PX
  const bridgeJointY = reactLayout.bottomY + REACT_BRIDGE_NODE_GAP_PX

  return {
    detailTop,
    placement: 'left',
    detailOffsetLeft: cardLeftX,
    detailOffsetRight: undefined,
    bridge: {
      width: clusterRect.width,
      height: clusterRect.height,
      d: `M ${reactLayout.iconCenterX} ${bridgeJointY} V ${cardAttachY} H ${cardLeftX}`,
      start: { x: reactLayout.iconCenterX, y: bridgeJointY },
    },
  }
}

const buildNodeDetailLayout = (
  skill,
  radarEl,
  clusterRect,
  cardEl,
  toClusterX,
  toClusterY,
) => {
  const nodeEl = radarEl.querySelector('.tech-radar__node--active')
  if (!nodeEl) return null

  const nodeLayout = mapNodeElementLayout(nodeEl, toClusterX, toClusterY)

  const cardWidth = cardEl.offsetWidth
  const cardHeight = cardEl.offsetHeight
  if (cardWidth < 1 || cardHeight < 1) return null

  const cardOffset = getSkillCardOffset(skill)
  const { iconCenterX, iconCenterY } = nodeLayout

  const jointX = iconCenterX
  const baseJointY = iconCenterY - NODE_BRIDGE_ICON_GAP_PX
  const baseElbowY = baseJointY - NODE_BRIDGE_VERTICAL_UP_PX
  const jointY = baseJointY - NODE_BRIDGE_SHIFT_UP_PX
  const elbowY = baseElbowY - NODE_BRIDGE_SHIFT_UP_PX
  const elbowX = jointX + NODE_BRIDGE_HORIZONTAL_RIGHT_PX
  const cardLeftX = elbowX + cardOffset.x
  const detailTop =
    elbowY - cardHeight * BRIDGE_ENTRY_RATIO - NODE_CARD_SHIFT_UP_PX + cardOffset.y

  return {
    detailTop,
    placement: 'left',
    detailOffsetLeft: cardLeftX,
    detailOffsetRight: undefined,
    bridge: {
      width: clusterRect.width,
      height: clusterRect.height,
      d: `M ${jointX} ${jointY} V ${elbowY} H ${cardLeftX}`,
      start: { x: jointX, y: jointY },
    },
  }
}

const buildPhpDetailLayout = (
  skill,
  radarEl,
  clusterRect,
  stageRect,
  cardEl,
  toClusterX,
  toClusterY,
) => {
  const phpNode = radarEl.querySelector('.tech-radar__node--active')
  if (!phpNode) return null

  const mongoNode = [...radarEl.querySelectorAll('.tech-radar__node')].find(
    (el) => el.getAttribute('aria-label') === 'MongoDB',
  )

  const phpLayout = mapNodeElementLayout(phpNode, toClusterX, toClusterY)
  const mongoLayout = mongoNode
    ? mapNodeElementLayout(mongoNode, toClusterX, toClusterY)
    : getPolarNodeLayout(
        stageRect,
        skill.radius + ICON_RADIAL_OFFSET,
        skill.angle - PHP_MONGODB_ANGLE_STEP,
        toClusterX,
        toClusterY,
      )

  const mongoLabel = mongoNode ? getNodeLabelBounds(mongoNode, toClusterY) : null

  const cardWidth = cardEl.offsetWidth
  const cardHeight = cardEl.offsetHeight
  if (cardWidth < 1 || cardHeight < 1) return null

  const cardOffset = getSkillCardOffset(skill)
  const mongoLabelBottom = mongoLabel?.bottomY ?? mongoLayout.bottomY
  const phpLabelEl = phpNode.querySelector('.tech-radar__node-label')
  const phpLabelRight = phpLabelEl
    ? toClusterX(phpLabelEl.getBoundingClientRect().right)
    : phpLayout.iconCenterX + 40

  const cardLeftX =
    Math.max(phpLayout.iconCenterX + PHP_CARD_RIGHT_OF_ICON_PX, phpLabelRight + 8) +
    cardOffset.x

  const detailTop = Math.max(
    4,
    mongoLabelBottom + PHP_CARD_BELOW_MONGODB_GAP_PX + PHP_CARD_SHIFT_DOWN_PX + cardOffset.y,
  )

  const cardAttachY =
    detailTop + cardHeight - PHP_CARD_CORNER_RADIUS_PX - PHP_BRIDGE_ATTACH_LIFT_PX
  const bridgeJointY = phpLayout.bottomY + PHP_BRIDGE_NODE_GAP_PX

  return {
    detailTop,
    placement: 'left',
    detailOffsetLeft: cardLeftX,
    detailOffsetRight: undefined,
    bridge: {
      width: clusterRect.width,
      height: clusterRect.height,
      d: `M ${phpLayout.iconCenterX} ${bridgeJointY} V ${cardAttachY} H ${cardLeftX}`,
      start: { x: phpLayout.iconCenterX, y: bridgeJointY },
    },
  }
}

const buildRadarDetailLayout = (
  skill,
  radarEl,
  leftSlotEl,
  rightSlotEl,
  cardEl,
  introAnchorEl,
) => {
  if (!skill || !radarEl || !leftSlotEl || !rightSlotEl || !cardEl) return null

  const clusterEl = radarEl.closest('.skills-radar-cluster')
  const stage = radarEl.querySelector('.tech-radar__stage')
  if (!clusterEl || !stage) return null

  let placement = usesLeftDetailSlot(skill) ? 'left' : 'right'
  const slotEl = placement === 'left' ? leftSlotEl : rightSlotEl

  const clusterRect = clusterEl.getBoundingClientRect()
  const stageRect = stage.getBoundingClientRect()
  const slotRect = slotEl.getBoundingClientRect()
  const cardHeight = cardEl.offsetHeight
  const cardWidth = cardEl.offsetWidth

  if (clusterRect.width < 1 || clusterRect.height < 1 || cardHeight < 1 || cardWidth < 1) {
    return null
  }

  const toClusterX = (value) => value - clusterRect.left
  const toClusterY = (value) => value - clusterRect.top

  if (skill.name === 'React') {
    return buildReactDetailLayout(
      skill,
      radarEl,
      clusterRect,
      stageRect,
      cardEl,
      toClusterX,
      toClusterY,
    )
  }

  if (skill.name === 'PHP') {
    return buildPhpDetailLayout(
      skill,
      radarEl,
      clusterRect,
      stageRect,
      cardEl,
      toClusterX,
      toClusterY,
    )
  }

  if (skill.name === 'Node.js' || skill.name === 'HTML' || skill.name === 'Git') {
    return buildNodeDetailLayout(
      skill,
      radarEl,
      clusterRect,
      cardEl,
      toClusterX,
      toClusterY,
    )
  }

  const stageTop = toClusterY(stageRect.top)
  const stageBottom = toClusterY(stageRect.bottom)
  const slotTop = toClusterY(slotRect.top)
  const slotHeight = slotRect.height
  const stagePad = 10
  const stageSpan = stageBottom - stageTop - stagePad * 2

  let nodeY = getSkillNodeY(skill, radarEl, stageRect, toClusterY)
  nodeY = Math.min(stageBottom - stagePad, Math.max(stageTop + stagePad, nodeY))

  const bridgeY = nodeY
  const cardExtraDown = SKILL_CARD_EXTRA_DOWN.has(skill.name) ? SKILL_CARD_EXTRA_DOWN_PX : 0

  const { offset: bridgeExtra, fromAbove } = getBridgeVerticalOffset(
    skill,
    bridgeY,
    stageTop,
    stageSpan,
    stagePad,
  )

  const nodeLayout = getSkillNodeLayout(skill, radarEl, stageRect, toClusterX, toClusterY)
  const labelClearance = getLabelBridgeClearance(nodeLayout.height, bridgeExtra)
  const bridgeStartY = fromAbove
    ? Math.max(stageTop + stagePad, nodeLayout.topY + labelClearance)
    : Math.min(stageBottom - stagePad, nodeLayout.bottomY - labelClearance)

  const cardOffset = getSkillCardOffset(skill)

  const radarLeft = toClusterX(stageRect.left)
  const radarRight = toClusterX(stageRect.right)
  const isStraightBridge = isStraightBridgeSkill(skill)
  const bridgeVerticalShift = SKILL_BRIDGE_SHIFT_DOWN[skill.name] ?? 0

  let bridgeAnchorY = bridgeY

  let detailTop =
    bridgeAnchorY - slotTop - cardHeight * BRIDGE_ENTRY_RATIO + cardExtraDown + cardOffset.y
  detailTop = Math.max(4, detailTop)

  const endY = bridgeAnchorY

  let endX
  let d
  let start
  let detailOffsetLeft
  let detailOffsetRight

  if (placement === 'left') {
    const cardLeft = toClusterX(slotRect.left) + cardOffset.x
    endX = cardLeft + cardWidth
    const gap = radarLeft - endX

    if (gap < 12) return null

    const startX = radarLeft

    if (isStraightBridge) {
      const shiftedBridgeY = bridgeY + bridgeVerticalShift
      d = `M ${startX} ${shiftedBridgeY} H ${endX}`
      start = { x: startX, y: shiftedBridgeY }
    } else {
      const startY = bridgeStartY + bridgeVerticalShift
      const shiftedEndY = endY + bridgeVerticalShift
      const elbowX = Math.max(
        endX + 8,
        radarLeft - Math.max(8, gap * 0.14),
      )

      if (elbowX >= startX - 2) return null

      d = `M ${startX} ${startY} H ${elbowX} V ${shiftedEndY} H ${endX}`
      start = { x: startX, y: startY }
    }

    detailOffsetLeft = toClusterX(slotRect.left) + cardOffset.x
    detailOffsetRight = undefined
  } else {
    endX = toClusterX(slotRect.right) - cardWidth + cardOffset.x
    const gap = endX - radarRight

    if (gap < 12) return null

    if (isStraightBridge) {
      const iconGap = STRAIGHT_HORIZONTAL_BRIDGE_SKILLS.has(skill.name)
        ? JAVASCRIPT_BRIDGE_ICON_GAP_PX
        : 0
      const startX = radarRight + iconGap
      const shiftedBridgeY = bridgeY + bridgeVerticalShift

      if (endX - startX < 12) return null

      d = `M ${startX} ${shiftedBridgeY} H ${endX}`
      start = { x: startX, y: shiftedBridgeY }
    } else {
      const startX = radarRight
      const startY = bridgeStartY + bridgeVerticalShift
      const shiftedEndY = endY + bridgeVerticalShift
      const elbowX = Math.min(
        endX - 8,
        Math.max(radarRight + 5, radarRight + Math.max(8, gap * 0.14)),
      )

      if (elbowX <= startX + 2) return null

      d = `M ${startX} ${startY} H ${elbowX} V ${shiftedEndY} H ${endX}`
      start = { x: startX, y: startY }
    }

    detailOffsetLeft = undefined
    detailOffsetRight = clusterRect.width - toClusterX(slotRect.right) - cardOffset.x
  }

  if (ICON_ANCHORED_LEFT_BRIDGE_SKILLS.has(skill.name) && placement === 'left') {
    const { iconCenterY, iconLeftX } = nodeLayout
    const cardEntryY = detailTop + cardHeight * BRIDGE_ENTRY_RATIO
    const cardRightX = toClusterX(slotRect.left) + cardOffset.x + cardWidth
    const jointX = iconLeftX - REDUX_BRIDGE_ICON_GAP_PX
    const gap = jointX - cardRightX

    if (gap >= 12) {
      const elbowX = Math.max(
        cardRightX + 8,
        jointX - Math.max(12, gap * 0.22),
      )

      if (elbowX < jointX - 2 && elbowX > cardRightX + 2) {
        endX = cardRightX
        d = `M ${jointX} ${iconCenterY} H ${elbowX} V ${cardEntryY} H ${endX}`
        start = { x: jointX, y: iconCenterY }
      }
    }
  }

  if (skill.name === 'Netlify' && placement === 'left') {
    detailTop -= NETLIFY_CARD_SHIFT_UP_PX

    const cardLeft = toClusterX(slotRect.left) + cardOffset.x
    const netlifyEndX = cardLeft + cardWidth
    const gap = radarLeft - netlifyEndX
    const cardEntryY = detailTop + cardHeight * BRIDGE_ENTRY_RATIO
    const jointY = bridgeStartY + NETLIFY_BRIDGE_JOINT_SHIFT_DOWN_PX

    if (gap >= 12) {
      const startX = radarLeft
      const elbowX = Math.max(
        netlifyEndX + 8,
        radarLeft - Math.max(8, gap * 0.14),
      )

      if (elbowX < startX - 2) {
        endX = netlifyEndX
        d = `M ${startX} ${jointY} H ${elbowX} V ${cardEntryY} H ${endX}`
        start = { x: startX, y: jointY }
      }
    }
  }

  if (skill.name === 'TypeScript' && placement === 'left') {
    const { iconCenterY, iconLeftX } = nodeLayout
    const cardEntryY = detailTop + cardHeight * BRIDGE_ENTRY_RATIO
    const cardRightX = toClusterX(slotRect.left) + cardOffset.x + cardWidth
    const jointX = iconLeftX - TYPESCRIPT_BRIDGE_ICON_GAP_PX
    const gap = jointX - cardRightX

    if (gap >= 12) {
      const elbowX = Math.max(
        cardRightX + 8,
        jointX - Math.max(12, gap * 0.22),
      )

      if (elbowX < jointX - 2 && elbowX > cardRightX + 2) {
        endX = cardRightX
        d = `M ${jointX} ${iconCenterY} H ${elbowX} V ${cardEntryY} H ${endX}`
        start = { x: jointX, y: iconCenterY }
      }
    }
  }

  if (skill.name === 'CSS' && placement === 'right') {
    const { iconCenterY, iconRightX } = nodeLayout
    const cardEntryY = detailTop + cardHeight * BRIDGE_ENTRY_RATIO
    const cardLeftX = toClusterX(slotRect.right) - cardWidth + cardOffset.x
    const jointX = iconRightX + CSS_BRIDGE_ICON_GAP_PX
    const gap = cardLeftX - jointX

    if (gap >= 12) {
      const elbowX = Math.min(
        cardLeftX - 8,
        jointX + Math.max(12, gap * 0.22),
      )

      if (elbowX > jointX + 2) {
        endX = cardLeftX
        d = `M ${jointX} ${iconCenterY} H ${elbowX} V ${cardEntryY} H ${endX}`
        start = { x: jointX, y: iconCenterY }
      }
    }
  }

  if (ICON_ANCHORED_RIGHT_BRIDGE_SKILLS.has(skill.name) && placement === 'right') {
    const { iconCenterY, iconRightX } = nodeLayout
    const cardEntryY = detailTop + cardHeight * BRIDGE_ENTRY_RATIO
    const cardLeftX = toClusterX(slotRect.right) - cardWidth + cardOffset.x
    const jointX = iconRightX + REDUX_BRIDGE_ICON_GAP_PX
    const gap = cardLeftX - jointX

    if (gap >= 12) {
      const elbowX = Math.min(
        cardLeftX - 8,
        jointX + Math.max(12, gap * 0.22),
      )

      if (elbowX > jointX + 2) {
        d = `M ${cardLeftX} ${cardEntryY} H ${elbowX} V ${iconCenterY} H ${jointX}`
        start = { x: jointX, y: iconCenterY }
      }
    }
  }

  return {
    detailTop,
    placement,
    detailOffsetLeft,
    detailOffsetRight,
    bridge: {
      width: clusterRect.width,
      height: clusterRect.height,
      d,
      start,
    },
  }
}

const useRadarDetailLayout = (
  skill,
  radarRef,
  leftSlotRef,
  rightSlotRef,
  cardRef,
  introAnchorRef,
) => {
  const [layout, setLayout] = useState(null)

  const updateLayout = useCallback(() => {
    const next = buildRadarDetailLayout(
      skill,
      radarRef.current,
      leftSlotRef.current,
      rightSlotRef.current,
      cardRef.current,
      introAnchorRef.current,
    )
    setLayout(next)
  }, [skill, radarRef, leftSlotRef, rightSlotRef, cardRef, introAnchorRef])

  useLayoutEffect(() => {
    updateLayout()
  }, [updateLayout])

  useEffect(() => {
    const clusterEl = radarRef.current?.closest('.skills-radar-cluster')
    if (!clusterEl) return undefined

    const observer = new ResizeObserver(updateLayout)
    observer.observe(clusterEl)

    if (leftSlotRef.current) observer.observe(leftSlotRef.current)
    if (rightSlotRef.current) observer.observe(rightSlotRef.current)
    if (cardRef.current) observer.observe(cardRef.current)
    if (introAnchorRef.current) observer.observe(introAnchorRef.current)

    window.addEventListener('resize', updateLayout)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateLayout)
    }
  }, [updateLayout, radarRef, leftSlotRef, rightSlotRef, cardRef, introAnchorRef, skill])

  return layout
}

const RadarDetailBridge = ({ geometry }) => {
  if (!geometry) return null

  return (
    <div className="skills-radar-bridge-overlay" aria-hidden="true">
      <svg
        className="skills-radar-bridge"
        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        <path className="skills-radar-bridge__glow" d={geometry.d} />
        <path className="skills-radar-bridge__line" d={geometry.d} />
        <g
          className="tech-radar__joint tech-radar__joint--terminal tech-radar__joint--active"
          style={{ '--joint-color': SPOKE_HUB_COLOR }}
        >
          <circle
            className="skills-radar-bridge__joint-glow"
            cx={geometry.start.x}
            cy={geometry.start.y}
            r="3.25"
            fill={SPOKE_HUB_COLOR}
          />
          <circle
            className="skills-radar-bridge__joint-core"
            cx={geometry.start.x}
            cy={geometry.start.y}
            r="1.1"
            fill={SPOKE_HUB_COLOR}
          />
        </g>
      </svg>
    </div>
  )
}

const ProcessArrow = ({ from, to, index, curveUp }) => {
  const gradId = `skills-process-arrow-grad-${index}`
  const markerId = `skills-process-arrowhead-${index}`
  const path = curveUp ? 'M 2 14 Q 24 4, 46 14' : 'M 2 14 Q 24 24, 46 14'

  return (
    <svg
      className="skills-process-arrow"
      viewBox="0 0 48 28"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="2"
          y1="14"
          x2="46"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <marker
          id={markerId}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={to} />
        </marker>
      </defs>
      <path
        className="skills-process-arrow__path"
        d={path}
        stroke={`url(#${gradId})`}
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  )
}

const Skills = () => {
  const radarRef = useRef(null)
  const radarDetailLeftSlotRef = useRef(null)
  const radarDetailRightSlotRef = useRef(null)
  const radarCardRef = useRef(null)
  const skillsEyebrowRef = useRef(null)
  const wasInViewRef = useRef(false)
  const introDoneRef = useRef(false)
  const [radarActive, setRadarActive] = useState(false)
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY)
  const [activeSkillId, setActiveSkillId] = useState(
    () => getRadarSkillsByCategory(DEFAULT_CATEGORY)[0]?.id ?? null,
  )
  const [activeStackName, setActiveStackName] = useState(null)

  const categorySkills = useMemo(
    () => getRadarSkillsByCategory(activeCategory),
    [activeCategory],
  )

  const activeSkill = useMemo(() => {
    const selected =
      categorySkills.find((skill) => skill.id === activeSkillId) ?? categorySkills[0]
    return selected ?? null
  }, [activeSkillId, categorySkills])

  const radarDetailLayout = useRadarDetailLayout(
    activeSkill,
    radarRef,
    radarDetailLeftSlotRef,
    radarDetailRightSlotRef,
    radarCardRef,
    skillsEyebrowRef,
  )

  const activeStackSkill = useMemo(() => {
    const item = DAILY_STACK.find((tool) => tool.name === activeStackName)
    return item ? getDailyStackSkillDetail(item) : null
  }, [activeStackName])

  const selectCategory = useCallback((categoryId) => {
    const skills = getRadarSkillsByCategory(categoryId)
    setActiveCategory(categoryId)
    setActiveSkillId(skills[0]?.id ?? null)
  }, [])

  const activateIntro = useCallback(() => {
    if (introDoneRef.current) return

    wasInViewRef.current = true
    introDoneRef.current = true
    setRadarActive(true)
  }, [])

  useEffect(() => {
    const radar = radarRef.current
    if (!radar) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!wasInViewRef.current) {
            activateIntro()
          }
          return
        }

        if (!introDoneRef.current) {
          wasInViewRef.current = false
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(radar)

    return () => observer.disconnect()
  }, [activateIntro])

  useEffect(() => {
    const radar = radarRef.current
    const skillsAnchor = document.getElementById('skills')
    if (!radar && !skillsAnchor) return undefined

    const onSectionReveal = (event) => {
      if (introDoneRef.current) return

      const sectionId = event.detail?.sectionId ?? null
      if (sectionId && sectionId !== 'skills') return

      const shouldActivate =
        sectionId === 'skills' ||
        (radar && elementIntersectsViewport(radar, { bottomInset: 48 })) ||
        (skillsAnchor && elementIntersectsViewport(skillsAnchor, { bottomInset: 48 }))

      if (shouldActivate) activateIntro()
    }

    window.addEventListener(SECTION_REVEAL_EVENT, onSectionReveal)
    return () => window.removeEventListener(SECTION_REVEAL_EVENT, onSectionReveal)
  }, [activateIntro])

  return (
    <section className="skills-section section-page section-page--default">
      <ScrollReveal className="relative z-10 mx-auto max-w-6xl">
        <div className="skills-showcase">
          <ScrollRevealItem tier="head" className="skills-intro">
            <p
              ref={skillsEyebrowRef}
              id="skills"
              className="section-scroll-anchor text-sm font-semibold uppercase tracking-[0.3em] text-sky-400"
            >
              Skills
            </p>

            <h2 className="skills-title section-heading mt-3 text-3xl font-bold text-white md:text-4xl">
              Il mio arsenale tecnologico
            </h2>

            <p className="skills-copy section-lead mt-5">
              Tecnologie, strumenti e competenze che utilizzo per trasformare idee
              in prodotti digitali.
            </p>

            <div
              className="skills-category-tabs skills-intro__tabs"
              role="tablist"
              aria-label="Categorie competenze"
            >
              {SKILL_CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  className="nav-btn skills-category-tab"
                  aria-selected={activeCategory === tab.id}
                  aria-pressed={activeCategory === tab.id}
                  onClick={() => selectCategory(tab.id)}
                >
                  <span
                    className={`nav-btn-inner nav-btn-inner--section skills-category-tab__inner${
                      activeCategory === tab.id ? ' nav-btn-inner--current' : ''
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem tier="content" className="skills-radar-cluster">
            <div
              className="skills-radar-cluster__detail-slot skills-radar-cluster__detail-slot--left"
              ref={radarDetailLeftSlotRef}
              aria-hidden={radarDetailLayout?.placement !== 'left'}
            />

            <div className="skills-radar-cluster__radar" ref={radarRef}>
              <TechRadar
                key={activeCategory}
                active={radarActive}
                skills={categorySkills}
                activeSkillId={activeSkill?.id}
                onSkillChange={setActiveSkillId}
              />
            </div>

            <div
              className="skills-radar-cluster__detail-slot skills-radar-cluster__detail-slot--right"
              ref={radarDetailRightSlotRef}
              aria-hidden={radarDetailLayout?.placement !== 'right'}
            />

            <div
              className={`skills-radar-cluster__detail${
                radarDetailLayout?.placement === 'left'
                  ? ' skills-radar-cluster__detail--left'
                  : ' skills-radar-cluster__detail--right'
              }`}
              ref={radarCardRef}
              style={
                radarDetailLayout
                  ? {
                      top: `${radarDetailLayout.detailTop}px`,
                      ...(radarDetailLayout.placement === 'left'
                        ? {
                            left: `${radarDetailLayout.detailOffsetLeft ?? 0}px`,
                            right: 'auto',
                          }
                        : {
                            right: `${radarDetailLayout.detailOffsetRight ?? 0}px`,
                            left: 'auto',
                          }),
                    }
                  : undefined
              }
            >
              {activeSkill ? (
                <SkillDetailCard key={activeSkill.id} skill={activeSkill} layout="vertical" />
              ) : null}
            </div>

            <RadarDetailBridge geometry={radarDetailLayout?.bridge} />
          </ScrollRevealItem>

          <ScrollRevealItem tier="content" className="skills-process">
            <h3 className="skills-subsection-title project-case-feature-screens__title">
              Dal codice al prodotto
            </h3>

            <div className="skills-process-track">
              <div className="skills-process-list" role="list">
                {PROCESS_STEPS.map((step, index) => {
                  const Icon = processIcons[step.icon]
                  const nextStep = PROCESS_STEPS[index + 1]

                  return (
                    <Fragment key={step.number}>
                      <article
                        role="listitem"
                        className="skills-process-card about-highlight-card"
                        style={{ '--skill-color': step.tone }}
                      >
                        <div className="about-highlight-card__inner skills-process-card__inner">
                          <div className="skills-process-card__content">
                            <span className="skills-process-card__icon" aria-hidden="true">
                              <Icon />
                            </span>
                            <strong>{step.label}</strong>
                            <p>{step.text}</p>
                          </div>
                        </div>
                      </article>

                      {nextStep ? (
                        <div className="skills-process-arrow-slot" aria-hidden="true">
                          <ProcessArrow
                            from={step.tone}
                            to={nextStep.tone}
                            index={index}
                            curveUp={index % 2 === 0}
                          />
                        </div>
                      ) : null}
                    </Fragment>
                  )
                })}
              </div>
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem tier="content" className="skills-stack">
            <h3 className="skills-subsection-title project-case-feature-screens__title">
              Il mio stack quotidiano
            </h3>

            {activeStackSkill ? (
              <div className="skills-stack-detail">
                <SkillDetailCard key={activeStackSkill.id} skill={activeStackSkill} />
              </div>
            ) : null}

            <div className="skills-stack-panel">
              {DAILY_STACK.map((tool) => (
                <button
                  key={tool.name}
                  type="button"
                  className={`skills-stack-item${
                    activeStackName === tool.name ? ' skills-stack-item--active' : ''
                  }`}
                  style={{ '--skill-color': tool.glow }}
                  aria-pressed={activeStackName === tool.name}
                  aria-label={tool.name}
                  onClick={() =>
                    setActiveStackName((current) =>
                      current === tool.name ? null : tool.name,
                    )
                  }
                >
                  <span className="skills-stack-item__icon" aria-hidden="true">
                    <SkillIcon skill={tool} />
                  </span>
                  <span className="skills-stack-item__name">{tool.name}</span>
                </button>
              ))}
            </div>
          </ScrollRevealItem>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default Skills
