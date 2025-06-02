<script>
    let isAnimating = false;
    let buttonText = "Download";
    let progress = 0;
    let progressInterval;
    let showDownAnimation = false;
    
    const handleClick = () => {
        if (isAnimating) return;
        
        isAnimating = true;
        buttonText = "";
        progress = 0;
        showDownAnimation = true;
        
        progressInterval = setInterval(() => {
            progress += 2;
            if (progress >= 100) {
                clearInterval(progressInterval);
                buttonText = "Success!";
                isAnimating = false;
                showDownAnimation = true;
                
                setTimeout(() => {
                    buttonText = "Download";
                    progress = 0;
                    showDownAnimation = false;
                }, 2000);
            }
        }, 40);
    }
</script>

<style>

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
    animation: arrow-move 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6) infinite;
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
        animation: underline-bounce 0.5s ease-in-out infinite;
        transform-origin: center;
    }

    .animated-arrow path:last-child {
        animation: arrow-move 0.5s ease-in-out infinite;
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



    @keyframes wave {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
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

<div class="min-h-screen flex items-center justify-center bg-gray-100 ">
    <button
        on:click={handleClick}
        class="group relative bg-black text-white font-medium py-4 px-2 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden cursor-grab "
        style="min-width: 30px; min-height: 48px;" 
    >
        <div class="progress-bar" style="width: {progress}%"></div>

        <div class="button-content relative z-10">
            {#if isAnimating && !buttonText}
                <div class="animated-container gap-2 ">
                        <svg class="w-5 h-5 animated-arrow {showDownAnimation ? 'move-down' : ''}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                 
                        <path d="M18 11L12 17M12 17L6 11M12 17V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg> 
                    <span>Downloading...</span>
                </div>
            {:else if buttonText === "Success!"}
                <div class="animated-container gap-2 ">
                         <svg class="w-5 h-5 mr-2 check-animation text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                    <span>{buttonText}</span>
                </div>
            {:else}
                <div class="flex items-center gap-2 arr ">
                    <svg class="w-5 h-5 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18 11L12 17M12 17L6 11M12 17V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                   
                    <span>{buttonText}</span>
                </div>
            {/if}
        </div>
    </button>
</div>