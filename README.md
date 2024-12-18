# Parallax Tracker

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

Two experiments with parallax animation of CSS layers, based on tracking - one with `getUserMedia` and face detection, the other using a mobile device's accelerometer.

The two experiments are based on the same concept, scrolling layers of content depending on where the detected face is located, or how the device is oriented.


## Dependencies

There are no dependencies to install, everything needed to run the experiment is stored locally.

The following external libraries have been used:

- [Face API](https://justadudewhohacks.github.io/face-api.js/docs/) - for face detection

The pictures were generated by Chatty Jeeps.


## Demos

The two web pages (face and accel) need to be run through a web server in order to access the webcam.

To fire up a simple webserver on macOS, run the following command from the relevant directory:

```sh
python3 -m http.server
```

Demos are available here:

- [https://orangespaceman.github.io/parallax-tracker/face](https://orangespaceman.github.io/parallax-tracker/face)
- [https://orangespaceman.github.io/parallax-tracker/accel](https://orangespaceman.github.io/parallax-tracker/accel)

---

![](./face/images/screenshot.jpg)

---

 DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
