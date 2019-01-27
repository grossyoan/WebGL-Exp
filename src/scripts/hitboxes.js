import './index.js'
import * as THREE from 'three'
let Physijs = require('physijs-webpack')

let transparentMaterial = new THREE.MeshBasicMaterial({color:0xff0000},.8, .4 )
transparentMaterial.visible = true

/**
 * Hitboxes
 */


let bedHitbox = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 60, 30, 10), transparentMaterial,0 )
bedHitbox.position.z=45
bedHitbox.position.x=-10
scene.add(bedHitbox)

let wall0 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 120, 60, 10), transparentMaterial,0 )
wall0.position.z=80
wall0.position.x=-10
scene.add(wall0)

let wall00 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 120, 60, 10), transparentMaterial,0 )
wall00.position.z=60
wall00.position.x=380
scene.add(wall00)


//wall0/wall00 -> 2 spawns ship

let wall1 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 700), transparentMaterial,0 )
wall1.position.z=-30
wall1.position.x=-70
scene.add(wall1)

let wall2 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 500), transparentMaterial,0 )
wall2.position.z=-30
wall2.position.x=45
scene.add(wall2)

//wall1/2 -> spawn walls

let wall3 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 200), transparentMaterial,0 )
wall3.position.z=-385
wall3.position.x=35
wall3.rotateY(1.55)
scene.add(wall3)

let wall4 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 295), transparentMaterial,0 )
wall4.position.z=-268
wall4.position.x=185
wall4.rotateY(1.55)
scene.add(wall4)

//walls3/4 -> 90deg spawn walls

let wall5 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 500), transparentMaterial,0 )
wall5.position.z=-23
wall5.position.x=323
scene.add(wall5)

let wall6 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 700), transparentMaterial,0 )
wall6.position.z=-150
wall6.position.x=432
scene.add(wall6)

//wall5/6 -> Side spawn walls

let wall7 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 200), transparentMaterial,0 )
wall7.position.z=-385
wall7.position.x=323
wall7.rotateY(1.55)
scene.add(wall7)

let wall8 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 340), transparentMaterial,0 )
wall8.position.z=-565
wall8.position.x=233
scene.add(wall8)

let wall9 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 340), transparentMaterial,0 )
wall9.position.z=-563
wall9.position.x=125
scene.add(wall9)

let wall10 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 610), transparentMaterial,0 )
wall10.position.z=-1030
wall10.position.x=136
scene.add(wall10)

let wall11 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 700), transparentMaterial,0 )
wall11.position.z=-1070
wall11.position.x=226
scene.add(wall11)
//wall8->11 -> Next bridge walls


let wall12 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 500), transparentMaterial,0 )
wall12.position.z=-1418
wall12.position.x=5
wall12.rotateY(1.55)
scene.add(wall12)


let wall13 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 500), transparentMaterial,0 )
wall13.position.z=-1340
wall13.position.x=-104
wall13.rotateY(1.55)
scene.add(wall13)

//Wall12/13 -> Between the two bridges


let wall14 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 1500), transparentMaterial,0 )
wall14.position.z=-1700
wall14.position.x=-323
scene.add(wall14)

let wall15 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 850), transparentMaterial,0 )
wall15.position.z=-1848
wall15.position.x=-236
scene.add(wall15)

//Next bridge

let wall16 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 640), transparentMaterial,0 )
wall16.position.z=-2353
wall16.position.x=-175
wall16.rotateY(1.55)
scene.add(wall16)

let wall17 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 640), transparentMaterial,0 )
wall17.position.z=-2265
wall17.position.x=74
wall17.rotateY(1.55)
scene.add(wall17)

//Next right corridor


let wall18 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 1500), transparentMaterial,0 )
wall18.position.z=-2560
wall18.position.x=226
scene.add(wall18)

let wall19 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 978), transparentMaterial,0 )
wall19.position.z=-2828
wall19.position.x=135
scene.add(wall19)

//Next front bridge


let wall20 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 640), transparentMaterial,0 )
wall20.position.z=-3312
wall20.position.x=-185
wall20.rotateY(1.55)
scene.add(wall20)

let wall21 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 640), transparentMaterial,0 )
wall21.position.z=-3306
wall21.position.x=538
wall21.rotateY(1.55)
scene.add(wall21)

//Next Corridor


let wall22 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 305), transparentMaterial,0 )
wall22.position.z=-3420
wall22.position.x=178
wall22.rotateY(1.55)
scene.add(wall22)

let wall23 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 1500), transparentMaterial,0 )
wall23.position.z=-3300
wall23.position.x=430
scene.add(wall23)


let wall24 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 1500), transparentMaterial,0 )
wall24.position.z=-3300
wall24.position.x=-75
scene.add(wall24)


//Side last room walls

let wall25 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 600), transparentMaterial,0 )
wall25.position.z=-3700
wall25.position.x=35
scene.add(wall25)


let wall26 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 600), transparentMaterial,0 )
wall26.position.z=-3710
wall26.position.x=325
scene.add(wall26)

//Inside last room walls

let wall27 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 100), transparentMaterial,0 )
wall27.position.z=-3805
wall27.position.x=380
wall27.rotateY(1.55)
scene.add(wall27)

let wall28 = new Physijs.BoxMesh( new THREE.BoxBufferGeometry( 20, 50, 100), transparentMaterial,0 )
wall28.position.z=-3770
wall28.position.x=-25
wall28.rotateY(1.55)
scene.add(wall28)