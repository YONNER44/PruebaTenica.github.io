'use client';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useProjectStore } from '@/store/projectStore';
import styles from './Map.module.css';

// Token público de Mapbox (el usuario puede usar este token de demostración o crear el suyo)
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZGVtby1tYXBib3giLCJhIjoiY2wxYjBvNmN4MDBoNzNrbzI4MDcwNXJiZCJ9.9F3GqKLQRXqvXqLqKLQRXqv';

export default function MapClient() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  const { filteredProjects, selectedProject } = useProjectStore();

  // Inicializar mapa
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [0, 20],
      zoom: 1.5,
      projection: { name: 'mercator' }
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
  }, []);

  // Agregar marcadores
  useEffect(() => {
    if (!map.current) return;

    // Limpiar marcadores existentes
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Agregar nuevos marcadores
    filteredProjects.forEach((project) => {
      if (project.position?.lat && project.position?.lng) {
        const incidentCount = project.incidents?.filter((inc) => inc.item === 'incidents' && inc.status === 'active').length || 0;
        const rfiCount = project.incidents?.filter((inc) => inc.item === 'RFI' && inc.status === 'active').length || 0;
        const taskCount = project.incidents?.filter((inc) => inc.item === 'task' && inc.status === 'active').length || 0;

        // Crear elemento del marcador personalizado
        const el = document.createElement('div');
        el.className = styles.marker;
        el.innerHTML = '📍';
        el.style.cursor = 'pointer';

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px; min-width: 180px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${project.title}</h3>
            <p style="margin: 0; font-size: 12px; color: #666; line-height: 1.6;">
              <strong>Incidencias:</strong> ${incidentCount}<br/>
              <strong>RFI:</strong> ${rfiCount}<br/>
              <strong>Tareas:</strong> ${taskCount}
            </p>
          </div>
        `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat([project.position.lng, project.position.lat])
          .setPopup(popup)
          .addTo(map.current!);

        markers.current.push(marker);
      }
    });
  }, [filteredProjects]);

  // Navegar al proyecto seleccionado
  useEffect(() => {
    if (!map.current || !selectedProject?.position) return;

    map.current.flyTo({
      center: [selectedProject.position.lng, selectedProject.position.lat],
      zoom: 12,
      duration: 2000,
      essential: true
    });

    // Abrir popup del proyecto seleccionado
    const selectedMarker = markers.current.find((marker) => {
      const lngLat = marker.getLngLat();
      return (
        Math.abs(lngLat.lat - selectedProject.position.lat) < 0.0001 &&
        Math.abs(lngLat.lng - selectedProject.position.lng) < 0.0001
      );
    });

    if (selectedMarker) {
      selectedMarker.togglePopup();
    }
  }, [selectedProject]);

  return <div ref={mapContainer} className={styles.mapContainer} />;
}
