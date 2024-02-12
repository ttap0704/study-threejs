import * as THREE from 'three';
import { WEBGL } from './webgl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

if (WEBGL.isWebGLAvailable()) {
  const FogColor = 0x004fff;
  const objColor = 0xffffff;
  const FloorColor = 0x555555;

  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(FogColor);
  // scene.fog = new THREE.Fog(FogColor, 1, 16);
  scene.fog = new THREE.FogExp2(FogColor, 0.1);

  // 카메라
  const fov = 80;

  // 망원 : 가까이 28이하
  // 기본 : 47
  // 광각 : 멀리 63이상
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.x = 0;
  camera.position.y = 2;
  camera.position.z = 3;
  // 카메라가 바라보는 좌표
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 렌더러
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // OrbitControls 추가
  // 카메라세팅 이후에 세팅
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 2; // 최소 줌
  controls.maxDistance = 6; // 최대 줌
  controls.maxPolarAngle = Math.PI / 2; // Math.PI = 원주율 : 최대 x
  controls.update();

  // 그림자 추가하려면 shadowMap.enabled = true
  renderer.shadowMap.enabled = true;

  // 도형 추가
  const geometry = new THREE.TorusGeometry(0.7, 0.3, 12, 80);
  const material01 = new THREE.MeshStandardMaterial({ color: objColor });
  const obj01 = new THREE.Mesh(geometry, material01);
  obj01.position.y = 0.8;
  obj01.position.z = -8;
  scene.add(obj01);

  // 바닥
  const planeGemetry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: FloorColor });
  const plane = new THREE.Mesh(planeGemetry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  scene.add(plane);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  function animate(time) {
    requestAnimationFrame(animate);

    obj01.rotation.y += 0.01;

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

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
