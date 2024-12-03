import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = createXRStore();

export default function App() {
  const [red, setRed] = useState<boolean>(false);
  async function enterSession() {
    await store.enterAR().catch((reason) => {
      toast(`your browser does not support this application, reason: ${reason}`);
    });
  }
  return (
    <>
      <button onClick={enterSession}>Enter AR</button>
      <Canvas>
        <XR store={store}>
          <mesh pointerEventsType={{ deny: 'grab' }} onClick={() => setRed(!red)} position={[0, 1, -1]}>
            <boxGeometry />
            <meshBasicMaterial color={red ? 'red' : 'blue'}/>
          </mesh>
        </XR>
      </Canvas>
      <ToastContainer/>
    </>
  )
}
