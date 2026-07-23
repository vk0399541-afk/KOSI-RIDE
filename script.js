/* ==========================================
   KOSI RIDE ULTRA LUXURY V5
   PREMIUM SCRIPT
   PART 1
========================================== */

/* ================= CONFIG ================= */

const CONFIG = {

WHATSAPP: "911111111111",

SUPPORT: "+911111111111",

FARE:{

bike:10,

mini:16,

sedan:20,

suv:28,

luxury:45

},

BASE_FARE:50

};

/* ================= GLOBAL ================= */

let map;

let pickupMarker;

let destinationMarker;

let routeLine;

let pickupCoords=null;

let destinationCoords=null;

let currentFare=0;

let currentDistance=0;

let currentETA=0;

let currentDriver=null;

/* ================= LOADER ================= */

window.addEventListener("load",()=>{

setTimeout(()=>{

const loader=document.getElementById("loader");

loader.style.opacity="0";

loader.style.visibility="hidden";

loader.style.transition=".8s";

},1800);

});

/* ================= MOBILE MENU ================= */

const menuBtn=document.querySelector(".menu-btn");

const navLinks=document.querySelector(".nav-links");

menuBtn.onclick=()=>{

navLinks.classList.toggle("active");

};

/* ================= SCROLL TOP ================= */

window.addEventListener("scroll",()=>{

const btn=document.querySelector(".scroll-top");

if(window.scrollY>300){

btn.style.display="flex";

}else{

btn.style.display="none";

}

});

/* ================= MAP ================= */

function initMap(){

map=L.map("map").setView([25.7771,86.4834],13);

L.tileLayer(

"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

{

attribution:"© OpenStreetMap"

}

).addTo(map);

}

window.addEventListener("load",()=>{

setTimeout(()=>{

if(document.getElementById("map")){

initMap();

}

},2000);

});

/* ================= CURRENT LOCATION ================= */

const locationBtn=document.getElementById("locationBtn");

if(locationBtn){

locationBtn.onclick=()=>{

if(!navigator.geolocation){

alert("Location Not Supported");

return;

}

navigator.geolocation.getCurrentPosition(

success=>{

const lat=success.coords.latitude;

const lng=success.coords.longitude;

pickupCoords=[lat,lng];

document.getElementById("pickup").value=

"Current Location";

if(pickupMarker){

map.removeLayer(pickupMarker);

}

pickupMarker=L.marker([lat,lng])

.addTo(map)

.bindPopup("Pickup")

.openPopup();

map.setView([lat,lng],15);

},

()=>{

alert("Please Allow Location Permission");

}

);

};

}

/* ================= DRIVER LIST ================= */

const drivers=[

{

name:"Rahul Kumar",

car:"Maruti Dzire",

number:"BR19AB4587",

rating:"4.9 ⭐"

},

{

name:"Aman Singh",

car:"Hyundai Aura",

number:"BR11XY8876",

rating:"4.8 ⭐"

},

{

name:"Rohit Raj",

car:"Toyota Innova",

number:"BR09AA1111",

rating:"5.0 ⭐"

},

{

name:"Vikash Kumar",

car:"Mahindra XUV700",

number:"BR10VIP001",

rating:"5.0 ⭐"

}

];

/* ================= END OF PART 1 ================= */
/* ==========================================
   KOSI RIDE ULTRA LUXURY V5
   PREMIUM SCRIPT
   PART 2
========================================== */

/* ================= ESTIMATE FARE ================= */

async function estimateFare(){

const pickup=document.getElementById("pickup").value.trim();

const destination=document.getElementById("destination").value.trim();

if(pickup===""||destination===""){

alert("Please Enter Pickup & Destination");

return;

}

/* ---------- Demo Distance (Until API Added) ---------- */

currentDistance=(Math.random()*25+2).toFixed(1);

currentETA=Math.round(currentDistance*3);

/* ---------- Vehicle ---------- */

const cab=document.getElementById("cabType").value;

const rate=CONFIG.FARE[cab];

currentFare=Math.round(

(CONFIG.BASE_FARE)+(currentDistance*rate)

);

/* ---------- Promo ---------- */

const promo=document.getElementById("promoCode").value.trim().toUpperCase();

if(promo==="KOSI100"){

currentFare=Math.max(currentFare-100,0);

}

if(promo==="SAVE50"){

currentFare=Math.max(currentFare-50,0);

}

/* ---------- Update UI ---------- */

document.getElementById("distanceText").innerHTML=

currentDistance+" KM";

document.getElementById("fareText").innerHTML=

"₹"+currentFare;

document.getElementById("etaText").innerHTML=

currentETA+" Min";

/* ---------- Dummy Destination ---------- */

destinationCoords=[

pickupCoords?pickupCoords[0]+0.03:25.80,

pickupCoords?pickupCoords[1]+0.03:86.52

];

/* ---------- Draw Route ---------- */

drawRoute();

/* ---------- Driver ---------- */

assignDriver();

}

/* ================= DRAW ROUTE ================= */

function drawRoute(){

if(!map)return;

if(routeLine){

map.removeLayer(routeLine);

}

if(destinationMarker){

map.removeLayer(destinationMarker);

}

if(!pickupCoords){

pickupCoords=[25.7771,86.4834];

}

destinationMarker=L.marker(destinationCoords)

.addTo(map)

.bindPopup("Destination");

routeLine=L.polyline(

[

pickupCoords,

destinationCoords

],

{

color:"#FFD700",

weight:6

}

).addTo(map);

map.fitBounds(routeLine.getBounds());

}

