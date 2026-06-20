'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import { LogIn, Eye, EyeOff, Boxes } from 'lucide-react';
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
      setError(result.error ?? 'Invalid credentials');
    }

    setLoading(false);
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #d6d3d1',
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle: CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 600,
    color: '#0a0a0a',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    fontFamily: 'var(--font-display)',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          border: '2px solid #0a0a0a',
          boxShadow: '10px 10px 0 #0d9488',
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
              backgroundColor: '#0d9488',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <Boxes size={28} color="#0a0a0a" aria-hidden="true" />
          </div>
          <h1
            style={{
              color: '#0a0a0a',
              fontSize: '26px',
              fontWeight: 700,
              margin: '0 0 5px 0',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-display)',
            }}
          >
            Administration
          </h1>
          <p style={{ color: '#52525b', fontSize: '14px', margin: 0 }}>
            Sign in to manage pallets
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="login-username" style={labelStyle}>
              Username
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
            <label htmlFor="login-password" style={labelStyle}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ ...inputStyle, paddingRight: '45px' }}
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#52525b',
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
                color: '#b91c1c',
                padding: '12px 16px',
                borderRadius: '4px',
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
              padding: '13px 16px',
              backgroundColor: loading ? '#a1a1aa' : '#0d9488',
              color: '#0a0a0a',
              border: '2px solid #0a0a0a',
              borderRadius: '4px',
              fontSize: '15px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontFamily: 'var(--font-display)',
            }}
          >
            {loading ? (
              <>
                <div className={s.spinner} />
                Signing in…
              </>
            ) : (
              <>
                <LogIn size={16} aria-hidden="true" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
