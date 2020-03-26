import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import MP3AudioSource from '../sounds/MP3.mp3'

export default class Radio
{
    constructor()
    {
        this.group = new THREE.Group()

        this.background = 'linear-gradient(180deg, #085254 -102.93%, #E2FEFF 100%)'

        this.cameraPosition = new THREE.Vector3(10.521, 0.0329, 0.98)

        this.scenePosition = new THREE.Vector3(10, 0, 0)

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            '/models/radio/model.gltf',
            (_gltf) =>
            {   
                this.radio = _gltf.scene.children[0]
                this.radio.scale.set(0.2, 0.2, 0.2)
                this.radio.position.set(10, - 0.2, 0)
                this.radio.rotation.y = Math.PI
                this.radio.material = new THREE.MeshToonMaterial()
                this.group.add(this.radio)
            }
        )

        // this.audio = new Audio(MP3AudioSource)
        // this.audio.volume = 0.4
    }
}