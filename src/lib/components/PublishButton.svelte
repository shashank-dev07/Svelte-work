<script>
    let isAnimating = false;
    let showCheck = false;
    let currentTextIndex = 0;
    let buttonText = "Publish";
    
    // Define text states for the elevator animation
    let textStates = [
        { text: "Publish", animating: false },
        { text: "Loading...", animating: false },
        { text: "Done!", animating: false }
    ];
    
    const handleClick = () => {
        if (isAnimating) return;
        
        isAnimating = true;
        showCheck = false;
        
        // First transition: Publish → Loading...
        animateTextChange(0, 1);
        
        // Reset animation and change text after 3 seconds
        setTimeout(() => {
            // Second transition: Loading... → Done!
            animateTextChange(1, 2);
            showCheck = true;
            
            // Reset back to initial state after 1 more second
            setTimeout(() => {
                // Third transition: Done! → Publish
                animateTextChange(2, 0);
                showCheck = false;
                isAnimating = false;
            }, 2000);
        }, 4000);
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

    @keyframes pulse {
        0% {
            transform: scaleY(1);
            transform-origin: center;
        }
        50% {
            transform: scaleY(1.3);
            transform-origin: center;
        }
        100% {
            transform: scaleY(1);
            transform-origin: center;
        }
    }
    .pulse-arrow {
        animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes continuousFall {
        0% {
            transform: translateY(-150%);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(150%);
            opacity: 0;
        }
    }

    .falling-cloud {
        animation: continuousFall 0.8s linear infinite;
    }

    .cloud-1 { animation-delay: 0s; }
    .cloud-2 { animation-delay: -2s; }

     @keyframes hover-pulse {
        0% {
            transform: scaleY(1);
        }
        50% {
            transform: scaleY(1.2);
        }
        100% {
            transform: scaleY(0.8);
        }
    }

    .arrow-hover {
        transition: transform 0.3s ease;
    }

    .group:hover .arrow-hover {
        animation: hover-pulse 1s linear 1;
    }
</style>

<div class="min-h-screen flex items-center justify-center overflow-hidden  py-8">
    <button 
        on:click={handleClick}
        class="group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-0 rounded-2xl transition-all duration-300 ease-in-out flex items-center gap-0 relative w-42"
    >     
        <div class="absolute left-3.5 flex items-start">
             <svg    class={`
        w-8 h-8 
        transition-all duration-300 cloud-1
        ${currentTextIndex === 0 ? 'opacity-100 ml-0' : 'opacity-0'} 
        ${isAnimating  && currentTextIndex === 1 ? 'falling-cloud' : ''}
    `} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="M6.5 19C4.01472 19 2 16.9853 2 14.5C2 12.1564 3.79151 10.2313 6.07974 10.0194C6.54781 7.17213 9.02024 5 12 5C14.9798 5 17.4522 7.17213 17.9203 10.0194C20.2085 10.2313 22 12.1564 22 14.5C22 16.9853 19.9853 19 17.5 19C13.1102 19 10.3433 19 6.5 19Z" 
                    fill="white"
                    fill-opacity="0.3"
                    stroke="currentColor" 
                    stroke-opacity="0.4"
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                />
            </svg>
            <svg class="w-8 h-8 {isAnimating  && currentTextIndex === 1 ? 'falling-cloud' : 'opacity-0'} cloud-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path 
                    d="M6.5 19C4.01472 19 2 16.9853 2 14.5C2 12.1564 3.79151 10.2313 6.07974 10.0194C6.54781 7.17213 9.02024 5 12 5C14.9798 5 17.4522 7.17213 17.9203 10.0194C20.2085 10.2313 22 12.1564 22 14.5C22 16.9853 19.9853 19 17.5 19C13.1102 19 10.3433 19 6.5 19Z" 
                    fill="white"
                    fill-opacity="0.3"
                    stroke="currentColor" 
                    stroke-opacity="0.4"
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                />
            </svg>
        </div>
        
        <!-- Arrow SVG -->
        <div class="absolute transform -translate-x-1/2 z-10 flex items-center">
            {#if !showCheck}
                <svg class="w-6 h-6 translate-y-2  arrow-hover {isAnimating ? 'pulse-arrow ml-20' : 'ml-15'}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20V4M12 4L6 10M12 4L18 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            {:else}
                <svg class="w-6 h-6 ml-30 text-green-400 check-animation" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            {/if}
        </div>
      <div class="text-elevator ml-15">
            {#each textStates as state, i}
                <div 
                    class="text-floor {i !== currentTextIndex ? 'text-hidden' : ''} 
                           {state.animating && i === currentTextIndex ? 'text-lift-in' : ''}
                           {state.animating && i !== currentTextIndex ? 'text-lift-out' : ''}"
                >
                    <span class="text-xl">{state.text}</span>
                </div>
            {/each}

        </div>    </button>
</div>
