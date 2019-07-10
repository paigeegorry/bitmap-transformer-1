const grayscale = ({ r, g, b }) => {
  const average = (r + g + b) / 3;
  
  return {
    r: average,
    g: average,
    b: average
  };
};

module.exports = grayscale;
