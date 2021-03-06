import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class MP3
{
    constructor()
    {
        this.group = new THREE.Group()

        this.name='MP3'
        this.date='1998'
        this.text='The portable player is a portable device for storing tracks in the form of computer files, the best known format being the mp3 format. The first Walkman is marketed by Sony in 1979, its invention was invented by sony engineers led by Akio Morita. The word "walkman" was to be reserved for Asia, with Sony preferring "Soundabout" in England, "Stowaway" in Sweden or "Freestyle" in Australia. <strong>Song playing: Outkast - Hey-Ya!</strong>'
        this.schema= 'images/schemaBaladeur.png'

        this.background = 'linear-gradient(180deg, #9C4A40 -63.62%, #FFECEA 100%)'
        this.textColor = '#AF7D77'
        this.iconFilter = 'invert(62%) sepia(4%) saturate(2917%) hue-rotate(318deg) brightness(84%) contrast(96%)'

        this.cameraPosition = new THREE.Vector3(25.521, 0.0329, 0.98)

        this.scenePosition = new THREE.Vector3(25, 0, 0)

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            'models/MP3/model.gltf',
            (_gltf) => {
                this.MP3 = _gltf.scene.children[0]
                this.MP3.scale.set(0.015, 0.015, 0.015)
                this.MP3.rotation.x = (Math.PI / 2)
                this.MP3.material = new THREE.MeshToonMaterial()
                this.group.add(this.MP3)
            }
        )
    }
}
