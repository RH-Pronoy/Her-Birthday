document.addEventListener("DOMContentLoaded", () => {
    const countdownDate = new Date("Feb 27, 2025 20:00:00").getTime();
    const countdownDiv = document.getElementById("countdown");
    const birthdayContent = document.getElementById("birthday-content");
    const countdownContainer = document.getElementById("countdown-container");
    const giftBoxImg = document.querySelector(".gift-box img");
    const birthdayMessage = document.getElementById("birthdayMessage");

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance <= 0) {
            clearInterval(countdownTimer);
            countdownDiv.innerHTML = "Happy Birthday! 🎉";
            countdownContainer.style.display = "none";
            birthdayContent.style.display = "block";
            revealMessages();
            showAnimations();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownDiv.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown();

    function revealMessages() {
        const messages = document.querySelectorAll(".message");
        messages.forEach((msg, index) => {
            setTimeout(() => {
                msg.style.opacity = "1";
                msg.style.transform = "translateY(0)";
            }, 1000 * index);
        });

        const elementsToShow = ["photoGallery", "photoGallery2", "giftUnboxing"];
        elementsToShow.forEach((id, index) => {
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                }
            }, 500 * messages.length + (index + 1) * 800);
        });
    }

    document.body.addEventListener("click", (event) => {
        if (event.target.tagName === "IMG" && event.target.parentElement.classList.contains("gallery")) {
            openLightbox(event.target);
        } else if (event.target.closest(".gift-box")) {
            openGift();
        }
    });

    function openLightbox(image) {
        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="${image.src}" alt="Enlarged Image">
        `;
        document.body.appendChild(lightbox);

        lightbox.onclick = (event) => {
            if (event.target.classList.contains("lightbox-close") || event.target === lightbox) {
                lightbox.remove();
            }
        };
    }

    function openGift() {
        if (giftBoxImg) {
            giftBoxImg.src = "gift-open.jpg";
        }
    }

    function showAnimations() {
        function createHeart() {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.innerHTML = "💖";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 3 + 2 + "s";
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }

        setInterval(createHeart, 800);

        function createStars() {
            for (let i = 0; i < 50; i++) {
                let star = document.createElement("div");
                star.className = "star";
                star.style.left = Math.random() * 100 + "vw";
                star.style.top = Math.random() * 100 + "vh";
                star.style.animationDuration = (Math.random() * 2 + 1) + "s";
                document.body.appendChild(star);
                setTimeout(() => star.remove(), 3000);
            }
        }

        setInterval(createStars, 500);
    }

    // Smooth transition for birthday message
    setTimeout(() => {
        if (birthdayMessage) {
            birthdayMessage.style.opacity = "0";
            setTimeout(() => {
                birthdayMessage.style.display = "none";
                birthdayContent.style.display = "block";
                setTimeout(() => {
                    birthdayContent.style.opacity = "1";
                }, 100);
            }, 1000);
        }
    }, 3000);
});

function triggerFireworks() {
    console.log("Fireworks triggered!"); // Debugging

    // Get the gift image element
    const giftImg = document.getElementById("gift-img");

   
    // Create Confetti effect
    for (let i = 0; i < 30; i++) {
        let confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + "vw"; // Random position
        confetti.style.animationDuration = Math.random() * 2 + 2 + "s"; // Random falling time
        document.body.appendChild(confetti);
    }

    // Fireworks explosion
    let fireworks = document.createElement('div');
    fireworks.classList.add('fireworks');
    fireworks.style.top = "50vh"; // Explosion starts from the center
    fireworks.style.left = "50vw"; // Explosion starts from the center
    document.body.appendChild(fireworks);

    // Remove confetti and fireworks after animation
    setTimeout(() => {
        const confettis = document.querySelectorAll('.confetti');
        confettis.forEach(confetti => confetti.remove());
        fireworks.remove();
    }, 3000); // Wait for animations to finish (3 seconds)
}

// Attach event listener to the gift box
document.addEventListener("DOMContentLoaded", () => {
    const giftBox = document.querySelector(".gift-box");

    if (giftBox) {
        giftBox.addEventListener("click", triggerFireworks);
    } else {
        console.error("Gift box element not found!");
    }
});
