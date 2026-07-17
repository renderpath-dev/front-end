// Goal:
// Play a short generated tone with Web Audio API.

const playToneButtonElement = document.querySelector('#play-tone-button');

playToneButtonElement.addEventListener('click', () => {
  const audioContext = new AudioContext();
  const oscillatorNode = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillatorNode.frequency.value = 440;
  gainNode.gain.value = 0.1;

  oscillatorNode.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillatorNode.start();
  oscillatorNode.stop(audioContext.currentTime + 0.3);
});
