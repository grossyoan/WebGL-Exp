import '../css/style.styl'
import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'
import PointerLockControls from './PointerLockControls.js'
let heroButton = document.querySelector('.heroButton')
let heroPage = document.querySelector('.hero')
let Physijs = require('physijs-webpack')
let DText = require('three.text')
const loader = new GLTFLoader()
let canvasDOM = document.querySelector(".canvas")
let controls
let pauseMenu = document.querySelector(".paused")
let moveForward = false
let moveBackward = false
let moveLeft = false
let moveRight = false
let run = false
let prevTime = performance.now()
let velocity = new THREE.Vector3()
let contact = true
let backgroundSound = document.querySelector('.backgroundSound')
let walkingSound = document.querySelector('.walkingSound')

walkingSound.playbackRate = 1.5
walkingSound.volume = 0.4

const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false
}


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
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})



/**
 * Scene
 */
const scene = new Physijs.Scene


/**
 * Materials
 */


let camera_material = Physijs.createMaterial(
    new THREE.MeshBasicMaterial(
    {
        color: 0xff5555
    }),
    0, // high friction
    0 // low restitution
)
/**
 * GLTF Loaders
 */

let bed = loader.load(
    'models/bed/scene.gltf',
    function(gltf)
    {
        gltf.scene.position.y = -25, gltf.scene.position.z = 65, gltf.scene.position.x = -40, gltf.scene.scale.set(30, 30, 30), scene.add(gltf.scene)
    }, )


let corridor = loader.load(
    'models/corridor/scene.gltf',
    function(gltf)
    {
        gltf.scene.position.y = -1, gltf.scene.scale.set(0.01, 0.01, 0.01), gltf.scene.position.x = 50, gltf.scene.position.y = 20, gltf.scene.position.z = -200, scene.add(gltf.scene)
    })

/**
 * Transparent material
 */
let transparentMaterial = new THREE.MeshBasicMaterial(
{
    color: 0xff0000
}, .8, .4)
transparentMaterial.visible = false


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)

let cameraHolder = new Physijs.BoxMesh(
    new THREE.CubeGeometry(5, 5, 5),
    transparentMaterial,
    0, // mass

)
cameraHolder.position.set(0, 3, 0)
cameraHolder._physijs.collision_flags = 4
scene.add(camera)
scene.add(cameraHolder)
cameraHolder.add(camera)
controls = new THREE.PointerLockControls(camera)




