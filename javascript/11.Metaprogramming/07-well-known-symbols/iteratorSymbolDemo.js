// Goal:
// Make a custom object iterable with Symbol.iterator.

const playlistRecord = {
  tracks: ['intro', 'main', 'outro'],
  *[Symbol.iterator]() {
    for (const trackName of this.tracks) {
      yield trackName;
    }
  },
};

for (const trackName of playlistRecord) {
  console.log(trackName);
}
