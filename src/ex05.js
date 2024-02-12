import * as THREE from 'three';
import { WEBGL } from './webgl';

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  // 카메라
  const fov = 63;

  // 망원 : 가까이 28이하
  // 기본 : 47
  // 광각 : 멀리 63이상
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.5;
  const far = -0.4;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 1;
  // 카메라가 바라보는 좌표
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 렌더러
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // 도형 추가
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material01 = new THREE.MeshStandardMaterial({ color: 0xff7f00 });
  const obj01 = new THREE.Mesh(geometry, material01);
  obj01.rotation.y = 0.5;
  scene.add(obj01);

  // 바닥
  const planeGemetry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xabdabd });
  const plane = new THREE.Mesh(planeGemetry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.rotation.y = -0.5;
  scene.add(plane);

  // 빛
  const pointLight = new THREE.PointLight(0xffffbb, 1);
  pointLight.position.set(0, 2, 12);
  scene.add(pointLight);

  function render(time) {
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
