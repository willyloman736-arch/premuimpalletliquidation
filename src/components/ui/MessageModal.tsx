'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertCircle, Info, CheckCircle } from 'lucide-react';
import s from './MessageModal.module.css';

export type MessageVariant = 'info' | 'error' | 'success';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string | null;
  variant?: MessageVariant;
}

export default function MessageModal({
  isOpen,
  onClose,
  title = 'Information',
  message,
  variant = 'info',
}: MessageModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || message == null) return null;

  const Icon = variant === 'error' ? AlertCircle : variant === 'success' ? CheckCircle : Info;
  const tone =
    variant === 'error'
      ? { accent: '#dc2626', bg: '#fef2f2' }
      : variant === 'success'
        ? { accent: '#059669', bg: '#ecfdf5' }
        : { accent: '#b45309', bg: '#ccfbf1' };

  return createPortal(
    <div className={s['mm-overlay']} onClick={onClose} role="presentation">
      <div
        className={s['mm-dialog']}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="mm-title"
        aria-describedby="mm-desc"
      >
        <button type="button" className={s['mm-close']} onClick={onClose} aria-label="Fermer">
          <X size={22} />
        </button>
        <div className={s['mm-icon-wrap']} style={{ background: tone.bg, color: tone.accent }}>
          <Icon size={28} strokeWidth={2} />
        </div>
        <h2 id="mm-title" className={s['mm-title']}>
          {title}
        </h2>
        <p id="mm-desc" className={s['mm-message']}>
          {message}
        </p>
        <button type="button" className={s['mm-btn']} onClick={onClose}>
          OK
        </button>
      </div>
    </div>,
    document.body,
  );
}
