// JavaScript
const apiUrl = 'http://localhost:5660/partysongs';

async function fetchSongs() {
  try {
    const response = await fetch(apiUrl);
    const songs = await response.json();
    return songs;
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

async function displaySongs() {
  const songListElement = document.getElementById('songList');
  const songs = await fetchSongs();

  songs.forEach(song => {
    const songElement = document.createElement('div');
    songElement.textContent = `${song.title} - ${song.artist}`;
    songElement.addEventListener('click', () => playAudio(song.audioUrl));
    songListElement.appendChild(songElement);
  });
}

function playAudio(audioUrl) {
  const audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.src = audioUrl;
  audioPlayer.play();
}

displaySongs();
