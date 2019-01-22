var MovingCube;
var collidableMeshList = [];

var wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(100, 50, -100);
scene.add(wall);
collidableMeshList.push(wall);
var wall = new THREE.Mesh(wallGeometry, wireMaterial);
wall.position.set(100, 50, -100);
scene.add(wall);

var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall2.position.set(-150, 50, 0);
wall2.rotation.y = 3.14159 / 2;
scene.add(wall2);
collidableMeshList.push(wall2);
var wall2 = new THREE.Mesh(wallGeometry, wireMaterial);
wall2.position.set(-150, 50, 0);
wall2.rotation.y = 3.14159 / 2;
scene.add(wall2);

var cubeGeometry = new THREE.CubeGeometry(50,50,50,1,1,1);
var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
MovingCube.position.set(0, 25.1, 0);


// collision detection:
//   determines if any of the rays from the cube's origin to each vertex
//      intersects any face of a mesh in the array of target meshes
//   for increased collision accuracy, add more vertices to the cube;
//      for example, new THREE.CubeGeometry( 64, 64, 64, 8, 8, 8, wireMaterial )
//   HOWEVER: when the origin of the ray is within the target mesh, collisions do not occur
var originPoint = MovingCube.position.clone();

for (var vertexIndex = 0; vertexIndex < MovingCube.geometry.vertices.length; vertexIndex++)
{       
    var localVertex = MovingCube.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4( MovingCube.matrix );
    var directionVector = globalVertex.sub( MovingCube.position );

    var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
    var collisionResults = ray.intersectObjects( collidableMeshList );
    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
        appendText(" Hit ");
}
