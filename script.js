// ===============================
// KOSI RIDE - script.js
// ===============================

// Fare Calculator + WhatsApp Booking
function estimateFare() {

    const pickup = document.getElementById("pickup").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const distance = parseFloat(document.getElementById("distance").value);

    if (!pickup || !destination || isNaN(distance) || distance <= 0) {
        alert("Please fill all details.");
        return;
    }

    const fare = 80 + (distance * 15);

    const msg =
`🚖 KOSI RIDE Booking

📍 Pickup: ${pickup}
📍 Destination: ${destination}
🛣 Distance: ${distance} KM
💰 Estimated Fare: ₹${fare}`;

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