import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout'

const PrivacyPolicy = () => {
  return (
    <LegalPageLayout
      label="Informativa"
      title="Privacy Policy"
      intro="Questa informativa descrive come vengono trattati i dati personali nel portfolio online di Claudia Salsini, in conformità al Regolamento UE 2016/679 (GDPR)."
    >
      <LegalSection
        title="Titolare del trattamento"
        body="Il titolare del trattamento è Claudia Salsini. Per qualsiasi richiesta relativa alla privacy puoi contattare salsiniclaudia@gmail.com."
      />

      <LegalSection
        title="Tipologie di dati trattati"
        list={[
          'Dati di contatto inviati volontariamente tramite form o email (nome, indirizzo email, contenuto del messaggio).',
          'Dati tecnici di navigazione (indirizzo IP, tipo di browser, data e ora di accesso) necessari al funzionamento e alla sicurezza del sito.',
        ]}
      />

      <LegalSection
        title="Finalità e base giuridica"
        list={[
          'Rispondere a richieste di contatto inviate dall\'utente (base giuridica: esecuzione di misure precontrattuali su richiesta dell\'interessato e consenso).',
          'Garantire il corretto funzionamento, la sicurezza e la manutenzione del sito (base giuridica: legittimo interesse del titolare).',
          'Adempiere a obblighi di legge applicabili, ove necessario.',
        ]}
      />

      <LegalSection
        title="Modalità del trattamento"
        body="I dati sono trattati con strumenti informatici e telematici, nel rispetto delle misure di sicurezza adeguate a prevenire accessi non autorizzati, perdita o uso illecito."
      />

      <LegalSection
        title="Conservazione dei dati"
        body="I messaggi di contatto vengono conservati per il tempo necessario a gestire la richiesta e, successivamente, per un periodo limitato compatibile con eventuali obblighi legali o esigenze di tutela. I dati tecnici di navigazione sono conservati per periodi brevi e proporzionati alle finalità di sicurezza del sito."
      />

      <LegalSection
        title="Comunicazione e destinatari"
        body="I dati non vengono venduti né ceduti a terzi per finalità di marketing. Possono essere trattati da fornitori tecnici (es. hosting, servizi email) nominati responsabili del trattamento, nei limiti necessari all'erogazione del servizio."
      />

      <LegalSection
        title="Trasferimento dati extra-UE"
        body="Qualora alcuni fornitori tecnici operino al di fuori dello Spazio Economico Europeo, il trasferimento avviene solo in presenza di garanzie adeguate previste dal GDPR."
      />

      <LegalSection
        title="Diritti dell'interessato"
        list={[
          'Accesso, rettifica e cancellazione dei propri dati.',
          'Limitazione del trattamento e opposizione, nei casi previsti dalla legge.',
          'Portabilità dei dati, ove applicabile.',
          'Revoca del consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca.',
          'Reclamo all\'Autorità Garante per la protezione dei dati personali (www.garanteprivacy.it).',
        ]}
      />

      <LegalSection
        title="Natura del conferimento"
        body="Il conferimento dei dati tramite form di contatto è facoltativo, ma necessario per ricevere una risposta. Il mancato conferimento comporta l'impossibilità di gestire la richiesta."
      />
    </LegalPageLayout>
  )
}

export default PrivacyPolicy
