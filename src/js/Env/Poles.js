import CANNON from 'cannon'

let addPoles = () => {
    [[50, 50, 50], [-50, 50, 50], [50, 50, -50], [-50, 50, -50]].forEach((ele) => {

        const chassisShape = new CANNON.Cylinder(3, 3, 50, 20);
        let cylinder = new CANNON.Body({ mass: 10, material: dummyMaterial });
        cylinder.addShape(chassisShape);
        let rotYneg = new CANNON.Quaternion(0, 0, 0, 1);
        rotYneg.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2);
        cylinder.quaternion = rotYneg.mult(cylinder.quaternion)
        cylinder.position.set(ele[0], ele[1], ele[2])
        world.add(cylinder)
        helper.addVisual(cylinder, 'box', undefined, 'basic')
    })
}

export default addPoles