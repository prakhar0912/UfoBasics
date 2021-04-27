import CANNON from 'cannon'
import * as THREE from 'three'
import { gsap } from 'gsap/all';

let handler = (event) => {

    up = (event.type == 'keyup');

    if (!up && event.type !== 'keydown') {
        return;
    }


    vehicle.setBrake(0, 0);
    vehicle.setBrake(0, 1);
    vehicle.setBrake(0, 2);
    vehicle.setBrake(0, 3);

    switch (event.keyCode) {

        case 38: // forward
            vehicle.applyEngineForce(up ? 0 : maxForce, 2);
            vehicle.applyEngineForce(up ? 0 : maxForce, 3);
            vehicle.applyEngineForce(up ? 0 : maxForce, 0);
            vehicle.applyEngineForce(up ? 0 : maxForce, 1);
            break;

        case 40: // backward
            vehicle.applyEngineForce(up ? 0 : -maxForce, 2);
            vehicle.applyEngineForce(up ? 0 : -maxForce, 3);
            vehicle.applyEngineForce(up ? 0 : -maxForce, 0);
            vehicle.applyEngineForce(up ? 0 : -maxForce, 1);
            break;

        case 66: // b
            vehicle.setBrake(brakeForce, 0);
            vehicle.setBrake(brakeForce, 1);
            vehicle.setBrake(brakeForce, 2);
            vehicle.setBrake(brakeForce, 3);

            vehicle.applyEngineForce(0, 2);
            vehicle.applyEngineForce(0, 3);
            vehicle.applyEngineForce(0, 0);
            vehicle.applyEngineForce(0, 1);
            break;

        case 39: // right
            vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 0);
            vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 1);
            break;

        case 37: // left
            vehicle.setSteeringValue(up ? 0 : maxSteerVal, 0);
            vehicle.setSteeringValue(up ? 0 : maxSteerVal, 1);
            break;
        case 84:
            scene.remove(scene.getObjectByName('car'))
            for (let i = 0; i < 4; i++) {
                scene.remove(scene.getObjectByName('wheel' + i))
            }
            vehicle.removeFromWorld(world)
            vehicle = undefined
            addCar()
            break;
        case 16:
            vehicle.applyEngineForce(up ? 0 : maxForce + 50, 2);
            vehicle.applyEngineForce(up ? 0 : maxForce + 50, 3);
            break;

    }
}

let addCar = () => {
    let helper = new CannonHelper(scene)
    const chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.7, 1.9));
    const chassisBody = new CANNON.Body({ mass: 30, material: dummyMaterial });
    chassisBody.addShape(chassisShape);
    // chassisBody.position.set(0, 5, 0);
    chassisBody.angularVelocity.set(0, 2, 0);
    // helper.addVisual(chassisBody, 'car', undefined, 'special');
    helper.addVisual(chassisBody, 'car', undefined, 'basic')
    chassisBody.allowSleep = false;


    const options = {
        radius: 0.4,
        height: 0.25,
        suspensionStiffness: 25,
        suspensionRestLength: 0.1,
        directionLocal: new CANNON.Vec3(0, -1, 0),
        suspensionStiffness: 40,
        suspensionRestLength: 0,
        frictionSlip: 5,
        dampingRelaxation: 1.8,
        dampingCompression: 1.5,
        maxSuspensionForce: 100000,
        rollInfluence: 0.01,
        axleLocal: new CANNON.Vec3(-1, 0, 0),
        chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
        maxSuspensionTravel: 0.3,
        customSlidingRotationalSpeed: -30,
        useCustomSlidingRotationalSpeed: true
    };

    // Create the vehicle
    vehicle = new CANNON.RaycastVehicle({
        chassisBody: chassisBody,
        indexRightAxis: 0,
        indexUpAxis: 1,
        indexForwardAxis: 2
    });

    options.chassisConnectionPointLocal.set(0.7, -0.6, -1.4);
    vehicle.addWheel(options);

    options.chassisConnectionPointLocal.set(-0.7, -0.6, -1.5);
    vehicle.addWheel(options);

    options.chassisConnectionPointLocal.set(0.7, -0.6, 1.5);
    vehicle.addWheel(options);

    options.chassisConnectionPointLocal.set(-0.7, -0.6, 1.5);
    vehicle.addWheel(options);

    vehicle.addToWorld(world);


    const wheelBodies = [];
    vehicle.wheelInfos.forEach((wheel, i) => {
        const cylinderShape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 50);
        const wheelBody = new CANNON.Body({ mass: 5, material: wheelMaterial });
        const q = new CANNON.Quaternion();
        q.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
        wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
        wheelBodies.push(wheelBody);
        // helper.addVisual(wheelBody, 'wheel' + i, undefined, 'special');
        helper.addVisual(wheelBody, 'wheel' + i, undefined, 'basic');

    });


    // Update wheels
    world.addEventListener('postStep', function () {
        let index = 0;
        vehicle.wheelInfos.forEach(function (wheel) {
            vehicle.updateWheelTransform(index);
            const t = wheel.worldTransform;
            wheelBodies[index].threemesh.position.copy(t.position);
            wheelBodies[index].threemesh.quaternion.copy(t.quaternion);
            index++;
        });
    });


    window.addEventListener('keydown', handler)
    window.addEventListener('keyup', handler)
}

