const fs = require('fs');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');

describe('bitmap file transformer', () => {
  let buffer = null;
  let expectedTransformedBuffer = null;

  beforeEach(done => {
    fs.readFile('./test/test-bitmap.bmp', (err, data) => {
      buffer = data;
      done();
    });
  });

  beforeEach(done => {
    fs.readFile('./test/inverted-bitmap.bmp', (err, data) => {
      expectedTransformedBuffer = data;
      done();
    });
  });

  // "pinning" test, or "snapshot" test
  it('test whole transform', done => {
    // Use the BitmapTransformer class,
    // passing in the buffer from the file read
    const bitmap = new BitmapTransformer(buffer);

    // Call .transform(), which will modify the buffer.
    // With this api, you pass in a transformation function (we are testing with "invert")
    bitmap.transform(invert, err => {
      if(err) return done(err);

      // After above step, the buffer has been modified
      // and is accessible via bitmap.buffer.

      // Read the output file we saved earlier as the "standard" expected output file.
      const expected = fs.readFileSync('./test/inverted-expected.bmp');
      expect(bitmap.buffer).toEqual(expected);
      done();

      // If you don't have a standard file yet, or need to update or are adding new test,
      // you can write it out by commenting above code block, and uncomment code below
      // that writes the file and then visually inspect the file for correctness.
      // return fs.writeFileSync('./test/inverted-expected.bmp', bitmap.buffer);
    });

  });
});
