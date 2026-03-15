/* Hamburger or Nav */
const navbutton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');
});

/* Last Modified */
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;

/* Member Cards */
const container = document.querySelector("#members-container");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayMembers(data.members);
    }   catch(error) {
        console.error("Error loading members: ", error);
    }
}

function displayMembers(members) {
    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        if (member["member-level"] === 3) card.classList.add("gold");
        if (member["member-level"] === 2) card.classList.add("silver");

        card.innerHTML = `
            <h2>${member.company}</h2>
            <img src="${member.img}" alt="Company Image" loading="lazy">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.url}" target="_blank">Visit Website</a>
        `;

        container.appendChild(card);
    })
}

getMembers();

/* Grid and List Buttons */
const gridBtn = document.querySelector("#grid-btn")
const listBtn = document.querySelector('#list-btn');

gridBtn.addEventListener("click", () =>{
    container.classList.remove("list-view");
    container.classList.add("directory-grid");

    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () =>{
    container.classList.remove("directoty-grid");
    container.classList.add("list-view");

    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});