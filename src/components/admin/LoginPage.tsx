'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import s from './LoginPage.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.username, formData.password);

    if (!result.success) {
      setError(result.error ?? 'Identifiants incorrects');
    }

    setLoading(false);
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #fee2e2',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fef2f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid #fecaca',
          width: '100%',
          maxWidth: '420px',
        }}
      >
        {/* Logo/Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#dc2626',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
            }}
          >
            <LogIn size={24} color="white" aria-hidden="true" />
          </div>
          <h1
            style={{
              color: '#dc2626',
              fontSize: '24px',
              fontWeight: 700,
              margin: '0 0 5px 0',
            }}
          >
            Administration
          </h1>
          <p
            style={{
              color: '#6b7280',
              fontSize: '14px',
              margin: 0,
            }}
          >
            Connectez-vous pour gérer les palettes
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="login-username"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 500,
                color: '#374151',
                fontSize: '14px',
              }}
            >
              Nom d&apos;utilisateur
            </label>
            <input
              id="login-username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              style={inputStyle}
              placeholder="admin"
              required
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label
              htmlFor="login-password"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 500,
                color: '#374151',
                fontSize: '14px',
              }}
            >
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{
                  ...inputStyle,
                  paddingRight: '45px',
                }}
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: loading ? '#9ca3af' : '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {loading ? (
              <>
                <div className={s.spinner} />
                Connexion...
              </>
            ) : (
              <>
                <LogIn size={16} aria-hidden="true" />
                Se connecter
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
