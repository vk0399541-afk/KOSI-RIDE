// ===== OpenRouteService API =====
const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijc3ZmRmZTIwNzAwNTRlMTNhNmUxNmY0YWMxNzQ0OWZjIiwiaCI6Im11cm11cjY0In0=";

let pickupLat = null;
let pickupLng = null;
let destinationLat = null;
let destinationLng = null;
// ===============================
// KOSI RIDE - script.js
// ===============================

// Fare Calculator + WhatsApp Booking
async function estimateFare() {

    const pickup = document.getElementById("pickup").value.trim();
    const destination = document.getElementById("destination").value.trim();
const pickupCoord = await getCoordinates(pickup);
const destinationCoord = await getCoordinates(destination);

const res = await fetch(
`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${pickupCoord[0]},${pickupCoord[1]}&end=${destinationCoord[0]},${destinationCoord[1]}`
);

const route = await res.json();

const distance =
(route.features[0].properties.summary.distance / 1000).toFixed(1);

document.getElementById("distance").value = distance;
// await showRoute(pickup, destination);
const rideDate = document.getElementById("rideDate").value;
const rideTime = document.getElementById("rideTime").value;
    if (!pickup || !destination || isNaN(distance) || distance <= 0) {
        alert("Please fill all details.");
        return;
    }

    let cabType = document.getElementById("cabType").value;

let rate = 15;

if(cabType==="bike"){
rate=8;
}
else if(cabType==="mini"){
rate=12;
}
else if(cabType==="sedan"){
rate=15;
}
else if(cabType==="suv"){
rate=20;
}

let fare = 80 + (distance * rate);
let promo = document.getElementById("promoCode").value.trim().toUpperCase();

if (promo === "KOSI10") {
    fare = fare * 0.90;
} else if (promo === "KOSI20") {
    fare = fare * 0.80;
}

const paymentMethod = document.getElementById("paymentMethod").value;

if (promo === "KOSI50") {
    fare = fare - 50;
}
let baseFare = 80;
let perKmFare = distance * rate;

document.getElementById("fareSummary").innerHTML = `
<b>Base Fare:</b> ₹${baseFare}<br>
<b>Per KM:</b> ₹${perKmFare}<br>
<b>Total Distance:</b> ${distance} KM<br>
<b>Total Fare:</b> ₹${fare}
`;

const bookingId = "KR" + Date.now().toString().slice(-6);

const drivers = ["Monu", "Amit", "Sonu", "Nitish", "Barun"];
const driver = drivers[Math.floor(Math.random() * drivers.length)];

const vehicleNo = "BR19 " + Math.floor(1000 + Math.random() * 9000);
const rating = (4 + Math.random()).toFixed(1);

document.getElementById("driverDetails").innerHTML = `
👨 Driver: ${driver}<br>
⭐ Rating: ${rating}<br>
🚗 Vehicle No: ${vehicleNo}
`;

const eta = Math.floor(Math.random() * 11) + 5;

    const msg =
`🚖 KOSI RIDE Booking

🆔 Booking ID: ${bookingId}

👨 Driver: ${driver}
⏳ ETA: ${eta} Minutes

📍 Pickup: ${pickup}
📍 Destination: ${destination}
🗺 Maps: https://www.google.com/maps/search/?api=1&query=${destination}
Vehicle: ${cabType.toUpperCase()}
📅 Date: ${rideDate}
🕒 Time: ${rideTime}
🛣 Distance: ${distance} KM

🚖 Base Fare: ₹${baseFare}
🛣 Per KM Charge: ₹${perKmFare}

🎁 Promo: ${promo || "None"}
💳 Payment: ${paymentMethod}
💰 Estimated Fare: ₹${fare}`;
const status = document.getElementById("bookingStatus");

status.innerHTML = "🟡 Booking Confirmed";

setTimeout(() => {
    status.innerHTML = "🚖 Driver Assigned";
}, 3000);

setTimeout(() => {
    status.innerHTML = "🛣 Driver On The Way";
}, 6000);

setTimeout(() => {
    status.innerHTML = "✅ Ride Completed";
}, 10000);
let history = localStorage.getItem("history") || "";

history += `
<hr>
<b>${bookingId}</b><br>
${pickup} ➜ ${destination}<br>
₹${fare}<br>
`;

localStorage.setItem("history", history);

document.getElementById("bookingHistory").innerHTML = history;

document.getElementById("driverDetails").innerHTML = `
<b>👨 Driver:</b> ${driver}<br>
<b>🚖 Vehicle:</b> ${cabType.toUpperCase()}<br>
<b>⭐ Rating:</b> 4.8/5<br>
<b>📞 Phone:</b> +91 9876543210
`;
document.getElementById("driverDetails").innerHTML = `
<b>👨 Driver:</b> ${driver}<br>
<b>🚖 Vehicle:</b> ${cabType.toUpperCase()}<br>
<b>⏳ ETA:</b> ${eta} Minutes
`;

document.getElementById("liveLocation").innerHTML =
"📍 Driver is 5 KM away";

setTimeout(() => {
    document.getElementById("liveLocation").innerHTML =
    "📍 Driver is 3 KM away";
}, 5000);

setTimeout(() => {
    document.getElementById("liveLocation").innerHTML =
    "📍 Driver is 1 KM away";
}, 10000);

setTimeout(() => {
    document.getElementById("liveLocation").innerHTML =
    "📍 Driver Reached Pickup";
}, 15000);

const rideOTP = Math.floor(1000 + Math.random() * 9000);

document.getElementById("rideOtp").innerHTML = `
<b>Your Ride OTP:</b> ${rideOTP}
`;
    window.open(
        "https://wa.me/911111111111?text=" + encodeURIComponent(msg),
        "_blank"
    );
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });
});

