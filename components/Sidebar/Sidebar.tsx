'use client';
import { useProjectStore } from '@/store/projectStore';
import { MdBarChart, MdAccessTime, MdCalendarToday, MdChevronRight } from 'react-icons/md';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import styles from './Sidebar.module.css';

// Tipos para los items
interface Item {
  _id: string;
  status: string;
  item: string;
  description: string;
  owner: string;
  tag: string;
  coordinates: { lat: number; lng: number };
  limitDate: string;
  createdAt: string;
  updatedAt: string;
}

export default function Sidebar() {
  const { filteredProjects, toggleSidebar, searchTerm } = useProjectStore();

  // Calcular totales reales filtrando por el campo "item" y status "active"
  const totalIncidents = filteredProjects.reduce((sum, p) => {
    const count = p.incidents?.filter((inc: unknown) => {
      const i = inc as Item;
      return i.item === 'incidents' && i.status === 'active';
    }).length || 0;
    return sum + count;
  }, 0);

  const totalRFI = filteredProjects.reduce((sum, p) => {
    const count = p.incidents?.filter((inc: unknown) => {
      const i = inc as Item;
      return i.item === 'RFI' && i.status === 'active';
    }).length || 0;
    return sum + count;
  }, 0);

  const totalTasks = filteredProjects.reduce((sum, p) => {
    const count = p.incidents?.filter((inc: unknown) => {
      const i = inc as Item;
      return i.item === 'task' && i.status === 'active';
    }).length || 0;
    return sum + count;
  }, 0);

  // Calcular items próximos a vencer
  const now = new Date();
  const sixMonthsFromNow = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  // Si hay un filtro de búsqueda activo, mostrar todos los items activos
  const hasSearchFilter = searchTerm.trim().length > 0;
  
  const upcomingItems = filteredProjects.flatMap(project => {
    const items: Array<{ 
      project: string; 
      type: string; 
      date: Date; 
      description: string;
      owner: string;
    }> = [];
    
    // Filtrar items activos
    project.incidents?.forEach((incident: unknown) => {
      const inc = incident as Item;
      if (inc.limitDate && inc.status === 'active') {
        const limitDate = new Date(inc.limitDate);
        
        // Si hay filtro de búsqueda, mostrar todos los items activos
        // Si no hay filtro, solo los que están en el rango de fechas
        const shouldInclude = hasSearchFilter || 
          (limitDate >= thirtyDaysAgo && limitDate <= sixMonthsFromNow);
        
        if (shouldInclude) {
          let type = 'Incidencia';
          if (inc.item === 'RFI') type = 'RFI';
          else if (inc.item === 'task') type = 'Tarea';
          
          items.push({
            project: project.title,
            type: type,
            date: limitDate,
            description: inc.description,
            owner: inc.owner
          });
        }
      }
    });
    
    return items;
  }).sort((a, b) => a.date.getTime() - b.date.getTime());

  // Calcular cuántos de cada tipo están próximos a vencer
  const upcomingIncidents = upcomingItems.filter(i => i.type === 'Incidencia').length;
  const upcomingRFI = upcomingItems.filter(i => i.type === 'RFI').length;
  const upcomingTasks = upcomingItems.filter(i => i.type === 'Tarea').length;

  // Tomar solo los primeros 3 para mostrar en la tabla
  const displayedItems = upcomingItems.slice(0, 3);

  // Para eventos, tomar items diferentes (por ejemplo, los siguientes 3)
  const eventItems = upcomingItems.slice(3, 6);

  // Función para calcular el progreso circular
  const getCircleProgress = (value: number, total: number) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const percentage = total > 0 ? (value / total) * 100 : 0;
    const offset = circumference - (percentage / 100) * circumference;
    return { circumference, offset, percentage: Math.round(percentage) };
  };

  const incidentsProgress = getCircleProgress(upcomingIncidents, totalIncidents);
  const rfiProgress = getCircleProgress(upcomingRFI, totalRFI);
  const tasksProgress = getCircleProgress(upcomingTasks, totalTasks);

  // Función para formatear fecha
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Función para obtener las iniciales del owner
  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <MdBarChart className={styles.headerIcon} />
          <h2 className={styles.title}>Resumen</h2>
        </div>
        <button 
          className={styles.closeBtn}
          onClick={toggleSidebar}
          aria-label="Cerrar resumen"
        >
          <MdChevronRight />
        </button>
      </div>

      <div className={styles.tabsRow}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.tabActive}`}>General</button>
          <button className={styles.tab}>Mis actualizaciones</button>
        </div>
        <div className={styles.filters}>
          <TbAdjustmentsHorizontal className={styles.filterIcon} />
          <span className={styles.filterText}>Filtros</span>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLeft}>
            <MdAccessTime className={styles.sectionIcon} />
            <h3 className={styles.sectionTitle}>Próximos a vencer</h3>
          </div>
          <a href="#" className={styles.link}>Ver todos</a>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h4 className={styles.statLabel}>Incidencias</h4>
            <span className={styles.statNumber}>{totalIncidents}</span>
            <span className={styles.statSublabel}>Total Abiertas</span>
            <div className={styles.circleWrapper}>
              <svg className={styles.progressCircle} width="90" height="90" viewBox="0 0 90 90">
                <circle
                  cx="45"
                  cy="45"
                  r="35"
                  fill="none"
                  stroke="#fee2e2"
                  strokeWidth="8"
                />
                <circle
                  cx="45"
                  cy="45"
                  r="35"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="8"
                  strokeDasharray={incidentsProgress.circumference}
                  strokeDashoffset={incidentsProgress.offset}
                  strokeLinecap="round"
                  transform="rotate(-90 45 45)"
                />
              </svg>
              <div className={styles.circleValue}>{upcomingIncidents}</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <h4 className={styles.statLabel}>RFI</h4>
            <span className={styles.statNumber}>{totalRFI}</span>
            <span className={styles.statSublabel}>Total Abiertas</span>
            <div className={styles.circleWrapper}>
              <svg className={styles.progressCircle} width="90" height="90" viewBox="0 0 90 90">
                <circle
                  cx="45"
                  cy="45"
                  r="35"
                  fill="none"
                  stroke="#fed7aa"
                  strokeWidth="8"
                />
                <circle
                  cx="45"
                  cy="45"
                  r="35"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="8"
                  strokeDasharray={rfiProgress.circumference}
                  strokeDashoffset={rfiProgress.offset}
                  strokeLinecap="round"
                  transform="rotate(-90 45 45)"
                />
              </svg>
              <div className={styles.circleValue}>{upcomingRFI}</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <h4 className={styles.statLabel}>Tareas</h4>
            <span className={styles.statNumber}>{totalTasks}</span>
            <span className={styles.statSublabel}>Total Abiertas</span>
            <div className={styles.circleWrapper}>
              <svg className={styles.progressCircle} width="90" height="90" viewBox="0 0 90 90">
                <circle
                  cx="45"
                  cy="45"
                  r="35"
                  fill="none"
                  stroke="#fed7aa"
                  strokeWidth="8"
                />
                <circle
                  cx="45"
                  cy="45"
                  r="35"
                  fill="none"
                  stroke="#fb923c"
                  strokeWidth="8"
                  strokeDasharray={tasksProgress.circumference}
                  strokeDashoffset={tasksProgress.offset}
                  strokeLinecap="round"
                  transform="rotate(-90 45 45)"
                />
              </svg>
              <div className={styles.circleValue}>{upcomingTasks}</div>
            </div>
          </div>
        </div>

        <div className={styles.projectsList}>
          <div className={styles.projectsHeader}>
            <span className={styles.headerCol}>PROYECTO</span>
            <span className={styles.headerCol}>ÍTEM</span>
            <span className={styles.headerCol}>FECHA LÍMITE</span>
          </div>
          {displayedItems.length > 0 ? (
            displayedItems.map((item, index) => (
              <div key={index} className={styles.projectRow}>
                <div className={styles.projectCol}>
                  <div className={styles.projectTitle}>{item.project}</div>
                  <div className={styles.projectSubtitle}>{item.description}</div>
                </div>
                <div className={styles.itemCol}>
                  <span className={styles.itemBadge}>{item.type}</span>
                </div>
                <div className={styles.dateCol}>
                  {formatDate(item.date)}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyNumber}>0</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLeft}>
            <MdCalendarToday className={styles.sectionIcon} />
            <h3 className={styles.sectionTitle}>Próximos eventos</h3>
          </div>
          <a href="#" className={styles.link}>Ver todos</a>
        </div>
        <div className={styles.eventsList}>
          <div className={styles.eventsHeader}>
            <span className={styles.headerCol}>PROYECTO</span>
            <span className={styles.headerCol}>EQUIPO</span>
            <span className={styles.headerCol}>FECHA LÍMITE</span>
          </div>
          {eventItems.length > 0 ? (
            eventItems.map((item, index) => (
              <div key={index} className={styles.eventRow}>
                <div className={styles.eventCol}>
                  <div className={styles.eventTitle}>{item.project}</div>
                  <div className={styles.eventSubtitle}>{item.description}</div>
                </div>
                <div className={styles.teamCol}>
                  <div className={styles.avatar}>{getInitials(item.owner)}</div>
                </div>
                <div className={styles.dateCol}>
                  {formatDate(item.date)}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyNumber}>0</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}