let heleHandler = (event) => {

    up = (event.type == 'keyup');

    if (!up && event.type !== 'keydown') {
        return;
    }

    // console.log(event.keyCode)

    switch (event.keyCode) {

        case 38: // forward
            keyPressed['forward'] = !up ? true : false
            break;

        case 40: // backward
            keyPressed['backward'] = !up ? true : false
            break;

        case 66: // b
            keyPressed['break'] = !up ? true : false
            break;

        case 39: // right
            keyPressed['right'] = !up ? true : false
            break;

        case 37: // left            
            keyPressed['left'] = !up ? true : false
            break;
        case 84: //t or r 
            keyPressed['debug'] = !up ? true : false
            break;
        case 16: //shift 
            keyPressed['ascend'] = !up ? true : false
            break;
        case 32:
            keyPressed['descend'] = !up ? true : false
    }
}

let heleMovement = () => {
    let quat = (ufo.quaternion);
    let right = new THREE.Vector3(1, 0, 0)
    let globalUp = new THREE.Vector3(0, 1, 0);
    let up = new THREE.Vector3(0, 1, 0)
    let forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quat)

    let vertDamping = new THREE.Vector3(0, ufo.velocity.y, 0).multiplyScalar(-0.01);
    let vertStab = up.clone();
    vertStab.multiplyScalar(0.13);
    vertStab.add(vertDamping);
    vertStab.multiplyScalar(enginePower);

    ufo.velocity.x += vertStab.x;
    ufo.velocity.y += vertStab.y;
    ufo.velocity.z += vertStab.z;

    // Throttle
    if (keyPressed['ascend']) {
        ufo.velocity.y += up.y * 0.2 * enginePower;
    }
    if (keyPressed['descend']) {
        ufo.velocity.y -= up.y * 0.2 * enginePower;
    }

    // Pitch
    if (keyPressed['right']) {

        // ufo.velocity.x = ufo.velocity.x > -10 ? ufo.velocity.x - (right.x * 0.1 * enginePower) : -10
        let rotYneg = new CANNON.Quaternion(0, 0, 0, 1);
        rotYneg.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -0.02);
        ufo.quaternion = rotYneg.mult(ufo.quaternion);
        gsap.to(ufo.quaternion, { z: 0.05, duration: 0.4 })
    }
    if (keyPressed['left']) {
        // ufo.velocity.x = ufo.velocity.x < 10 ? ufo.velocity.x + (right.x * 0.1 * enginePower) : 10
        let rotY = new CANNON.Quaternion(0, 0, 0, 1);
        rotY.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), 0.02);
        ufo.quaternion = rotY.mult(ufo.quaternion);
        gsap.to(ufo.quaternion, { z: -0.05, duration: 0.4 })
    }

    if (!keyPressed['right'] && !keyPressed['left']) {
        gsap.to(ufo.quaternion, { z: 0, duration: 0.4 })
    }

    // Roll
    if (keyPressed['backward']) {
        if (!forwardflag) {
            forwardflag = true
            stoptween.kill()
        }
        gsap.to(ufo.quaternion, { x: -0.05, duration: 0.4 })
        ufo.velocity.z = ufo.velocity.z > -10 ? ufo.velocity.z - (forward.z * 0.1 * enginePower) : -10
        ufo.velocity.x = ufo.velocity.x > -10 ? ufo.velocity.x - (forward.x * 0.1 * enginePower) : -10
        ufo.velocity.y = ufo.velocity.y > -10 ? ufo.velocity.y - (forward.y * 0.1 * enginePower) : -10
    }
    if (keyPressed['forward']) {
        if (!forwardflag) {
            stoptween.kill()
            forwardflag = true
        }
        gsap.to(ufo.quaternion, { x: 0.05, duration: 0.4 })
        ufo.velocity.z = ufo.velocity.z < 10 ? ufo.velocity.z + (forward.z * 0.1 * enginePower) : 10
        ufo.velocity.y = ufo.velocity.y < 10 ? ufo.velocity.y + (forward.y * 0.1 * enginePower) : 10
        ufo.velocity.x = ufo.velocity.x < 10 ? ufo.velocity.x + (forward.x * 0.1 * enginePower) : 10
    }
    if (!keyPressed['forward'] && !keyPressed['backward']) {
        gsap.to(ufo.quaternion, { x: 0, duration: 0.4 })
        if (forwardflag) {
            forwardflag = false
            stoptween = gsap.to(ufo.velocity, { x: 0, z: 0, duration: 5, ease: 'power4.out' })
        }
    }

    //Break
    if (keyPressed['break']) {
        gsap.to(ufo.velocity, { x: 0, y: 0, z: 0, duration: 1.5 })
    }

    if (keyPressed['debug']) {
        console.log(forwardflag)
    }

    // Angular damping
    ufo.angularVelocity.x *= 0.97;
    ufo.angularVelocity.y *= 0.97;
    ufo.angularVelocity.z *= 0.97;
}


let addHele = () => {
    keyPressed = {
        'ascend': false,
        'forward': false,
        'backward': false,
        'right': false,
        'left': false,
        'descend': false,
        'debug': false
    }

    const chassisShape = new CANNON.Cylinder(1, 3, 3, 20);
    ufo = new CANNON.Body({ mass: 10, material: dummyMaterial });
    ufo.addShape(chassisShape);
    ufo.position.set(0, 5, 0);
    ufo.allowSleep = false
    // ufo.angularVelocity.set(10, 0, 0);
    world.add(ufo)
    helper.addVisual(ufo, 'box', undefined, 'basic')

    window.addEventListener('keydown', heleHandler)
    window.addEventListener('keyup', heleHandler)


    followCam = new THREE.Object3D()
    followCam.position.copy(camera.instance.position)
    scene.add(followCam)
    followCam.parent = ufo.threemesh;
    helper.shadowTarget = ufo.threemesh

    eventHandler.on('tick', () => {
        camera.instance.position.copy(followCam.getWorldPosition(new THREE.Vector3()))
        camera.instance.lookAt(ufo.threemesh.position)
    })

    eventHandler.on('tick', () => {
        heleMovement()
    })
}

export default addHele