// Smooth music start
function enterWorld() {
    let music = document.getElementById("bgMusic");
    music.volume = 0;
    music.play();

    // Fade in sound
    let vol = 0;
    let fade = setInterval(() => {
        if (vol < 1) {
            vol += 0.05;
            music.volume = vol;
        } else {
            clearInterval(fade);
        }
    }, 200);

    // Add visual fade out
    document.body.classList.add("fade-out");

    // Redirect after animation and sound fade
    setTimeout(() => {
        window.location.href = "reasons.html";
    }, 400);
}

// Particles
const container = document.querySelector(".particles");

if (container) {
    for (let i = 0; i < 60; i++) {
        let p = document.createElement("span");
        p.style.left = Math.random() * 100 + "vw";
        p.style.animationDuration = (5 + Math.random() * 10) + "s";
        container.appendChild(p);
    }
}
