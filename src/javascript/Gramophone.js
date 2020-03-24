import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Gramophone
{
    constructor()
    {
        this.group = new THREE.Group()

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            '/models/gramophone/model.gltf',
            (_gltf) =>
            {   
                console.log(_gltf.scene.children[0])
                this.gramophone = _gltf.scene.children[0]
                //this.gramophone.scale.set(0.01, 0.01, 0.01)
                this.gramophone.position.set(0, -0.5, 0)
                this.gramophone.material = new THREE.MeshBasicMaterial()
                this.group.add(this.gramophone)
            }
        )
    }
}