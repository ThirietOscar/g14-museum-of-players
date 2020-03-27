import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Gramophone
{
    constructor()
    {
        this.group = new THREE.Group()

        this.name='Gramophone'
        this.text=`The gramophone was invented by Emile Berliner in the 1880s. It makes it possible to play extraordinary music pre-recorded on a phonographic disc. A real piece of history, whose record player melodies can be appreciated from the back of a comfortable club armchair.
        The first sound recording was “Au clair de la lune”. <strong>Song playing: Fernandel - Félicie Aussi </strong>`
        this.schema= 'images/schemaGramophone.png'

        this.background = 'linear-gradient(180deg, #FFC400 -78.86%, #FFFAE7 100%)'
        this.textColor = '#B6AA81'
        this.iconFilter = 'invert(96%) sepia(8%) saturate(1867%) hue-rotate(338deg) brightness(81%) contrast(70%)'

        this.cameraPosition = new THREE.Vector3(0.521, 0.0329, 0.98)

        this.scenePosition = new THREE.Vector3(0, 0, 0)

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            'models/gramophone/model.gltf',
            (_gltf) => {   
                this.gramophone = _gltf.scene.children[0]
                this.gramophone.rotation.y = - (Math.PI / 2)
                this.gramophone.material = new THREE.MeshToonMaterial()
                this.group.add(this.gramophone)
            }
        )

        // this.audio = new Audio(gramophoneAudioSource)
        // this.audio.volume = 0.4
    }
}