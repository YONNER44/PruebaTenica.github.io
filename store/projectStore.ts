import { create } from 'zustand';

export interface Project {
  _id: string;
  title: string;
  projectPlan: {
    _id: string;
  };
  status: string;
  img: string;
  lastVisit: string;
  position: {
    _id: string;
    lat: number;
    lng: number;
  };
  users: Array<{
    name: string;
    lastName: string;
  }>;
  clientData: {
    title: string;
    _id: string;
  };
  city: string;
  lastUpdated: string;
  partnerClients: unknown[];
  companyId: string;
  address: string;
  projectClientAdmin: string[];
  projectPlanData: {
    plan: string;
  };
  createdAt: string;
  incidents: Array<{
    _id: string;
    status: string;
    item: string;
    description: string;
    owner: string;
    tag: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    limitDate: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

interface ProjectStore {
  projects: Project[];
  filteredProjects: Project[];
  searchTerm: string;
  selectedProject: Project | null;
  currentPage: number;
  itemsPerPage: number;
  showMap: boolean;
  showSidebar: boolean;
  
  setProjects: (projects: Project[]) => void;
  setSearchTerm: (term: string) => void;
  setSelectedProject: (project: Project | null) => void;
  setCurrentPage: (page: number) => void;
  toggleMap: () => void;
  sortByName: () => void;
  sortByIncidencias: () => void;
  sortByRFI: () => void;
  sortByTareas: () => void;
  resetFilters: () => void;
  toggleSidebar: () => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  filteredProjects: [],
  searchTerm: '',
  selectedProject: null,
  currentPage: 1,
  itemsPerPage: 10,
  showMap: false,
  showSidebar: false,

  toggleSidebar: () => {
  set((state) => ({ showSidebar: !state.showSidebar }));
},
  
  setProjects: (projects) => {
    set({ projects, filteredProjects: projects });
  },
  
  setSearchTerm: (term) => {
    const { projects } = get();
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(term.toLowerCase())
    );
    set({ searchTerm: term, filteredProjects: filtered, currentPage: 1 });
  },
  
  setSelectedProject: (project) => {
    set({ selectedProject: project });
  },
  
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },
  
  toggleMap: () => {
    set((state) => ({ showMap: !state.showMap }));
  },
  
  sortByName: () => {
    const { filteredProjects } = get();
    const sorted = [...filteredProjects].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    set({ filteredProjects: sorted, currentPage: 1 });
  },
  
  sortByIncidencias: () => {
    const { filteredProjects } = get();
    const sorted = [...filteredProjects].sort((a, b) => {
      const aCount = a.incidents?.filter(inc => inc.item === 'incidents' && inc.status === 'active').length || 0;
      const bCount = b.incidents?.filter(inc => inc.item === 'incidents' && inc.status === 'active').length || 0;
      return bCount - aCount;
    });
    set({ filteredProjects: sorted, currentPage: 1 });
  },
  
  sortByRFI: () => {
    const { filteredProjects } = get();
    const sorted = [...filteredProjects].sort((a, b) => {
      const aCount = a.incidents?.filter(inc => inc.item === 'RFI' && inc.status === 'active').length || 0;
      const bCount = b.incidents?.filter(inc => inc.item === 'RFI' && inc.status === 'active').length || 0;
      return bCount - aCount;
    });
    set({ filteredProjects: sorted, currentPage: 1 });
  },
  
  sortByTareas: () => {
    const { filteredProjects } = get();
    const sorted = [...filteredProjects].sort((a, b) => {
      const aCount = a.incidents?.filter(inc => inc.item === 'task' && inc.status === 'active').length || 0;
      const bCount = b.incidents?.filter(inc => inc.item === 'task' && inc.status === 'active').length || 0;
      return bCount - aCount;
    });
    set({ filteredProjects: sorted, currentPage: 1 });
  },
  
  resetFilters: () => {
    const { projects } = get();
    set({ filteredProjects: projects, searchTerm: '', currentPage: 1 });
  },
}));