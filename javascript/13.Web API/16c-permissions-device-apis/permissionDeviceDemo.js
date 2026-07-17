// Goal:
// Inspect permission-gated browser APIs.

const checkPermissionButton = document.querySelector(
  '#check-permission-button',
);
const locationButton = document.querySelector('#location-button');
const cameraButton = document.querySelector('#camera-button');
const notifyButton = document.querySelector('#notify-button');
const shareButton = document.querySelector('#share-button');

const permissionOutput = document.querySelector('#permission-output');
const locationOutput = document.querySelector('#location-output');
const cameraPreview = document.querySelector('#camera-preview');

checkPermissionButton.addEventListener('click', async () => {
  if (!navigator.permissions) {
    permissionOutput.textContent = 'Permission API is not available.';
    return;
  }

  const status = await navigator.permissions.query({ name: 'geolocation' });
  permissionOutput.textContent = `Permission state: ${status.state}`;

  status.addEventListener('change', () => {
    permissionOutput.textContent = `Permission state: ${status.state}`;
  });
});

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    locationOutput.textContent = 'Geolocation is not available.';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      locationOutput.textContent = `Location: ${latitude}, ${longitude}`;
    },
    (error) => {
      locationOutput.textContent = `Location error: ${error.message}`;
    },
  );
});

cameraButton.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    cameraPreview.srcObject = stream;
  } catch (error) {
    console.error(error);
  }
});

notifyButton.addEventListener('click', async () => {
  if (!('Notification' in window)) {
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    new Notification('Web API practice', {
      body: 'Permission was granted.',
    });
  }
});

shareButton.addEventListener('click', async () => {
  if (!navigator.share) {
    console.log('Web Share API is not available.');
    return;
  }

  await navigator.share({
    title: 'Web API practice',
    text: 'Learning browser permission boundaries.',
    url: location.href,
  });
});
