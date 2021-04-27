
// import { Lensflare, LensflareElement } from '../../node_modules/three/examples/jsm/objects/Lensflare.js'
import CannonHelper from '../Utils/CannonHelper.js';


function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
    pointIsWorld = (pointIsWorld === undefined) ? false : pointIsWorld;

    if (pointIsWorld) {
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }

    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset

    if (pointIsWorld) {
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }

    obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

let addWedgeShape = (body, scale) => {
    let shape1 = new CANNON.Box(new CANNON.Vec3(3.1, 0.1, 2.9))
    let q = new CANNON.Quaternion()
    q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 5.3)
    body.addShape(shape1, new CANNON.Vec3(0, 1.6 * scale, 5.5 * scale), q)// front

    let shape2 = new CANNON.Box(new CANNON.Vec3(2.9, 0.1, 3.3))
    q.setFromAxisAngle(new CANNON.Vec3(0, 0, -1), Math.PI / 5.3)
    body.addShape(shape2, new CANNON.Vec3(5.3 * scale, 1.6 * scale, 0), q)//right

    q.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI / 5.3)
    body.addShape(shape2, new CANNON.Vec3(-5.4 * scale, 1.6 * scale, 0), q)//left

    let shape3 = new CANNON.Box(new CANNON.Vec3(3, 0.1, 3.3))
    body.addShape(shape3, new CANNON.Vec3(0, 3.1 * scale, 0))//top


    let shape4 = new CANNON.Box(new CANNON.Vec3(4.1, 0.6, 2))
    q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2)
    body.addShape(shape4, new CANNON.Vec3(0, 2 * scale, -3.7 * scale), q)//back center

    let shape5 = new CANNON.Box(new CANNON.Vec3(3, 2, 0.6))
    q.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI / 5.5)
    body.addShape(shape5, new CANNON.Vec3(-5.9 * scale, 0.1, -3.7 * scale), q)

    q.setFromAxisAngle(new CANNON.Vec3(0, 0, -1), Math.PI / 5.5)
    body.addShape(shape5, new CANNON.Vec3(5.9 * scale, 0.1, -3.7 * scale), q)

}


let addPortal = () => {

    let helper = new CannonHelper(scene)
    let objpositions = [[30, 0, 30], [-30, 0, -30]]
    objpositions.forEach((ele) => {

        let obj = new THREE.Object3D()
        let light1 = new THREE.DirectionalLight(0xffffff, 2)
        let light2 = new THREE.DirectionalLight(0xffffff, 2)
        let mesh = assetData['portal'].scene.clone()
        mesh.scale.set(0.5, 0.5, 0.5)
        let ramp = assetData['ramp'].scene.clone()
        ramp.position.set(0, 0, 0)
        mesh.position.set(0, ramp.position.y + 2, 0)
        obj.add(mesh)
        obj.add(ramp)
        // let lighthelper1 = new THREE.DirectionalLightHelper(light1, 2)
        // let lighthelper2 = new THREE.DirectionalLightHelper(light2, 2)
        // scene.add(lighthelper1)
        // scene.add(lighthelper2)
        light1.target = mesh
        light2.target = mesh
        obj.add(light1)
        obj.add(light2)
        light1.position.set(7, mesh.position.y + 10, 0)
        light2.position.set(-7, mesh.position.y + 10, 0)
        obj.position.set(ele[0], ele[1], ele[2])
        // let floor = new THREE.MeshBasicMaterial({ color: 'white' })
        // let geo = new THREE.CylinderGeometry(20, 20, 0.2, 30, 30)
        // let me = new THREE.Mesh(geo, floor)

        // me.position.set(0,0,0)
        // obj.add(me)

        let wedgeBody = new CANNON.Body({
            mass: 0,
            material: rampMaterial
        })

        let scale = 1
        addWedgeShape(wedgeBody, scale)

        console.log(wedgeBody)


        // wedgeBody.shapes.forEach((shape) => {
        //     shape.halfExtents.x *= scale - 0.1;
        //     shape.halfExtents.y *= scale - 0.1;
        //     shape.halfExtents.z *= scale - 0.1;
            
        //     shape.updateConvexPolyhedronRepresentation()
        // })

        wedgeBody.position.set(ele[0], ele[1], ele[2])

        // helper.addVisual(wedgeBody, 'ramp', undefined, 'basic')
        world.add(wedgeBody)

        const textureLoader = new THREE.TextureLoader();

        const textureFlare0 = textureLoader.load('assets/lensflare/lensflare1.png');


        let lightObj = new THREE.Object3D()


        const light = new THREE.PointLight(0xffffff, 0.3, 10);
        // light.color.setHSL(h, s, l);
        light.position.set(0, mesh.position.y + 3.6, 0)
        obj.add(light);

        const lensflare = new Lensflare();
        lensflare.addElement(new LensflareElement(textureFlare0, 600, 0, light.color));
        light.add(lensflare);
        lightObj.add(light)
        obj.add(lightObj)

        obj.scale.set(scale, scale, scale)
        obj.rotation.y += Math.PI
        wedgeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), Math.PI)
        scene.add(obj)
    })

}

export default addPortal