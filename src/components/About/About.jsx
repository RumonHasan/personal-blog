import './AboutStyles.css';
import {
  Float,
  OrbitControls,
  useGLTF,
  PresentationControls,
  ContactShadows,
  Html,
  KeyboardControls,
  Text,
} from '@react-three/drei';
import { startTransition, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
const About = () => {
  const modelCdnLink =
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/dog/model.gltf';
  const model = useGLTF(modelCdnLink);

  return (
    <div className="about-container">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [-3, 1.5, 4],
        }}
      >
        <ambientLight />
        <primitive object={model.scene} />
      </Canvas>
    </div>
  );
};

export default About;
