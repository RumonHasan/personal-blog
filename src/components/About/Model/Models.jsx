import {
  ContactShadows,
  PresentationControls,
  Float,
  Environment,
  useGLTF,
  Text,
} from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const Model = () => {
  const modelCdnLink = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/dog/model.gltf'
  );
  const [modelScale, setModelScale] = useState(2);
  const [modelRotation, setModelRotation] = useState(0.0005);
  const [isModelHovered, setIsModelHovered] = useState(false);

  // model hover
  const handleHoverOut = () => {
    setIsModelHovered(false);
  };
  const handleHoverOver = () => {
    setIsModelHovered(true);
  };

  const modelRef = useRef();
  // resizing based on screen width
  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setModelScale(1.5); // You can adjust the scale factor based on your needs
    } else {
      setModelScale(1.75); // Default scale for larger screens
    }
  };
  // object rotation
  useFrame(() => {
    modelRef.current.rotation.y += modelRotation;
  });

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Environment preset="city" />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            // eslint-disable-next-line react/no-unknown-property
            intensity={65}
            color={'#ff6900'}
            // eslint-disable-next-line react/no-unknown-property
            rotation={[-0.1, Math.PI, 0]}
            // eslint-disable-next-line react/no-unknown-property
            position={[0, 0.55, -1.15]}
          />

          <primitive
            onPointerOver={handleHoverOver}
            onPointerOut={handleHoverOut}
            ref={modelRef}
            // eslint-disable-next-line react/no-unknown-property
            object={modelCdnLink.scene}
            // eslint-disable-next-line react/no-unknown-property
            position-y={-1.2}
            // rotation-x={ 0.13 }
            scale={[modelScale, modelScale, modelScale]}
          >
            {isModelHovered === true && (
              <Text
                fontSize={0.2}
                position={[1.2, 2.05, 0.65]}
                rotation-y={-1.25}
                maxWidth={2}
              >
                Hi Am Rumon!
              </Text>
            )}
          </primitive>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
};

export default Model;
