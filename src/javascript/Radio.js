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
        this.text='The invention of radio is a collective work that began in the 1840s, starting with the discovery of electromagnetic waves, the invention of the telegraph, and culminating in the first equipment that could be used to communicate wirelessly using radio waves. In 1940, about one on two French households was equipped with a radio. In 1962 the proportion exceeded 85%, whereas today there are on average 6 radios per house.'

        this.background = 'linear-gradient(180deg, #085254 -102.93%, #E2FEFF 100%)'
        this.textColor = '#719090'

        this.cameraPosition = new THREE.Vector3(10.521, 0.0329, 0.98)

        this.scenePosition = new THREE.Vector3(10, 0, 0)

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            'models/radio/model.gltf',
            (_gltf) =>
            {   
                this.radio = _gltf.scene.children[0]
                this.radio.scale.set(0.2, 0.2, 0.2)
                this.radio.position.set(10, - 0.2, 0)
                this.radio.rotation.y = Math.PI
                this.radio.material = new THREE.MeshToonMaterial(

                )
                this.group.add(this.radio)
            }
        )

        this.audio = new Audio(radioAudioSource)
        this.audio.volume = 0.4
    }
}