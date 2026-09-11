// ==============================================================
//  /personal-link-tree/public/script.js
//  Frontend logic to fetch links from the backend API,
//  render them to the DOM, and handle click tracking.
// ==============================================================

const linksContainer = document.getElementById('links-container');

// ==============================================================
// FETCH AND RENDER LINKS
// ==============================================================
async function fetchLinks() {
  try {
    //  Ask our backend API for the links
    const response = await fetch('/api/links');
    const links = await response.json();

    // Clear the container just in case
    linksContainer.innerHTML = '';

    // Loop through every link we got from the database
    links.forEach(link => {
      // Create a new HTML element for each link
      const linkElement = document.createElement('a');
      linkElement.href = link.url;
      linkElement.className = 'link-item';
      linkElement.target = '_blank'; // Opens the link in a new tab
      
      // Build what goes inside the button (Title + Click Count)
      linkElement.innerHTML = `
        <span>${link.title}</span>
        <span class="click-count" id="count-${link._id}">${link.clicks} clicks</span>
      `;

      // Add an event listener to track when it gets clicked
      linkElement.addEventListener('click', (event) => {
        // We let the link open normally, but we also secretly tell the backend
        trackClick(link._id);
      });

      // Put the finished button onto the screen
      linksContainer.appendChild(linkElement);
    });
  } catch (error) {
    console.error('Error fetching links:', error);
    linksContainer.innerHTML = '<p>Failed to load links.</p>';
  }
}

// ==============================================================
// TRACK CLICKS
// ==============================================================

async function trackClick(linkId) {
  try {
    // Tell the backend to increase the click count
    const response = await fetch(`/api/links/${linkId}/click`, {
      method: 'PUT'
    });
    const updatedLink = await response.json();

    // Update the number on the screen instantly without refreshing the page
    const countSpan = document.getElementById(`count-${linkId}`);
    if (countSpan) {
      countSpan.textContent = `${updatedLink.clicks} clicks`;
    }
  } catch (error) {
    console.error('Error updating click count:', error);
  }
}

// ==============================================================
// INITIALIZATION
// ==============================================================

// Run the fetch function as soon as the page loads
fetchLinks();
