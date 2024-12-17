import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
// import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dragon from './Dragon';
import Loader from './Loader';
import React from 'react';

const store = createXRStore();

export default function App() {
  // const [red, setRed] = useState<boolean>(false);
  
  async function enterSession() {
    await store.enterAR().catch((reason) => {
      toast(`your browser does not support this application: ${reason}`);
    });
  }

  return (
    <div style={{
      width: "100%",
      height: "100%"
    }}>
      <button onClick={enterSession}>Enter AR</button>
          
      <Canvas>
        <React.Suspense fallback={<Loader/>}>
          <XR store={store}>
            <pointLight position={[10, 10, 10]}/>
            <ambientLight intensity={5}/>
            <Dragon position={[0,0, -5]}/>

            {/* <mesh pointerEventsType={{ deny: 'grab' }} onClick={() => setRed(!red)} position={[0, 1, -1]} geometry={nodes.}>
              <meshPhongMaterial />
            </mesh> */}
          </XR>
        </React.Suspense>
      </Canvas>
      <ToastContainer/>
    </div>
  )
}
