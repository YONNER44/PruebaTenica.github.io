'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Toast from '@/components/Toast/Toast';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login, justLoggedOut, clearLogoutFlag } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(email, password);
    
    if (success) {
      setShowSuccessToast(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      setError('Credenciales incorrectas');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {showSuccessToast && (
        <Toast 
          message="Inicio de sesión exitoso" 
          type="success"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
      {justLoggedOut && (
        <Toast 
          message="Sesión cerrada exitosamente" 
          type="info"
          onClose={clearLogoutFlag}
        />
      )}
      <div className={styles.loginCard}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🐝</span>
            <h1 className={styles.logoText}>SpyBee</h1>
          </div>
          <p className={styles.subtitle}>Iniciar sesión en tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@spybee.com"
              required
              className={styles.input}
              autoComplete="email"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className={styles.input}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitBtn}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>

          <div className={styles.hint}>
            <p>Credenciales de prueba:</p>
            <p><strong>Email:</strong> admin@spybee.com</p>
            <p><strong>Contraseña:</strong> admin123</p>
          </div>
        </form>
      </div>
    </div>
  );
}
