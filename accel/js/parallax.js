export default class Parallax {
  constructor() {
    this.debugBox = document.querySelector("#debug-values");
    this.layers = document.querySelectorAll(".layer");

    this.xRange = { min: -10, max: 10 };
    this.yRange = { min: -5, max: 10 };

    this.coords = { x: 0, y: 0 };
  }

  normaliseMovement(value, range, dimension) {
    return (value / dimension) * (range.max - range.min) + range.min;
  }

  updatePosition(facePosition) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const newPos = {
      x: this.normaliseMovement(facePosition.x, this.xRange, windowWidth),
      y: this.normaliseMovement(facePosition.y, this.yRange, windowHeight),
    };

    this.layers.forEach((layer) => {
      const parallax = parseFloat(layer.dataset.parallax);
      layer.style.transform = `translate(${newPos.x * parallax}%, ${
        newPos.y * parallax
      }%)`;
    });
  }
}
