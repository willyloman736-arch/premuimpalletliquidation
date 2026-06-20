import Link from 'next/link';
import { Boxes, ArrowLeft } from 'lucide-react';
import s from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={s['not-found']}>
      <div className={s.hazard} aria-hidden="true" />
      <div className="container">
        <div className={s.content}>
          <Boxes size={64} aria-hidden="true" />
          <p className={s.code}>404</p>
          <h1>Page Not Found</h1>
          <p className={s.text}>
            The page you&apos;re looking for doesn&apos;t exist or was moved.
          </p>
          <div className={s.actions}>
            <Link href="/" className="btn btn-primary">
              <ArrowLeft size={18} aria-hidden="true" />
              Back to Home
            </Link>
            <Link href="/pallets" className="btn btn-secondary">
              Shop Pallets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
