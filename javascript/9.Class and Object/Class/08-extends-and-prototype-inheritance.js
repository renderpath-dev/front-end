'use strict';

// Goal:
// Show how extends connects subclass and parent class prototype chains.

class MediaAssetBase {
  constructor(assetTitle) {
    this.assetTitle = assetTitle;
  }

  renderMediaSummary() {
    return `Media asset: ${this.assetTitle}`;
  }
}

class VideoClipAsset extends MediaAssetBase {
  constructor(assetTitle, durationSeconds) {
    super(assetTitle);
    this.durationSeconds = durationSeconds;
  }

  calculateDurationText() {
    return `${this.durationSeconds} seconds`;
  }
}

const videoClipAsset = new VideoClipAsset('Launch Trailer', 95);

console.log(videoClipAsset.renderMediaSummary());
console.log(videoClipAsset.calculateDurationText());
console.log(videoClipAsset instanceof VideoClipAsset);
console.log(videoClipAsset instanceof MediaAssetBase);
console.log(videoClipAsset instanceof Object);
console.log(videoClipAsset instanceof Array);

// The instance prototype points to the child prototype.
console.log(Object.getPrototypeOf(videoClipAsset) === VideoClipAsset.prototype);

// The child prototype points to the parent prototype.
console.log(Object.getPrototypeOf(VideoClipAsset.prototype) === MediaAssetBase.prototype);
console.log(MediaAssetBase.prototype.isPrototypeOf(videoClipAsset));

// A subclass without its own constructor automatically forwards arguments to super.
class AudioAssetRecord extends MediaAssetBase {
  createAudioSummary() {
    return `Audio item: ${this.assetTitle}`;
  }
}

const audioAssetRecord = new AudioAssetRecord('Intro Theme');
console.log(audioAssetRecord.renderMediaSummary());
console.log(audioAssetRecord.createAudioSummary());
console.log(audioAssetRecord instanceof AudioAssetRecord);
console.log(audioAssetRecord instanceof MediaAssetBase);

// A plain object with the same properties is not automatically an instance.
const mediaLikeObject = {
  assetTitle: 'Launch Trailer',
  durationSeconds: 95,
};

console.log(mediaLikeObject instanceof VideoClipAsset);

// Manual prototype changes affect instanceof, but this is usually bad for performance and clarity.
Object.setPrototypeOf(mediaLikeObject, VideoClipAsset.prototype);
console.log(mediaLikeObject instanceof VideoClipAsset);
console.log(typeof mediaLikeObject.calculateDurationText);