cameraHolder.addEventListener('collision', function(_event)
{
    //if(contact){contact = false}else{contact = true}
    //console.log(controls.getObject().position.z)
    controls.getObject().position.x = prevx[0]
    controls.getObject().position.z = prevz[0]
    //if(_event.position.x > controls.getObject().position.x)
    //   console.log("west")
    //if(_event.position.x < controls.getObject().position.x)

})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer(
{
    preserveDrawingBuffer: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
canvasDOM.appendChild(renderer.domElement)




/**
 * Lights
 */
let ambientLight = new THREE.AmbientLight(0x404040, 0.5) // soft white light
scene.add(ambientLight)
let bulbLight1 = new THREE.PointLight(0xff0000, 1, 200, 2)
bulbLight1.position.set(50, 50, 150)
scene.add(bulbLight1)

let ambientLightAnim = () =>
{
    let AmbientPlusOrMinus = Math.random()
    if (AmbientPlusOrMinus < 0.5)
    {
        AmbientPlusOrMinus = Math.floor(AmbientPlusOrMinus)
    }
    else
    {
        AmbientPlusOrMinus = Math.ceil(AmbientPlusOrMinus)
    }
    if (AmbientPlusOrMinus === 0 && ambientLight.intensity > 0.3)
    {
        ambientLight.intensity -= 0.01
    }
    else if (AmbientPlusOrMinus === 0 && ambientLight.intensity < 0.3)
    {
        ambientLight.intensity = 0.3
    }
    else if (AmbientPlusOrMinus === 1 && ambientLight.intensity < 0.7)
    {
        ambientLight.intensity += 0.01
    }
    else if (AmbientPlusOrMinus === 1 && ambientLight.intensity > 0.7)
    {
        ambientLight.intensity = 0.7
    }
}


let bulb1Anim = () =>
{
    if (bulbLight1.position.z > -1600)
    {
        bulbLight1.position.z -= 1
    }
    else
    {
        bulbLight1.position.z = 200
    }
}

/**
 * Movement controls
 */

heroButton.addEventListener('click', () =>
{
    canvasDOM.style.opacity = '1'
    controls.lock()
    heroPage.style.display = 'none'
    backgroundSound.play()
    backgroundSound.volume = 0.2
})

let direction = new THREE.Vector3()

pauseMenu.addEventListener('click', function()
{
    controls.lock()
}, false)

controls.addEventListener('lock', function()
{
    pauseMenu.style.display = 'none'
})

controls.addEventListener('unlock', function()
{
    pauseMenu.style.display = 'flex'
})
scene.add(controls.getObject())

let onKeyDown = function(event)
{
    switch (event.keyCode)
    {
        case 38: // up
        case 90: // z
            moveForward = true
            walkingSound.play()
            break
        case 37: // left
        case 81: // q
            moveLeft = true
            walkingSound.play()
            break
        case 40: // down
        case 83: // s
            moveBackward = true
            walkingSound.play()

            break
        case 39: // right
        case 68: // d
            moveRight = true
            walkingSound.play()
            break
        case 16:
            run = true
            break
    }
}
let onKeyUp = function(event)
{
    switch (event.keyCode)
    {
        case 38: // up
        case 90: // z
            moveForward = false
            break
        case 37: // left
        case 81: // q
            moveLeft = false
            break
        case 40: // down
        case 83: // s
            moveBackward = false
            break
        case 39: // right
        case 68: // d
            moveRight = false
            break
        case 16:
            run = false
            break
    }
}
document.addEventListener('keydown', onKeyDown, false)
document.addEventListener('keyup', onKeyUp, false)

let prevx = new Array()
let prevz = new Array()
/**
 * Loop
 */

const loop = () =>
{

    window.requestAnimationFrame(loop)
    // Update camera
    if (controls.isLocked === true)
    {
        let time = performance.now()
        let delta = (time - prevTime) / 1000
        prevx.push(controls.getObject().position.x)
        prevz.push(controls.getObject().position.z)
        velocity.x -= velocity.x * 10.0 * delta
        velocity.z -= velocity.z * 10.0 * delta
        velocity.y -= 9.8 * 100.0 * delta // 100.0 = mass
        direction.z = Number(moveForward) - Number(moveBackward)
        direction.x = Number(moveLeft) - Number(moveRight)
        direction.normalize() // this ensures consistent movements in all directions
        if (run)
        {
            walkingSound.playbackRate = 2
        }
        if (!run)
        {
            walkingSound.playbackRate = 1.5
        }
        if ((moveForward || moveBackward))
        {
            if (run)
            {
                velocity.z -= direction.z * 2000.0 * delta
            }
            else
            {
                velocity.z -= direction.z * 1000.0 * delta
            }
        }
        if ((moveLeft || moveRight))
        {
            if (run)
            {
                velocity.x -= direction.x * 2000.0 * delta

            }
            else
            {
                velocity.x -= direction.x * 1000.0 * delta

            }
        }
        if (!moveLeft && !moveRight && !moveBackward && !moveForward)
        {
            walkingSound.pause()
        }
        cameraHolder.__dirtyPosition = true
        cameraHolder.__dirtyRotation = true
        controls.getObject().translateX(velocity.x * delta)
        controls.getObject().translateY(velocity.y * delta)
        controls.getObject().translateZ(velocity.z * delta)
        cameraHolder.position.x = controls.getObject().position.x
        cameraHolder.position.z = controls.getObject().position.z
        cameraHolder.rotation.x = controls.getObject().rotation.x
        cameraHolder.rotation.y = controls.getObject().rotation.y
        if (controls.getObject().position.y < 15)
        {
            velocity.y = 0
            controls.getObject().position.y = 15
        }
        if (prevx.length > 4)
        {
            prevx.splice(0, 1)
            prevz.splice(0, 1)
        }
        //console.log(prevx, prevz, controls.getObject().position.x,controls.getObject().position.z)
        prevTime = time
    }
    bulb1Anim()
    ambientLightAnim()
    camera.rotation.order = 'YXZ'
    scene.simulate() // run physics
    // Renderer
    renderer.render(scene, camera)
}
loop()




/**
 * Hitboxes
 */


let bedHitbox = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(60, 30, 30), transparentMaterial, 0)
bedHitbox.position.z = 55
bedHitbox.position.x = -10
scene.add(bedHitbox)

let wall0 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(120, 60, 10), transparentMaterial, 0)
wall0.position.z = 80
wall0.position.x = -10
scene.add(wall0)

let wall00 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(120, 60, 10), transparentMaterial, 0)
wall00.position.z = 60
wall00.position.x = 380
scene.add(wall00)


//wall0/wall00 -> 2 spawns ship

