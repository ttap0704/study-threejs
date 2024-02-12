import * as THREE from 'three';
import { WEBGL } from './webgl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 카메라
  const fov = 50;

  // 망원 : 가까이 28이하
  // 기본 : 47
  // 광각 : 멀리 63이상
  const aspect = window.innerWidth / window.innerHeight;
  const near = 1;
  const far = 4000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.set(0, 20, 100);
  // 카메라가 바라보는 좌표
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 렌더러
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // OrbitControls 추가
  // 카메라세팅 이후에 세팅
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 20; // 최소 줌
  controls.maxDistance = 800; // 최대 줌
  controls.update();

  // 텍스쳐
  const skyMaterialArray = [];
  const texture_ft = new THREE.TextureLoader().load(
    '../static/img/arid_ft.jpg'
  );
  const texture_bk = new THREE.TextureLoader().load(
    '../static/img/arid_bk.jpg'
  );
  const texture_up = new THREE.TextureLoader().load(
    '../static/img/arid_up.jpg'
  );
  const texture_dn = new THREE.TextureLoader().load(
    '../static/img/arid_dn.jpg'
  );
  const texture_rt = new THREE.TextureLoader().load(
    '../static/img/arid_rt.jpg'
  );
  const texture_lf = new THREE.TextureLoader().load(
    '../static/img/arid_lf.jpg'
  );
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_ft,
    })
  );

  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_bk,
    })
  );

  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_up,
    })
  );

  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_dn,
    })
  );

  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_rt,
    })
  );

  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_lf,
    })
  );

  for (let i = 0; i < 6; i++) {
    skyMaterialArray[i].side = THREE.BackSide;
  }

  // 메쉬 추가
  const skyGeometry = new THREE.BoxGeometry(2400, 2400, 2400);
  // const skyMaterial = new THREE.MeshStandardMaterial({
  //   color: 0x333333,
  //   // map: texture,
  // });
  // skyMaterial.side = THREE.BackSide;
  const sky = new THREE.Mesh(skyGeometry, skyMaterialArray);
  scene.add(sky);

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  function animate(time) {
    requestAnimationFrame(animate);

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
