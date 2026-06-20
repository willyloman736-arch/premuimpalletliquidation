import Link from 'next/link';
import { Package, ArrowLeft } from 'lucide-react';
import s from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={s['not-found']}>
      <div className="container">
        <div className={s.content}>
          <Package size={72} aria-hidden="true" />
          <p className={s.code}>404</p>
          <h1>Page introuvable</h1>
          <p className={s.text}>
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <div className={s.actions}>
            <Link href="/" className="btn btn-primary">
              <ArrowLeft size={18} aria-hidden="true" />
              Retour à l&apos;accueil
            </Link>
            <Link href="/palettes" className="btn btn-secondary">
              Voir nos palettes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
