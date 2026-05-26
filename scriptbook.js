// 2. Background Slider (Every 5 Seconds)
const hero = document.getElementById('hero-slider');
if (hero) {
    const images = [
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-15567342049-0cfed4f6a45d?auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec?auto=format&fit=crop&w=1350&q=80'
    ];
    let idx = 0;
    function rotateBg() {
        hero.style.backgroundImage = `linear-gradient(rgba(0,46,91,0.7), rgba(0,46,91,0.7)), url('${images[idx]}')`;
        idx = (idx + 1) % images.length;
    }
    rotateBg();
    setInterval(rotateBg, 5000);
}

// 3. Plan Auto-Title on Booking Page
const params = new URLSearchParams(window.location.search);
const plan = params.get('plan');
if (plan && document.getElementById('form-title')) {
    document.getElementById('form-title').innerText = "Booking: " + plan.toUpperCase() + " Plan";
}

// 4. Booking Form Submission (Google Sheets Link)
const bookingForm = document.getElementById('bookingForm');
const scriptURL = 'https://script.google.com/macros/s/AKfycbw5GS57QCZ2U9FA0DoQHjzTHBkXC1z2t6EmPDQdXIs7qM8mIOlDFrQAqygH06i43qVf8A/exec'; // PASTE YOUR URL HERE

if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.innerText = "Sending...";
        btn.disabled = true;

        fetch(scriptURL, { 
            method: 'POST', 
            mode: 'no-cors',
            body: JSON.stringify({
                fullName: document.getElementById('userName').value,
                phone: document.getElementById('userMobile').value,
                email: document.getElementById('userEmail').value,
                city: document.getElementById('userLocation').value,
                plan: plan || 'General'
            })
        })
        .then(() => {
            alert("Success! The Admin has received your details.");
            bookingForm.reset();
            btn.innerText = "Request a Call Back";
            btn.disabled = false;
        })
        .catch(() => {
            alert("Error saving data.");
            btn.disabled = false;
        });
    });
}

