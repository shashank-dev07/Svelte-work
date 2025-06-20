<script lang="ts">
    // For a real app, replace these stubs with your own routing/actions
    function onAdd(type: 'portal' | 'dashboard' | 'statement') {
        alert(`Add ${type} clicked`);
    }

    // Modal state
    let isModalOpen = false;

    function toggleModal() {
        isModalOpen = !isModalOpen;
    }
    
    // Handle keyboard shortcuts
    function handleKeydown(event: KeyboardEvent) {
        // Check for Ctrl+K
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault(); // Prevent default browser behavior
            toggleModal();
        }
        
        // Close modal with Escape key
        if (event.key === 'Escape' && isModalOpen) {
            toggleModal();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- ---------- Layout shell ---------- -->
<div class="flex min-h-screen bg-white text-slate-800">

	<!-- ◽ Sidebar (rail) -->
	<aside class="w-14 bg-white border-r border-slate-200 flex flex-col items-center py-4 space-y-6">
		<!-- Logo -->
		<div class="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full">
			<!-- Put your SVG / logo mark here -->
			<span class="text-white font-bold text-sm">O</span>
		</div>

		<!-- Nav icons (use any icon set; here simple placeholders) -->
		{#each ['💬','📂','📊','🧾','⚙️','🔣','👤'] as icon, i}
			<button class="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-100 transition-colors"
			        aria-label={"nav-" + i}>
				<span class="text-xl leading-none">{icon}</span>
			</button>
		{/each}
<!-- 24 × 24 outline archive box -->
<!-- 24 × 24 outline archive box – 4 inner layers -->
<!-- Pretty card-stack icon 24 × 24 -->
<button class="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-100 transition-colors card-stack-button" aria-label="stacked-cards">
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="card-stack">
	  <!-- Back card (appears behind) -->
	  <rect x="8" y="4" width="12" height="10" rx="2" transform="rotate(6 14 9)" class="card back-card"/>
	  <!-- Middle card -->
	  <rect x="6" y="7" width="12" height="10" rx="2" transform="rotate(6 12 12)" class="card middle-card"/>
	  <!-- Front card (appears on top) -->
	</svg>
  </button>
		<!-- Bottom “Apps grid” button -->
		<div class="mt-auto mb-2">
			<button 
				class="w-10 h-10 rounded-full bg-indigo-900 text-white flex items-center justify-center hover:bg-indigo-800 transition-colors" 
				on:click={toggleModal}
				aria-label="Open apps menu"
			>
				<!-- apps / grid icon -->
				<span class="text-xs">▦</span>
			</button>
		</div>
		
		<!-- Modal overlay - Mac-inspired spotlight search -->
		{#if isModalOpen}
			<div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center transition-all" 
				 on:click={toggleModal}
				 class:modal-open={isModalOpen}>
				<!-- Modal content with Mac-inspired design -->
				<div 
					class="w-[500px] max-w-[90vw] bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 opacity-100 translate-y-0 modal-content"
					on:click|stopPropagation
					role="dialog"
					aria-modal="true"
				>
					<!-- Search header -->
					<div class="p-4 border-b border-slate-200/50">
						<div class="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-100/80">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
							<input 
								type="text" 
								placeholder="Search apps or type a command..." 
								class="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
								autofocus
							/>
							<kbd class="hidden sm:flex items-center justify-center px-2 py-1 text-xs font-sans font-semibold text-slate-500 bg-slate-200/70 rounded">Esc</kbd>
						</div>
					</div>
					
					<!-- Quick actions -->
					<div class="px-3 py-2 border-b border-slate-200/50">
						<p class="px-2 pb-1 text-xs font-medium text-slate-500 uppercase tracking-wider">Quick Actions</p>
						<div class="grid grid-cols-2 gap-1">
							{#each ['New File', 'New Project', 'Settings', 'Help'] as action}
								<button class="flex items-center gap-2 p-2 rounded-md hover:bg-slate-200/50 text-left transition-colors text-slate-700">
									<div class="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center text-indigo-600">
										{action.charAt(0)}
									</div>
									<span class="text-sm">{action}</span>
								</button>
							{/each}
						</div>
					</div>
					
					<!-- Apps grid -->
					<div class="p-4">
						<p class="px-2 pb-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Applications</p>
						<div class="grid grid-cols-4 gap-3">
							{#each ['Analytics', 'Messages', 'Tasks', 'Calendar', 'Files', 'Notes', 'Settings', 'Contacts'] as app}
								<button class="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-slate-200/50 transition-colors group">
									<div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-2 shadow-sm group-hover:shadow-md transition-all transform group-hover:scale-105">
										{app.charAt(0)}
									</div>
									<span class="text-xs text-slate-600">{app}</span>
								</button>
							{/each}
						</div>
					</div>
					
					<!-- Subtle footer -->
					<div class="p-3 bg-slate-50/50 backdrop-blur-sm border-t border-slate-200/50 text-center">
						<p class="text-xs text-slate-500">
							Press <kbd class="px-1.5 py-0.5 text-xs font-sans rounded bg-white border border-slate-300 shadow-sm">↑</kbd><kbd class="px-1.5 py-0.5 text-xs font-sans rounded bg-white border border-slate-300 shadow-sm">↓</kbd> to navigate • <kbd class="px-1.5 py-0.5 text-xs font-sans rounded bg-white border border-slate-300 shadow-sm">Enter</kbd> to select
						</p>
					</div>
				</div>
			</div>
		{/if}
	</aside>

	<!-- ◽ Main content -->
	<main class="flex-1 flex flex-col">

		<!-- Top bar -->
		<header class="border-b border-slate-200 px-6 py-3 flex items-center gap-4">
			<!-- Tabs -->
			<button class="px-4 py-1.5 text-sm rounded-lg border border-indigo-200 text-indigo-600 bg-indigo-50">
				Favorites
			</button>

			<!-- Search -->
			<input
				type="text"
				placeholder="Search"
				class="flex-1 px-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
			/>

			<!-- Right-side actions -->
			<div class="flex items-center gap-2">
				{#each ['Portal','Dashboard','Statement'] as label}
					<button
						on:click={() => onAdd(label.toLowerCase() as any)}
						class="px-4 py-1.5 text-sm rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
					>
						+ {label}
					</button>
				{/each}
			</div>
		</header>

		<!-- Empty-state canvas -->
		<div class="flex-1 flex flex-col items-center justify-center gap-6">
			<div class="text-center space-y-1">
				<p class="text-xl font-medium text-slate-500">No Favorite</p>
				<p class="text-sm text-slate-400">Click add to add favorites.</p>
			</div>

			<div class="flex gap-4">
				{#each ['Portal','Dashboard','Statement'] as label}
					<button
						on:click={() => onAdd(label.toLowerCase() as any)}
						class="px-6 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition-colors"
					>
						Add {label.toLowerCase()}
					</button>
				{/each}
			</div>
		</div>

	</main>
</div>



<style>
	.card-stack-button:hover .card-stack {
	  pointer-events: none;
	}
	
	.card {
	  transition: transform 0.1s ease-in-out;
	}
	
	.card-stack-button:hover .back-card {
	  animation: back-to-front 0.5s ease-in-out forwards;
	}
	
	.card-stack-button:hover .middle-card {
	  animation: middle-to-back 0.5s ease-in-out forwards;
	}
	
	.card-stack-button:hover .front-card {
	  animation: front-to-middle 0.5s ease-in-out forwards;
	}
	
	@keyframes back-to-front {
  0% { transform: translate(0, 0) rotate(6deg); }
  25% { transform: translate(0, -10px) rotate(6deg) scale(1.05); } /* Rise up */
  60% { transform: translate(-2px, -4px) rotate(6deg) scale(1.05); } /* Move across */
  100% { transform: translate(-4px, 3px) rotate(6deg); } /* Fall down to front with smaller gap */
}

@keyframes middle-to-back {
  0% { transform: translate(0, 0) rotate(6deg); }
  40% { transform: translate(1px, -1px) rotate(6deg); } /* Slight shift */
  100% { transform: translate(2px, -2px) rotate(6deg); } /* Reduced gap */
}

@keyframes front-to-middle {
  0% { transform: translate(0, 0) rotate(6deg); }
  /* Wait slightly before moving */
  30% { transform: translate(0, 0) rotate(6deg); }
  100% { transform: translate(1px, -2px) rotate(6deg); } /* Reduced gap */
}

/* Add these to your existing styles */
@keyframes modal-in {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.modal-content {
  animation: modal-in 0.3s ease-out forwards;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Simple fade-in for app buttons */
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.grid button {
  animation: fade-in 0.2s ease-out forwards;
  animation-delay: 0.1s;
  opacity: 0;
}
  </style>