let wall1 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 700), transparentMaterial, 0)
wall1.position.z = -30
wall1.position.x = -70
scene.add(wall1)

let wall2 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 500), transparentMaterial, 0)
wall2.position.z = -30
wall2.position.x = 45
scene.add(wall2)

//wall1/2 -> spawn walls

let wall3 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 200), transparentMaterial, 0)
wall3.position.z = -385
wall3.position.x = 35
wall3.rotateY(1.55)
scene.add(wall3)

let wall4 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 295), transparentMaterial, 0)
wall4.position.z = -268
wall4.position.x = 185
wall4.rotateY(1.55)
scene.add(wall4)

//walls3/4 -> 90deg spawn walls

let wall5 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 500), transparentMaterial, 0)
wall5.position.z = -23
wall5.position.x = 323
scene.add(wall5)

let wall6 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 700), transparentMaterial, 0)
wall6.position.z = -150
wall6.position.x = 432
scene.add(wall6)

//wall5/6 -> Side spawn walls

let wall7 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 200), transparentMaterial, 0)
wall7.position.z = -385
wall7.position.x = 323
wall7.rotateY(1.55)
scene.add(wall7)

let wall8 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 340), transparentMaterial, 0)
wall8.position.z = -565
wall8.position.x = 233
scene.add(wall8)

let wall9 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 340), transparentMaterial, 0)
wall9.position.z = -563
wall9.position.x = 125
scene.add(wall9)

let wall10 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 610), transparentMaterial, 0)
wall10.position.z = -1030
wall10.position.x = 136
scene.add(wall10)

let wall11 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 700), transparentMaterial, 0)
wall11.position.z = -1070
wall11.position.x = 226
scene.add(wall11)
//wall8->11 -> Next bridge walls


let wall12 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 500), transparentMaterial, 0)
wall12.position.z = -1418
wall12.position.x = 5
wall12.rotateY(1.55)
scene.add(wall12)


let wall13 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 500), transparentMaterial, 0)
wall13.position.z = -1340
wall13.position.x = -104
wall13.rotateY(1.55)
scene.add(wall13)

//Wall12/13 -> Between the two bridges


let wall14 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 1500), transparentMaterial, 0)
wall14.position.z = -1700
wall14.position.x = -323
scene.add(wall14)

let wall15 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 850), transparentMaterial, 0)
wall15.position.z = -1848
wall15.position.x = -236
scene.add(wall15)

//Next bridge

let wall16 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 640), transparentMaterial, 0)
wall16.position.z = -2353
wall16.position.x = -175
wall16.rotateY(1.55)
scene.add(wall16)

let wall17 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 640), transparentMaterial, 0)
wall17.position.z = -2265
wall17.position.x = 74
wall17.rotateY(1.55)
scene.add(wall17)

//Next right corridor


let wall18 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 1500), transparentMaterial, 0)
wall18.position.z = -2560
wall18.position.x = 226
scene.add(wall18)

let wall19 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 978), transparentMaterial, 0)
wall19.position.z = -2828
wall19.position.x = 135
scene.add(wall19)

//Next front bridge


let wall20 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 640), transparentMaterial, 0)
wall20.position.z = -3312
wall20.position.x = -185
wall20.rotateY(1.55)
scene.add(wall20)

let wall21 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 640), transparentMaterial, 0)
wall21.position.z = -3306
wall21.position.x = 538
wall21.rotateY(1.55)
scene.add(wall21)

//Next Corridor


let wall22 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 305), transparentMaterial, 0)
wall22.position.z = -3420
wall22.position.x = 178
wall22.rotateY(1.55)
scene.add(wall22)

let wall23 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 1500), transparentMaterial, 0)
wall23.position.z = -3300
wall23.position.x = 430
scene.add(wall23)


let wall24 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 1500), transparentMaterial, 0)
wall24.position.z = -3300
wall24.position.x = -75
scene.add(wall24)


//Side last room walls

let wall25 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 600), transparentMaterial, 0)
wall25.position.z = -3700
wall25.position.x = 35
scene.add(wall25)


let wall26 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 600), transparentMaterial, 0)
wall26.position.z = -3710
wall26.position.x = 325
scene.add(wall26)

//Inside last room walls

let wall27 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 100), transparentMaterial, 0)
wall27.position.z = -3805
wall27.position.x = 380
wall27.rotateY(1.55)
scene.add(wall27)

let wall28 = new Physijs.BoxMesh(new THREE.BoxBufferGeometry(20, 50, 100), transparentMaterial, 0)
wall28.position.z = -3770
wall28.position.x = -25
wall28.rotateY(1.55)
scene.add(wall28)