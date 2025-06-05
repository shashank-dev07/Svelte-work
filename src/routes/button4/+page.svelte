<script>
    let isAnimating = false;
    let buttonText = "Light";

    function handleClick() {
        if (!isAnimating) {
            isAnimating = true;
            buttonText = "Progressing";
            setTimeout(() => {
                isAnimating = false;
                buttonText = "Done";
                // Add another timeout to reset back to "Light" after showing "Done"
                setTimeout(() => {
                    buttonText = "Light";
                }, 2000);
            }, 6000);
        }
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen bg-gray-900">
    <div class="flex items-center justify-center">
        <div class="btn-container">
            <div class="card-behind"></div>
            <button
                class="relative overflow-hidden px-12 py-4 rounded-full text-white font-medium text-lg 
                       shadow-lg backdrop-blur-sm transition-all duration-300
                       {isAnimating ? 'animate-gradient' : ''}"
                style="background: {isAnimating ? 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.95) 0%, rgba(30, 64, 175, 0.8) 50%, rgba(17, 24, 39, 0.7) 100%)' : 'rgba(30, 58, 138, 0.9)'}"
                on:click={handleClick}
            >
                <span class="flex items-center justify-center gap-2">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <!-- Center star -->
                        <path class="star center" d="M16 7L17.5 13L23 16L17.5 17.5L16 23L14.5 17.5L9 16L14.5 13L16 7Z"/>
                        <!-- Top-left -->
                        <path class="star top" d="M11 8L11.5 9.5L13 10L11.5 10.5L11 12L10.5 10.5L9 10L10.5 9.5L11 8Z" fill-opacity="0.6"/>
                        <!-- Bottom-left -->
                        <path class="star bottom" d="M9 20L10 22.2L12.2 23L10 23.8L9 26L8 23.8L5.8 23L8 22.2L9 20Z" fill-opacity="0.4"/>
                      </svg>
                    
                    {buttonText}
                    {#if buttonText === "Done"}
                        <svg class="inline-block ml-2 w-6 h-6 animate-checkmark" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.1)" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                                stroke="white" 
                                stroke-width="2" 
                                stroke-linecap="round" 
                                stroke-linejoin="round"/>
                        </svg>
                    {/if}
                </span>
            </button>
        </div>
    </div>
</div>

<style>
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

    button {
        background-size: 100% 100%;
        transition: all 0.3s ease;
    }

    button:hover {
        transform: translateY(-1px);
        box-shadow: 0 0 25px rgba(147, 197, 253, 0.6);
    }

    @keyframes checkmarkEntrance {
        0% { transform: scale(0); opacity: 0; }
        70% { transform: scale(1.2); }
        100% { transform: scale(1); opacity: 1; }
    }

    .animate-checkmark {
        animation: checkmarkEntrance 0.5s ease-out forwards;
    }
    
    .btn-container {
        position: relative;
        display: inline-block;
        border-radius: 9999px; /* full rounded to match the button */
    }
    
    .card-behind {
        position: absolute;
        width: calc(100% + 16px);
        height: calc(100% + 16px);
        background: rgba(15, 23, 42, 0.8);
        border-radius: inherit;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    }
</style>