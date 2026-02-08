'use client';
import { useProjectStore } from '@/store/projectStore';
import { useState } from 'react';
import { TbSortAscending } from 'react-icons/tb';
import { MdViewList, MdViewModule, MdLocationOn } from 'react-icons/md';
import styles from './FilterBar.module.css';

export default function FilterBar() {
  const { sortByName, sortByIncidencias, sortByRFI, sortByTareas, toggleMap, showMap } = useProjectStore();
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleFilter = (filterType: string, sortFunction: () => void) => {
    setActiveFilter(filterType);
    sortFunction();
    setShowFilterMenu(false);
  };

  return (
    <div className={styles.filterBar}>
      <button
        className={`${styles.filterBtn} ${activeFilter === 'alfabetico' ? styles.active : ''}`}
        onClick={() => handleFilter('alfabetico', sortByName)}
        title="Orden alfabético"
      >
        <TbSortAscending />
      </button>
      
      {/* Botón con dropdown de filtros */}
      <div className={styles.filterMenuContainer}>
        <button
          className={`${styles.filterBtn} ${showFilterMenu ? styles.active : ''}`}
          onClick={() => setShowFilterMenu(!showFilterMenu)}
          title="Menú de filtros"
        >
          <MdViewList />
        </button>
        
        {showFilterMenu && (
          <div className={styles.filterDropdown}>
            <button
              className={styles.dropdownItem}
              onClick={() => handleFilter('alfabetico', sortByName)}
            >
              Orden alfabético
            </button>
            <button
              className={styles.dropdownItem}
              onClick={() => handleFilter('incidencias', sortByIncidencias)}
            >
              Número de Incidencias
            </button>
            <button
              className={styles.dropdownItem}
              onClick={() => handleFilter('rfi', sortByRFI)}
            >
              Número de RFI
            </button>
            <button
              className={styles.dropdownItem}
              onClick={() => handleFilter('tareas', sortByTareas)}
            >
              Número de Tareas
            </button>
          </div>
        )}
      </div>
      
      <button
        className={`${styles.filterBtn} ${activeFilter === 'rfi' ? styles.active : ''}`}
        onClick={() => handleFilter('rfi', sortByRFI)}
        title="Número de RFI"
      >
        <MdViewModule />
      </button>
      <button
        className={`${styles.filterBtn} ${showMap ? styles.active : ''}`}
        onClick={toggleMap}
        title="Mostrar/Ocultar mapa"
      >
        <MdLocationOn />
      </button>
    </div>
  );
}