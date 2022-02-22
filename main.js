import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
//SHAPES:
const torus_big = new THREE.TorusGeometry(10, 3, 20, 70);
const torus_small = new THREE.TorusGeometry(5, 1, 20, 70);
const square_big = new THREE.BoxGeometry(15, 15, 15);
const sqare_small = new THREE.BoxGeometry(4, 4, 4);
const square_void = new THREE.BoxGeometry(10, 10, 10);
//COLOR:
const green = new THREE.Color("rgb(0, 255, 0)");
const white = new THREE.Color("rgb(255, 255, 255)");
const blue = new THREE.Color("rgb(37, 35, 97)");
const blue_soft = new THREE.Color("rgb(88, 85, 189)");
//red color pallete
const red_soft = new THREE.Color("rgb(255, 120, 120)");
const red1 = new THREE.Color("rgb(255, 0, 0)");
const red2 = new THREE.Color("rgb(191, 0, 0)");
const red3 = new THREE.Color("rgb(128, 0, 0)");
const red4 = new THREE.Color("rgb(64, 0, 0)");
const black = new THREE.Color("rgb(0, 0, 0)");
//====================MATERIALS=============================
//MATERIAL: with vertices
const materialVertex = new THREE.MeshBasicMaterial({
  color: white,
  wireframe: true,
});
//MATERIAL: works with light
const materialLight = new THREE.MeshStandardMaterial({
  color: blue,
});
//MATERIAL: borderlands style
const materialBorder = new THREE.MeshStandardMaterial({
  color: blue_soft,
  side: THREE.BackSide,
  //depthTest: false,
});
const materialBorderNoDepth = new THREE.MeshStandardMaterial({
  color: black,
  side: THREE.BackSide,
  //depthWrite: false,
  depthTest: false,
  //transparent: true,
  //opacity: 1,
});
const materialBorderNoDepthPink = new THREE.MeshStandardMaterial({
  color: blue_soft,
  side: THREE.BackSide,
  //depthWrite: false,
  depthTest: false,
});
const materialBorderNoDepthRed = new THREE.MeshStandardMaterial({
  color: blue,
  side: THREE.BackSide,
  //depthWrite: false,
  depthTest: false,
});

//=====================OBJECTS==============================
//OBJECT: torus
const torus = new THREE.Mesh(torus_big, materialLight);
const torus2 = new THREE.Mesh(torus_small, materialLight);
//OBJECT: cube
const cube_big = new THREE.Mesh(square_big, materialLight);
const cube_small = new THREE.Mesh(sqare_small, materialBorderNoDepthRed);
const cube_void = new THREE.Mesh(square_void, materialBorderNoDepth);
//TORUS OUTLINES
const torusOutline = new THREE.Mesh(torus_big, materialBorder);
const torusOutline2 = new THREE.Mesh(torus_small, materialBorder);
//SQUARE OUTLINES
const cubeOutline = new THREE.Mesh(square_big, materialBorder);
const cubeOutline2 = new THREE.Mesh(sqare_small, materialBorderNoDepthPink);

torusOutline.scale.addScalar(0.04);
torusOutline2.scale.addScalar(0.04);

cubeOutline.scale.addScalar(0.04);
cubeOutline2.scale.addScalar(0.08);

//LIGHT: point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
//LIGHT: ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//lighthelper
const lightHelper = new THREE.PointLightHelper(pointLight);
//gridhelper
const gridHelper = new THREE.GridHelper(200, 50);
//controls
const controls = new OrbitControls(camera, renderer.domElement);
//====================POSITIONS=============================
pointLight.position.set(0, 0, 25);
torus.position.set(0, 0, 0);
ambientLight.position.set(0, 0, 0);

//====================ADDITIONS=============================
//OBJECTS:
scene.add(pointLight);
scene.add(ambientLight);
//TORUS:
// scene.add(torus);
// scene.add(torus2);
// scene.add(torusOutline);
// scene.add(torusOutline2);
//SQUARE:
scene.add(cube_big);
scene.add(cube_small);
scene.add(cubeOutline);
scene.add(cubeOutline2);
scene.add(cube_void);

//HELPERS:
//scene.add(lightHelper);
// scene.add(gridHelper);

//====================FUNCTIONS=============================
function addStar() {
  const sphere = new THREE.SphereGeometry(0.5);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.BackSide,
  });
  const star = new THREE.Mesh(sphere, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

//====================ANIMATIONS============================
function animate() {
  requestAnimationFrame(animate);

  //torus rotation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torusOutline.rotation.x += 0.01;
  torusOutline.rotation.y += 0.01;
  torus2.rotation.x += 0.02;
  torus2.rotation.y += 0.02;
  torusOutline2.rotation.x += 0.02;
  torusOutline2.rotation.y += 0.02;
  //cube rotation
  cube_big.rotation.x += 0.01;
  cube_big.rotation.y += 0.01;
  cubeOutline.rotation.x += 0.01;
  cubeOutline.rotation.y += 0.01;
  cube_small.rotation.x += 0.01;
  cube_small.rotation.y += 0.01;
  cubeOutline2.rotation.x += 0.01;
  cubeOutline2.rotation.y += 0.01;
  cube_void.rotation.x += 0.01;
  cube_void.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

//star rendering loop
//Array(200).fill().forEach(addStar);
//main animation
animate();
