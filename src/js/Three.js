
import * as THREE from 'three'
import { Camera } from 'three';
import CannonHelper from './Utils/CannonHelper'

let initThree = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    helper = new CannonHelper(scene)

    let canva = document.querySelector('.canva')
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    document.body.appendChild(renderer.domElement)
    
    // renderer.setPixelRatio(canva.offsetWidth/canva.offsetHeight);
    renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 1.5), 2))
    renderer.setSize( window.innerWidth, window.innerHeight);
    // renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true
    renderer.gammaFactor = 2.2
    renderer.gammaOutPut = true
    renderer.autoClear = false

    window.addEventListener('resize', () => {
        camera.instance.aspect = window.innerWidth/window.innerHeight
        camera.instance.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);


    const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
    scene.add(light);
}

export default initThree