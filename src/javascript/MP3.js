import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import MP3AudioSource from '../sounds/MP3.mp3'

export default class MP3
{
    constructor()
    {
        this.group = new THREE.Group()

        this.cameraPosition = new THREE.Vector3(25.521, 0.0329, 0.98)

        this.scenePosition = new THREE.Vector3(25, 0, 0)

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            '/models/MP3/model.gltf',
            (_gltf) =>
            {   
                this.MP3 = _gltf.scene.children[0]
                this.MP3.scale.set(0.015, 0.015, 0.015)
                this.MP3.position.set(25.25, 0.5, -0.5)
                this.MP3.rotation.x = (Math.PI / 2)
                this.MP3.material = new THREE.MeshToonMaterial()
                this.group.add(this.MP3)
            }
        )

        // this.audio = new Audio(MP3AudioSource)
        // this.audio.volume = 0.4
    }
}