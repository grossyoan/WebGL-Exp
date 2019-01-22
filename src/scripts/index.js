import '../css/style.styl'
import * as THREE from 'three'

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
const scene = new THREE.Scene()


/**
 * Mesh
 */
var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );




/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)


/**
 * Raycasting
 */

let raycaster = new THREE.Raycaster()



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)


let light = new THREE.AmbientLight(0xff55ff,1)
scene.add(light)
/**
 * Loop
 */

const loop = () =>
{
    window.requestAnimationFrame(loop)
    // Update camera
    camera.rotation.x = - cursor.y *5
    camera.rotation.order = 'YXZ'
    camera.rotation.y = - cursor.x *15
    if(movez == 1)
    {
        camera.position.x  -= (Math.sin(camera.rotation.y)/50)
        camera.position.z -= (Math.cos(camera.rotation.y)/50)
        camera.position.y += (Math.tan(camera.rotation.x)/50)
    } 
    if(moveq == 1)
    {
        camera.position.x += (Math.sin(-camera.rotation.y - Math.PI/2)/50)
        camera.position.z += (-Math.cos(-camera.rotation.y - Math.PI/2)/50)
    } 
    if(moves == 1)
    {
        camera.position.x  += (Math.sin(camera.rotation.y)/50)
        camera.position.z += (Math.cos(camera.rotation.y)/50)
        camera.position.y -= (Math.tan(camera.rotation.x)/50)
    } 
    if(moved == 1)
    {
        camera.position.x += (Math.sin(-camera.rotation.y + Math.PI/2)/50)
        camera.position.z += (-Math.cos(-camera.rotation.y + Math.PI/2)/50)
    } 
    // Renderer
    renderer.render(scene, camera)
}
let movez = 0

    window.addEventListener('keydown', (event) =>
    {
        if(event.key == 'z')
        {
            movez = 1
            window.addEventListener('keyup', (event) => {
                if(event.key == 'z')
                {
                    movez = 0
                }
            })

        } 
    })
    let moveq = 0

    window.addEventListener('keydown', (event) =>
    {
        if(event.key == 'q')
        {
            moveq = 1
            window.addEventListener('keyup', (event) => {
                if(event.key == 'q')
                {
                    moveq = 0
                }
            })

        } 
    })
    let moves = 0

    window.addEventListener('keydown', (event) =>
    {
        if(event.key == 's')
        {
            moves = 1
            window.addEventListener('keyup', (event) => {
                if(event.key == 's')
                {
                    moves = 0
                }
            })

        } 
    })
    let moved = 0

    window.addEventListener('keydown', (event) =>
    {
        if(event.key == 'd')
        {
            moved = 1
            window.addEventListener('keyup', (event) => {
                if(event.key == 'd')
                {
                    moved = 0
                }
            })

        } 
    })
  
    loop()



   