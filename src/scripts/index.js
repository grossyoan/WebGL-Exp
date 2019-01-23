import '../css/style.styl'
import * as THREE from 'three'


/**
 * Keyboard Status Vector
 */

let a = new THREE.Vector3();
a.set(1,1,1)

const keys= {
    forward:false,
    backward:false,
    left:false,
    right:false
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
const scene = new THREE.Scene()

let floor = new THREE.Mesh( new THREE.PlaneGeometry( 50, 50, 50 ), new THREE.MeshBasicMaterial({color: 0xff55ff, side: THREE.DoubleSide}))
floor.rotateX(-Math.PI * 0.5)
floor.position.y=-1
scene.add(floor)


/**
 * Mesh
 */
let wall1 = new THREE.Mesh( new THREE.BoxBufferGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ) )
scene.add(wall1)

let wall2 = new THREE.Mesh( new THREE.SphereGeometry( 1, 32, 32 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ) )
wall2.position.x=3
scene.add(wall2)


/**
 * Raytracing Collision Array
 */
let walls = new Array()
walls.push(wall1)
walls.push(wall2)




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
let rays = [
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(10, 0, 1),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(1, 0, -1),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(-1, 0, -1),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-1, 0, 1)
  ]

    function collisionCheck(direction, camera)
    {
    let collisions, i,
    // Maximum distance from the origin before we consider collision
    distance = 1,
    // Get the obstacles array from our world
    obstacles = walls; //put tab of object 
    // For each ray
    for (i = 0; i < rays.length; i += 1) 
    {
        // We reset the raycaster to this direction
        raycaster.set(camera.position, rays[i])
        //console.log(direction)
        // Test if we intersect with any obstacle mesh
        collisions = raycaster.intersectObjects(obstacles)
        // And disable that direction if we do
        if (collisions.length > 0 && collisions[0].distance <= distance) 
        {
            // Yep, this.rays[i] gives us : 0 => up, 1 => up-left, 2 => left, ...
            if ((i === 0 || i === 1 || i === 7) && direction.z === -1) 
            {
                direction.z = 0;
            } 

            else if ((i === 3 || i === 4 || i === 5) && direction.z === 1) 
            {
                direction.z = 0;
            }
        
            if ((i === 1 || i === 2 || i === 3) && direction.x === 1) 
            {
                direction.x = 0;
            } 
            else if ((i === 5 || i === 6 || i === 7) && direction.x === -1) 
            {
                direction.x = 0;
            }
         }
    }
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)



/**
 * Lights
 */

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
    camera.rotation.y = - cursor.x *5

    if(a.z != 0 && keys.forward)
    {
        camera.position.x  -= (Math.sin(camera.rotation.y)/50)
        camera.position.z -= (Math.cos(camera.rotation.y)/50)
        a.z=1
    } 
    if(a.x != 0 && keys.left)
    {
        camera.position.x += (Math.sin(-camera.rotation.y - Math.PI/2)/50)
        camera.position.z += (-Math.cos(-camera.rotation.y - Math.PI/2)/50)
        a.x=-1
    } 
    if(a.z != 0 && keys.backward)
    {
        camera.position.x  += (Math.sin(camera.rotation.y)/50)
        camera.position.z += (Math.cos(camera.rotation.y)/50)
        a.z=-1
    } 
    if(a.x != 0 && keys.right)
    {
        camera.position.x += (Math.sin(-camera.rotation.y + Math.PI/2)/50)
        camera.position.z += (-Math.cos(-camera.rotation.y + Math.PI/2)/50)
        a.x=1
    } 
    collisionCheck(a,camera)

    // Renderer
    renderer.render(scene, camera)
}


/**
 * Keymaps listeners
 */


    window.addEventListener('keydown', (event) =>
    {
        if(event.key == 'z' && !keys.forward)
        {
            keys.forward = true
            a.z = 1
        } 
    })

    window.addEventListener('keyup', (event) => {

        if(event.key == 'z')
        {
            keys.forward = false
        }
    })

    window.addEventListener('keydown', (event) =>
    {
        if(event.key == 'q' && !keys.left)
        {
            keys.left = true
            a.x = -1        
        } 
    })

    window.addEventListener('keyup', (event) => {
        if(event.key == 'q')
        {
            keys.left = false
        }
    })

    window.addEventListener('keydown', (event) =>
    {
        if(event.key == 's' && !keys.backward)
        {
            keys.backward = true
            a.z = -1        
        } 
    })

    window.addEventListener('keyup', (event) => {
        if(event.key == 's')
        {
            keys.backward = false
        }
    })


    window.addEventListener('keydown', (event) =>
    {
        if(event.key == 'd' && !keys.right)
        {
            keys.right = true
            a.x = 1        
        } 
    })

    window.addEventListener('keyup', (event) => {
        if(event.key == 'd')
        {
            keys.right = false
        }
    })
  
    loop()



   