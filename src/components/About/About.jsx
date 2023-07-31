import { Canvas } from '@react-three/fiber';
import './AboutStyles.css';
import Model from './Model/Models';
import { Card } from '@mui/material';

const About = () => {
  return (
    <div className="about-container">
      <Card sx={{ width: '100%', height: '100%' }}>
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [3, 2, 6],
          }}
        >
          <Model />
        </Canvas>
      </Card>
    </div>
  );
};

export default About;
