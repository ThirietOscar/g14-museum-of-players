import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import gramophoneAudioSource from '../sounds/gramophone.mp3'

export default class Gramophone
{
    constructor()
    {
        this.group = new THREE.Group()

        this.cameraPosition = {}
        this.cameraPosition.x = 0.521 
        this.cameraPosition.y = 0.0329
        this.cameraPosition.z = 0.98

        this.scenePosition = {}
        this.scenePosition.x = 0
        this.scenePosition.y = 0
        this.scenePosition.z = 0

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            '/models/gramophone/model.gltf',
            (_gltf) =>
            {   
                this.gramophone = _gltf.scene.children[0]
                //this.gramophone.scale.set(0.01, 0.01, 0.01)
                this.gramophone.position.set(-0.15, -1.6, 0.5)
                this.gramophone.rotation.y = - (Math.PI / 2)
                this.gramophone.material = new THREE.MeshToonMaterial()
                this.group.add(this.gramophone)
            }
        )

        this.audio = new Audio(gramophoneAudioSource)
        this.audio.volume = 0.4
    }
}