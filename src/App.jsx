import React from 'react';
import { init, createCube, createSphere } from './utils/utils';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ADD: 0.02,
      theta: 0,
      renderer: null,
      scene: null,
      camera: null,
      sphere: null,
      sphere2: null,
      cube: null,
      light: null,
      light2: null
    };
  }

  componentDidMount = () => {
    const cube = createCube(5, 5, 5);
    const sphere = createSphere(0.1, 30, 30);
    const sphere2 = createSphere(0.1, 30, 30);
    const start = init([cube, sphere, sphere2], { z: 20 });
    const { viewer } = this.refs;
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera, light, light2 } = start;
    this.setState({
      renderer,
      scene,
      camera,
      cube,
      sphere2,
      light,
      light2,
      sphere
    });
    this.mainLoop();
  };

  mainLoop = () => {
    const {
      ADD,
      scene,
      camera,
      renderer,
      cube,
      sphere2,
      light,
      light2,
      sphere,
      theta
    } = this.state;
    if (
      scene !== null &&
      camera !== null &&
      renderer !== null &&
      sphere2 !== null &&
      cube !== null &&
      light2 !== null &&
      light !== null &&
      sphere !== null
    ) {
      light.position.x = 6 * Math.sin(theta);
      light.position.z = 6 * Math.cos(theta);
      sphere.position.x = light.position.x;
      sphere.position.z = light.position.z;

      light2.position.y = -10 * Math.sin(theta);
      light2.position.z = -10 * Math.cos(theta);
      sphere2.position.y = light2.position.y;
      sphere2.position.z = light2.position.z;

      this.setState({
        theta: theta + ADD
      });

      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  body = () => <div ref="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
