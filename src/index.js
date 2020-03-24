import './style/main.styl'
import * as THREE from 'three'
import { TweenLite } from 'gsap/all'

/**
 * MOUSE CURSOR
 */
// const cursor = document.querySelector('.mouse-cursor')

// window.addEventListener('mousemove', (_event) => {
//     
//     cursor.style.transform = `translate(${_event.pageX-15}px, ${_event.pageY-15}px)`
// })

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

// Cubes
// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xaaffaa })
// )
// scene.add(cube)

//Balls
const ballSize = 0.4
const SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
let particles = [], particle, count = 0;

const ballGeometry = new THREE.SphereGeometry(ballSize, 32, 32)
const ballMaterial = new THREE.MeshBasicMaterial({color: 0x000000})

var i = 0;
for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
        particle = particles[i++] = new THREE.Mesh(ballGeometry, ballMaterial)
        particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
        particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
        scene.add(particle);

        if (i > 0) {
            ballGeometry.vertices.push( particle.position );
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
    window.requestAnimationFrame(loop)

    // Camera
    camera.position.x = cursor.x * 310
    camera.position.y = - cursor.y * 110
    camera.lookAt(scene.position)

    var i = 0;
    for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++];
          particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
          particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
        }
    }
    // Render
    renderer.render(scene, camera)
    count += 0.1;
}

loop()

