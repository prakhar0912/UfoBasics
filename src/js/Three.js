
import * as THREE from 'three'
import CannonHelper from './Utils/CannonHelper'

let initThree = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    helper = new CannonHelper(scene)

    let canva = document.querySelector('.canva')
    renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canva, antialias: true });
    
    // renderer.setPixelRatio(canva.offsetWidth/canva.offsetHeight);
    renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 1.5), 2))
    renderer.setSize(canva.offsetWidth, canva.offsetHeight);
    // renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true
    renderer.gammaFactor = 2.2
    renderer.gammaOutPut = true
    renderer.autoClear = false

    window.addEventListener('resize', () => {
        renderer.setSize(canva.offsetWidth, canva.offsetHeight)
    })

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);


    const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
    scene.add(light);
}

export default initThree