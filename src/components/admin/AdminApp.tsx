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
          backgroundColor: '#fef2f2',
        }}
      >
        <div style={{ color: '#dc2626', fontSize: '18px' }}>Chargement...</div>
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
