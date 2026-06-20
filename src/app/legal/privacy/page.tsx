import type { Metadata } from 'next';
import Link from 'next/link';
import s from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description:
    'Politique de Confidentialité et protection des données personnelles de PLF - Palette Liquidation France.',
};

export default function PrivacyPage() {
  return (
    <div className={s['legal-page']}>
      <div className="container">
        <h1>Politique de Confidentialité</h1>
        <p>
          <strong>Dernière mise à jour :</strong> Août 2025
        </p>

        <h2>1. Responsable du traitement</h2>
        <p>
          <strong>PLF - Palette Liquidation France</strong>
        </p>
        <p>281 Rue Blanche SELVA, 66000 Perpignan, France</p>
        <p>Email : liquidation.palette@gmail.com</p>
        <p>Téléphone : +33 7 56 86 75 16</p>

        <h2>2. Données collectées</h2>
        <h3>2.1 Données de commande</h3>
        <p>Lors d&apos;une commande, nous collectons :</p>
        <ul>
          <li>
            <strong>Informations personnelles :</strong> Nom, prénom, email, téléphone
          </li>
          <li>
            <strong>Adresse de livraison :</strong> Adresse complète, code postal, ville
          </li>
          <li>
            <strong>Informations de commande :</strong> Produits commandés, montant, date
          </li>
          <li>
            <strong>Méthode de paiement choisie :</strong> Carte bancaire (Stripe), virement bancaire ou Apple Pay
          </li>
        </ul>

        <h3>2.2 Données de navigation</h3>
        <ul>
          <li>Adresse IP</li>
          <li>Type de navigateur</li>
          <li>Pages visitées</li>
          <li>Durée de visite</li>
          <li>Données du panier (stockage local)</li>
        </ul>

        <h3>2.3 Cookies</h3>
        <p>
          Nous utilisons des cookies pour améliorer votre expérience.
          Consultez notre <Link href="/legal/cookies">Politique des Cookies</Link> pour plus d&apos;informations.
        </p>

        <h2>3. Finalités du traitement</h2>
        <p>Vos données sont utilisées pour :</p>
        <ul>
          <li>
            <strong>Traitement des commandes :</strong> Validation, préparation, expédition
          </li>
          <li>
            <strong>Communication :</strong> Confirmation de commande, suivi de livraison
          </li>
          <li>
            <strong>Service client :</strong> Réponse à vos questions, réclamations
          </li>
          <li>
            <strong>Gestion commerciale :</strong> Facturation, comptabilité
          </li>
          <li>
            <strong>Amélioration du service :</strong> Analyse des ventes, optimisation du site
          </li>
          <li>
            <strong>Newsletter :</strong> Envoi d&apos;offres (avec votre consentement)
          </li>
        </ul>

        <h2>4. Base légale du traitement</h2>
        <ul>
          <li>
            <strong>Exécution du contrat :</strong> Traitement des commandes et livraisons
          </li>
          <li>
            <strong>Intérêt légitime :</strong> Amélioration du service, sécurité
          </li>
          <li>
            <strong>Consentement :</strong> Newsletter, cookies non essentiels
          </li>
          <li>
            <strong>Obligation légale :</strong> Conservation des factures, comptabilité
          </li>
        </ul>

        <h2>5. Partage des données</h2>
        <p>Vos données peuvent être partagées avec :</p>
        <ul>
          <li>
            <strong>Prestataires de paiement :</strong> Pour le traitement des transactions
          </li>
          <li>
            <strong>Transporteurs :</strong> Pour la livraison (nom, adresse, téléphone)
          </li>
          <li>
            <strong>Service d&apos;emailing :</strong> EmailJS pour l&apos;envoi des confirmations
          </li>
          <li>
            <strong>Sous-traitants :</strong> Hébergeur, maintenance informatique
          </li>
        </ul>
        <p>
          <strong>Aucune vente</strong> de vos données à des tiers à des fins commerciales.
        </p>

        <h2>6. Transferts internationaux</h2>
        <p>
          Certains de nos prestataires peuvent être situés hors UE (EmailJS).
          Nous nous assurons qu&apos;ils offrent un niveau de protection adéquat.
        </p>

        <h2>7. Durée de conservation</h2>
        <ul>
          <li>
            <strong>Données de commande :</strong> 5 ans après la dernière commande
          </li>
          <li>
            <strong>Données comptables :</strong> 10 ans (obligation légale)
          </li>
          <li>
            <strong>Newsletter :</strong> Jusqu&apos;à désinscription
          </li>
          <li>
            <strong>Cookies :</strong> Maximum 13 mois
          </li>
          <li>
            <strong>Logs de connexion :</strong> 12 mois
          </li>
        </ul>

        <h2>8. Sécurité des données</h2>
        <p>Nous mettons en place des mesures de sécurité :</p>
        <ul>
          <li>Chiffrement SSL pour les transmissions</li>
          <li>Accès restreint aux données personnelles</li>
          <li>Mots de passe sécurisés</li>
          <li>Sauvegardes régulières</li>
          <li>Mise à jour des systèmes de sécurité</li>
        </ul>

        <h2>9. Vos droits (RGPD)</h2>
        <p>Vous disposez des droits suivants :</p>
        <ul>
          <li>
            <strong>Droit d&apos;accès :</strong> Connaître les données que nous détenons
          </li>
          <li>
            <strong>Droit de rectification :</strong> Corriger vos données inexactes
          </li>
          <li>
            <strong>Droit d&apos;effacement :</strong> Demander la suppression de vos données
          </li>
          <li>
            <strong>Droit à la limitation :</strong> Limiter le traitement de vos données
          </li>
          <li>
            <strong>Droit à la portabilité :</strong> Récupérer vos données dans un format standard
          </li>
          <li>
            <strong>Droit d&apos;opposition :</strong> Vous opposer au traitement pour motif légitime
          </li>
          <li>
            <strong>Droit de retrait du consentement :</strong> Pour la newsletter et cookies
          </li>
        </ul>

        <h2>10. Exercer vos droits</h2>
        <p>
          Pour exercer vos droits ou pour toute question sur cette politique,
          contactez-nous :
        </p>
        <ul>
          <li>
            <strong>Email :</strong> liquidation.palette@gmail.com
          </li>
          <li>
            <strong>Téléphone :</strong> +33 7 56 86 75 16
          </li>
          <li>
            <strong>Courrier :</strong> PLF - Service Protection des Données<br />
            281 Rue Blanche SELVA, 66000 Perpignan, France
          </li>
        </ul>
        <p>
          Merci de préciser votre demande et de joindre une copie de votre pièce d&apos;identité.
        </p>

        <h2>11. Réclamation</h2>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer
          une réclamation auprès de la CNIL :
        </p>
        <p>
          <strong>CNIL</strong><br />
          3 Place de Fontenoy - TSA 80715<br />
          75334 PARIS CEDEX 07<br />
          Téléphone : 01 53 73 22 22<br />
          Site web : www.cnil.fr
        </p>

        <h2>12. Mineurs</h2>
        <p>
          Notre service s&apos;adresse aux personnes majeures. Nous ne collectons pas
          sciemment de données personnelles d&apos;enfants de moins de 16 ans.
        </p>

        <h2>13. Modifications</h2>
        <p>
          Cette politique peut être modifiée pour s&apos;adapter aux évolutions légales
          ou techniques. Nous vous informerons de tout changement significatif.
        </p>

        <h2>14. Contact</h2>
        <p>Pour toute question relative à cette politique de confidentialité :</p>
        <p>
          <strong>Email :</strong> liquidation.palette@gmail.com<br />
          <strong>Téléphone :</strong> +33 7 56 86 75 16
        </p>
      </div>
    </div>
  );
}
