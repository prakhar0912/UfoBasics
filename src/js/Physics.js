import CANNON from 'cannon'

let initPhysics = () => {

    world = new CANNON.World();

    world.broadphase = new CANNON.SAPBroadphase(world);
    world.gravity.set(0, -8, 0);

    world.defaultContactMaterial.friction = 0
    world.defaultContactMaterial.restitution = 0.2
    world.allowSleep = true



    groundMaterial = new CANNON.Material("groundMaterial");
    wheelMaterial = new CANNON.Material("wheelMaterial");
    dummyMaterial = new CANNON.Material('dummyMaterial')
    rampMaterial = new CANNON.Material('rampMaterial')

    const wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
        friction: 0.3,
        restitution: 0,
        contactEquationStiffness: 1000
    });

    world.addContactMaterial(wheelGroundContactMaterial);


    const dummydummyContactMaterial= new CANNON.ContactMaterial(dummyMaterial, dummyMaterial, {
        friction: 0.5,
        restitution: 0,
        contactEquationStiffness: 1000
    });

    world.addContactMaterial(dummydummyContactMaterial);


    const grounddummyContactMaterial = new CANNON.ContactMaterial(dummyMaterial, groundMaterial, {
        friction: 0.02,
        restitution: 0.3,
        contactEquationStiffness: 1000
    });

    world.addContactMaterial(grounddummyContactMaterial);

    const rampdummyContactMaterial = new CANNON.ContactMaterial(rampMaterial, dummyMaterial, {
        friction: 0,
        restitution: 0.3,
        contactEquationRelaxation: 1000
    })    

    eventHandler.on('tick', () => {
        world.bodies.forEach(function (body) {
            if (body.threemesh != undefined) {
                body.threemesh.position.copy(body.position);
                body.threemesh.quaternion.copy(body.quaternion);
            }
        });
    })


}

export default initPhysics
