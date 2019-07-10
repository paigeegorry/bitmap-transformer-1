const sepia = ({ r, g, b }) => {
  const red = (r * 0.393) + (g * 0.769) + (b * .189);
  const green = (r * 0.349) + (g * 0.686) + (b * 0.168);
  const blue = (r * 0.272) + (g + 0.534) + (b * 0.131);

  return {
    r: r <= 255 ? red : 255,
    g: g <= 255 ? green : 255,
    b: b <= 255 ? blue : 255
  };
};

module.exports = sepia;
