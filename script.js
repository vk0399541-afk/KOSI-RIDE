function estimateFare() {
    const km = document.querySelector('input[type="number"]').value;

    if (!km || km <= 0) {
        alert("Please enter distance.");
        return;
    }

    const fare = km * 15;

    alert("Estimated Fare: ₹" + fare);

    const pickup = document.querySelectorAll("input")[0].value;
    const destination = document.querySelectorAll("input")[1].value;

    const msg =
`🚖 KOSI RIDE Booking

Pickup: ${pickup}
Destination: ${destination}
Distance: ${km} KM

Estimated Fare: ₹${fare}`;

    window.open("https://wa.me/91YOURNUMBER?text=" + encodeURIComponent(msg));
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