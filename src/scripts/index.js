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

let walls = new Array()
walls.push(mesh)
console.log(walls)
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
  ];
  let meshmesh = new THREE.Object3D();

function collision(direction, camera){
    var collisions, i,
    // Maximum distance from the origin before we consider collision
    distance = 1,
    // Get the obstacles array from our world
    obstacles = walls; //put tab of object 
  // For each ray
  for (i = 0; i < rays.length; i += 1) {
    // We reset the raycaster to this direction
    raycaster.set(camera.position, rays[i]);
    //console.log(direction)
    // Test if we intersect with any obstacle mesh
    collisions = raycaster.intersectObjects(obstacles);
    // And disable that direction if we do
    if (collisions.length > 0 && collisions[0].distance <= distance) {
      // Yep, this.rays[i] gives us : 0 => up, 1 => up-left, 2 => left, ...
      if ((i === 0 || i === 1 || i === 7) && direction.z === -1) {
        direction.z = 0;
        //console.log(camera.position)
        console.log("hello")
      } else if ((i === 3 || i === 4 || i === 5) && direction.z === 1) {
        direction.z = 0;
        console.log(a)
      }
      if ((i === 1 || i === 2 || i === 3) && direction.x === 1) {
        direction.x = 0;
      } else if ((i === 5 || i === 6 || i === 7) && direction.x === -1) {
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


let light = new THREE.AmbientLight(0xff55ff,1)
scene.add(light)
/**
 * Loop
 */
let direction = 0
let a = new THREE.Vector3();
const loop = () =>
{
    window.requestAnimationFrame(loop)
    // Update camera
    camera.rotation.x = - cursor.y *5
    camera.rotation.order = 'YXZ'
    camera.rotation.y = - cursor.x *5
    if(movez == 1 && a.z != 0)
    {
        camera.position.x  -= (Math.sin(camera.rotation.y)/50)
        camera.position.z -= (Math.cos(camera.rotation.y)/50)
        camera.position.y += (Math.tan(camera.rotation.x)/50)
        a.set(0,0,1)
    } 
    if(moveq == 1 )
    {
        camera.position.x += (Math.sin(-camera.rotation.y - Math.PI/2)/50)
        camera.position.z += (-Math.cos(-camera.rotation.y - Math.PI/2)/50)
        a.set(1,0,0)
    } 
    if(moves == 1 )
    {
        camera.position.x  += (Math.sin(camera.rotation.y)/50)
        camera.position.z += (Math.cos(camera.rotation.y)/50)
        camera.position.y -= (Math.tan(camera.rotation.x)/50)
        a.set(0,0,-1)
    } 
    if(moved == 1 )
    {
        camera.position.x += (Math.sin(-camera.rotation.y + Math.PI/2)/50)
        camera.position.z += (-Math.cos(-camera.rotation.y + Math.PI/2)/50)
        a.set(-1,0,0)
    } 
    collision(a,camera)
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



   