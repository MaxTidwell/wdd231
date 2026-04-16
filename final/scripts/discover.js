import { recipes } from "./data.js";

// DOM lookups
const container = document.querySelector("#discover-card-container");
const modal = document.querySelector("#recipeModal");
const modalBody = document.querySelector("#modalBody");
const closeModal = document.querySelector("#closeModal");

// Only run Discover logic if the page contains the container
if (container) {

    function displayRecipeCards(list) {
        container.innerHTML = "";

        list.forEach(recipe => {
            const card = document.createElement("section");
            card.classList.add("recipe-card");

            card.innerHTML = `
                <figure>
                    <img src="${recipe.image || '../images/placeholder.jpg'}"
                         alt="${recipe.name}" loading="lazy">
                    <figcaption>${recipe.name}</figcaption>
                </figure>

                <h2>${recipe.name}</h2>
                <p>${recipe.description}</p>
                <p><strong>Time:</strong> ${recipe.time}</p>

                <button class="learn-more-btn" data-id="${recipe.id}">
                    Learn More
                </button>
            `;

            container.appendChild(card);
        });

        attachModalEvents();
    }

    function attachModalEvents() {
        const buttons = document.querySelectorAll(".learn-more-btn");

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.dataset.id);
                const recipe = recipes.find(r => r.id === id);
                openModal(recipe);
            });
        });
    }

    function openModal(recipe) {
        modalBody.innerHTML = `
            <h2>${recipe.name}</h2>
            <img src="${recipe.image || '../images/placeholder.jpg'}"
                 alt="${recipe.name}" class="modal-img">

            <p><strong>Time:</strong> ${recipe.time}</p>
            <p><strong>Cost:</strong> ${recipe.cost}</p>

            <h3>Ingredients</h3>
            <ul>
                ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
            </ul>

            <h3>Steps</h3>
            <ol>
                ${recipe.steps.map(s => `<li>${s}</li>`).join("")}
            </ol>
        `;

        modal.classList.remove("hidden");
    }

    // Modal close events
    if (closeModal) {
        closeModal.addEventListener("click", () => modal.classList.add("hidden"));
        modal.addEventListener("click", e => {
            if (e.target === modal) modal.classList.add("hidden");
        });
    }

    // Initialize
    displayRecipeCards(recipes);
}
