// Multiple valid answers
const passwords = ["kashyapl", "tame", "janu"];

const letterContent =
    ` To Jaanu urf.. Dobby The Elf
Okay… this wasn’t random 🙂✨

I just wanted to say something properly.

You’re really beautiful 💫
but not in an obvious way.
It’s more in the little things,
the way you are.

A certified foody 🍕
full-time gossip lover 🤭
and part-time gharkukdi 😄

Short height…
but somehow still impossible to ignore 😌

You act all strong and sorted outside 💪
like nothing affects you,
but I know there’s a soft heart behind all that ❤️

And honestly,
that combination… it just works ✨

You make things feel lighter 🌸
more easy,
just by being there.

And yeah…
you might not see it yet,

but you’re more special than you think ❤️`;

/* Unlock function */
function unlock() {
    const input = document.getElementById("password").value;
    const errorMsg = document.getElementById("error");

    if (passwords.includes(input.toLowerCase())) {
        // Change Background for the Letter
        document.body.style.setProperty('--bg-image', 'url("images/p4.jpg")');

        // Instant Hide/Show
        document.querySelector(".container").style.display = "none";

        const letter = document.getElementById("letter");
        letter.classList.remove("hidden");
        letter.style.display = "flex";

        // Show the whole text instantly 
        document.getElementById("text").innerHTML = letterContent;

        // Play background music
        const bgMusic = document.getElementById("bgMusic");
        if (bgMusic) {
            bgMusic.volume = 0.4;
            bgMusic.play().catch(e => console.log("Music play blocked", e));
        }

    } else {
        errorMsg.innerText = "Not quite… try a nickname? 💭";
    }
}

// Initialize background animations
createOrbs();

// Allow "Enter" key
document.getElementById("password").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        unlock();
    }
});

function createOrbs() {
    const container = document.querySelector(".bg-decorations");
    if (!container) return;

    for (let i = 0; i < 15; i++) {
        const orb = document.createElement("div");
        orb.className = "orb";

        // Random size and position
        const size = Math.random() * 150 + 100;
        orb.style.width = size + "px";
        orb.style.height = size + "px";
        orb.style.left = Math.random() * 100 + "vw";
        orb.style.top = Math.random() * 100 + "vh";

        // Random movement duration
        orb.style.animationDuration = (Math.random() * 10 + 15) + "s";
        orb.style.animationDelay = (Math.random() * -20) + "s";

        container.appendChild(orb);
    }
}