import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dragon from './Dragon';
import Loader from './Loader';
import React from 'react';
const img = document.getElementById('bitmap') as HTMLImageElement;
// Ensure the image is loaded and ready for use
const imgBitmap = await createImageBitmap(img, {});
const store = createXRStore({
  customSessionInit: {
    requiredFeatures: ["anchors", "image-tracking", "local-floor"],
    // @ts-expect-error the tracked images are passed correctly all the way down to navigator.xr.requestSession, but the type does not include it
    trackedImages: [
      {
        image: imgBitmap,
        widthInMeters: 0.2
      }
    ]
  }
});

export default function App() {
  
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
            <pointLight position={[5, 5, 5]} intensity={4}/>
            <ambientLight intensity={0.2}/>
            <Dragon/>
          </XR>
        </React.Suspense>
      </Canvas>
      <ToastContainer/>
    </div>
  )
}
