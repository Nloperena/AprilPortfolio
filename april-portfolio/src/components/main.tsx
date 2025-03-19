import * as THREE from 'three';
import { Book, BookOptions } from './Book';
import gsap from 'gsap';

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.set(0, 2, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient and directional lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 5);
scene.add(directionalLight);

// Create a book instance and add it to the scene
const bookOptions: BookOptions = {
  pageWidth: 5,
  pageHeight: 7,
  pageThickness: 0.1,
  pageColor: 0xffffff,
};
const myBook = new Book(bookOptions);
scene.add(myBook.group);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Add event listener to handle clicks using raycasting
window.addEventListener('click', (event) => {
  // Calculate mouse position in normalized device coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Check intersections with objects in the scene (searching recursively)
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    let clickedObject: THREE.Object3D | null = intersects[0].object;
    // Traverse up the parent chain to find our Book instance
    while (clickedObject) {
      if (clickedObject.userData.bookInstance) {
        clickedObject.userData.bookInstance.toggle();
        break;
      }
      clickedObject = clickedObject.parent;
    }
  }
});