const song = document.getElementById("song");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const message = document.getElementById("message");
const toggleBtn = document.getElementById("toggleBtn");
const cover = document.getElementById("cover");
const subtitle = document.getElementById("subtitle");
const titleTag = document.getElementById("title");

let isPlaying = false;
let currentSong = 0;

/* SONG LIST */
const songs = [
    {
        src: "music/dandoline.mp3",
        cover: "images/dandoline.jpeg",
        title: "Dandelions",
        artist: "Ruth B ‧ 2017",
        bg: "images/p1.jpg",
        accent: "#f472b6",
        quote: "You make simple things feel a little magical ✨"
    },
    {
        src: "music/tu haile aavi aave.mp3",
        cover: "images/tu haiye.jpg",
        title: "Tu Haiye Hali Aave",
        artist: "Jigardan Gadhavi",
        bg: "images/tu haiye.jpg",
        accent: "#3b82f6", // Pop Blue
        quote: "Tari vaat ma ek alag warmth che ❤️"
    }
];

/* Load song */
function loadSong(index) {
    if (!songs[index]) return;

    song.src = songs[index].src;
    song.load(); // Prepare the audio for instant playback
    cover.src = songs[index].cover;

    // Bold Title and Artist Name
    titleTag.innerHTML = `<strong>${songs[index].title}</strong>`;
    subtitle.innerText = songs[index].artist;

    // Show Quote Immediately (Even before play)
    message.innerText = songs[index].quote;

    // Dynamic Theming - Quoting URL for paths with spaces
    document.documentElement.style.setProperty('--song-bg', `url("${songs[index].cover}")`);
    document.documentElement.style.setProperty('--accent-color', songs[index].accent);
}

// Initial load
loadSong(0);

/* Switching songs */
function changeSong(index) {
    currentSong = index;
    loadSong(index);
    
    // New: Always reset to paused state when changing songs
    song.pause();
    isPlaying = false;
    toggleBtn.innerText = "▶";
}

/* Play/Pause control */
function togglePlay() {
    if (isPlaying) {
        song.pause();
        toggleBtn.innerText = "▶";
    } else {
        song.play();
        toggleBtn.innerText = "⏸";
    }
    isPlaying = !isPlaying;
}

// Remove the complex visualizer code that was blocking the sound
function setupVisualizer() {}
function draw() {
    // Keep the pulse subtle but static since we're not using audio data anymore
    document.documentElement.style.setProperty('--pulse-opacity', 0.15);
}
draw();

/* Update progress */
song.addEventListener("timeupdate", () => {
    if (song.duration) {
        let percent = (song.currentTime / song.duration) * 100;
        progress.style.width = percent + "%";

        current.innerText = formatTime(song.currentTime);
        duration.innerText = formatTime(song.duration);

        updateMessage(song.currentTime);
    }
});

/* Swipe handling */
let startX = 0;
const card = document.querySelector(".card");

card.addEventListener("mousedown", (e) => { startX = e.clientX; e.preventDefault(); });
card.addEventListener("mouseup", (e) => {
    let diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSong(); else prevSong();
    }
});

card.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });
card.addEventListener("touchend", (e) => {
    let diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSong(); else prevSong();
    }
});

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    animateAndLoad("left");
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    animateAndLoad("right");
}

function animateAndLoad(dir) {
    card.style.transform = dir === "left" ? "translateX(-20px) rotate(-1deg)" : "translateX(20px) rotate(1deg)";
    setTimeout(() => {
        card.style.transform = "translateX(0) rotate(0)";
        changeSong(currentSong);
    }, 200);
}

function seek(e) {
    let width = e.currentTarget.clientWidth;
    let clickX = e.offsetX;
    song.currentTime = (clickX / width) * song.duration;
}

function formatTime(t) {
    let m = Math.floor(t / 60);
    let s = Math.floor(t % 60);
    return m + ":" + (s < 10 ? "0" + s : s);
}

/* Specific Quotes logic */
function updateMessage(t) {
    if (t < 15) {
        message.innerText = songs[currentSong].quote;
    } else if (t < 35) {
        message.innerText = currentSong === 0 ? "Everything feels better when you're around ❤️" : "Tari sathe badhu j unique lage che 😊";
    } else {
        message.innerText = currentSong === 0 ? "You're genuinely special ✨" : "Aa pal hamesha yad raheshe 💫";
    }
}

song.onended = () => { isPlaying = false; toggleBtn.innerText = "▶"; };