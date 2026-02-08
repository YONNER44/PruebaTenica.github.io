'use client';
import { useProjectStore } from '@/store/projectStore';
import styles from './ProjectList.module.css';

export default function ProjectList() {
  const { filteredProjects, currentPage, itemsPerPage, setSelectedProject } = useProjectStore();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const getPlanBadgeClass = (plan: string) => {
    switch (plan) {
      case 'big':
        return styles.planBig;
      case 'small':
        return styles.planSmall;
      default:
        return styles.planMedium;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return styles.statusActive;
      case 'inactive':
        return styles.statusInactive;
      case 'suspended':
        return styles.statusSuspended;
      default:
        return styles.statusPending;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      active: 'Activo',
      inactive: 'Inactivo',
      suspended: 'Suspendido',
      pending_payment: 'Pendiente'
    };
    return statusMap[status] || status;
  };

  const getPlanText = (plan: string) => {
    const planMap: { [key: string]: string } = {
      big: 'Grande',
      small: 'Pequeño',
      medium: 'Mediano'
    };
    return planMap[plan] || plan;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Plan</th>
            <th>Estado</th>
            <th>Equipo</th>
            <th>Items por vencer</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.length === 0 ? (
            <tr>
              <td colSpan={5} className={styles.noResults}>
                <div className={styles.noResultsContent}>
                  <svg className={styles.noResultsIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className={styles.noResultsTitle}>No se encontraron proyectos</h3>
                  <p className={styles.noResultsText}>
                    No hay proyectos que coincidan con tu búsqueda. Intenta ajustar los filtros.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            currentProjects.map((project) => (
            <tr 
              key={project._id} 
              onClick={() => setSelectedProject(project)}
              className={styles.row}
            >
              <td>
                <div className={styles.projectName}>{project.title}</div>
                <div className={styles.projectDates}>
                  {new Date(project.createdAt).toLocaleDateString('es-ES')}
                </div>
              </td>
              <td>
                <span className={`${styles.badge} ${getPlanBadgeClass(project.projectPlanData?.plan)}`}>
                  {getPlanText(project.projectPlanData?.plan)}
                </span>
              </td>
              <td>
                <span className={`${styles.badge} ${getStatusBadgeClass(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
              </td>
              <td>
                <div className={styles.team}>
                  {project.users.slice(0, 5).map((user, idx) => (
                    <span key={idx} className={styles.avatar} title={`${user.name} ${user.lastName}`}>
                      {user.name.charAt(0)}{user.lastName.charAt(0)}
                    </span>
                  ))}
                  {project.users.length > 5 && (
                    <span className={styles.avatarMore}>+{project.users.length - 5}</span>
                  )}
                </div>
              </td>
              <td>
                <div className={styles.items}>
                  <div className={styles.itemCount}>
                    <span className={styles.itemNumber}>
                      {project.incidents?.filter((inc) => inc.item === 'incidents' && inc.status === 'active').length || 0}
                    </span>
                    <span className={styles.itemLabel}>Incidencias</span>
                  </div>
                  <div className={styles.itemCount}>
                    <span className={styles.itemNumber}>
                      {project.incidents?.filter((inc) => inc.item === 'RFI' && inc.status === 'active').length || 0}
                    </span>
                    <span className={styles.itemLabel}>RFI</span>
                  </div>
                  <div className={styles.itemCount}>
                    <span className={styles.itemNumber}>
                      {project.incidents?.filter((inc) => inc.item === 'task' && inc.status === 'active').length || 0}
                    </span>
                    <span className={styles.itemLabel}>Tareas</span>
                  </div>
                </div>
              </td>
            </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}