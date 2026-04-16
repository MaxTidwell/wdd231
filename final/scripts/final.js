// Global footer updates
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// (Optional) nav menu logic if you add hamburger later
const navbutton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

if (navbutton && navBar) {
    navbutton.addEventListener('click', () => {
        navbutton.classList.toggle('show');
        navBar.classList.toggle('show');
    });
}

document.getElementById("recipeForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const recipe = {
        name: document.getElementById("name").value.trim(),
        description: document.getElementById("description").value.trim(),
        ingredients: document.getElementById("ingredients").value.split("\n").map(i => i.trim()).filter(i => i),
        steps: document.getElementById("steps").value.split("\n").map(s => s.trim()).filter(s => s),
        time: document.getElementById("time").value.trim(),
        cost: document.getElementById("cost").value.trim(),
        image: document.getElementById("image").value.trim()
    };

    document.getElementById("output").textContent = JSON.stringify(recipe, null, 4);
});
