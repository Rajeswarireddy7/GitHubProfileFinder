document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const searchButton = document.querySelector(".searchButton");
    const profileContainer = document.querySelector(".main__profile-container");
  
    // Function to fetch GitHub user data
    async function fetchGitHubUser(username) {
      const url = `https://api.github.com/users/${username}`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        displayProfile(data);
      } catch (error) {
        profileContainer.innerHTML = `<p class="error-message">❌ ${error.message}</p>`;
      }
    }
  
    // Function to display user profile
    function displayProfile(user) {
      profileContainer.innerHTML = `
        <div class="profile-card">
          <img src="${user.avatar_url}" alt="Profile Image" class="profile-image">
          <div class="profile-details">
            <p><strong>Name:</strong> ${user.name || "N/A"}</p>
            <p><strong>Username:</strong> ${user.login}</p>
            <p><strong>Bio:</strong> ${user.bio || "No bio available"}</p>
            <p><strong>Repos:</strong> ${user.public_repos}</p>
            <p><strong>Followers:</strong> ${user.followers}</p>
            <p><strong>Following:</strong> ${user.following}</p>
            <p><strong>URL:</strong> <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
          </div>
        </div>
      `;
    }
  
    // Event Listener for search button
    searchButton.addEventListener("click", () => {
      const username = searchInput.value.trim();
      if (username) {
        fetchGitHubUser(username);
      } else {
        profileContainer.innerHTML = `<p class="error-message">⚠️ Please enter a GitHub username</p>`;
      }
    });
  
    // Event Listener for "Enter" key
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        searchButton.click();
      }
    });
  });
  