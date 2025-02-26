import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { SphereGeometry } from "../src/SphereGeometry.js";
// console.log(SphereGeometry);

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture1 = textureLoader.load("/textures/matcaps/2.png");
const matcapTexture2 = textureLoader.load("/textures/matcaps/3.png");
const matcapTexture3 = textureLoader.load("/textures/matcaps/8.png");

// fonts
const fontLoader = new FontLoader();

fontLoader.load("/font/myfont.json", (font) => {
  const textGeometryWhite = new TextGeometry("White", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometryWhite.center();

  const textMaterial1 = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture1,
  });
  const textWhite = new THREE.Mesh(textGeometryWhite, textMaterial1);
  textWhite.position.x = -1;
  scene.add(textWhite);

  const textGeometryDevil = new TextGeometry("Devil", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometryDevil.center();
  const textMaterial2 = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture2,
  });
  const textDevil = new THREE.Mesh(textGeometryDevil, textMaterial2);
  // Increase the gap by adjusting the value here, e.g., 0.5 for a larger gap
  textDevil.position.x = textWhite.geometry.boundingBox.max.x + 0.01;
  scene.add(textDevil);
  
  const donutGeometry = new SphereGeometry(0.3, 0.2, 20, 45);
  const donutMaterial2 = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture3,
  });

  for (let i = 0; i < 300; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial2);

    donut.position.x = (Math.random() - 0.6) * 10;
    donut.position.y = (Math.random() - 0.6) * 10;
    donut.position.z = (Math.random() - 0.6) * 10;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
