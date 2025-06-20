<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { createFilter } from '$lib/utils/filter.js';
  
  // Component props
  export let filterOptions = {};
  export let items = [];
  export let onFilterChange = null;
  
  // Initialize dispatch for emitting filter change events
  const dispatch = createEventDispatcher();
  
  // Create filter instance with options
  const filter = createFilter(filterOptions);
  
  // UI state
  let showDatePicker = false;
  let showTagsDropdown = false;
  let showCustomLimitInput = false;
  let filterState = filter.getState();
  let filteredResults = { filteredItems: [], totalFilteredCount: 0 };
  

  
  // Initialize filtered results
  onMount(() => {
    applyFilters();
  });
  
  // Apply filters and update results
  function applyFilters() {
    filterState = filter.getState();
    filteredResults = filter.applyFilters(items);
    
    // Notify parent component via props or events
    if (typeof onFilterChange === 'function') {
      onFilterChange(filteredResults);
    }
    
    dispatch('filter', {
      state: filterState,
      results: filteredResults
    });
  }
  
  // Filter action handlers
  function handleLimitChange(e) {
    filter.updateFilter('limit', parseInt(e.target.value));
    filter.updateFilter('useCustomLimit', false);
    applyFilters();
  }
  
  function handleCustomLimitChange(e) {
    const value = e.target.value.trim();
    const limit = parseInt(value) || 2000;
    filter.setCustomLimit(limit, true);
    applyFilters();
  }
  
  function handleCustomLimitKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value.trim();
      const limit = parseInt(value) || 2000;
      filter.setCustomLimit(limit, true);
      showCustomLimitInput = false;
      applyFilters();
    } else if (e.key === 'Escape') {
      showCustomLimitInput = false;
    }
  }
  
  function handleSortChange(e) {
    filter.updateFilter('sortBy', e.target.value);
    applyFilters();
  }
  
  function handleCategoryChange(e) {
    filter.updateFilter('category', e.target.value);
    applyFilters();
  }
  
  function handleTagToggle(tag) {
    filter.toggleTag(tag);
    applyFilters();
  }
  
  function applyDateRange() {
    showDatePicker = false;
    applyFilters();
  }
  
  function clearDateRange() {
    filter.setDateRange('', new Date().toISOString().split('T')[0]);
    showDatePicker = false;
    applyFilters();
  }
  
  function handleReset() {
    filter.resetFilters();
    applyFilters();
  }
  
  // Close dropdowns when clicking outside
  function handleClickOutside(event) {
    if (showDatePicker && !event.target.closest('.date-dropdown')) {
      showDatePicker = false;
    }
    if (showTagsDropdown && !event.target.closest('.tags-dropdown')) {
      showTagsDropdown = false;
    }
    if (showCustomLimitInput && !event.target.closest('.custom-limit-input') && !event.target.closest('.custom-limit-btn')) {
      showCustomLimitInput = false;
    }
  }
</script>


<svelte:window on:click={handleClickOutside} />

<div class="filter-bar flex flex-wrap items-center gap-2 p-2 bg-white rounded-lg shadow-sm border border-slate-200">
  <!-- Limit controls -->
  <div class="filter-item relative shadow-sm custom-limit-dropdown">
    <button 
      on:click={() => showCustomLimitInput = !showCustomLimitInput}
      class="custom-limit-btn px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300 flex items-center gap-2"
      aria-expanded={showCustomLimitInput}
    >
      <span class="text-slate-700">
        Limit: {filterState.useCustomLimit ? filterState.customLimit : filterState.limit}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500 transition-transform" class:rotate-180={showCustomLimitInput} viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
  
  <!-- Sort dropdown -->

