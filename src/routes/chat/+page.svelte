<script>
  import { onMount } from 'svelte';
  
  // Sample messages for demonstration
  let messages = [
    { id: 1, text: "Hi there! 👋", sender: "them", time: "10:03 AM" },
    { id: 2, text: "Hello! How can I help you today?", sender: "them", time: "10:04 AM" },
    { id: 3, text: "I'm looking for information about your new product.", sender: "me", time: "10:05 AM" },
    { id: 4, text: "Of course! Our new product has just launched with amazing features. Would you like me to tell you more about it?", sender: "them", time: "10:06 AM" },
    { id: 5, text: "Yes, please! I'm particularly interested in the pricing.", sender: "me", time: "10:07 AM" },
  ];
  
  let newMessage = "";
  let chatContainer;
  let isThinking = false;
  
  function sendMessage() {
    if (newMessage.trim() === "") return;
    
    messages = [...messages, {
      id: messages.length + 1,
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }];
    
    newMessage = "";
    
    // Show thinking animation
    isThinking = true;
    scrollToBottom();
    
    // Simulate a response after a delay
    setTimeout(() => {
      isThinking = false;
      messages = [...messages, {
        id: messages.length + 1,
        text: "Thanks for your message! Our team will get back to you soon.",
        sender: "them",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }];
      scrollToBottom();
    }, 3000); // Longer delay to show the thinking animation
  }
  
  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
  
  function scrollToBottom() {
    setTimeout(() => {
      if (chatContainer) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: "smooth"
        });
      }
    }, 100);
  }
  
  onMount(() => {
    scrollToBottom();
  });
</script>

<svelte:head>
  <title>Mobile Chat</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: {
              light: '#a855f7',
              DEFAULT: '#7c3aed',
              dark: '#6d28d9',
            }
          },
          keyframes: {
            dotPulse: {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(2)' },
            }
          },
          animation: {
            dotPulse: 'dotPulse 1.5s infinite ease-in-out',
          }
        }
      }
    }
  </script>
  <style type="text/tailwindcss">
    @layer utilities {
      .dot-pulse {
        animation: dotPulse 1.5s infinite ease-in-out;
      }
      @keyframes dotPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(2); }
      }
    }
  </style>
</svelte:head>

<div class="fixed inset-0 flex flex-col bg-gray-100 overflow-hidden">
  <!-- Header -->
  <div class="bg-gradient-to-r from-primary to-primary-light text-white py-3 px-4 flex justify-between items-center shadow-md z-10">
    <div class="flex items-center">
      <div class="user-details">
        <h2 class="text-lg font-semibold m-0">Copa Agent</h2>
        <p class="text-xs opacity-80 m-0 flex items-center">
          <span class="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
          Online
        </p>
      </div>
    </div>
    <button class="w-10 h-10 flex items-center justify-center rounded-full border-0 bg-transparent text-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
    </button>
  </div>
  
  <!-- Chat Messages -->
  <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-4" bind:this={chatContainer}>
    {#each messages as message (message.id)}
      <div class={"flex items-start " + (message.sender === 'me' ? 'self-end flex-row-reverse' : '') + " max-w-[80%] md:max-w-[85%]"}>
        {#if message.sender === 'them'}
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold mr-2 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
              <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
              <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
            </svg>
          </div>
        {/if}
        <div class={"relative p-3 rounded-2xl shadow " + (message.sender === 'me' ? 'bg-gradient-to-r from-primary to-primary-light text-white rounded-tr-sm' : 'bg-white rounded-tl-sm ml-1')}>
          <p class="mb-4 leading-relaxed">{message.text}</p>
          <span class="absolute bottom-2 right-3 text-[10px] opacity-70">{message.time}</span>
        </div>
      </div>
    {/each}
    
    {#if isThinking}
      <div class="flex items-start max-w-[80%]">
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold mr-2 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
              <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
              <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
            </svg>
        </div>
        <div class="flex items-center p-3 rounded-2xl rounded-tl-sm bg-white shadow min-w-[120px]">
          <div class="w-2 h-2 rounded-full bg-primary mr-1.5 dot-pulse"></div>
          <div class="text-sm text-primary">Thinking</div>
        </div>
      </div>
    {/if}
  </div>
  
  <!-- Input Area -->
  <div class="w-full flex items-center bg-gray-200 rounded-t-[22px] shadow-md p-4 box-border">
    <button class="w-10 h-10 flex items-center justify-center text-gray-500 border-0 bg-transparent">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
    </button>
    <textarea 
      class="flex-1 border-0 bg-transparent py-3 px-1 resize-none max-h-[100px] font-inherit text-base focus:outline-none focus:bg-white/50"
      placeholder="Type a message..." 
      bind:value={newMessage}
      on:keydown={handleKeydown}
    ></textarea>
    <button 
      class="w-10 h-10 flex items-center justify-center rounded-full border-0 bg-gradient-to-r from-primary to-primary-light text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      on:click={sendMessage} 
      disabled={!newMessage.trim() || isThinking}
    >
      {#if isThinking}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      {/if}
    </button>
  </div>
</div>