import '../css/style.styl'
import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader';
const loader = new GLTFLoader();
let canvasDOM = document.querySelector(".canvas")
let controls
let instructions = document.querySelector(".instructions")
let blocker = document.querySelector(".blocker")
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
let run = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
import PointerLockControls from './PointerLockControls.js'
var Physijs = require('physijs-webpack');



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
const  scene = new Physijs.Scene;




let ground_material = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({color:0xff0000} ),
    .8, // high friction
    .4 // low restitution
);

let camera_material = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({color:0xff5555} ),
    0, // high friction
    0 // low restitution
);



let transparentMaterial = new THREE.MeshBasicMaterial({color:0xff0000},.8, .4 )
transparentMaterial.visible = false
/*let crateAssetHitbox = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 10), transparentMaterial,0 )
crateAssetHitbox.position.z=-30
scene.add(crateAssetHitbox)
*/

let wall1 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 700), transparentMaterial,0 )
wall1.position.z=-30
wall1.position.x=-70
scene.add(wall1)

let wall2 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 500), transparentMaterial,0 )
wall2.position.z=-30
wall2.position.x=45
scene.add(wall2)





let bed = loader.load(
     'models/bed/scene.gltf',
     function ( gltf ) {gltf.scene.position.y=-25,gltf.scene.position.z=65,gltf.scene.position.x=-40, gltf.scene.scale.set(30,30,30),scene.add( gltf.scene )},)


let bedHitbox = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 60, 30, 10), transparentMaterial,0 )
bedHitbox.position.z=45
bedHitbox.position.x=-10
scene.add(bedHitbox)



let corridor = loader.load(
      'models/corridor/scene.gltf',
        function ( gltf ) {gltf.scene.position.y=-1,gltf.scene.scale.set(0.01,0.01,0.01),gltf.scene.position.x=50,gltf.scene.position.y=20,gltf.scene.position.z=-200,scene.add( gltf.scene )})





/*let ground = new Physijs.BoxMesh(
    new THREE.CubeGeometry(300, 1, 300),
    ground_material,
    0, // mass
);
ground.receiveShadow = true;
scene.add( ground );
*/




/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)

let cameraHolder = new Physijs.BoxMesh(
    new THREE.CubeGeometry(5, 5, 5),
    camera_material,
    0, // mass

);
cameraHolder.position.set( 0, 3, 0 );
cameraHolder._physijs.collision_flags = 4;
//cameraHolder.setCcdMotionThreshold(0.01)
scene.add(camera);

scene.add(cameraHolder);
cameraHolder.add(camera)
controls = new THREE.PointerLockControls( camera );

let contact = true
cameraHolder.addEventListener( 'collision', function(_event){
    //if(contact){contact = false}else{contact = true}
    //console.log(controls.getObject().position.z)
    controls.getObject().position.x = prevx[0]
    controls.getObject().position.z = prevz[0]
    //if(_event.position.x > controls.getObject().position.x)
     //   console.log("west")
    //if(_event.position.x < controls.getObject().position.x)

});


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
canvasDOM.appendChild(renderer.domElement)




/**
 * Lights
 */
var light = new THREE.AmbientLight( 0x404040, 1); // soft white light
scene.add( light );
let hemiLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 ); 
scene.add(hemiLight)



var direction = new THREE.Vector3();
instructions.addEventListener( 'click', function () {
    controls.lock();
}, false );
controls.addEventListener( 'lock', function () {
    instructions.style.display = 'none';
    blocker.style.display = 'none';
} );
controls.addEventListener( 'unlock', function () {
    blocker.style.display = 'block';
    instructions.style.display = '';
} );
scene.add( controls.getObject() );

var onKeyDown = function ( event ) {
    switch ( event.keyCode ) {
        case 38: // up
        case 90: // w
            moveForward = true;
            break;
        case 37: // left
        case 81: // a
            moveLeft = true;
            break;
        case 40: // down
        case 83: // s
            moveBackward = true;
            break;
        case 39: // right
        case 68: // d
            moveRight = true;
            break;
        case 16:
            run = true;
            break;
    }
};
var onKeyUp = function ( event ) {
    switch ( event.keyCode ) {
        case 38: // up
        case 90: // w
            moveForward = false;
            break;
        case 37: // left
        case 81: // a
            moveLeft = false;
            break;
        case 40: // down
        case 83: // s
            moveBackward = false;
            break;
        case 39: // right
        case 68: // d
            moveRight = false;
            break;
        case 16:
            run = false;
            break;
    }
};
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

let prevx = new Array();
let prevz = new Array();
/**
 * Loop
 */

const loop = () =>
{

    window.requestAnimationFrame(loop)
    // Update camera
    if ( controls.isLocked === true ) {
        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;
        prevx.push(controls.getObject().position.x)
        prevz.push(controls.getObject().position.z)
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveLeft ) - Number( moveRight );
        direction.normalize(); // this ensures consistent movements in all directions
        if ( (moveForward || moveBackward) )
        {
            if(run)
            {
                velocity.z -= direction.z * 1200.0 * delta;
            }
            else
            {
                velocity.z -= direction.z * 600.0 * delta;
            }
        } 
        if ( (moveLeft || moveRight) )
        {
            if(run)
            {
                velocity.x -= direction.x * 800.0 * delta;

            }
            else{
                velocity.x -= direction.x * 400.0 * delta;

            }
        } 
        cameraHolder.__dirtyPosition = true;
        cameraHolder.__dirtyRotation = true;
        controls.getObject().translateX( velocity.x * delta );
        controls.getObject().translateY( velocity.y * delta );
        controls.getObject().translateZ( velocity.z * delta );
        cameraHolder.position.x = controls.getObject().position.x
        cameraHolder.position.z = controls.getObject().position.z
        cameraHolder.rotation.x = controls.getObject().rotation.x
        cameraHolder.rotation.y = controls.getObject().rotation.y
        if ( controls.getObject().position.y <15 ) {
            velocity.y = 0;
            controls.getObject().position.y = 15;
        }
        if(prevx.length > 4){
            prevx.splice(0,1)
            prevz.splice(0,1)
        }
        console.log(run)
        //console.log(prevx, prevz, controls.getObject().position.x,controls.getObject().position.z)
        prevTime = time;
    }
    camera.rotation.order = 'YXZ'
    scene.simulate(); // run physics

    // Renderer
    renderer.render(scene, camera)
}
    loop()



   