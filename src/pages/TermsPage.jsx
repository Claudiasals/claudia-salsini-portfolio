import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout'

const TermsPage = () => {
  return (
    <LegalPageLayout
      label="Condizioni d'uso"
      title="Termini e condizioni"
      intro="Le presenti condizioni regolano l'accesso e l'utilizzo del portfolio online di Claudia Salsini. Navigando sul sito accetti quanto indicato di seguito."
    >
      <LegalSection
        title="Oggetto del sito"
        body="Il sito ha finalità informativa e professionale: presenta competenze, progetti e modalità di contatto di Claudia Salsini. Non costituisce un'offerta commerciale vincolante né un servizio a pagamento."
      />

      <LegalSection
        title="Accesso e uso consentito"
        body="L'utente può consultare i contenuti del sito per scopi personali e professionali leciti. È vietato qualsiasi uso che possa compromettere la sicurezza, l'integrità o la disponibilità del sito."
      />

      <LegalSection
        title="Proprietà intellettuale"
        body="Testi, immagini, layout, codice e materiali presenti sul sito sono di proprietà di Claudia Salsini o utilizzati con licenza, salvo diversa indicazione. È vietata la riproduzione, distribuzione o modifica non autorizzata dei contenuti."
      />

      <LegalSection
        title="Form di contatto"
        body="Inviando un messaggio tramite form o email, l'utente dichiara che i dati forniti sono veritieri e di aver preso visione dell'informativa privacy. Claudia Salsini si riserva di non rispondere a messaggi offensivi, spam o manifestamente privi di finalità professionali."
      />

      <LegalSection
        title="Link esterni"
        body="Il sito può contenere collegamenti a siti di terze parti (es. GitHub, LinkedIn, progetti esterni). Claudia Salsini non è responsabile dei contenuti, delle policy o delle pratiche adottate da tali siti."
      />

      <LegalSection
        title="Limitazione di responsabilità"
        body="I contenuti del sito sono forniti con diligenza, ma non si garantisce l'assenza assoluta di errori o interruzioni del servizio. Nei limiti consentiti dalla legge, Claudia Salsini non risponde di danni indiretti derivanti dall'uso o dall'impossibilità di usare il sito."
      />

      <LegalSection
        title="Modifiche"
        body="Claudia Salsini può aggiornare in qualsiasi momento contenuti, funzionalità e presenti termini. Le modifiche sono efficaci dalla pubblicazione sul sito."
      />

      <LegalSection
        title="Legge applicabile e foro competente"
        body="Le presenti condizioni sono regolate dalla legge italiana. Per ogni controversia è competente il foro del luogo di residenza o domicilio del consumatore, ove applicabile; negli altri casi, il foro di Milano."
      />
    </LegalPageLayout>
  )
}

export default TermsPage
