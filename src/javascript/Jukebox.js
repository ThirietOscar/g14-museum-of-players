import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Jukebox
{
    constructor()
    {
        this.group = new THREE.Group()

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            '/models/jukebox/model.gltf',
            (_gltf) =>
            {   
                console.log(_gltf.scene.children[0])
                this.jukebox = _gltf.scene.children[0]
                //this.jukebox.scale.set(0.01, 0.01, 0.01)
                //this.jukebox.position.set(-0.15, -1.6, 0.5)
                //this.jukebox.rotation.y = - (Math.PI / 2)
                this.jukebox.material = new THREE.MeshBasicMaterial()
                this.group.add(this.jukebox)
            }
        )
    }
}