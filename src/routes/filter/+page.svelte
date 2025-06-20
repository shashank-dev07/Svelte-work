<script>
  import Filter from './filter.svelte';
  import { createFilter } from '$lib/utils/filter.js';
  
  // Sample data to display
  let items = [];
  let filteredItems = [];
  let totalFilteredCount = 0;
  
  // Define custom filter options
  const filterOptions = {
    tags: [
      { id: 1, name: 'Reports' },
      { id: 2, name: 'Analytics' },
      { id: 3, name: 'Finance' },
      { id: 4, name: 'Marketing' },
      { id: 5, name: 'Sales' },
      { id: 6, name: 'Projects' }
    ],
    // You can customize any default options here
    limitOptions: [5, 10, 20, 50, 100],
    initialState: {
      limit: 20,
      sortBy: 'newest',
      category: 'all',
      dateRange: {
        start: '',
        end: new Date().toISOString().split('T')[0]
      },
      selectedTags: []
    }
  };
  
  // Generate sample data
  function generateSampleData() {
    const categories = ['documents', 'images', 'videos', 'audio'];
    const items = [];
    
    // Generate items from Jan 2025 to June 2025
    for (let i = 0; i < 100; i++) {
      const randomDate = new Date(2025, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      // Assign 1-3 random tags to each item
      const itemTags = [];
      const numTags = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numTags; j++) {
        const randomTag = filterOptions.tags[Math.floor(Math.random() * filterOptions.tags.length)];
        if (!itemTags.some(tag => tag.id === randomTag.id)) {
          itemTags.push(randomTag);
        }
      }
      
      items.push({
        id: i + 1,
        title: `Item ${i + 1}`,
        date: randomDate,
        category: randomCategory,
        tags: itemTags
      });
    }
    
    return items;
  }
  
  // Initialize items on component mount
  $: {
    if (items.length === 0) {
      items = generateSampleData();
    }
  }
  
  // Handle filter changes
  function handleFilterChange(event) {
    // Get filter results from the event
    const { results } = event.detail;
    filteredItems = results.filteredItems;
    totalFilteredCount = results.totalFilteredCount;
  }

  // Direct filter usage example
  function directFilterExample() {
    // Example of using the filter function directly
    const myFilter = createFilter({
      initialState: {
        limit: 5,
        category: 'images'
      }
    });
    
    // Get the current filter state
    const state = myFilter.getState();
    console.log('Direct filter state:', state);
    
    // Filter some items
    const results = myFilter.applyFilters(items);
    console.log('Direct filter results:', results);
    
    // Update a filter and get new results
    myFilter.updateFilter('limit', 10);
    const newResults = myFilter.applyFilters(items);
    console.log('Updated filter results:', newResults);
    
    alert('Check console for direct filter usage example');
  }
</script>

<div class="p-6 max-w-6xl mx-auto">
  <div class="mb-6">
    <h1 class="text-2xl font-bold text-slate-800 mb-2">Reusable Filter Component Demo</h1>
    <p class="text-slate-600">Using our new reusable filter function across the application.</p>
    
    <div class="mt-4">
      <button 
        on:click={directFilterExample}
        class="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Show Direct Usage Example
      </button>
    </div>
  </div>
  
  <!-- Filter component with options and items -->
  <Filter 
    filterOptions={filterOptions} 
    items={items} 
    on:filter={handleFilterChange} 
  />
  
  <!-- Results display -->
  <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
    <div class="p-4 border-b border-slate-200 flex justify-between items-center">
      <h3 class="font-medium text-slate-800">Results</h3>
      <span class="text-sm text-slate-500">Showing {filteredItems.length} of {totalFilteredCount} filtered items (from {items.length} total)</span>
    </div>
    
    {#if filteredItems.length > 0}
      <div class="divide-y divide-slate-200">
        {#each filteredItems as item}
          <div class="p-4 hover:bg-slate-50 transition-colors">
            <div class="flex justify-between">
              <h4 class="font-medium text-slate-800">{item.title}</h4>
              <span class="text-sm text-slate-500">{new Date(item.date).toLocaleDateString()}</span>
            </div>
            <div class="mt-1 flex items-center gap-2">
              <span class="px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded-md">{item.category}</span>
              {#each item.tags as tag}
                <span class="px-2 py-0.5 text-xs bg-indigo-50 text-indigo-700 rounded-md">{tag.name}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p class="text-slate-500">No items match your current filters.</p>
      </div>
    {/if}
  </div>
  
  <!-- Usage Example Section -->
  <div class="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
    <h2 class="text-lg font-medium text-slate-800 mb-2">How to Use the Filter in Any Component</h2>
    <div class="bg-slate-800 text-slate-200 p-4 rounded-md overflow-auto">
      <pre class="text-sm">{`
// 1. Import the filter function
import { createFilter } from '$lib/utils/filter.js';

// 2. Create a filter instance with your options
const myFilter = createFilter({
  // Custom options here
  tags: [{ id: 1, name: 'Example' }],
  limitOptions: [5, 10, 20]
});

// 3. Use the filter methods
// Get current state
const state = myFilter.getState();

// Apply filters to an array of items
const results = myFilter.applyFilters(myItems);
console.log(results.filteredItems);

// Update a filter value
myFilter.updateFilter('limit', 10);

// Toggle a tag
myFilter.toggleTag({ id: 1, name: 'Example' });

// Set a date range
myFilter.setDateRange('2025-01-01', '2025-06-30');

// Reset all filters
myFilter.resetFilters();
      `}</pre>
    </div>
  </div>
</div>