'use client';

import { AuthProvider, useAuth } from '@/lib/auth';
import LoginPage from '@/components/admin/LoginPage';
import PaletteAdmin from '@/components/admin/PaletteAdmin';

function AdminGate() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
        }}
      >
        <div style={{ color: '#f59e0b', fontSize: '18px', fontFamily: 'var(--font-mono)' }}>
          Loading…
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <PaletteAdmin />;
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminGate />
    </AuthProvider>
  );
}
