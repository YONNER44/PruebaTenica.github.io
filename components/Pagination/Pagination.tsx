'use client';
import { useProjectStore } from '@/store/projectStore';
import styles from './Pagination.module.css';

export default function Pagination() {
  const { filteredProjects, currentPage, itemsPerPage, setCurrentPage } = useProjectStore();

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.btn}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <div className={styles.pages}>
        {getPageNumbers().map((page, idx) => (
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className={styles.ellipsis}>...</span>
          ) : (
            <button
              key={page}
              className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
              onClick={() => setCurrentPage(page as number)}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button
        className={styles.btn}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}