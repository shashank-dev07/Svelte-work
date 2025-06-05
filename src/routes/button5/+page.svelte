<script>
    let isRotating = false;
    let status = "Click Me";
    let isCompleted = false;
  
    function startGlow() {
      if (isRotating) return;
      isRotating = true;
      isCompleted = false;
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
    .btn span {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .checkmark {
      display: inline-block;
      width: 30px;
      height: 30px;
      color: #4dabff;
      animation: scaleIn 0.3s ease forwards;
    }
    
    @keyframes scaleIn {
      0% { transform: scale(0); }
      70% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    /* Add hover effect for the shadow */
    .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
                  0 3px 6px rgba(0, 0, 0, 0.08),
                  0 0 0 1px rgba(0, 0, 0, 0.02);
    }
    
    /* Add pressed effect */
    .btn:active {
      transform: translateY(1px);
      box-shadow: 0 3px 5px rgba(50, 50, 93, 0.1),
                  0 1px 2px rgba(0, 0, 0, 0.08),
                  0 0 0 1px rgba(0, 0, 0, 0.02);
                  animation: rotate 1.5s linear infinite;

    }

    .inner-ring {
      position: absolute;
      inset: 0px;
      border-radius: inherit;
      background: conic-gradient(
  from var(--angle),
  transparent 0deg,
  transparent 280deg,
  rgba(100, 180, 255, 0.2) 295deg,
  #4dabff 320deg,
  rgb(220, 230, 255) 340deg,
  rgba(100, 180, 255, 0.2) 360deg
);
      padding: 4px;
      mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
              mask-composite: exclude;
      z-index: 0;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  
    .rotating {
      opacity: 1;
      animation: spin 1.5s linear infinite;
    }
  
    @keyframes spin {
      0%   { --angle: 0deg; }
      100% { --angle: 360deg; }
    }
  
    .btn span {
      position: relative;
      z-index: 1;
    }

    @keyframes rotate{
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
  </style>
  <button class="btn" on:click={startGlow}>
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