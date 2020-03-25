//Inspired of https://codepen.io/mweslander/pen/JreWPa
import { TweenLite } from 'gsap/all'
import * as THREE from 'three'
import startAudioSource from '../sounds/start.mp3'

export default class StartPart {
    constructor() {
        const $buttonStart = document.querySelector('.js-button-start')
        const $startPart = document.querySelector('.js-start-part')
        const $mainPart = document.querySelector('.js-main-part')
        const $mainPartbackground = document.querySelector('.js-main-background')
        let isDisplayingStartPart = true

        //Create the start audio
        const startAudio = new Audio(startAudioSource)
        startAudio.volume = 0.3
        //When click on button start
        $buttonStart.addEventListener('click', () => {
            //startAudio.play()

            TweenLite.to($startPart, 2.3, { 
                opacity: 0,
                ease: 'Power3.easeInOut',
                onComplete: changePart
            })
        })

        const changePart = () => {

            isDisplayingStartPart = false
            $startPart.style.display = 'none'
            $mainPart.style.display = 'block'

            TweenLite.to($mainPart, 0.7, {
                opacity: '1',
                ease: 'Power3.easeInOut'
            })

            TweenLite.to($mainPartbackground, 1.5, {
                background: 'linear-gradient(180deg, #FFC400 -78.86%, #FFFAE7 100%)',
                ease: 'Power3.easeInOut'
            })
        }

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

        window.addEventListener('mousemove', (_event) =>
        {
            cursor.x = _event.clientX / sizes.width - 0.5
            cursor.y = _event.clientY / sizes.height - 0.5
        })

        /**
         * Scene
         */
        const scene = new THREE.Scene()

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
        scene.add(ambientLight)

        //Balls
        const ballSize = 0.4
        const separation = 100, amountX = 50, amountY = 50;
        let particles = [], particle, count = 0;

        const ballGeometry = new THREE.SphereGeometry(ballSize, 32, 32)
        const ballMaterial = new THREE.MeshBasicMaterial({color: 0x000000})

        let i = 0;
        for ( let ix = 0; ix < amountX; ix ++ ) {

            for ( let iy = 0; iy < amountY; iy ++ ) {
                particle = particles[i++] = new THREE.Mesh(ballGeometry, ballMaterial)
                particle.position.x = ix * separation - ( ( amountX * separation ) / 2 )
                particle.position.z = iy * separation - ( ( amountY * separation ) / 2 )
                scene.add(particle);

                if (i > 0) {
                    ballGeometry.vertices.push( particle.position )
                }
            }
        }

        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 1, 10000)
        camera.position.z = 1000
        scene.add(camera)

        /**
         * Renderer
         */
        const $startBackground = document.querySelector('.js-start-background')
        const renderer = new THREE.WebGLRenderer( { alpha: true } )
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(window.devicePixelRatio)
        $startBackground.appendChild(renderer.domElement)

        /**
         * Resize
         */
        window.addEventListener('resize', () => {
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
            console.log('liop')
            if(isDisplayingStartPart == true)
                window.requestAnimationFrame(loop)

            // Camera
            camera.position.x = cursor.x * 310
            camera.position.y = - cursor.y * 110

            camera.lookAt(scene.position)

            // Animate balls
            let i = 0;
            for (let ix = 0; ix < amountX; ix++) {
                for (let iy = 0; iy < amountY; iy++) {
                    particle = particles[i++];
                    particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50)
                    particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4
                }
            }
            // Render
            renderer.render(scene, camera)
            count += 0.1
        }

        loop()
    }
}
   