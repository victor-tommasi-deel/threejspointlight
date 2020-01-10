import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  Mesh,
  PointLight,
  BoxGeometry,
  MeshPhongMaterial,
  MeshBasicMaterial,
  DoubleSide,
  SphereGeometry
} from 'three';

const MeshPhong = (obj) => new MeshPhongMaterial(obj);

const createCube = (width, height, depth) => {
  const geometry = new BoxGeometry(width, height, depth);
  const material = MeshPhong({
    color: 0xdff913,
    shininess: 100,
    side: DoubleSide
  });
  const cube = new Mesh(geometry, material);
  cube.rotation.x = 0.6;
  cube.rotation.y = 0.6;
  return cube;
};

const createSphere = (radius, widthSegments, heightSegments) => {
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const material = new MeshBasicMaterial({
    color: 0xffd700
  });
  const sphere = new Mesh(geometry, material);
  return sphere;
};

const addToScene = (array, scene) => {
  Object.entries(array).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });
};

const init = (objs, position) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0xffffff);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.z = position.z;

  const light = new PointLight(0xffffff, 2, 20, 2);
  light.position.y = 5;
  const light2 = new PointLight(0xffffff, 2, 20, 2);

  objs.push(light);
  objs.push(light2);

  addToScene(objs, scene);

  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return { renderer, scene, camera, light, light2 };
};

export { init, createCube, createSphere };
