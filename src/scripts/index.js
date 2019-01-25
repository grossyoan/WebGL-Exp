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

var ballGeometry = new THREE.SphereGeometry(90)
, ballMaterial = new THREE.MeshNormalMaterial()
, ball = new Physijs.SphereMesh(ballGeometry, ballMaterial);
ball.position.z = -100;
ball.position.y = 50;
scene.add(ball);





let transparentMaterial = new THREE.MeshBasicMaterial({color:0xff0000} )
transparentMaterial.visible = true
let crateAssetHitbox = new THREE.Mesh( new THREE.BoxBufferGeometry( 20, 50, 10), transparentMaterial )
crateAssetHitbox.position.z=-50
scene.add(crateAssetHitbox)
let crateAsset = loader.load(
     'models/crate/scene.gltf',
     function ( gltf ) {gltf.scene.position.y=-0.5,gltf.scene.position.z=-50, gltf.scene.scale.set(0.05,0.05,0.05),scene.add( gltf.scene )},)



    let corridor = loader.load(
       'models/corridor2/scene.gltf',
        function ( gltf ) {gltf.scene.position.y=-1,gltf.scene.scale.set(10,10,10),scene.add( gltf.scene )})
   
   




/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)
scene.add(camera)
controls = new THREE.PointerLockControls( camera );




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
canvasDOM.appendChild(renderer.domElement)



var mesh = new Physijs.SphereMesh(
    new THREE.SphereGeometry( 20 ),
    new THREE.MeshBasicMaterial({ color: 0x888888 })
);
scene.add(mesh)
mesh.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
    // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
});


/**
 * Lights
 */
var light = new THREE.AmbientLight( 0x404040, 1     ); // soft white light
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
    }
};
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );



/**
 * Loop
 */

const loop = () =>
{
    scene.simulate(); // run physics

    window.requestAnimationFrame(loop)
    // Update camera
    if ( controls.isLocked === true ) {
        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveLeft ) - Number( moveRight );
        direction.normalize(); // this ensures consistent movements in all directions
        if ( moveForward || moveBackward)
        {
            velocity.z -= direction.z * 400.0 * delta;
        } 
        if ( moveLeft || moveRight)
        {
            velocity.x -= direction.x * 400.0 * delta;
        } 

        controls.getObject().translateX( velocity.x * delta );
        controls.getObject().translateY( velocity.y * delta );
        controls.getObject().translateZ( velocity.z * delta );
        if ( controls.getObject().position.y <15 ) {
            velocity.y = 0;
            controls.getObject().position.y = 15;
        }
        prevTime = time;
    }
    camera.rotation.order = 'YXZ'

    // Renderer
    renderer.render(scene, camera)
}
    loop()



   