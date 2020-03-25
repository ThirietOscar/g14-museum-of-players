//Inspired of https://codepen.io/mweslander/pen/JreWPa
import { TweenLite } from 'gsap/all'
import * as THREE from 'three'
import Gramophone from './Gramophone.js'
import Jukebox from './Jukebox.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class StartPart {
    constructor() {
        /**
        * Sizes
        */
        const sizes = {}
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        /**
        * Scene
        */
        const scene = new THREE.Scene()

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
        scene.add(ambientLight)

        const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI * 0.2, 0.5)
        spotLight.position.z = 3
        spotLight.position.y = 2
        scene.add(spotLight)

        spotLight.target.position.z = - 2
        scene.add(spotLight.target)

        // const cube = new THREE.Mesh(
        //     new THREE.BoxBufferGeometry(1, 1, 1),
        //     new THREE.MeshBasicMaterial( { color: 0xaaffaa, opacity: 0.5 } )
        // )
        // scene.add(cube)

        // gramophone
        const gramophone = new Gramophone()
        scene.add(gramophone.group)

        // Jukebox
        // const jukebox = new Jukebox()
        // scene.add(jukebox.group)


        // var geometry = new THREE.PlaneGeometry( 5, 5, 20 );
        // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        // var plane = new THREE.Mesh( geometry, material );
        // plane.rotation.x = Math.PI / 2
        // scene.add( plane );

        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        
        camera.position.set(0.521, 0.0329, 0.98)
        scene.add(camera)

        window.addEventListener('mousewheel', (_event) => {
            const delta = Math.max(-1, Math.min(1, (_event.wheelDelta || -_event.detail)))

            if(delta > 0)
                zoomIn()
            else
                zoomOut()
        })

        const zoomIn = () => {
            if(getDistance(camera, scene) > 0.30 )
            camera.position.sub(scene.position).multiplyScalar(0.95).add(scene.position)
        }

        const zoomOut = () => {
            if(getDistance(camera, scene) < 0.70 )
            camera.position.sub(scene.position).multiplyScalar(1.05).add(scene.position)
        }

        //Return distance between two coordinates
        const getDistance = (mesh1, mesh2) => {
            const distanceX = mesh1.position.x - mesh2.position.x
            const distanceY = mesh1.position.y - mesh2.position.y
            const distanceZ = mesh1.position.z - mesh2.position.z

            return Math.sqrt(distanceX * distanceX, distanceY * distanceY, distanceZ * distanceZ)
        }

        /**
         * Renderer
         */
        const $mainBackground = document.querySelector('.js-main-background')
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setClearAlpha(0)
        $mainBackground.appendChild(renderer.domElement)

        /**
         * Camera Controls
         */
        // const cameraControls = new OrbitControls(camera, renderer.domElement)
        // cameraControls.zoomSpeed = 0.3
        // cameraControls.enableDamping = true

        /**
         * Resize
         */
        window.addEventListener('resize', () =>
        {
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            renderer.setSize(sizes.width, sizes.height)
        })

        /**
         * Loop
         */
        const loop = () =>
        {
            window.requestAnimationFrame(loop)
            //console.log(camera.position)
            // Camera
            camera.lookAt(scene.position)

            // Render
            renderer.render(scene, camera)
        }

        loop() 
    }
}