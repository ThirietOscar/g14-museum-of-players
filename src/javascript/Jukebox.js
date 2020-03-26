import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Jukebox
{
    constructor()
    {
        this.group = new THREE.Group()

        this.background = 'linear-gradient(180deg, #56B455 0%, #E2FFCB 100%)'

        this.cameraPosition = new THREE.Vector3(5.521, 0.0329, 0.98)

        this.scenePosition = new THREE.Vector3(5, 0, 0)

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            '/models/jukebox/model.gltf',
            (_gltf) =>
            {   
                this.jukebox = _gltf.scene.children[0]
                this.jukebox.scale.set(2.4, 2.4, 2.4)
                this.jukebox.position.set(5.13, - 0.4, - 0.8)
                this.jukebox.material = new THREE.MeshToonMaterial()
                this.group.add(this.jukebox)
            }
        )
    }
}