import { gsap } from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//Import object models
import Gramophone from './Gramophone.js'
import Jukebox from './Jukebox.js'
import Radio from './Radio.js'
import Vinyl from './Vinyl.js'
import MP3 from './MP3.js'

//Import sounds
import gramophoneAudioSource from '../sounds/gramophone.mp3'
import jukeboxAudioSource from '../sounds/jukebox.mp3'
import radioAudioSource from '../sounds/radio.mp3'
import vinylAudioSource from '../sounds/platine.mp3'
import MP3AudioSource from '../sounds/baladeur.mp3'

export default class MainPart {
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
        * Positions
        */

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

        /**
         * GRAMOPHONE
         */
        const gramophone = new Gramophone()
        gramophone.group.position.set(-0.15, -1.6, 0.5)
        scene.add(gramophone.group)

        // create the PositionalAudio object (passing in the listener)
        const gramophoneSound = new THREE.PositionalAudio(listener)

        // load a sound and set it as the PositionalAudio object's buffer
        const audioLoader = new THREE.AudioLoader();

        audioLoader.load(gramophoneAudioSource, (buffer) => {
            gramophoneSound.setBuffer(buffer)
            gramophoneSound.setRefDistance(0.5)
            gramophoneSound.setDirectionalCone(180, 230, 0.1)
        })

        gramophone.group.add(gramophoneSound)

        let currentObject = gramophone

        /**
         * JUKEBOX
         */

        // Jukebox
        const jukebox = new Jukebox()
        jukebox.group.position.set(5.13, - 0.4, - 0.8)
        scene.add(jukebox.group)

        const jukeboxSound = new THREE.PositionalAudio(listener)

        audioLoader.load(jukeboxAudioSource, (buffer) => {
            jukeboxSound.setBuffer(buffer)
            jukeboxSound.setRefDistance(0.5)
            jukeboxSound.setDirectionalCone(180, 230, 0.1)
        })

        jukebox.group.add(jukeboxSound)

        /**
         * RADIO
         */
        const radio = new Radio()
        radio.group.position.set(10, - 0.2, 0)
        scene.add(radio.group)

        const radioSound = new THREE.PositionalAudio(listener)

        audioLoader.load(radioAudioSource, (buffer) => {
            radioSound.setBuffer(buffer)
            radioSound.setRefDistance(0.5)
            radioSound.setDirectionalCone(180, 230, 0.1)
        })

        radio.group.add(radioSound)

        /**
         * VINYL
         */
        const vinyl = new Vinyl()
        vinyl.group.position.set(15.05, - 0.3, - 0.25)
        scene.add(vinyl.group)

        const vinylSound = new THREE.PositionalAudio(listener)

        audioLoader.load(vinylAudioSource, (buffer) => {
            vinylSound.setBuffer(buffer)
            vinylSound.setRefDistance(0.5)
            vinylSound.setDirectionalCone(180, 230, 0.1)
        })

        vinyl.group.add(vinylSound)

        /**
         * MP3
         */
        const mp3 = new MP3()
        mp3.group.position.set(25.25, 0.5, -0.5)
        scene.add(mp3.group)
        const mp3Sound = new THREE.PositionalAudio(listener)

        audioLoader.load(MP3AudioSource, (buffer) => {
            mp3Sound.setBuffer(buffer)
            mp3Sound.setRefDistance(0.5)
            mp3Sound.setDirectionalCone(180, 230, 0.1)
        })

        mp3.group.add(mp3Sound)
        /**
         * SeekBar
         */

        const $seekBarPoints = document.querySelectorAll('.seek_bar_object')
        const $backgroundObjects = document.querySelectorAll('.background_object')
        const $mainPartbackground = document.querySelector('.js-main-background')
        const $informationText = document.querySelector('.main-part__information__text')
        const $objectName = document.querySelector('.main-part__object__name')
        const $objectDate = document.querySelector('.main-part__object__date')
        const $schema = document.querySelector('.schema')
        const $infoIcon = document.querySelector('.main-part__object__info-icon')

