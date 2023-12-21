import * as THREE from "three";

// ------ 주제: 배경의 색, 투명도 설정하기

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // console.log(window.devicePixelRatio);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 고해상도로 표현할 때 쓰임
  // renderer.setClearAlpha(0.5); // 투명도 조정
  renderer.setClearColor("#00ff00");
  renderer.setClearAlpha(0.5);

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("blue");

  // Camera
  // Perspective Camera(원근 카메라)
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // aspect
    0.1, // near
    1000 // far
  );

  camera.position.z = 6;
  camera.position.y = 2;
  camera.position.x = 1;

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

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    // MeshBasicMaterial은 빛에 영향을 받지 않음(조명 없어도 보임)
    color: "yellow",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

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
}
