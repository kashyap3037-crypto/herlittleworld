const memoryDetails = {
    1: {
        title: "That Soft Moment 🌸",
        desc: "There’s something about your smile that feels calm and comforting.\nSimple, yet it leaves a lasting impression.\nAnd that little flower adds a softness that makes it even more beautiful."
    },
    2: {
        title: "That Traditional Look ✨",
        desc: "This traditional look just suits you perfectly. The dress, the jhumkas… everything feels just right.\nTumhe jhumke pasand hai…\naur mujhe jhumkon mein tum ❤️"
    },
    3: {
        title: "That Fake Foody Energy😏",
        desc: "Do bites ke baad hi “I’m full” 😏\nAur phir bhi foody ho?\nConfidence level = max 😂"
    },
    4: {
        title: "That Dangerous Smile 😏✨",
        desc: "There’s something about this smile… it’s hard to ignore.\nAisi smile koi dekh le…\ntoh banda seedha barbaad 😏😂"
    }
};

const viewedMemories = new Set();

let currentCardIndex = 0;
const photoCards = document.querySelectorAll('.photo-card');

function showCard(index) {
    if (window.innerWidth <= 768) {
        photoCards.forEach(card => {
            card.classList.remove('active');
            card.style.display = 'none';
        });
        photoCards[index].classList.add('active');
        photoCards[index].style.display = 'flex';
    }
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % photoCards.length;
    showCard(currentCardIndex);
}

function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + photoCards.length) % photoCards.length;
    showCard(currentCardIndex);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        showCard(0);
    }
});

function openModal(id) {
    const modal = document.getElementById("memoryModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const swiperNav = document.querySelector(".mobile-swiper-nav");

    // Hide swiper arrows with high priority when viewing memory
    if (swiperNav) {
        swiperNav.style.setProperty('display', 'none', 'important');
    }

    // Fix: Dynamically get the image source from the card that was clicked
    const clickedCard = document.querySelector(`.photo-card[onclick*="openModal(${id})"] img`);
    if (clickedCard) {
        modalImg.src = clickedCard.src;
    } else {
        // Fallback to original logic if card image isn't found
        modalImg.src = `images/${id}.jpg`;
    }

    modalTitle.innerText = memoryDetails[id].title;
    modalDesc.innerText = memoryDetails[id].desc;

    modal.style.display = "block";

    // Track unique views
    viewedMemories.add(id);
    if (viewedMemories.size === 4) {
        const finalMsg = document.getElementById("final");
        const initialMsg = document.getElementById("message");
        if (finalMsg) finalMsg.style.display = "block";
        if (initialMsg) initialMsg.style.display = "none";
    }

    // Close on outside click
    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    }
}

function closeModal() {
    document.getElementById("memoryModal").style.display = "none";
    const swiperNav = document.querySelector(".mobile-swiper-nav");
    
    // Show swiper arrows again on mobile
    if (swiperNav && window.innerWidth <= 768) {
        swiperNav.style.setProperty('display', 'flex', 'important');
    }
}

// Redirect to home
function goToHome() {
    document.body.style.opacity = 0;
    document.body.style.transition = "0.8s";
    setTimeout(() => {
        window.location.href = "index.html";
    }, 800);
}