        //Add an event on all seekbar points
        for (let i = 0; i < $seekBarPoints.length; i++) {
            const _element = $seekBarPoints[i];

            _element.addEventListener('click', () => {

                $backgroundObjects.forEach(backgroundobject => {
                    backgroundobject.classList.remove('current_object')
                })

                $backgroundObjects[i].classList.add('current_object')

                if(i == 0) {
                    currentObject = gramophone

                } else if(i == 1) {

                    currentObject = jukebox

                } else if(i == 2) {

                    currentObject = radio

                } else if(i == 3) {

                    currentObject = vinyl

                } else if(i == 4) {

                    currentObject = mp3
                }

                //const test = Math.atan2(currentObject.scenePosition.z - camera.position.z, currentObject.scenePosition.z - camera.position.x)

                gsap.to(camera.position, 2, {
                    x: currentObject.cameraPosition.x,
                    y: currentObject.cameraPosition.y,
                    z: currentObject.cameraPosition.z,
                    ease: 'Power3.easeInOut'
                })

                $mainPartbackground.style.background = currentObject.background




                //Change the player name and animate it
                const objectNameAnimation = gsap.to($objectName, 0.5, {
                    opacity: 0,
                    ease: 'Power3.easeIn',
                    onComplete: () => {
                        $objectName.innerText = currentObject.name
                        $objectDate.innerText = currentObject.date
                        $objectName.style.color = currentObject.textColor
                        $objectDate.style.color = currentObject.textColor
                        objectNameAnimation.reverse()
                    }
                })
                objectNameAnimation.play()

                //Change the player info button and animate it
                const infoIconAnimation = gsap.to($infoIcon, 0.5, {
                    opacity: 0,
                    ease: 'Power3.easeIn',
                    onComplete: () => {
                        $infoIcon.style.filter = currentObject.iconFilter
                        infoIconAnimation.reverse()
                    }
                })
                infoIconAnimation.play()

                $informationText.innerHTML = currentObject.text
                $schema.src = currentObject.schema
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
            if(getDistance(camera, currentObject.group) > 0.30)
                camera.position.sub(currentObject.scenePosition).multiplyScalar(0.95).add(currentObject.scenePosition)
        }

        const zoomOut = () => {
            if(getDistance(camera, currentObject.group) < 0.70)
                camera.position.sub(currentObject.scenePosition).multiplyScalar(1.05).add(currentObject.scenePosition)
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

        //Check if mouse if down or up part
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
                    camera.position.x = Math.cos(-rotSpeed) * (x - currentObject.scenePosition.x) - Math.sin(-rotSpeed) * (z-currentObject.scenePosition.z) + currentObject.scenePosition.x
                    camera.position.z = Math.sin(-rotSpeed) * (x - currentObject.scenePosition.x) + Math.cos(-rotSpeed) * (z - currentObject.scenePosition.z) + currentObject.scenePosition.z
                } else {
                    camera.position.x = Math.cos(rotSpeed) * (x - currentObject.scenePosition.x) - Math.sin(rotSpeed) * (z-currentObject.scenePosition.z) + currentObject.scenePosition.x
                    camera.position.z = Math.sin(rotSpeed) * (x - currentObject.scenePosition.x) + Math.cos(rotSpeed) * (z - currentObject.scenePosition.z) + currentObject.scenePosition.z
                }
            }

            lastMousePosX = mousePosX
        })

        let hoverGramophone = false
        let hoverJukebox = false
        let hoverRadio = false
        let hoverVinyl = false
        let hoverMP3 = false

        /**
        * SOUND
        */
       const $equalizerButton = document.querySelector('.js-equalizer-button')
       let $equalizer = document.querySelectorAll('.js-equalizer')

       $equalizerButton.addEventListener('click', () => {
           if(gramophoneSound.isPlaying === true) {
              gramophoneSound.pause()
              $equalizer[0].classList.remove('equalizer--on')
           }
           if(jukeboxSound.isPlaying === true) {
               jukeboxSound.pause()
               $equalizer[0].classList.remove('equalizer--on')
            }
           if(radioSound.isPlaying === true) {
               radioSound.pause()
               $equalizer[0].classList.remove('equalizer--on')
           }
           if(vinylSound.isPlaying === true) {
               vinylSound.pause()
               $equalizer[0].classList.remove('equalizer--on')
           }
           if(mp3Sound.isPlaying === true) {
               mp3Sound.pause()
               $equalizer[0].classList.remove('equalizer--on')
           }
       })

        renderer.domElement.addEventListener('click', () => {
            if(hoverGramophone == true) {
                if(gramophoneSound.isPlaying === true){
                    gramophoneSound.pause()
                    $equalizer[0].classList.remove('equalizer--on')
                }
                else{
                    gramophoneSound.play()
                    $equalizer[0].classList.add('equalizer--on')

                }
            }
            if(hoverJukebox == true) {
                if(jukeboxSound.isPlaying === true){
                    jukeboxSound.pause()
                    $equalizer[0].classList.remove('equalizer--on')
                }
                else{
                    jukeboxSound.play()
                    $equalizer[0].classList.add('equalizer--on')

                }
            }
            if(hoverRadio == true) {
                if(radioSound.isPlaying === true){
                    radioSound.pause()
                    $equalizer[0].classList.remove('equalizer--on')
                }
                else{
                    radioSound.play()
                    $equalizer[0].classList.add('equalizer--on')

                }
            }
            if(hoverVinyl == true) {
                if(vinylSound.isPlaying === true){
                    vinylSound.pause()
                    $equalizer[0].classList.remove('equalizer--on')
                }
                else{
                    vinylSound.play()
                    $equalizer[0].classList.add('equalizer--on')

                }
            }
            if(hoverMP3 == true) {
                if(mp3Sound.isPlaying === true){
                    mp3Sound.pause()
                    $equalizer[0].classList.remove('equalizer--on')
                }
                else{
                    mp3Sound.play()
                    $equalizer[0].classList.add('equalizer--on')

                }
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

            // Camera
            camera.lookAt(currentObject.scenePosition)

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

            const intersectsJukebox = raycaster.intersectObject(jukebox.group, true)
            if(intersectsJukebox.length) {
                hoverJukebox = true
            }
            else {
                hoverJukebox = false
            }

            const intersectsRadio = raycaster.intersectObject(radio.group, true)
            if(intersectsRadio.length) {
                hoverRadio = true
            }
            else {
                hoverRadio = false
            }

            const intersectsVinyl = raycaster.intersectObject(vinyl.group, true)
            if(intersectsVinyl.length) {
                hoverVinyl = true
            }
            else {
                hoverVinyl = false
            }

            const intersectsMP3 = raycaster.intersectObject(mp3.group, true)
            if(intersectsMP3.length) {
                hoverMP3 = true
            }
            else {
                hoverMP3 = false
            }

            // Render
            renderer.render(scene, camera)
        }

        loop()
    }
}
