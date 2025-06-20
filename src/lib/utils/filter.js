// Utility function to create and manage filters
export function createFilter(options = {}) {
  // Default configuration
  const config = {
    limitOptions: [10, 20, 50, 100],
    categories: [
      { id: 'all', name: 'All categories' },
      { id: 'documents', name: 'Documents' },
      { id: 'images', name: 'Images' },
      { id: 'videos', name: 'Videos' },
      { id: 'audio', name: 'Audio' }
    ],
    tags: [],
    initialState: {
      limit: 20,
      customLimit: 2000,
      useCustomLimit: false,
      sortBy: 'newest',
      category: 'all',
      dateRange: {
        start: '',
        end: new Date().toISOString().split('T')[0]
      },
      selectedTags: []
    },
    sortOptions: [
      { id: 'newest', name: 'Newest first' },
      { id: 'oldest', name: 'Oldest first' },
      { id: 'alphabetical', name: 'A-Z' },
      { id: 'alphabetical-desc', name: 'Z-A' }
    ],
    ...options
  };
  
  // Initialize state with defaults or provided initial state
  const state = {
    ...config.initialState
  };
  
  // Filter application function
  function applyFilters(items, currentFilters = state) {
    let result = [...items];
    
    // Filter by category
    if (currentFilters.category !== 'all') {
      result = result.filter(item => item.category === currentFilters.category);
    }
    
    // Filter by date range
    if (currentFilters.dateRange?.start) {
      const startDate = new Date(currentFilters.dateRange.start);
      const endDate = new Date(currentFilters.dateRange.end);
      
      result = result.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }
    
    // Filter by tags
    if (currentFilters.selectedTags?.length > 0) {
      result = result.filter(item => 
        item.tags?.some(tag => currentFilters.selectedTags.some(filterTag => 
          filterTag.id === tag.id))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (currentFilters.sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (currentFilters.sortBy === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (currentFilters.sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      } else if (currentFilters.sortBy === 'alphabetical-desc') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
    
    // Determine which limit to use
    const effectiveLimit = currentFilters.useCustomLimit ? 
      (currentFilters.customLimit || 2000) : 
      currentFilters.limit;
    
    // Apply limit
    return {
      filteredItems: result.slice(0, effectiveLimit),
      totalFilteredCount: result.length
    };
  }
  
  // Function to reset filters to initial state
  function resetFilters() {
    Object.assign(state, config.initialState);
    return { ...state };
  }
  
  // Function to update a single filter
  function updateFilter(filterName, value) {
    state[filterName] = value;
    return { ...state };
  }
  
  // Function to toggle a tag
  function toggleTag(tag) {
    const index = state.selectedTags.findIndex(t => t.id === tag.id);
    
    if (index === -1) {
      state.selectedTags = [...state.selectedTags, tag];
    } else {
      state.selectedTags = state.selectedTags.filter(t => t.id !== tag.id);
    }
    
    return { ...state };
  }
  
  // Set date range
  function setDateRange(start, end) {
    state.dateRange = {
      start,
      end: end || new Date().toISOString().split('T')[0]
    };
    
    return { ...state };
  }
  
  // Set custom limit
  function setCustomLimit(limit, useCustom = true) {
    state.customLimit = parseInt(limit) || 2000;
    state.useCustomLimit = useCustom;
    
    return { ...state };
  }
  
  // Get current state
  function getState() {
    return { ...state };
  }
  
  // Return public API
  return {
    config,
    applyFilters,
    resetFilters,
    updateFilter,
    toggleTag,
    setDateRange,
    setCustomLimit,
    getState
  };
}

export default createFilter;