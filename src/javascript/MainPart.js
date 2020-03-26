//Inspired of https://codepen.io/mweslander/pen/JreWPa
import { TweenLite } from 'gsap/all'
import * as THREE from 'three'
import Gramophone from './Gramophone.js'
//import Jukebox from './Jukebox.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gramophoneAudioSource from '../sounds/gramophone.mp3'

export default class StartPart {
    constructor() {
        /**
        * Sizes
        */
        const sizes = {}
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        /**
        * Cursor
        */
        const cursor = {}
        cursor.x = 0
        cursor.y = 0

        /**
        * Scene
        */
        const scene = new THREE.Scene()

        /**
        * Camera
        */
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

        // create an AudioListener and add it to the camera
        const listener = new THREE.AudioListener()
        camera.add(listener)

        camera.position.set(0.521, 0.0329, 0.98)
        scene.add(camera)

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
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

        /**
         * GRAMOPHONE
         */
        const gramophone = new Gramophone()
        scene.add(gramophone.group)

        // create the PositionalAudio object (passing in the listener)
        const gramophoneSound = new THREE.PositionalAudio(listener)

        // load a sound and set it as the PositionalAudio object's buffer
        const gramophoneAudioLoader = new THREE.AudioLoader();
        gramophoneAudioLoader.load(gramophoneAudioSource, (buffer) => {
            gramophoneSound.setBuffer(buffer)
            gramophoneSound.setRefDistance(1)
            gramophoneSound.setDirectionalCone(180, 230, 0.1)
        })

        gramophone.group.add(gramophoneSound)

        // const gramophoneSoundHelper = new THREE.PositionalAudioHelper(gramophoneSound)
        // gramophoneSound.add(gramophoneSoundHelper)

        /**
         * Jukeboox
         */

        // // Jukebox
        // const jukebox = new Jukebox()
        // scene.add(jukebox.group)


        // var geometry = new THREE.PlaneGeometry( 5, 5, 20 );
        // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        // var plane = new THREE.Mesh( geometry, material );
        // plane.rotation.x = Math.PI / 2
        // scene.add( plane );

        /**
         * SeekBar 
         */

        const $seekBarPoints = document.querySelectorAll('.seek_bar_object')

        for (let i = 0; i < $seekBarPoints.length; i++) {
            const _element = $seekBarPoints[i];
            
            _element.addEventListener('click', () => {
                console.log('click')

                TweenLite.to(gramophone.gramophone.position, 2, {
                    y: gramophone.gramophone.y -0.2,
                    ease: 'Power3.easeInOut'
                })
            })
        }

        /**
         * Ray Caster
         */
        const raycaster = new THREE.Raycaster()

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
        renderer.gammaOutput = true
        renderer.gammaFactor = 2.2
        $mainBackground.appendChild(renderer.domElement)

        let mouseDown = false

        renderer.domElement.addEventListener('mousedown', (_event) => {
            mouseDown = true
        })

        renderer.domElement.addEventListener('mouseup', (_event) => {
            mouseDown = false
        })

        let mousePosX = 0
        let lastMousePosX = 0

        //Event to rotate the camera around the object
        renderer.domElement.addEventListener('mousemove', (_event) => {

            //get the value
            cursor.x = _event.clientX / sizes.width - 0.5
            cursor.y = _event.clientY / sizes.height - 0.5

            mousePosX = _event.clientX

            const rotSpeed = 0.04
            const x = camera.position.x
            const z = camera.position.z
            
            //If mouse is down
            if(mouseDown == true) {
                if(mousePosX - lastMousePosX > 0) {
                    camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
                    camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
                } else {
                    camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed)
                    camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed)  
                }
            }

            lastMousePosX = mousePosX
        })

        let hoverGramophone = false

        renderer.domElement.addEventListener('click', () => {
            if(hoverGramophone == true) {
               //gramophone.audio.play()
               gramophoneSound.play()
            }
        })

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
        const loop = () => {
            window.requestAnimationFrame(loop)
            //console.log(camera.position)
            // Camera
            camera.lookAt(scene.position)

            // Cursor raycasting
            const raycasterCursor = new THREE.Vector2(cursor.x * 2, - cursor.y * 2)
            raycaster.setFromCamera(raycasterCursor, camera)

            const intersectsGramophone = raycaster.intersectObject(gramophone.group, true)
            if(intersectsGramophone.length) {
                hoverGramophone = true
            }
            else {
                hoverGramophone = false
            }

            // Render
            renderer.render(scene, camera)
        }

        loop() 
    }
}