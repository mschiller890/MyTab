document.addEventListener("DOMContentLoaded", () => {
    loadQuickLinks();
    createStars();

    document.getElementById("searchButton").addEventListener("click", search);
    document.getElementById("addQuickLinkButton").addEventListener("click", addQuickLink);
    document.getElementById("settingsButton").addEventListener("click", toggleSettings);
});

function search() {
    let query = document.getElementById('searchInput').value.trim();
    if (query) {
        if (query.includes('.') && !query.includes(' ')) {
            window.location.href = query.startsWith('http') ? query : 'http://' + query;
        } else {
            window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
        }
    }
}

function loadQuickLinks() {
    let quickLinksContainer = document.getElementById("quickLinks");
    let links = JSON.parse(localStorage.getItem("quickLinks")) || [
        { name: "Google", url: "https://www.google.com" },
        { name: "YouTube", url: "https://www.youtube.com" },
        { name: "GitHub", url: "https://www.github.com" },
        { name: "Reddit", url: "https://www.reddit.com" },
        { name: "Wikipedia", url: "https://www.wikipedia.org" },
        { name: "Twitter", url: "https://www.twitter.com" }
    ];

    quickLinksContainer.innerHTML = "";
    links.forEach((link, index) => {
        let linkElement = document.createElement("div");
        linkElement.classList.add("quick-link-item");
        linkElement.innerHTML = `
            <a href="${link.url}" target="_blank">${link.name}</a>
            <button class="remove-btn hidden" data-index="${index}">X</button>
        `;
        quickLinksContainer.appendChild(linkElement);
    });

    localStorage.setItem("quickLinks", JSON.stringify(links));
}

document.getElementById("quickLinks").addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
        let index = event.target.getAttribute("data-index");
        removeQuickLink(index);

        event.target.style.display = "none";
    }
});


function addQuickLink() {
    let name = document.getElementById("linkName").value.trim();
    let url = document.getElementById("linkURL").value.trim();
    
    if (name && url) {
        let links = JSON.parse(localStorage.getItem("quickLinks")) || [];
        links.push({ name, url });

        localStorage.setItem("quickLinks", JSON.stringify(links));
        document.getElementById("linkName").value = "";
        document.getElementById("linkURL").value = "";
        
        loadQuickLinks();

        document.querySelector(".quick-links-form").style.display = "block";
        document.querySelectorAll(".remove-btn").forEach(btn => btn.classList.remove("hidden"));
    }
}



function removeQuickLink(index) {
    let links = JSON.parse(localStorage.getItem("quickLinks")) || [];
    links.splice(index, 1);

    localStorage.setItem("quickLinks", JSON.stringify(links));
    loadQuickLinks();
}

function createStars() {
    let number_of_star = 150;
    let body = document.body;

    for (let i = 0; i < number_of_star; i++) {
        let star = document.createElement("div");
        star.classList.add("star");
        
        let star_top = Math.random() * window.innerHeight;
        let star_left = Math.random() * window.innerWidth;
        let star_radius = Math.random() * 4;
        let star_duration = Math.random() * 10 + 6;
        let rotation = Math.random() > 0.5 ? "move_right" : "move_left";

        star.style.top = `${star_top}px`;
        star.style.left = `${star_left}px`;
        star.style.width = `${star_radius}px`;
        star.style.height = `${star_radius}px`;
        star.style.animation = `${rotation} ${star_duration}s infinite linear`;

        body.appendChild(star);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".quick-links-form").style.display = "none"; 
    document.querySelectorAll(".remove-btn").forEach(btn => btn.style.display = "none");
});

function toggleSettings() {
    let form = document.querySelector(".quick-links-form");
    let removeButtons = document.querySelectorAll(".remove-btn");

    form.style.display = (form.style.display === "none" || form.style.display === "") ? "block" : "none";

    removeButtons.forEach(button => {
        button.style.display = (button.style.display === "none" || button.style.display === "") ? "inline-block" : "none";
    });
}
