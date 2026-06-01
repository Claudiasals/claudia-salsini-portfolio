import { useEffect, useRef, useState } from 'react'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { FiMail, FiPhone } from 'react-icons/fi'
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal'
import ContactDetailLink from './ContactDetailLink'

const TYPING_MS = 70
const TYPING_GAP_MS = 280

const CONTACT_LABELS = [
  'INDIRIZZO EMAIL',
  'NUMERO DI TELEFONO',
  'GITHUB',
  'LINKEDIN',
  'WHATSAPP',
]

const labelStartDelays = CONTACT_LABELS.reduce((acc, label, index) => {
  if (index === 0) {
    acc.push(0)
    return acc
  }

  acc.push(acc[index - 1] + CONTACT_LABELS[index - 1].length * TYPING_MS + TYPING_GAP_MS)
  return acc
}, [])

const CONTACT_LINK_SELECTOR = 'a[href="#contact"], a[href="/#contact"]'

const Contact = () => {
  const sectionRef = useRef(null)
  const [typingRun, setTypingRun] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setTypingRun((run) => (run === 0 ? 1 : run))
      },
      { threshold: 0.2 },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleContactLinkClick = (event) => {
      if (!event.target.closest(CONTACT_LINK_SELECTOR)) return

      setTypingRun((run) => run + 1)
    }

    document.addEventListener('click', handleContactLinkClick)

    return () => document.removeEventListener('click', handleContactLinkClick)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    const subject = encodeURIComponent(`Messaggio portfolio da ${name}`)
    const body = encodeURIComponent(
      `Nome: ${name}\nEmail: ${email}\n\n${message}`,
    )

    window.location.href = `mailto:salsiniclaudia@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section
      ref={sectionRef}
      className="contact-section section-page section-page--contact relative text-white"
    >
      <ScrollReveal className="relative z-10 mx-auto max-w-6xl">
        <ScrollRevealItem tier="head">
          <p
            id="contact"
            className="section-scroll-anchor text-center text-sm font-semibold uppercase tracking-[0.3em] text-sky-400"
          >
            Contacts
          </p>

          <h2 className="contact-layout__title mt-4 text-center text-3xl font-bold text-white md:text-4xl">
            Contatti e profili
          </h2>
        </ScrollRevealItem>

        <ScrollRevealItem tier="content">
          <div className="contact-layout section-after-title">
            <div className="contact-form-panel">
              <h3 className="contact-form-title terminal-gradient-label">
                Scrivimi un&apos;email
              </h3>

              <form className="contact-form mt-5 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="contact-name" className="contact-form-label">
                    Nome completo
                  </label>
                  <div className="contact-form-input-wrap">
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Inserisci il tuo nome"
                      className="contact-form-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="contact-form-label">
                    Email
                  </label>
                  <div className="contact-form-input-wrap">
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Inserisci la tua email"
                      className="contact-form-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="contact-form-label">
                    Il tuo messaggio
                  </label>
                  <div className="contact-form-input-wrap">
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Scrivi qui il tuo messaggio"
                      className="contact-form-input contact-form-textarea"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <button type="submit" className="btn-primary">
                    <span className="btn-primary-inner">
                      <span className="btn-primary-text">Invia</span>
                    </span>
                  </button>
                </div>
              </form>
            </div>

            <div className="contact-layout__left">
              <ul className="contact-detail-list space-y-4">
                <li>
                  <ContactDetailLink
                    href="mailto:salsiniclaudia@gmail.com"
                    label="INDIRIZZO EMAIL"
                    ariaLabel="Invia email a salsiniclaudia@gmail.com"
                    icon={<FiMail />}
                    runKey={typingRun}
                    startDelay={labelStartDelays[0]}
                  >
                    salsiniclaudia@gmail.com
                  </ContactDetailLink>
                </li>
                <li>
                  <ContactDetailLink
                    href="tel:+393920339229"
                    label="NUMERO DI TELEFONO"
                    ariaLabel="Chiama +39 392 033 9229"
                    icon={<FiPhone />}
                    runKey={typingRun}
                    startDelay={labelStartDelays[1]}
                  >
                    +39 392 033 9229
                  </ContactDetailLink>
                </li>
                <li>
                  <ContactDetailLink
                    href="https://github.com/Claudiasals"
                    label="GITHUB"
                    ariaLabel="Profilo GitHub di Claudia Salsini"
                    icon={<FaGithub />}
                    runKey={typingRun}
                    startDelay={labelStartDelays[2]}
                    external
                  >
                    github.com/Claudiasals
                  </ContactDetailLink>
                </li>
                <li>
                  <ContactDetailLink
                    href="https://www.linkedin.com/in/claudia-salsini"
                    label="LINKEDIN"
                    ariaLabel="Profilo LinkedIn di Claudia Salsini"
                    icon={<FaLinkedinIn />}
                    runKey={typingRun}
                    startDelay={labelStartDelays[3]}
                    external
                  >
                    linkedin.com/in/claudia-salsini
                  </ContactDetailLink>
                </li>
                <li>
                  <ContactDetailLink
                    href="https://wa.me/393920339229"
                    label="WHATSAPP"
                    ariaLabel="Scrivimi su WhatsApp"
                    icon={<FaWhatsapp />}
                    runKey={typingRun}
                    startDelay={labelStartDelays[4]}
                    external
                  >
                    wa.me/393920339229
                  </ContactDetailLink>
                </li>
              </ul>
            </div>
          </div>
        </ScrollRevealItem>
      </ScrollReveal>
    </section>
  )
}

export default Contact
