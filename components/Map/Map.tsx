'use client';
import dynamic from 'next/dynamic';
import styles from './Map.module.css';

// Importar el mapa dinámicamente solo en el cliente
const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => <div className={styles.mapContainer}>Cargando mapa...</div>,
});

export default function Map() {
  return <MapClient />;
}