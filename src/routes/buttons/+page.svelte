<script>
  import CustomButtons from '$lib/components/CustomButtons.svelte';
  
  // Sample click handler
  function handleButtonClick(buttonName) {
    alert(`${buttonName} clicked!`);
  }
  
  // Define button configurations
  const buttonConfigs = [
    { 
      id: 'btn-primary',
      label: 'Primary Button', 
      variant: 'primary', 
      size: 'medium',
      onClick: () => handleButtonClick('Primary')
    },
    { 
      id: 'btn-secondary',
      label: 'Secondary Button', 
      variant: 'secondary', 
      size: 'medium',
      onClick: () => handleButtonClick('Secondary')
    },
    { 
      id: 'btn-success',
      label: 'Success Button', 
      variant: 'success', 
      size: 'medium',
      onClick: () => handleButtonClick('Success')
    },
    { 
      id: 'btn-danger',
      label: 'Danger Button', 
      variant: 'danger', 
      size: 'medium',
      onClick: () => handleButtonClick('Danger')
    },
    { 
      id: 'btn-small',
      label: 'Small Button', 
      variant: 'primary', 
      size: 'small',
      onClick: () => handleButtonClick('Small')
    },
    { 
      id: 'btn-large',
      label: 'Large Button', 
      variant: 'primary', 
      size: 'large',
      onClick: () => handleButtonClick('Large')
    }
  ];
</script>

<main>
  <h1>Button Showcase</h1>
  
  <div class="button-grid">
    {#each buttonConfigs as config}
      <div class="button-wrapper">
        <CustomButtons 
          label={config.label} 
          variant={config.variant} 
          size={config.size} 
          buttonId={config.id}
          onClick={config.onClick} 
        />
        <p class="button-description">
          {config.label} ({config.variant}, {config.size})
        </p>
      </div>
    {/each}
  </div>
  
  <div class="back-link">
    <a href="/">Back to Home</a>
  </div>
</main>

<style>
  main {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
  }
  
  .button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .button-description {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #666;
  }
  
  .back-link {
    text-align: center;
    margin-top: 2rem;
  }
  
  .back-link a {
    color: #4A55BD;
    text-decoration: none;
    font-weight: 600;
  }
  
  .back-link a:hover {
    text-decoration: underline;
  }
</style>
