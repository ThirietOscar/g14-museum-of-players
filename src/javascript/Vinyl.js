import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Vinyl
{
    constructor()
    {
        this.group = new THREE.Group()

        this.name='Vinyl'
        this.date='1960'
        this.text='The vinyl phonograph record is the fruit of the work of several scientists such as the French Charles Cros, Emile Berliner and the American Thomas Edison during the 20th century. This disc, generally black in colour, is crossed by a microscopic spiral groove whose beginning is generally on the outside and the end in the centre of the disc. If we could stretch all the data contained on a CD in a straight line, it would arrive at a line about 6.5 kilometres long. <strong>Song playing: Pink Floyd - Another Brick In The Wall</strong>'
        this.schema= 'images/schemaPlatine.png'

        this.background = 'linear-gradient(180deg, #CCAF95 -37.79%, #FFF3E9 100%)'
        this.textColor = '#BAA593'
        this.iconFilter = 'invert(76%) sepia(10%) saturate(601%) hue-rotate(346deg) brightness(88%) contrast(88%)'

        this.cameraPosition = new THREE.Vector3(15.521, 0.0329, 0.98)

        this.scenePosition = new THREE.Vector3(15, 0, 0)

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            'models/vinyl/model.gltf',
            (_gltf) => {
                this.vinyl = _gltf.scene.children[0]
                this.vinyl.scale.set(0.01, 0.01, 0.01)
                //this.vinyl.rotation.y = - (Math.PI / 2)
                this.vinyl.material = new THREE.MeshToonMaterial()
                this.group.add(this.vinyl)
            }
        )
    }
}
