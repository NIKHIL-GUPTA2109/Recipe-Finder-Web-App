const searchForm = document.getElementById('searchForm');
const ingredientsInput = document.getElementById('ingredientsInput');
const recipeResults = document.getElementById('recipeResults');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeButton = document.getElementById('closeButton');

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const ingredients = ingredientsInput.value.trim();

  if (ingredients !== '') {
    searchRecipes(ingredients);
  }
});

async function searchRecipes(ingredients) {
  // Clear previous results
  recipeResults.innerHTML = '';

  const appId = 'd52574e1';
  const appKey = '8445fbfcc77fe7607c56708975ae7b7d';
  const endpoint = 'https://api.edamam.com/search';

  try {
    const response = await fetch(`${endpoint}?q=${ingredients}&app_id=${appId}&app_key=${appKey}`);
    const data = await response.json();

    if (data.hits.length > 0) {
      data.hits.forEach(hit => {
        displayRecipe(hit.recipe);
      });
    } else {
      recipeResults.innerHTML = '<p>No recipes found.</p>';
    }
  } catch (error) {
    console.log('Error:', error);
    recipeResults.innerHTML = '<p>An error occurred while fetching recipes. Please try again later.</p>';
  }
}

function displayRecipe(recipe) {
  const recipeCard = document.createElement('div');
  recipeCard.classList.add('recipe-card');

  const titleElement = document.createElement('h2');
  titleElement.textContent = recipe.label;
  recipeCard.appendChild(titleElement);

  const imageElement = document.createElement('img');
  imageElement.src = recipe.image;
  recipeCard.appendChild(imageElement);

  const ingredientsButton = document.createElement('button');
  ingredientsButton.textContent = 'Ingredients';
  ingredientsButton.classList.add('recipe-button');
  ingredientsButton.addEventListener('click', () => {
    showModal('Ingredients', recipe.ingredientLines);
  });
  recipeCard.appendChild(ingredientsButton);

  const processButton = document.createElement('button');
  processButton.textContent = 'Process';
  processButton.classList.add('recipe-button');
  processButton.addEventListener('click', () => {
    showModal('Process', recipe.url);
  });
  recipeCard.appendChild(processButton);

  recipeResults.appendChild(recipeCard);
}

function showModal(title, content) {
  modalTitle.textContent = title;
  modalBody.innerHTML = '';

  if (typeof content === 'string') {
    // Check if the content is a URL
    if (isValidURL(content)) {
      const processLinkElement = document.createElement('a');
      processLinkElement.textContent = 'View Process';
      processLinkElement.href = content;
      processLinkElement.target = '_blank'; // Open link in a new tab
      modalBody.appendChild(processLinkElement);
    } else {
      const contentElement = document.createElement('p');
      contentElement.textContent = content;
      modalBody.appendChild(contentElement);
    }
  } else if (Array.isArray(content)) {
    const contentElement = document.createElement('ul');
    content.forEach(item => {
      const liElement = document.createElement('li');
      liElement.textContent = item;
      contentElement.appendChild(liElement);
    });
    modalBody.appendChild(contentElement);
  }

  modalOverlay.style.display = 'flex';
}

// Function to check if a string is a valid URL
function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

// Close the modal when the close button is clicked
closeButton.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});


document.getElementById('scrollUpBtn').addEventListener('click', () => {
  const currentPosition = window.scrollY;
  const newPosition = Math.max(0, currentPosition - window.innerHeight);
  window.scrollTo(0, newPosition);
});

document.getElementById('scrollDownBtn').addEventListener('click', () => {
  const currentPosition = window.scrollY;
  const newPosition = Math.min(document.body.scrollHeight - window.innerHeight, currentPosition + window.innerHeight);
  window.scrollTo(0, newPosition);
});
