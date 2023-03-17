import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/* 
Three JS needs 3 things
1. Scene  A scene is like a container
2. Camera
3. Renderer

*/

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render(scene, camera);
const borgCubeTexture = new THREE.TextureLoader().load('borg.jpeg');
const borgCubeGeometry = new THREE.BoxGeometry(20, 20, 20);
const borgCubeMaterial = new THREE.MeshStandardMaterial({map: borgCubeTexture});
const borgCube = new THREE.Mesh(borgCubeGeometry, borgCubeMaterial);

scene.add(borgCube);

const pointLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
pointLight.position.set(1, 1, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//  Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);   //  Un comment to get light source helper and grid

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(250));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(600).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);
  borgCube.rotation.x += 0.001;   //  Top to Bottom X axis
  borgCube.rotation.y += 0.0001;  //  Left to Right Y axis
  borgCube.rotation.z += 0.001;   //   Right to Left Z axis 

  controls.update();

  renderer.render(scene, camera);
}

animate();

