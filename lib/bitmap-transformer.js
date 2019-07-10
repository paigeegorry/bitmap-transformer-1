const BitmapHeader = require('./bitmap-header');
const PixelReader = require('./pixel-reader');

class BitmapTransform {
  constructor(buffer) {
    this.buffer = buffer;
    this.header = new BitmapHeader(buffer);
  }

  transform(fn, callback) {

    // 1. Create a PixelReader and subscribe to "color" and "end" events
    const pixelReader = new PixelReader({ bitsPerPixel: this.header.bitsPerPixel });
    pixelReader.on('color', ({ offset, ...color }) => {
      const { r, g, b } = fn(color);
      this.buffer.writeUInt8(r, this.header.pixelOffset + offset);
      this.buffer.writeUInt8(g, this.header.pixelOffset + offset + 1);
      this.buffer.writeUInt8(b, this.header.pixelOffset + offset + 2);
    });
    pixelReader.on('end', () => {
      callback();
    });
    // 2. Find the right place (offset) in the buffer from which to start your loop.
    //      HINT: use buffer.slice(offset) to create a "zero" based buffer you can pass to PixelReader
    const pixels = this.buffer.slice(this.header.pixelOffset);
    pixelReader.read(pixels);
    // 3. On the "color" event,
    //      a. run the evented color through the supplied transform function `fn` to get the new color
    //      b. write the new color values to the buffer using the `offset` property
    //         of the color. Remember to write to the "sliced" buffer!
    // 4. On the "end" event - Call the callback to indicate the transform is complete
    // 5. Call the "read" method passing in the sliced buffer


  }
}

module.exports = BitmapTransform;