/* ================= DRIVER ================= */

function assignDriver(){

currentDriver=

drivers[Math.floor(Math.random()*drivers.length)];

document.getElementById("driverName").innerHTML=

currentDriver.name;

document.getElementById("driverRating").innerHTML=

currentDriver.rating;

document.getElementById("driverCar").innerHTML=

"Vehicle : "+currentDriver.car;

document.getElementById("driverNumber").innerHTML=

"Number : "+currentDriver.number;

/* OTP */

const otp=

Math.floor(1000+Math.random()*9000);

document.getElementById("rideOtp").innerHTML=

otp;

/* Status */

document.getElementById("bookingStatus").innerHTML=

"🚖 Driver Assigned Successfully";

}

/* ================= COMPLETE BOOKING ================= */

function completeBooking(){

estimateFare();

setTimeout(()=>{

startTracking();

},2000);

}

/* ================= END OF PART 2 ================= */
/* ==========================================
   KOSI RIDE ULTRA LUXURY V5
   PREMIUM SCRIPT
   PART 3
========================================== */

/* ================= LIVE TRACKING ================= */

function startTracking(){

const status=document.getElementById("bookingStatus");

const steps=[

"🚖 Driver Accepted Ride",

"📍 Driver Is Coming",

"🚕 Driver Reached Pickup",

"🟢 Ride Started",

"🏁 Ride Completed"

];

let i=0;

const timer=setInterval(()=>{

status.innerHTML=steps[i];

i++;

if(i>=steps.length){

clearInterval(timer);

showNotification("Ride Completed Successfully ✅");

}

},5000);

}

/* ================= WHATSAPP BOOKING ================= */

function sendWhatsAppBooking(){

if(!currentDriver){

alert("Book Ride First");

return;

}

const bookingId="KR"+Date.now().toString().slice(-6);

const pickup=document.getElementById("pickup").value;

const destination=document.getElementById("destination").value;

const date=document.getElementById("rideDate").value;

const time=document.getElementById("rideTime").value;

const payment=document.getElementById("paymentMethod").value;

const message=`🚖 *KOSI RIDE BOOKING*

🆔 Booking ID : ${bookingId}

📍 Pickup : ${pickup}

📍 Destination : ${destination}

🚘 Vehicle : ${currentDriver.car}

👨 Driver : ${currentDriver.name}

⭐ Rating : ${currentDriver.rating}

📅 Date : ${date}

🕒 Time : ${time}

📏 Distance : ${currentDistance} KM

💰 Fare : ₹${currentFare}

💳 Payment : ${payment}`;

window.open(

`https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(message)}`,

"_blank"

);

saveRideHistory({

id:bookingId,

pickup,

destination,

fare:currentFare,

driver:currentDriver.name,

date,

time

});

}

/* ================= GOOGLE MAP ================= */

function openGoogleMaps(){

const pickup=document.getElementById("pickup").value;

const destination=document.getElementById("destination").value;

if(!pickup||!destination){

alert("Enter Pickup & Destination");

return;

}

window.open(

`https://www.google.com/maps/dir/${encodeURIComponent(pickup)}/${encodeURIComponent(destination)}`,

"_blank"

);

}

/* ================= HISTORY ================= */

function saveRideHistory(ride){

let history=

JSON.parse(localStorage.getItem("kosiRideHistory"))||[];

history.unshift(ride);

localStorage.setItem(

"kosiRideHistory",

JSON.stringify(history)

);

}

function loadRideHistory(){

const container=document.getElementById("bookingHistory");

if(!container)return;

let history=

JSON.parse(localStorage.getItem("kosiRideHistory"))||[];

if(history.length===0){

container.innerHTML="<p>No Ride History</p>";

return;

}

container.innerHTML="";

history.forEach(item=>{

container.innerHTML+=`

<div class="history-card">

<h4>${item.id}</h4>

<p>${item.pickup}</p>

<p>⬇</p>

<p>${item.destination}</p>

<p><strong>₹${item.fare}</strong></p>

<p>${item.date} ${item.time}</p>

</div>

`;

});

}

function openHistory(){

document.querySelector(".history-page").style.display="flex";

loadRideHistory();

}

function closeHistory(){

document.querySelector(".history-page").style.display="none";

}

/* ================= NOTIFICATION ================= */

function showNotification(text){

const div=document.createElement("div");

div.className="notification";

div.innerHTML=text;

document.body.appendChild(div);

setTimeout(()=>{

div.classList.add("show");

},100);

setTimeout(()=>{

div.remove();

},4000);

}

/* ================= SOS ================= */

const sos=document.querySelector(".sos-btn");

if(sos){

sos.onclick=()=>{

window.location.href="tel:112";

};

}

/* ================= AUTO LOAD ================= */

window.onload=()=>{

loadRideHistory();

};

/* ================= BOOK BUTTON ================= */

const bookBtn=document.querySelector(".book-btn");

if(bookBtn){

bookBtn.addEventListener("click",()=>{

completeBooking();

setTimeout(()=>{

sendWhatsAppBooking();

},2500);

});

}

/* ================= END OF SCRIPT.JS ================= */
// ================= INSTALL APP =================

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.createElement("button");

    installBtn.innerHTML = "📲 Install KOSI RIDE";

    installBtn.id = "installAppBtn";

    document.body.appendChild(installBtn);

    installBtn.onclick = async () => {

        installBtn.style.display = "none";

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        deferredPrompt = null;

    };

});