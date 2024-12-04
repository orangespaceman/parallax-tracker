import AccelerometerTracker from "./accelerometer-tracker.js";
import Parallax from "./parallax.js";

// ----

async function init() {
  // draw and animate layers
  const parallax = new Parallax();

  // proxy the position from the tracker so we can watch for changes
  const trackedPosition = { x: 0, y: 0 };
  const proxiedPosition = new Proxy(trackedPosition, {
    set(target, prop, value) {
      parallax.updatePosition(trackedPosition);
      target[prop] = value;
      return true;
    },
  });

  const startEl = document.querySelector(".start");
  if (!DeviceMotionEvent.requestPermission) {
    startEl.textContent = "No accelerometer support :(";
  } else {
    startEl.addEventListener("click", (e) => {
      e.preventDefault();
      startEl.classList.add("is-started");
      const accelerometerTracker = new AccelerometerTracker(proxiedPosition);
      accelerometerTracker.init();
    });
  }
}

init();
