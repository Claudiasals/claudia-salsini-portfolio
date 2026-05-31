import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout'

const CookiePolicy = () => {
  return (
    <LegalPageLayout
      label="Informativa"
      title="Cookie Policy"
      intro="Questa pagina descrive come vengono utilizzati i cookie sul portfolio di Claudia Salsini."
    >
      <LegalSection
        title="Cosa sono i cookie"
        body="I cookie sono piccoli file di testo che i siti possono salvare sul dispositivo dell'utente per ricordare preferenze o informazioni tecniche durante la navigazione."
      />

      <LegalSection
        title="Cookie utilizzati su questo sito"
        body="Questo portfolio utilizza esclusivamente cookie tecnici necessari al corretto funzionamento del sito. Non è richiesto un consenso preventivo per questo tipo di cookie, ma ti informiamo comunque sul loro utilizzo."
        list={[
          'Cookie tecnici di sessione: eventuali cookie indispensabili erogati dall\'hosting o dal servizio di distribuzione del sito.',
        ]}
      />

      <LegalSection
        title="Cookie di profilazione e analytics"
        body="Non vengono utilizzati cookie di profilazione, strumenti di analytics o pixel di tracciamento pubblicitario."
      />

      <LegalSection
        title="Come gestire i cookie"
        body="Puoi gestire o eliminare i cookie dalle impostazioni del browser. La disabilitazione dei cookie tecnici potrebbe limitare alcune funzionalità del sito."
      />

      <LegalSection
        title="Aggiornamenti"
        body="Questa informativa può essere aggiornata in caso di modifiche al sito o all'uso dei cookie. La data dell'ultimo aggiornamento è indicata in fondo alla pagina."
      />
    </LegalPageLayout>
  )
}

export default CookiePolicy
