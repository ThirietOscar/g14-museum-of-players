import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import jukeboxAudioSource from '../sounds/jukebox.mp3'

export default class Jukebox
{
    constructor()
    {
        this.group = new THREE.Group()

        this.background = 'linear-gradient(180deg, #A0CC9F 0%, #F3FFEA 100%)'

        this.name='Jukebox'
        this.text='The first public phonograph was installed by Louis Glass in 1889. The jukebox therm arrived in 1930s. The jukebox is a device usually placed in a public place that can play music recorded on disc. It is a pay machine where you select a piece of music to play after inserting a coin. Originally the jukebox was often found in American bars and cafes. To encourage residents and tourists to stop littering, the city of Anvers has come up with an original idea. In different places, jukebox bins play a short song as soon as you throw your rubbish in them like "Simply The Best" by Tina Tuner or "Baby One More Time" by Britney Spears. '
        this.schema= '/images/schemaJukebox.png'

        this.textColor = '#69965E'

        this.cameraPosition = new THREE.Vector3(5.521, 0.0329, 0.98)

        this.scenePosition = new THREE.Vector3(5, 0, 0)

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            'models/jukebox/model.gltf',
            (_gltf) =>
            {   
                this.jukebox = _gltf.scene.children[0]
                this.jukebox.scale.set(2.4, 2.4, 2.4)
                this.jukebox.material = new THREE.MeshToonMaterial()
                this.group.add(this.jukebox)

                console.log(this.jukebox)
            }
        )

        // this.audio = new Audio(jukeboxAudioSource)
        // this.audio.volume = 0.4
    }
}