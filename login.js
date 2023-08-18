// Initialize users array to store user data
let users = [];

const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// Function to handle user registration
function handleSignUp(event) {
  event.preventDefault();
  const username = event.target.username.value;
  const email = event.target.email.value; // Add email value
  const password = event.target.password.value;

  // Create a user object
  const user = {
    username: username,
    email: email,
    password: password
  };

  // Push the user object into the users array
  users.push(user);

  // Save the updated users array to localStorage
  localStorage.setItem('users', JSON.stringify(users));

  // Display success message or redirect to Recipe Finder page
  alert('Successfully registered! Please sign in to access the Recipe Finder.');
}

// Function to handle user sign-in
function handleSignIn(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
  
    // Get the users array from localStorage
    const savedUsers = localStorage.getItem('users');
  
    if (savedUsers) {
      // Parse the users array from JSON string to JavaScript object
      users = JSON.parse(savedUsers);
  
      // Find the user with the matching username
      const user = users.find(user => user.username === username);
      console.log(user);
  
      if (user) {
        // Check the password for the matched user
        if (user.password === password) {
          // Redirect to Recipe Finder page or display a welcome message
          alert(`Welcome, ${username}! You now have access to the Recipe Finder web app.`);
          // Replace this line with code to redirect to your Recipe Finder page
          const recipeFinderPath = 'Recipe.html';
          window.location.href = recipeFinderPath;
        } else {
          alert('Incorrect password. Please try again.');
        }
      } else {
        alert('Username not found. Please enter the correct username.');
      }
    } else {
      alert('User not found. Please sign up first.');
    }
  }  

// Add event listeners to the forms
signUpForm.addEventListener('submit', handleSignUp);
signInForm.addEventListener('submit', handleSignIn);

// Toggle between sign-up and sign-in forms
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
