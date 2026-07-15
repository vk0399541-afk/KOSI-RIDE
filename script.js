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