import './style/main.styl'
import * as THREE from 'three'
import { gsap } from 'gsap'

import StartPart from './javascript/StartPart.js'
import MainPart from './javascript/MainPart.js'

/**
 * MOUSE CURSOR
 */
const $cursor = document.querySelector('.mouse-cursor')

window.addEventListener('mousemove', (_event) => {
    
    $cursor.style.transform = `translate(${_event.pageX-15}px, ${_event.pageY-15}px)`
})

// window.addEventListener('mousedown', (_event) => {
//     gsap.to($cursor, 0.3, { 
//         transform: `${ $cursor.style.transform } scale(0.7)`,
//         ease: 'Power3.easeIn'
//     })
// })


/**
 * INFORMATION POP UP
 */
const infoButton = document.querySelector('.js-main-part__object__info-icon')
const infoPop = document.querySelector('.js-information')
const closeInfo = document.querySelector('.js-close-info')

infoButton.addEventListener('click', () =>
{
    infoPop.classList.toggle('main-part__information__hidden')
})

closeInfo.addEventListener('click', () =>
{
    infoPop.classList.add('main-part__information__hidden')
})



const startPart = new StartPart()
const mainPart = new MainPart()