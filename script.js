koolfunction estimateFare() {
    let pickup = document.getElementById("pickup").value;
    let destination = document.getElementById("destination").value;
    let distance = parseFloat(document.getElementById("distance").value);

    if (!pickup || !destination || isNaN(distance) || distance <= 0) {
        alert("Please fill all details.");
        return;
    }

    let fare = 80 + (distance * 15);

   const msg = `🚖 KOSI RIDE Booking

Pickup: ${pickup}
Destination: ${destination}
Distance: ${km} KM
Estimated Fare: ₹${fare}`;
window.open(
  "https://wa.me/911111111111?text=" + encodeURIComponent(msg),
  "_blank"
);
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
// Navbar Shadow
window.addEventListener("scroll",function(){
const nav=document.querySelector("nav");
if(window.scrollY>50){
nav.style.boxShadow="0 5px 20px rgba(255,215,0,.25)";
}else{
nav.style.boxShadow="none";
}
});
// Premium Scroll Animation
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";
        }
    });
},{threshold:0.15});

document.querySelectorAll("section,.service-card,.booking-card,.review-card").forEach(el=>{
    el.style.opacity="0";
    el.style.transform="translateY(60px)";
    el.style.transition="all 0.8s ease";
    observer.observe(el);
});
window.addEventListener("load",function(){

setTimeout(function(){

document.getElementById("loader").style.opacity="0";

setTimeout(function(){

document.getElementById("loader").style.display="none";

},700);

},1800);

});
window.addEventListener("load", function () {
    setTimeout(function () {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            loader.style.pointerEvents = "none";

            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    }, 1800);
});