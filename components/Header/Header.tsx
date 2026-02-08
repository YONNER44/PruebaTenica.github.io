'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    setShowConfirm(false);
    logout();
    router.push('/login');
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      {showConfirm && (
        <div className={styles.confirmOverlay} onClick={cancelLogout}>
          <div className={styles.confirmDialog} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.confirmTitle}>Cerrar sesión</h3>
            <p className={styles.confirmText}>¿Estás seguro de que quieres cerrar sesión?</p>
            <div className={styles.confirmButtons}>
              <button onClick={cancelLogout} className={styles.cancelBtn}>
                Cancelar
              </button>
              <button onClick={confirmLogout} className={styles.confirmBtn}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🐝</span>
          <span className={styles.logoText}>Spybee</span>
        </div>
        <div className={styles.user}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name || 'Usuario'}</span>
            <span className={styles.userRole}>{user?.role || 'Rol'}</span>
          </div>
          <div className={styles.avatar}>{getUserInitials()}</div>
          <button 
            onClick={handleLogout}
            className={styles.logoutBtn}
            title="Cerrar sesión"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