<div class="filter-item  shadow-sm" >
    <div class="relative">
      <select 
        bind:value={filterState.sortBy} 
        on:change={handleSortChange}
        class="px-3 pr-8 py-1.5 text-sm border  border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300 appearance-none w-full "
      >
        <option value="" disabled>Sort by</option>
        {#each filter.config.sortOptions as option}
          <option value={option.id}>{option.name}</option>
        {/each}
      </select>
     
    </div>
  </div>
    <!-- Category dropdown -->
  <div class="filter-item  shadow-sm" >
    <select 
      bind:value={filterState.category} 
      on:change={handleCategoryChange}
      class="px-3 pr-8 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300"
    >
      <option value="" disabled>Category</option>
      {#each filter.config.categories as category}
        <option value={category.id}>{category.name}</option>
      {/each}
    </select>
  </div>
  
  <!-- Date range dropdown -->
  <div class="filter-item relative date-dropdown  shadow-sm">
    <button 
      on:click={() => showDatePicker = !showDatePicker}
      class="px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300 flex items-center gap-1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {filterState.dateRange.start ? `${new Date(filterState.dateRange.start).toLocaleDateString()} - ${new Date(filterState.dateRange.end).toLocaleDateString()}` : "Date Range"}
    </button>
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    {#if showDatePicker}
      <div class="absolute left-0 top-full mt-1 p-3 bg-white rounded-md shadow-lg border border-slate-200 z-10 w-64">
        <div class="grid gap-2">
          <div>
            <label for="date-start" class="block text-xs text-slate-500 mb-1">Start date</label>
            <input 
              type="date" 
              id="date-start" 
              bind:value={filterState.dateRange.start}
              class="w-full px-2 py-1 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-300"
            >
          </div>
          <div>
            <label for="date-end" class="block text-xs text-slate-500 mb-1">End date</label>
            <input 
              type="date" 
              id="date-end" 
              bind:value={filterState.dateRange.end}
              class="w-full px-2 py-1 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-300"
            >
          </div>
          <div class="flex justify-between mt-2">
            <button 
              on:click={clearDateRange}
              class="px-2 py-1 text-xs text-slate-600 hover:text-slate-800"
            >
              Clear
            </button>
            <button 
              on:click={applyDateRange}
              class="px-2 py-1 text-xs bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  <!-- Tags dropdown -->
  <div class="filter-item relative tags-dropdown">
    <button 
      on:click={() => showTagsDropdown = !showTagsDropdown}
      class="px-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-300 flex items-center gap-1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
      {filterState.selectedTags.length > 0 ? `${filterState.selectedTags.length} tags` : "Tags"}
      {#if filterState.selectedTags.length > 0}
        <span class="ml-1 w-4 h-4 bg-indigo-600 text-white rounded-full text-xs flex items-center justify-center">{filterState.selectedTags.length}</span>
      {/if}
    </button>
    
    {#if showTagsDropdown}
      <div class="absolute left-0 top-full mt-1 p-2 bg-white rounded-md shadow-lg border border-slate-200 z-10 w-56">
        <div class="max-h-48 overflow-y-auto">
          {#each filter.config.tags as tag}
            <label class="flex items-center gap-2 px-2 py-1 hover:bg-slate-50 rounded-md cursor-pointer">
              <input 
                type="checkbox" 
                checked={filterState.selectedTags.some(t => t.id === tag.id)}
                on:change={() => handleTagToggle(tag)}
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
              >
              <span class="text-sm text-slate-700">{tag.name}</span>
            </label>
          {/each}
        </div>
        {#if filter.config.tags.length === 0}
          <p class="text-xs text-slate-500 p-2">No tags available</p>
        {/if}
      </div>
    {/if}
  </div>
  
  <!-- Active filters and reset -->
  {#if filterState.selectedTags.length > 0 || filterState.category !== 'all' || filterState.dateRange.start || filterState.useCustomLimit}
    <div class="filter-item">
      <button 
        on:click={handleReset}
        class="px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        Reset
      </button>
    </div>
  {/if}
</div>

<style>
  .filter-bar {
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  /* Improve scrollbar in tag dropdown */
  :global(.tags-dropdown .max-h-48::-webkit-scrollbar) {
    width: 6px;
  }
  
  :global(.tags-dropdown .max-h-48::-webkit-scrollbar-track) {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  :global(.tags-dropdown .max-h-48::-webkit-scrollbar-thumb) {
    background: #d1d5db;
    border-radius: 10px;
  }
  
  :global(.tags-dropdown .max-h-48::-webkit-scrollbar-thumb:hover) {
    background: #9ca3af;
  }
  
  /* Input number arrows */
  :global(input[type=number]::-webkit-inner-spin-button),
  :global(input[type=number]::-webkit-outer-spin-button) {
    opacity: 1;

  }


  :global(select.appearance-none) {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-indent: 1px;
    text-overflow: '';
  }
  
  /* Hide the default arrow in IE */
  :global(select::-ms-expand) {
    display: none;
  }
</style>