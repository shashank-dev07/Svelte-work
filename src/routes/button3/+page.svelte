<script>
    let isRotating = false;
    let gradientX = 50;
    let gradientY = 50;
    let isAnimating = false;
    let animationTimer;
    let direction = 1;
  
    function toggleGlow() {
      isRotating = !isRotating;
    }
  
    function updateGradient(event) {
      const btn = event.currentTarget;
      const rect = btn.getBoundingClientRect();
    
      // Calculate position relative to the button (0-100%)
      gradientX = Math.round(((event.clientX - rect.left) / rect.width) * 100);
      gradientY = Math.round(((event.clientY - rect.top) / rect.height) * 100);
    }
  
    function clickGradient(event) {
      // Update gradient position on click too
      updateGradient(event);
      
      // Start fluid animation from click point
      startFluidAnimation();
    }
    
    function startFluidAnimation() {
      // Clear any existing animation
      clearInterval(animationTimer);
      isAnimating = true;
      let radius = 0;
      let angle = 0;
      direction = -direction; // Switch direction each time
      
      // Set up an interval to animate the gradient in a fluid-like motion
      animationTimer = setInterval(() => {
        // Create a "breathing" effect with the radius
        radius = (radius + 0.5) % 20;
        angle = (angle + 2 * direction) % 360;
        
        // Calculate new position with circular motion around the click point
        const radians = angle * Math.PI / 180;
        const offsetX = Math.cos(radians) * radius;
        const offsetY = Math.sin(radians) * radius;
        
        // Update gradient position within constraints
        const newX = Math.min(Math.max(gradientX + offsetX, 0), 100);
        const newY = Math.min(Math.max(gradientY + offsetY, 0), 100);
        
        gradientX = newX;
        gradientY = newY;
      }, 50);
    }
    
    function stopAnimation() {
      clearInterval(animationTimer);
      isAnimating = false;
    }
</script>

<style>
    @property --angle {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }
  
    :global(body) {
      background: white;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .btn {
      position: relative;
      padding: 20px 40px;
      background: rgb(53, 72, 255);/* Dark slate color */
      color: white;
      font-size: 18px;
      border: none;     
      border-radius: 22px;
      cursor: pointer;
      font-family: sans-serif;
      overflow: hidden;
      isolation: isolate;
      box-shadow: 
        0 10px 25px rgba(0, 0, 0, 0.5),
        0 4px 6px rgba(0, 200, 255, 0.1),
        0 2px 3px rgba(255, 255, 255, 0.1);
      transition: transform 0.2s, box-shadow 0.2s, background 0.3s;
      background-size: 100% 100%;
    }
    
    .btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 0 25px rgba(147, 197, 253, 0.6);
    }
  
    .inner-ring {
      position: absolute;
      inset: 2px;
      border-radius: inherit;
      background: conic-gradient(
        from var(--angle),
        transparent 0deg 290deg,
        rgba(0, 200, 255, 0.2) 295deg,
        #f5f5f5 310deg,
        rgba(0, 200, 255, 0.2) 325deg,
        transparent 330deg 360deg
      );
      padding: 2px;
      z-index: 0;
      opacity: 0;
      transition: opacity 0.3s ease;
      mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
              mask-composite: exclude;
    }
  
    .rotating {
      opacity: 1;
      animation: spin 2s linear infinite;
    }
  
    @keyframes spin {
      0%   { --angle: 0deg; }
      100% { --angle: 360deg; }
    }
  
    .btn span {
      position: relative;
      z-index: 1;
    }
  
    .card-behind {
      position: absolute;
      width: calc(100% + 20px);
      height: calc(100% + 20px);
      background: linear-gradient(145deg, #7c3aed, #a855f7);

      border-radius: inherit;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      opacity: 0.1;
      transition: all 0.3s ease;
    }
    
    .btn-container:hover .card-behind {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    
    .btn-container {
      position: relative;
      display: inline-block;
      border-radius: 22px;
    }

    .star-icon {
      width: 2.5em;
      height: 2.5em;
      vertical-align: middle;
      margin-right: 0.5em;
    }
    
    .star {
      fill: #cccccc;
      transform-origin: center;
    }
    
    .star.bottom {
      animation: continuous-pulse 3s ease-in-out infinite;
      animation-delay: 0.6s;
    }
    
    .star.top {
      animation: continuous-pulse 3s ease-in-out infinite;
      animation-delay: 0.3s;
    }
    
    .star.center {
      animation: continuous-pulse 3s ease-in-out infinite;
      animation-delay: 0s;
    }
    
    @keyframes continuous-pulse {
      0% { transform: scale(1); fill: #cccccc; }
      40% { transform: scale(1.2); fill: white; }
      60% { transform: scale(1.2); fill: white; }
      100% { transform: scale(1); fill: #cccccc; }
    }

    .btn-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .text {
      display: inline-block;
      vertical-align: middle;
    }

    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 1.5em;
      margin-right: 8px;
    }

    /* We'll add a gradient animation and JavaScript for cursor-based gradient */
.btn-gradient {
  position: absolute;
  inset: 0;  /* Cover the entire button instead of being a small ball */
  border-radius: inherit;
  opacity: 1;
  background: radial-gradient(circle at center, #4a177c 0%, rgb(53, 72, 255) 100%);
  background-size: 300% 300%;  /* Larger background size for movement effect */
  transition: opacity 0.1s ease;
  z-index: -1;
}

.btn:hover .btn-gradient {
  opacity: 1;
  animation: gradientMove 6s ease-in-out infinite;
}

.fluid-active .btn-gradient {
  transition: none; /* Remove transition for fluid movement */
}

@keyframes gradientMove {
  0% { background-position: 0% 40%; }
  25% { background-position: 60% 20%; }
  50% { background-position: 20% 100%; }
  75% { background-position: 80% 0%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 300% 300% !important;
  animation: gradientMove 6s ease-in-out infinite;
}
  </style>
  
  <div class="btn-container">
    <button 
      class="btn" 
      on:click|stopPropagation={toggleGlow} 
      on:mousemove={updateGradient}
      on:mouseenter={() => isAnimating = false}
      on:mouseleave={stopAnimation}
      class:fluid-active={isAnimating}
    >
      <div 
        class="btn-gradient animate-gradient" 
        style="background: radial-gradient(circle at {gradientX}% {gradientY}%, #d6adff 0%, rgb(53, 72, 255) 100%);"
        on:click|stopPropagation={clickGradient}
      ></div>
      <div class="inner-ring" class:rotating={isRotating}></div>
      <span class="btn-content">
        <div class="icon">
          <svg class="star-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Center star -->
            <path class="star center" d="M16 7L17.5 13L23 16L17.5 17.5L16 23L14.5 17.5L9 16L14.5 13L16 7Z"/>
            <!-- Top-left -->
            <path class="star top" d="M11 8L11.5 9.5L13 10L11.5 10.5L11 12L10.5 10.5L9 10L10.5 9.5L11 8Z" fill-opacity="0.6"/>
            <!-- Bottom-left -->
            <path class="star bottom" d="M9 20L10 22.2L12.2 23L10 23.8L9 26L8 23.8L5.8 23L8 22.2L9 20Z" fill-opacity="0.4"/>
          </svg>
        </div>
        <span class="text">Generate</span>
      </span>
    </button>
  </div>
