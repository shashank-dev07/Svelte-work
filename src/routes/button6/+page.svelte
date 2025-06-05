<script>
    let isRotating = false;
    let status = "Click Me";
    let isCompleted = false;
    let isBackgroundAnimating = false;
  
    function startGlow() {
      if (isRotating) return;
      isRotating = true;
      isCompleted = false;
      isBackgroundAnimating = true;
      status = "Loading...";
      
      // Simulate different loading stages
      setTimeout(() => status = "Processing...", 1000);
      setTimeout(() => status = "Almost done...", 2500);
      setTimeout(() => {
        status = "Done!";
        isCompleted = true;
        
        // Reset button after completion
        setTimeout(() => {
          status = "Click Me";
          isRotating = false;
          isCompleted = false;
          isBackgroundAnimating = false;
        }, 1500);
      }, 3500);
    }
</script>
  
<style>
  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }
  
  @property --bgPos {
    syntax: "<percentage>";
    initial-value: 0%;
    inherits: false;
  }

  :global(body) {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn {
    position: relative;
    padding: 16px 36px;
    background: rgb(0, 0, 0);
    color: whitesmoke;
    font-size: 18px;
    border: none;
    border-radius: 22px;
    cursor: pointer;
    font-family: sans-serif;
    overflow: hidden;
    isolation: isolate;
    
    /* Add these shadow properties */
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 
                0 1px 3px rgba(0, 0, 0, 0.08),
                0 0 0 1px rgba(0, 0, 0, 0.02);
    transition: all 0.3s ease;
  }
  
  .btn-background {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      90deg, 
      #000000 0%, 
      #1a1a1a 20%, 
      #333333 40%, 
      #1a1a1a 60%,
      #000000 80%
    );
    background-size: 200% 100%;
    background-position: var(--bgPos) 0;
    z-index: -1;
    transition: background-position 0.3s ease;
  }
  
  .bg-animating {
    animation: moveBg 2s linear infinite;
  }
  
  @keyframes moveBg {
    0% { --bgPos: 0%; }
    100% { --bgPos: 100%; }
  }
  
  /* ... rest of your styles ... */
</style>

<button class="btn" on:click={startGlow}>
  <div class="btn-background" class:bg-animating={isBackgroundAnimating}></div>
  <div class="inner-ring" class:rotating={isRotating}></div>
  <span>
    {#if isCompleted}
      <svg class="checkmark" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    {/if}
    {status}
  </span>
</button>