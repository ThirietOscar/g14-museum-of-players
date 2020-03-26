import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import radioAudioSource from '../sounds/radio.mp3'

export default class Radio
{
    constructor()
    {
        this.group = new THREE.Group()

        this.name='Radio'

        this.background = 'linear-gradient(180deg, #085254 -102.93%, #E2FEFF 100%)'
        this.textColor = '#719090'

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
                this.radio.rotation.y = Math.PI * (-1)
                this.group.add(this.radio)
                this.group.traverse((_object) => {
                    if(_object instanceof THREE.Mesh) {
                        _object.material = new THREE.MeshToonMaterial({
                            color: _object.material.color,
                            map: _object.material.map
                        })
                    }
                })
            }
        )

        this.audio = new Audio(radioAudioSource)
        this.audio.volume = 0.4
    }
}