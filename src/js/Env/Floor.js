import CANNON from 'cannon'
import * as THREE from 'three'

let addFloor = () => {
    // let helper = new CannonHelper(scene)

    let floorBody = new CANNON.Body({
        mass: 0,
        material: groundMaterial
    })
    floorBody.addShape(new CANNON.Plane())
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

    world.add(floorBody)

    var floorMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color1: {
                value: new THREE.Color('#FFC0CB')
            },
            color2: {
                value: new THREE.Color('#ff0000')
            }
        },
        vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
        fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 100.0);
    }
  `,
        wireframe: false
    });
    // floorMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#001E4E')})

    helper.addVisual(floorBody, 'floor', floorMaterial, 'special')
}

export default addFloor