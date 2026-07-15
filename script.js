// Fare Estimator
function estimateFare() {

const distance = parseFloat(document.querySelectorAll("input")[2].value);

if (isNaN(distance) || distance <= 0) {
    alert("Please enter a valid distance.");
    return;
}

const baseFare = 50;
const perKm = 15;

const total = baseFare + (distance * perKm);

alert("Estimated Fare: ₹" + total);

}

// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

if(navLinks.style.display==="flex"){

navLinks.style.display="none";

}else{

navLinks.style.display="flex";
navLinks.style.flexDirection="column";
navLinks.style.position="absolute";
navLinks.style.top="70px";
navLinks.style.right="20px";
navLinks.style.background="#111";
navLinks.style.padding="20px";
navLinks.style.borderRadius="10px";
navLinks.style.gap="15px";

}

});

}