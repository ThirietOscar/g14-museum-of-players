import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import MP3AudioSource from '../sounds/MP3.mp3'

export default class MP3
{
    constructor()
    {
        this.group = new THREE.Group()

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            '/models/MP3/model.gltf',
            (_gltf) =>
            {   
                console.log(_gltf.scene.children[0])
                this.MP3 = _gltf.scene.children[0]
                this.MP3.scale.set(0.1, 0.1, 0.1)
                this.MP3.position.set(0, -3.5, 0)
                this.MP3.material = new THREE.MeshToonMaterial()
                this.group.add(this.MP3)
            }
        )

        // this.audio = new Audio(MP3AudioSource)
        // this.audio.volume = 0.4
    }
}