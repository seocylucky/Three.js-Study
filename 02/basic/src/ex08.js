import * as THREE from "three";
import gsap from "gsap";

// ------ 주제: 안개(fog)
export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // console.log(window.devicePixelRatio);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 고해상도로 표현할 때 쓰임

  // Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("black", 3, 7);

  // Camera
  // Perspective Camera(원근 카메라)
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // aspect
    0.1, // near
    1000 // far
  );

  camera.position.y = 1;
  camera.position.z = 5;

  // Orthographic Camera(직교 카메라)
  // const camera = new THREE.OrthographicCamera(
  //   -(window.innerWidth / window.innerHeight), // left
  //   window.innerWidth / window.innerHeight, // right
  //   1, // top
  //   -1, // bottom
  //   0.1,
  //   1000
  // );
  // camera.position.x = 1;
  // camera.position.y = 2;
  // camera.position.z = 5;
  // camera.lookAt(0, 0, 0);
  // camera.zoom = 0.5; // Orthographic은 zoom을 이용해야 앞 뒤로 카메라가 이동함
  // camera.updateProjectionMatrix(); // 변경해주고 나서 꼭 이 문장을 써야 함

  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 10);
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 10;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    // MeshBasicMaterial은 빛에 영향을 받지 않음(조명 없어도 보임)
    color: "blue",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  let time = Date.now();
  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;

    // meshes.forEach((item) => {
    //   item.rotation.y += deltaTime * 0.001;
    // });

    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw); // webXR에서는 이거 써야 함!
  }

  // gsap
  gsap.to(mesh.position, {
    duration: 1,
    y: 2,
    z: 3,
  });

  function setSize() {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    // updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
