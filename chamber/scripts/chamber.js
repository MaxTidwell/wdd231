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
const directoryContainer = document.querySelector("#members-container");
const spotlightContainer = document.querySelector("#spotlight-container");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

        if (directoryContainer) displayMembers(data.members);
        if (spotlightContainer) displaySpotlight(data.members);

    }   catch(error) {
        console.error("Error loading members: ", error);
    }
}

/* Display Members */
function displayMembers(members) {
    if (!directoryContainer) return;

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        if (member["member-level"] === 3) card.classList.add("gold");
        if (member["member-level"] === 2) card.classList.add("silver");

        card.innerHTML = `
            <h2>${member.company}</h2>
            <img src="${member.img}" alt="Company Image" loading="lazy">
            <div>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.url}" target="_blank">Visit Website</a>
            </div>
        `;

        directoryContainer.appendChild(card);
    })
}

/* Display spotlight members */
function displaySpotlight(members) {
    if (!spotlightContainer) return;

    const spotlightMembers = members.filter(m=> m["member-level"] >= 2);

    const selected = spotlightMembers.sort(() => Math.random() - 0.5).slice(0, 3);

    selected.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        if (member["member-level"] === 3) card.classList.add("gold");
        if (member["member-level"] === 2) card.classList.add("silver");

        card.innerHTML = `
            <h2>${member.company}</h2>
            <img src="${member.img}" alt="Company Image" loading="lazy">
            <div>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.url}" target="_blank">Visit Website</a>
            </div>
        `;

        spotlightContainer.appendChild(card);
    })
}

getMembers();

/* Grid and List Buttons */
const gridBtn = document.querySelector('#grid-btn')
const listBtn = document.querySelector('#list-btn');

if (directoryContainer){
gridBtn.addEventListener("click", () =>{
    directoryContainer.classList.remove("list-view");
    directoryContainer.classList.add("directory-grid");

    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () =>{
    directoryContainer.classList.remove("directory-grid");
    directoryContainer.classList.add("list-view");

    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});
}


/* Weather API stuff */
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const forecast = document.querySelector('#forecast');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=40.51&lon=-112.03&units=imperial&appid=ba97e1a154172e7d1e49450071abbfe1';
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.64&units=imperial&appid=ba97e1a154172e7d1e49450071abbfe1`;


async function apiFetch() {
    try{
        const response = await fetch(url);
        if( response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
apiFetch();


async function getForecast() {
    try{
        const response = await fetch(forecastUrl);
        if( response.ok) {
            const forecastData = await response.json();
            console.log(forecastData);

            const threeDay = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
            displayForecast(threeDay);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
getForecast();


function displayResults(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;


    currentTemp.innerHTML = `<p>${Math.round(data.main.temp)}&deg;F</p>
                            <p>${desc}</p>
                            <p>High: ${Math.round(data.main.temp_max)}&deg;F</p>
                            <p>Low: ${Math.round(data.main.temp_min)}&deg;F</p>
                            <p>Humidity: ${data.main.humidity}%</p>`;

    weatherIcon.setAttribute('src', iconsrc );
    weatherIcon.setAttribute('alt', desc);
}

function displayForecast(days) {
    days.forEach(day => {
    console.log(
      day.dt_txt,
      day.main.temp,
      day.weather[0].description,
      day.weather[0].icon
    );
    const date = new Date(day.dt_txt);
    const dayName = date.toLocaleDateString("en-US", {weekday: "long"})

    const temp = Math.round(day.main.temp);
    const desc = day.weather[0].description;

    forecast.innerHTML += `<p>${dayName}: ${temp}&deg;F</p>`
  });
}

/* Hidden Timestamp */
document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
});


/* Modals */
const modal = document.querySelector('#membershipModal');
const modalContent = document.querySelector('#modalContent');
const closeBtn = document.querySelector('#closeModal');

const membershipInfo = {
    np: {
        title: "Non Profit",
        description: "Perfect for community organizations looking to connect and grow.",
        benefits: [
            "Directory listing",
            "Access to community events"
        ]
    },

    bronze: {
        title: "Bronze",
        description: "A great starting point for small businesses.",
        benefits: [
            "Directory listing",
            "Event discounts",
            "Newsletter spotlight"
        ]
    },

    silver: {
        title: "Silver",
        description: "Best for growing businesses wanting more visibility",
        benefits: [
            "Directory listing",
            "Event discounts",
            "Newsletter spotlight",
            "Featured homepage spotlight"
        ]
    },
    gold: {
        title: "Gold",
        description: "Maximum exposure and premium benefits.",
        benefits: [
            "Directory listing",
            "VIP event access",
            "Newsletter article",
            "Featured homepage spotlight"
        ]
    }
};

if (modal && modalContent && closeBtn) {

    document.querySelectorAll(".membership-card").forEach(card => {
        card.addEventListener("click", () => {
            const tier = card.dataset.tier;
            const info = membershipInfo[tier];

            modalContent.innerHTML = `
                <h2>${info.title}</h2>
                <p>${info.description}</p>
                <ul>
                    ${info.benefits.map(b => `<li>${b}</li>`).join("")}
                </ul>
            `;

            modal.showModal();
        });
    });

    closeBtn.addEventListener("click", () => modal.close());

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".membership-card.card-intro").forEach(card => {
        card.addEventListener("animationend", () => {
            card.classList.remove("card-intro");
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const membershipNames = {
        np: "Non Profit",
        bronze: "Bronze",
        silver: "Silver",
        gold: "Gold"
    };

    const rawTimestamp = params.get("timestamp");
    const formattedTimestamp = rawTimestamp? new Date(rawTimestamp).toLocaleString(): "Not provided";

    document.querySelector("#results").innerHTML = `
        <h2>Submission Details</h2>
        <p><strong>First Name:</strong> ${params.get("firstName")}</p>
        <p><strong>Last Name:</strong> ${params.get("lastName")}</p>
        <p><strong>Organizational Title:</strong> ${params.get("title")}</p>
        <p><strong>Email:</strong> ${params.get("email")}</p>
        <p><strong>Phone:</strong> ${params.get("phone")}</p>
        <p><strong>Organization Name:</strong> ${params.get("businessName")}</p>
        <p><strong>Membership Level:</strong> ${membershipNames[params.get("membershipLevel")]}</p>
        <p><strong>Description:</strong> ${params.get("description") || "None provided"}</p>
        <p><strong>Form Submitted:</strong> ${formattedTimestamp}</p>
    `;
});
