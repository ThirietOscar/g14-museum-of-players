//Inspired of https://codepen.io/mweslander/pen/JreWPa
import { TweenLite } from 'gsap/all'
import * as THREE from 'three'
import Gramophone from './Gramophone.js'
var OrbitControls = require('three-orbit-controls')(THREE)

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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
        scene.add(ambientLight)

        // Cubes
        // const cube = new THREE.Mesh(
        //     new THREE.BoxBufferGeometry(1, 1, 1),
        //     new THREE.MeshBasicMaterial( { color: 0xaaffaa } )
        // )
        // scene.add(cube)

        // gramophone
        const gramophone = new Gramophone()
        scene.add(gramophone.group)

        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 2
        camera.position.y = 0
        camera.position.x = 0
        
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

        var controls = new OrbitControls( camera, renderer.domElement );
        controls.update();

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

            controls.update();
            
            // Camera
            camera.lookAt(scene.position)

            // Render
            renderer.render(scene, camera)
        }

        loop() 
    }
}