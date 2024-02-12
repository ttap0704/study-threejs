import * as THREE from 'three';
import { WEBGL } from './webgl';

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // 카메라
  const fov = 120;

  // 망원 : 가까이 28이하
  // 기본 : 47
  // 광각 : 멀리 63이상
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.x = 0;
  camera.position.y = 2;
  camera.position.z = 1.8;
  // 카메라가 바라보는 좌표
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 렌더러
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // 그림자 추가하려면 shadowMap.enabled = true
  renderer.shadowMap.enabled = true;

  // 도형 추가
  // const geometry = new THREE.SphereGeometry(0.5, 32, 16);
  const geometry = new THREE.IcosahedronGeometry(0.5);
  // const geometry = new THREE.ConeGeometry(0.5, 0.7, 6);
  const material01 = new THREE.MeshStandardMaterial({ color: 0x004fff });
  const obj01 = new THREE.Mesh(geometry, material01);
  obj01.rotation.y = 0.5;
  obj01.position.y = 0;
  scene.add(obj01);
  // 그림자 표현할 도형에 castShadow 추가
  obj01.castShadow = true;
  obj01.receiveShadow = true;

  const geometry02 = new THREE.IcosahedronGeometry(0.5);
  const material02 = new THREE.MeshStandardMaterial({ color: 0x004fff });
  const obj02 = new THREE.Mesh(geometry02, material02);
  obj02.position.set(-0.8, 1.2, 0.5);
  scene.add(obj02);
  // 그림자 표현할 도형에 castShadow 추가
  obj02.castShadow = true;

  // 바닥
  const planeGemetry = new THREE.PlaneGeometry(20, 20, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGemetry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  scene.add(plane);
  // 그림자를 받겠다 receiveShadow
  plane.receiveShadow = true;

  // 빛
  // 그림자 안생기는 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  // scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-1.5, 1.5, 0.5);
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  );
  scene.add(directionalLight);
  directionalLight.castShadow = true; // 그림자 O
  directionalLight.shadow.mapSize.width = 1024; // 그림자 해상도
  directionalLight.shadow.mapSize.height = 1024; // 그림자 해상도
  directionalLight.shadow.radius = 8;

  scene.add(dlHelper);

  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.3);
  scene.add(hemisphereLight);

  // 전구
  // const pointLight = new THREE.PointLight(0xffffff, 1);
  // scene.add(pointLight);
  // pointLight.position.set(1, 0.5, 0.5);
  // pointLight.castShadow = true;
  // const plHeplper = new THREE.PointLightHelper(pointLight, 0.5);
  // scene.add(plHeplper);

  // const pointLight2 = new THREE.PointLight(0xffffff, 1);
  // scene.add(pointLight2);
  // pointLight2.position.set(2, 2, 0.5);
  // const plHeplper2 = new THREE.PointLightHelper(pointLight2, 0.5);
  // scene.add(plHeplper2);

  // const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5);
  // scene.add(rectLight);
  // rectLight.position.set(0.5, 0.5, 1);
  // rectLight.lookAt(0, 0, 0);
  // rectLight.castShadow = true;

  // const spotLight = new THREE.SpotLight(0xffffff, 0.5);
  // spotLight.position.set(1, 2, 1);
  // scene.add(spotLight);
  // spotLight.castShadow = true;

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
