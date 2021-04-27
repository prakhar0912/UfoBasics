import Loader from './Utils/Loader.js'

import CarChassis from '../assets/car/chassis.gltf'
import carWheel from '../assets/cyberTruck/wheel.gltf'
import Portal from '../assets/portal/Portal_01.gltf'
import Ramp from '../assets/ramp/ramp.gltf'

let loadResources = () => {
    let loader = new Loader()
    let loaded = 0;
    let assets = [
        { name: 'car-chassis', source: '../assets/car/chassis.gltf', val: CarChassis },
        // { name: 'car-wheel', source: '../assets/cyberTruck/wheel.gltf', val: carWheel },
        // { name: 'portal', source: '../assets/portal/Portal_01.gltf', val: Portal },
        // { name: 'ramp', source: '../assets/ramp/ramp.gltf', val: Ramp }
    ]
    let toLoad = assets.length;
    loader.load(assets)

    eventHandler.on('fileEnd', (_resource, _data) => {
        assetData[_resource.name] = _data
        loaded++;
        
        eventHandler.trigger('progress', [loaded / toLoad])
    })

    eventHandler.on('end', () => {
        // Trigger ready
        eventHandler.trigger('ready')
    })
}

export default loadResources