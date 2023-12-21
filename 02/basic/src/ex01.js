import * as THREE from "three";

// ------ 주제: 기본 장면

export default function example() {
  // 동적으로 캔버스 조립하기
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // console.log(renderer.domElement);
  // document.body.appendChild(renderer.domElement);

  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  // Perspective Camera(원근 카메라)
  // const camera = new THREE.PerspectiveCamera(
  //   75, // 시야각(field of view)
  //   window.innerWidth / window.innerHeight, // aspect
  //   0.1, // near
  //   1000 // far
  // );

  // camera.position.z = 6;
  // camera.position.y = 2;
  // camera.position.x = 1;

  // Orthographic Camera(직교 카메라)
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, // right
    1, // top
    -1, // bottom
    0.1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.5; // Orthographic은 zoom을 이용해야 앞 뒤로 카메라가 이동함
  camera.updateProjectionMatrix(); // 변경해주고 나서 꼭 이 문장을 써야 함

  scene.add(camera);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    // MeshBasicMaterial은 빛에 영향을 받지 않음(조명 없어도 보임)
    color: "yellow",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer.render(scene, camera);
}
