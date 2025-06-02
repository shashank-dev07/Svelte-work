<script>
    let isAnimating = false;
    let buttonText = "Download";
    let progress = 0;
    let progressInterval;
    let showDownAnimation = false;
    
    // Track which text elements are visible and animating
    let currentTextIndex = 0;
    let textStates = [
        { text: "Download", animating: false },
        { text: "Progressing", animating: false },
        { text: "Success!", animating: false }
    ];
    
    const handleClick = () => {
        if (isAnimating) return;
        
        isAnimating = true;
        showDownAnimation = true;
        
        // First transition: Download → Downloading...
        animateTextChange(0, 1);
        
        // Start progress bar after text change
        setTimeout(() => {
            progress = 0;
            
            progressInterval = setInterval(() => {
                progress += 2;
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    
                    // Second transition: Downloading... → Success!
                    animateTextChange(1, 2);
                    
                    setTimeout(() => {
                        isAnimating = false;
                        
                        // Reset after success
                        setTimeout(() => {
                            // Third transition: Success! → Download
                            animateTextChange(2, 0);
                            
                            setTimeout(() => {
                                progress = 0;
                                showDownAnimation = false;
                            }, 300);
                        }, 1700);
                    }, 300);
                }
            }, 40);
        }, 500);
    };
    
    function animateTextChange(fromIndex, toIndex) {
        currentTextIndex = toIndex;
        textStates[fromIndex].animating = true;
        textStates[toIndex].animating = true;
        
        setTimeout(() => {
            textStates[fromIndex].animating = false;
            setTimeout(() => {
                textStates[toIndex].animating = false;
            }, 300);
        }, 300);
    }
</script>


<style>
     @keyframes text-lift-out {
        0% { 
            transform: translateY(0);
            opacity: 1;
        }
        100% { 
            transform: translateY(-30px);
            opacity: 0;
        }
    }
    
    @keyframes text-lift-in {
        0% { 
            transform: translateY(30px);
            opacity: 0;
        }
        100% { 
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .text-elevator {
        position: relative;
        height: 24px;
        overflow: hidden;
        min-width: 100px;
        text-align: center;
    }
    
    .text-floor {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }
    
    .text-hidden {
        opacity: 0;
        pointer-events: none;
    }
    
    .text-lift-out {
        animation: text-lift-out 0.4s ease-out forwards;
    }
    
    .text-lift-in {
        animation: text-lift-in 0.4s ease-out forwards;
    }

     @keyframes text-roll-up {
        0% { 
            transform: translateY(0);
            opacity: 1;
        }
        100% { 
            transform: translateY(-10px);
            opacity: 1;
        }
    }
    
    @keyframes text-roll-in {
        0% { 
            transform: translateY(100%);
            opacity: 0;
        }
        100% { 
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .text-container {
        overflow: hidden;
        height: 24px;
        position: relative;
    }
    
    .text-roll-up {
        animation: text-roll-up 0.3s ease-out forwards;
    }
    
    .text-roll-in {
        animation: text-roll-in 0.3s ease-out forwards;
    }

    @keyframes arrow-hit {
        0% { 
            transform: translateY(0);
        }
        25% { 
            transform: translateY(-8px);
            animation-timing-function: ease-out;
        }
        50% { 
            transform: translateY(4px);
            animation-timing-function: ease-in;
        }
        65% { 
            transform: translateY(1px);
        }
        100% { 
            transform: translateY(0);
        }
    }

    @keyframes underline-hit {
        0% { 
            transform: scaleX(1) translateY(0);
            d: path('M3 21H21'); 
        }
        50% { 
            transform: scaleX(0.9) translateY(-2px);
            d: path('M3 21Q12 25 21 21'); 
        }
        100% { 
            transform: scaleX(1) translateY(0);
            d: path('M3 21H21'); 
        }
    }
    
    .arr {
        cursor: pointer;
        transform-origin: center;
    }

    .arr:hover path:last-child {
        animation: arrow-hit 1s cubic-bezier(0.68, -0.6, 0.32, 1.6) infinite;
    }

    .arr:hover path:first-child {
        animation: underline-hit 1.2s ease-in-out infinite;
        transform-origin: center;
    }
    
    @keyframes arrow-move {
        0% { 
            transform: translateY(0);
        }
        25% { 
            transform: translateY(-8px);
            animation-timing-function: ease-out;
        }
        50% { 
            transform: translateY(4px);
            animation-timing-function: ease-in;
        }
        65% { 
            transform: translateY(1px);
        }
        100% { 
            transform: translateY(0);
        }
    }

    .animated-arrow path:last-child {
        animation: arrow-move 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6) infinite;
    }
    
    @keyframes underline-bounce {
        0% { 
            transform: scaleX(1) translateY(0);
            d: path('M3 21H21'); 
        }
        50% { 
            transform: scaleX(0.9) translateY(-2px);
            d: path('M3 21Q12 25 21 21'); 
        }
        100% { 
            transform: scaleX(1) translateY(0);
            d: path('M3 21H21'); 
        }
    }

    .animated-arrow path:first-child {
        animation: underline-bounce 1s ease-in-out infinite;
        transform-origin: center;
    }

    .animated-arrow path:last-child {
        animation: arrow-move 0.8s ease-in-out infinite;
    }
    
    @keyframes move-down {
        0% { 
            transform: translateY(0);
            opacity: 1;
        }
      
        50% {
            transform: translateY(5px);
             opacity: 1;
        }
    
        100% { 
            transform: translateY(10px);
            opacity: 1;
        }
    }

    .move-down {
        animation: move-down 2s linear forwards;
        pointer-events: none;
    }

    .animated-container {
        position: relative;
        display: flex;
        align-items: center;
        gap: 2px;
    }

    @keyframes checkmark-appear {
        0% {
            transform: translateY(20px) scale(0.5);
            opacity: 0;
        }
        50% {
            transform: translateY(-10px) scale(1.2);
        }
        100% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
    }

    .check-animation {
        animation: checkmark-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .button-content {
        min-width: 120px;
        min-height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 4px;
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 0 0 0.5rem 0.5rem;
        transition: width 0.1s linear;
    }

    .success-animation {
        animation: success-bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
    }

    @keyframes success-bounce {
        0% { transform: scale(0.3); }
        50% { transform: scale(1.2); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); }
    }
</style>

<div class="flex items-center justify-center py-8">
    <button
        on:click={handleClick}
        class="group relative bg-black text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden cursor-grab"
        style="min-width: 160px; min-height: 48px;" 
    >
        <!-- Progress bar -->

        <div class="button-content relative z-10 flex items-center gap-2">
            <!-- Icon that changes based on state -->
            {#if currentTextIndex === 1 && isAnimating}
                <svg class="w-5 h-5 animated-arrow {showDownAnimation ? 'move-down' : ''}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18 11L12 17M12 17L6 11M12 17V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            {:else if currentTextIndex === 2}
                <svg class="w-5 h-5 check-animation" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            {:else}
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18 11L12 17M12 17L6 11M12 17V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            {/if}
            
            <!-- Text elevator container -->
            <div class="text-elevator">
                {#each textStates as state, i}
                    <div 
                        class="text-floor {i !== currentTextIndex ? 'text-hidden' : ''} 
                               {state.animating && i === currentTextIndex ? 'text-lift-in' : ''}
                               {state.animating && i !== currentTextIndex ? 'text-lift-out' : ''}"
                    >
                        {state.text}
                    </div>
                {/each}
            </div>
        </div>
    </button>
</div>
