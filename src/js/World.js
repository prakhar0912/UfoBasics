import loadResources from "./Resources.js";
import initThree from './Three.js'
import initPhysics from './Physics.js'
import addEnv from './Envronment.js'
import addCamera from './Camera.js'

let worldInit = () => {

    eventHandler.on('progress', (data) => {
        console.log(data)
    })

    eventHandler.on('ready', (data) => {
        initThree()
        initPhysics()
        addCamera()
        addEnv()
        time.tick()
        
    })
    loadResources()
}



export default worldInit