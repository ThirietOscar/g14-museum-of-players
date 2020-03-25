import './style/main.styl'
import * as THREE from 'three'
import { TweenLite } from 'gsap/all'

import StartPart from './javascript/StartPart.js'
import MainPart from './javascript/MainPart.js'

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

/**
 * SOUND
 */
const $equalizerButton = document.querySelector('.js-equalizer-button')
let $equalizer = document.querySelectorAll('.js-equalizer')

$equalizerButton.addEventListener('click', () =>
{
    $equalizer[0].classList.toggle('equalizer--off')
})

/**
 * INFORMATION POP UP
 */
const infoButton = document.querySelector('.js-main-part__object__info-icon')
const infoPop = document.querySelector('.js-information')

infoButton.addEventListener('click', () =>
{
    infoPop.classList.toggle('hidden')
})

const startPart = new StartPart()
const mainPart = new MainPart()