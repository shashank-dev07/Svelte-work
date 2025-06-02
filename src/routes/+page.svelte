<script>
  import CustomButtons from '$lib/components/CustomButtons.svelte';
  
  function handleButton1Click() {
    alert('Button 1 clicked!');
  }
  
  function handleButton2Click() {
    alert('Button 2 clicked!');
  }
</script>

<main>
  <h1>Custom Buttons Demo</h1>
  
  <div class="button-container">
    <CustomButtons 
      label="Button 1" 
      variant="primary" 
      size="medium" 
      buttonId="button1"
      onClick={handleButton1Click} 
    />
    
    <CustomButtons 
      label="Button 2" 
      variant="secondary" 
      size="large" 
      buttonId="button2"
      onClick={handleButton2Click} 
    />
  </div>
  
  <div class="showcase-links">
    <a href="/buttons" class="showcase-link">View All Button Variants</a>
    <a href="/custom-buttons" class="showcase-link">View Custom Animated Buttons</a>
  </div>
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  h1 {
    margin-bottom: 2rem;
    color: #333;
  }
  
  .button-container {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }
  
  .showcase-links {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }
  
  .showcase-link {
    color: #4A55BD;
    text-decoration: none;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.2s;
  }
  
  .showcase-link:hover {
    background-color: rgba(74, 85, 189, 0.1);
    text-decoration: underline;
  }
</style>