// Navbar Shadow
window.addEventListener("scroll", () => {

    const nav = document.querySelector(".navbar");

    if (!nav) return;

    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 5px 20px rgba(255,215,0,.25)";
    } else {
        nav.style.boxShadow = "none";
    }

});

// Scroll Reveal Animation
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll("section,.service-card,.review-card").forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all .8s ease";

    observer.observe(el);

});

// Loader
window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (!loader) return;

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }, 1500);

});
// ===== Mobile Menu =====
function toggleMenu(){
document.querySelector(".nav-links").classList.toggle("active");
}
// ===== Current Location =====

const locationBtn = document.getElementById("locationBtn");

if(locationBtn){

locationBtn.addEventListener("click",()=>{

if(!navigator.geolocation){

alert("Location not supported.");

return;

}

locationBtn.innerHTML="Getting Location...";

navigator.geolocation.getCurrentPosition(

(position)=>{

const lat=position.coords.latitude.toFixed(6);

const lng = position.coords.longitude.toFixed(6);

locationBtn.innerHTML = "Getting Address...";

fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
.then(response => response.json())
.then(data => {
    document.getElementById("pickup").value = data.display_name;
    locationBtn.innerHTML = "✅ Location Added";
})
.catch(() => {
    document.getElementById("pickup").value = lat + ", " + lng;
    locationBtn.innerHTML = "✅ Location Added";
});

},

()=>{

alert("Location Permission Denied");

locationBtn.innerHTML="📍 Use My Current Location";

}

);

});

}

async function getCoordinates(place) {
    const res = await fetch(
`https://api.heigit.org/pelias/v1/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(place)}`
    );

    const data = await res.json();

    if (!data.features || data.features.length === 0) {
        throw new Error("Location not found");
    }

    return data.features[0].geometry.coordinates;
}

function openGoogleMaps() {
    const pickup = document.getElementById("pickup").value;
    const destination = document.getElementById("destination").value;

    if (pickup === "" || destination === "") {
        alert("Please enter Pickup and Destination.");
        return;
    }

    window.open(
        `https://www.google.com/maps/dir/${encodeURIComponent(pickup)}/${encodeURIComponent(destination)}`,
        "_blank"
    );
}
window.onload = function () {
    const history = localStorage.getItem("history");
    if (history) {
        document.getElementById("bookingHistory").innerHTML = history;
    }
};
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
});
window.addEventListener("load", function () {
    setTimeout(function () {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }
    }, 2000);
});
const destinationInput = document.getElementById("destination");

destinationInput.addEventListener("input", async function () {

    const query = this.value.trim();

    if (query.length < 3) return;

    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        if (data.length > 0) {
            destinationInput.value = data[0].display_name;
        }

    } catch (e) {
        console.log(e);
    }

});

async function showRoute(pickup, destination) {

    const pickupCoord = await getCoordinates(pickup);
    const destinationCoord = await getCoordinates(destination);

    if (window.map) {
        window.map.remove();
    }

    window.map = L.map('map').setView(
        [pickupCoord[1], pickupCoord[0]], 12
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(window.map);

    L.marker([pickupCoord[1], pickupCoord[0]])
        .addTo(window.map)
        .bindPopup("Pickup");

    L.marker([destinationCoord[1], destinationCoord[0]])
        .addTo(window.map)
        .bindPopup("Destination");

    const res = await fetch(
`https://api.heigit.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${pickupCoord[0]},${pickupCoord[1]}&end=${destinationCoord[0]},${destinationCoord[1]}`
);

    const data = await res.json();

    const coords = data.features[0].geometry.coordinates.map(c => [c[1], c[0]]);

    L.polyline(coords, {
        color: "blue",
        weight: 5
    }).addTo(window.map);

    window.map.fitBounds(L.polyline(coords).getBounds());
}