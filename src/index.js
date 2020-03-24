import './style/main.styl'
import * as THREE from 'three'
import { TweenLite } from 'gsap/all'
import StartPart from './javascript/StartPart.js'
/**
 * MOUSE CURSOR
 */
// const cursor = document.querySelector('.mouse-cursor')

// window.addEventListener('mousemove', (_event) => {
//     
//     cursor.style.transform = `translate(${_event.pageX-15}px, ${_event.pageY-15}px)`
// })

const startPart = new StartPart()
