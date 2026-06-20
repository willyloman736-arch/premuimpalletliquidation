import type { Metadata } from 'next';
import Link from 'next/link';
import s from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description:
    'Conditions Générales de Vente des palettes de liquidation de PLF - Palette Liquidation France.',
};

export default function CGVPage() {
  return (
    <div className={s['legal-page']}>
      <div className="container">
        <h1>Conditions Générales de Vente</h1>
        <p>
          <strong>Dernière mise à jour :</strong> Août 2025
        </p>

        <h2>1. Champ d&apos;application</h2>
        <p>
          Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent à toutes les ventes
          de palettes de liquidation réalisées par PLF - Palette Liquidation France.
        </p>
        <p>Toute commande implique l&apos;acceptation sans réserve des présentes CGV.</p>

        <h2>2. Produits</h2>
        <p>
          PLF commercialise des palettes de liquidation provenant de grandes enseignes
          et plateformes e-commerce. Ces palettes contiennent des produits variés.
        </p>
        <p>
          <strong>Important :</strong>
        </p>
        <ul>
          <li>Le contenu exact des palettes peut varier</li>
          <li>Les produits peuvent présenter des défauts mineurs</li>
          <li>Certains produits peuvent être endommagés</li>
          <li>PLF fournit une description générale mais non exhaustive</li>
        </ul>

        <h2>3. Commandes</h2>
        <h3>3.1 Processus de commande</h3>
        <p>
          Les commandes s&apos;effectuent exclusivement via notre site internet.
          Le client doit fournir toutes les informations nécessaires.
        </p>

        <h3>3.2 Confirmation de commande</h3>
        <p>
          Chaque commande fait l&apos;objet d&apos;un accusé de réception par email.
          Un agent PLF contactera le client pour finaliser le paiement.
        </p>

        <h3>3.3 Disponibilité</h3>
        <p>
          Les palettes sont vendues dans la limite des stocks disponibles.
          En cas d&apos;indisponibilité, le client sera informé et remboursé.
        </p>

        <h2>4. Prix</h2>
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises.
          PLF se réserve le droit de modifier ses prix à tout moment.
        </p>
        <p>Le prix applicable est celui en vigueur au moment de la validation de la commande.</p>

        <h2>5. Paiement</h2>
        <p>PLF accepte les modes de paiement suivants :</p>
        <ul>
          <li>
            <strong>Carte bancaire (Stripe) :</strong> Paiement sécurisé en ligne, traitement immédiat après validation
          </li>
          <li>
            <strong>Virement bancaire :</strong> Traitement sous 2-3 jours ouvrés
          </li>
          <li>
            <strong>Apple Pay :</strong> Traitement instantané
          </li>
        </ul>
        <p>
          Le paiement doit être effectué intégralement avant l&apos;expédition.
          En cas de non-paiement, la commande sera annulée.
        </p>

        <h2>6. Livraison</h2>
        <h3>6.1 Zone de livraison</h3>
        <p>PLF livre en France et dans toute l&apos;Europe.</p>

        <h3>6.2 Frais de livraison</h3>
        <ul>
          <li>Livraison gratuite pour les commandes supérieures à 500€</li>
          <li>Frais de livraison : 50€ pour les commandes inférieures à 500€</li>
        </ul>

        <h3>6.3 Délais de livraison</h3>
        <p>
          Expédition sous 48h ouvrées après confirmation du paiement.
          Les délais de transport sont de 2 à 5 jours ouvrés.
        </p>

        <h3>6.4 Réception de la commande</h3>
        <p>
          Le client doit vérifier l&apos;état de la livraison en présence du transporteur
          et signaler toute anomalie.
        </p>

        <h2>7. Droit de rétractation</h2>
        <p>
          <strong>Attention :</strong> En raison de la nature spécifique des palettes de liquidation
          (produits d&apos;occasion, lots hétérogènes), le droit de rétractation ne s&apos;applique pas
          conformément à l&apos;article L121-21-8 du Code de la Consommation.
        </p>
        <p>Cependant, PLF s&apos;engage à examiner toute réclamation justifiée au cas par cas.</p>

        <h2>8. Garanties</h2>
        <h3>8.1 Garantie de conformité</h3>
        <p>
          PLF garantit que les palettes correspondent à la description générale fournie.
          Cependant, le contenu exact peut varier.
        </p>

        <h3>8.2 Garantie légale</h3>
        <p>
          Les garanties légales s&apos;appliquent aux produits neufs contenus dans les palettes.
          PLF n&apos;est pas responsable des produits défectueux d&apos;origine.
        </p>

        <h2>9. Responsabilité</h2>
        <p>
          La responsabilité de PLF est limitée au prix de la palette vendue.
          PLF ne saurait être tenue responsable :
        </p>
        <ul>
          <li>Des dommages indirects ou consécutifs</li>
          <li>De la revente des produits par le client</li>
          <li>Des défauts préexistants des produits de liquidation</li>
          <li>De l&apos;utilisation des produits par le client final</li>
        </ul>

        <h2>10. Protection des données</h2>
        <p>
          Les données personnelles sont traitées conformément à notre{' '}
          <Link href="/legal/privacy">Politique de Confidentialité</Link>.
        </p>

        <h2>11. Réclamations</h2>
        <p>Toute réclamation doit être adressée dans les 7 jours suivant la réception :</p>
        <ul>
          <li>
            <strong>Email :</strong> liquidation.palette@gmail.com
          </li>
          <li>
            <strong>Téléphone :</strong> +33 7 56 86 75 16
          </li>
          <li>
            <strong>Courrier :</strong> 281 Rue Blanche SELVA, 66000 Perpignan, France
          </li>
        </ul>

        <h2>12. Force majeure</h2>
        <p>
          PLF ne saurait être tenue responsable en cas de force majeure ou d&apos;événements
          indépendants de sa volonté (grève, intempéries, etc.).
        </p>

        <h2>13. Droit applicable</h2>
        <p>
          Les présentes CGV sont soumises au droit français.
          Tout litige relève de la compétence des tribunaux français.
        </p>

        <h2>14. Médiation</h2>
        <p>
          En cas de litige, le client peut recourir à la médiation de la consommation
          avant toute action judiciaire.
        </p>
      </div>
    </div>
  );
}
