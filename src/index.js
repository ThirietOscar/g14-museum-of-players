import './style/main.styl'
import * as THREE from 'three'
import { TweenLite } from 'gsap/all'
import StartPart from './javascript/StartPart.js'

/**
 * MOUSE CURSOR
 */
// const $cursor = document.querySelector('.mouse-cursor')
// $cursor.classList.add('mouse-cursor--black')

// window.addEventListener('mousemove', (_event) => {
    
//     $cursor.style.transform = `translate(${_event.pageX-15}px, ${_event.pageY-15}px)`
// })

// window.addEventListener('mousedown', (_event) => {
//     TweenLite.to($cursor, 0.3, { 
//         transform: `${ $cursor.style.transform } scale(0.7)`,
//         ease: 'Power3.easeIn'
//     })
// })

const startPart = new StartPart()
