function initAudioPlayer() {
    let audio = document.getElementById('bg-music');
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'bg-music';
        audio.loop = true;
        audio.setAttribute('data-turbo-permanent', 'true');
        const source = document.createElement('source');
        source.src = 'src/assets/wedding-music.mp3';
        source.type = 'audio/mpeg';
        audio.appendChild(source);
        document.body.appendChild(audio);
    }

    const toggleBtn = document.getElementById('audio-toggle');
    if (!toggleBtn) return;

    // Remove old listeners to prevent duplicates across turbo loads
    const newToggleBtn = toggleBtn.cloneNode(true);
    toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);
    
    // Default to paused to comply with browser autoplay policies, unless user previously unmuted
    let isPaused = true;
    const storedState = localStorage.getItem('wedding_audio_paused');
    if (storedState === 'false') {
        isPaused = false;
    }
    
    function updateIcon(paused) {
        if (paused) {
            // Mute/Pause Icon (speaker with X)
            newToggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="audio-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
        } else {
            // Unmute/Play Icon (speaker with waves)
            newToggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="audio-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
        }
    }

    updateIcon(isPaused);

    // If it shouldn't be paused, play it
    if (!isPaused && audio.paused) {
        audio.play().catch(e => {
            console.log("Autoplay blocked.");
            localStorage.setItem('wedding_audio_paused', 'true');
            updateIcon(true);
        });
    }

    newToggleBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(e => console.log(e));
            localStorage.setItem('wedding_audio_paused', 'false');
            updateIcon(false);
        } else {
            audio.pause();
            localStorage.setItem('wedding_audio_paused', 'true');
            updateIcon(true);
        }
    });
}

document.addEventListener('DOMContentLoaded', initAudioPlayer);
document.addEventListener('turbo:load', initAudioPlayer);
