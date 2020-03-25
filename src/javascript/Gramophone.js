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
                this.gramophone.position.set(-0.15, -1.6, 0.5)
                this.gramophone.rotation.y = - (Math.PI / 2)
                //this.gramophone.material = new THREE.MeshToonMaterial()

                this.group.add(this.gramophone)
                
                this.group.traverse((_object) =>
                {
                    if(_object instanceof THREE.Mesh)
                    {
                        _object.material = new THREE.MeshStandardMaterial({
                            color: _object.material.color
                        })

                        console.log(_object.material.color)
                    }
                })
            }
        )
    }
}