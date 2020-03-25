//Inspired of https://codepen.io/mweslander/pen/JreWPa
import { TweenLite } from 'gsap/all'
import * as THREE from 'three'
import Gramophone from './Gramophone.js'
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
        scene.add(ambientLight)

        // const cube = new THREE.Mesh(
        //     new THREE.BoxBufferGeometry(1, 1, 1),
        //     new THREE.MeshBasicMaterial( { color: 0xaaffaa, opacity: 0.5 } )
        // )
        // scene.add(cube)

        // gramophone
        const gramophone = new Gramophone()
        scene.add(gramophone.group)


        // var geometry = new THREE.PlaneGeometry( 5, 5, 20 );
        // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        // var plane = new THREE.Mesh( geometry, material );
        // plane.rotation.x = Math.PI / 2
        // scene.add( plane );

        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        
        camera.position.x = 0
        camera.position.y = 0.027
        camera.position.z = 0.683
        scene.add(camera)

        /**
         * Renderer
         */
        const $mainBackground = document.querySelector('.js-main-background')
        const renderer = new THREE.WebGLRenderer({ alpha: true })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setClearAlpha(0)
        $mainBackground.appendChild(renderer.domElement)

        /**
         * Camera Controls
         */
        const cameraControls = new OrbitControls(camera, renderer.domElement)
        cameraControls.zoomSpeed = 0.3
        cameraControls.enableDamping = true

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
            
            // Camera
            camera.lookAt(scene.position)

            // Render
            renderer.render(scene, camera)
        }

        loop() 
    }
}