export default class AccelerometerTracker {
  constructor(proxiedPosition) {
    // cache DOM element references
    this.debugBox = document.querySelector("#debug-values");

    // use externally proxied proxiedPosition object so updates can be tracked
    this.proxiedPosition = proxiedPosition;
  }

  async init() {
    DeviceMotionEvent.requestPermission().then((response) => {
      if (response == "granted") {
        this.initAccelerometer();
        this.detectPosition();
        this.initDebug();
      }
    });
  }

  initAccelerometer() {
    window.addEventListener("deviceorientation", (event) =>
      this.detectPosition(event)
    );
  }

  // check position on device motion
  async detectPosition(event) {
    let xDegrees, yDegrees, xDegreeRange, yDegreeRange, xRange, yRange;

    // get initial X/Y coords
    if (screen.orientation.type.includes("portrait")) {
      xDegrees = event.gamma; // from -90 to 90
      yDegrees = event.beta; // from -180 to 180
      xDegreeRange = { min: -45, max: 45 };
      yDegreeRange = { min: 20, max: 70 };
      xRange = { min: -400, max: 400 };
      yRange = { min: 600, max: -50 };
    } else if (screen.orientation.type.includes("landscape-primary")) {
      xDegrees = event.beta; // from -90 to 90
      yDegrees = -event.gamma; // from -180 to 180 (note, reverse)
      xDegreeRange = { min: -45, max: 45 };
      yDegreeRange = { min: 20, max: 70 };
      xRange = { min: 300, max: 800 };
      yRange = { min: 100, max: -100 };
    } else if (screen.orientation.type.includes("landscape-secondary")) {
      xDegrees = -event.beta; // from -90 to 90 (note, reverse)
      yDegrees = event.gamma; // from -180 to 180
      xDegreeRange = { min: -45, max: 45 };
      yDegreeRange = { min: 20, max: 70 };
      xRange = { min: 300, max: 800 };
      yRange = { min: 100, max: -100 };
    }

    // clamp to a realistic range for a typical user
    const x = this.clamp(xDegrees, xDegreeRange.min, xDegreeRange.max);
    const y = this.clamp(yDegrees, yDegreeRange.min, yDegreeRange.max);

    // convert position to point in x/y range
    this.proxiedPosition.x =
      xRange.min +
      ((x - xDegreeRange.min) * (xRange.max - xRange.min)) /
        (xDegreeRange.max - xDegreeRange.min);
    this.proxiedPosition.y =
      yRange.min +
      ((y - yDegreeRange.min) * (yRange.max - yRange.min)) /
        (yDegreeRange.max - yDegreeRange.min);

    this.debugCurrentProxiedPosition(xDegrees, yDegrees, x, y);
  }

  // clamp number to a range
  clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  // ---

  initDebug() {
    const debugBtn = document.querySelector("#debug-toggle");
    debugBtn.addEventListener("click", () => {
      const debugEl = document.querySelector("#debug-panel");
      debugEl.classList.toggle("open");
      debugBtn.classList.toggle("active");
      this.isDebugging = !this.isDebugging;
    });
  }

  debugCurrentProxiedPosition(xDegrees, yDegrees, x, y) {
    if (this.isDebugging) {
      this.debugBox.innerHTML = `
            X°: ${xDegrees.toFixed(2)}<br>
            Y°: ${yDegrees.toFixed(2)}<br>
            ---------------<br>
            X: ${x.toFixed(2)}<br>
            Y: ${y.toFixed(2)}<br>
            ---------------<br>
            Pos X: ${this.proxiedPosition.x}<br>
            Pos Y: ${this.proxiedPosition.y}
          `;
    }
  }
}
