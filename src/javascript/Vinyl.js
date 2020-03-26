import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import MP3AudioSource from '../sounds/MP3.mp3'

export default class Vinyl
{
    constructor()
    {
        this.group = new THREE.Group()

        this.name='Vinyl'

        this.background = 'linear-gradient(180deg, #CCAF95 -37.79%, #FFF3E9 100%)'
        this.textColor = '#BAA593'

        this.cameraPosition = new THREE.Vector3(15.521, 0.0329, 0.98)

        this.scenePosition = new THREE.Vector3(15, 0, 0)

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            '/models/vinyl/model.gltf',
            (_gltf) =>
            {   
                this.vinyl = _gltf.scene.children[0]
                this.vinyl.scale.set(0.01, 0.01, 0.01)
                this.vinyl.position.set(15.05, - 0.3, - 0.25)
                //this.vinyl.rotation.y = - (Math.PI / 2)
                this.vinyl.material = new THREE.MeshToonMaterial()
                this.group.add(this.vinyl)
            }
        )

        // this.audio = new Audio(MP3AudioSource)
        // this.audio.volume = 0.4
    }
}