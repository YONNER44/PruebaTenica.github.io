'use client';
import { useEffect } from 'react';
import { useProjectStore } from '@/store/projectStore';
import AuthGuard from '@/components/AuthGuard/AuthGuard';
import Header from '@/components/Header/Header';
import SearchBar from '@/components/SearchBar/SearchBar';
import FilterBar from '@/components/FilterBar/FilterBar';
import ProjectList from '@/components/ProjectList/ProjectList';
import Pagination from '@/components/Pagination/Pagination';
import Map from '@/components/Map/Map';
import Sidebar from '@/components/Sidebar/Sidebar';
import { HiViewList } from 'react-icons/hi';
import projectsData from '@/data/projects.json';
import styles from './page.module.css';

export default function Home() {
  const { setProjects, showMap, showSidebar, toggleSidebar, filteredProjects } = useProjectStore();

  useEffect(() => {
    setProjects(projectsData);
  }, [setProjects]);

  return (
    <AuthGuard>
      <main className={styles.main}>
        <Header />
        <div className={styles.container}>
          <div className={styles.topBar}>
          <div className={styles.leftSection}>
            <h1 className={styles.title}>Mis proyectos</h1>
            <span className={styles.count}>{filteredProjects.length} Proyectos</span>
          </div>
          <div className={styles.rightSection}>
            <FilterBar />
            <SearchBar />
            <button className={styles.createBtn}>+ Crear proyecto</button>
          </div>
        </div>
        
        {/* Botón flotante para abrir/cerrar sidebar */}
        <button 
          className={`${styles.floatingSidebarBtn} ${showSidebar ? styles.floatingSidebarBtnHidden : ''}`}
          onClick={toggleSidebar}
          title="Mostrar resumen"
        >
          <HiViewList />
        </button>
        
        <div className={`${styles.content} ${showSidebar ? styles.withSidebar : ''}`}>
          <div className={styles.mainContent}>
            <div className={`${styles.mapSection} ${showMap ? styles.mapVisible : styles.mapHidden}`}>
              <Map />
            </div>
            
            <div className={styles.listSection}>
              <ProjectList />
              <Pagination />
            </div>
          </div>
          
          <div className={`${styles.sidebarSection} ${showSidebar ? styles.sidebarVisible : styles.sidebarHidden}`}>
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
    </AuthGuard>
  );
}