'use client';
import { useProjectStore } from '@/store/projectStore';
import styles from './SearchBar.module.css';
import { MdSearch } from 'react-icons/md';

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useProjectStore();

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Buscar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <span className={styles.searchIcon}><MdSearch /></span>
    </div>
  );
}