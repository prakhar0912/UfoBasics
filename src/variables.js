
let eventHandler, time;
let assetData = {}
let camera, renderer, scene, composer, followCam
let world, groundMaterial, dummyMaterial, wheelMaterial, rampMaterial
let helper;
let ufo, ok;
let keyPressed = {}, up, stoptween, forwardflag = true;
let enginePower = 3;