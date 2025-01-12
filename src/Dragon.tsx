import {RootState, useFrame, useLoader} from '@react-three/fiber';
import { useState } from 'react';
import {XRSpace} from '@react-three/xr';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

import * as THREE from 'three'
import dragonModel from "./assets/dragon.obj?url";
import dragonMtl from "./assets/dragon.mtl?url";
import dragonTexture from "./assets/dragonskingold.jpg?url";
import { useTexture } from '@react-three/drei';
import { MTLLoader } from 'three/examples/jsm/Addons.js';
import { Mesh } from 'three';
import { _XRFrame } from '@react-three/fiber/dist/declarations/src/core/utils';


export default function Dragon() {
  // const xr = useXR(xr => xr.session);
  // console.log(xr?.enabledFeatures);
  

  const [space, setSpace] = useState(null);
  // const [anchor, requestAnchor] = useXRAnchor();
  // const planes = useXRPlanes();

  const mtl = useLoader(MTLLoader, dragonMtl);
  const model = useLoader(OBJLoader, dragonModel, (loader) => {
    mtl.preload();
    loader.setMaterials(mtl);
  });

  const texture = useTexture(dragonTexture);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // const handlePlaneDetection = () => {
  //   for (const plane of planes) {
  //     if (plane.orientation === 'horizontal') {
        
  //       break;
  //     }
  //   }
  // };
  useFrame((_state: RootState, _delta: number, frame?: _XRFrame) => {
    if (frame === undefined) {
      return;
    }
    const results = frame.getImageTrackingResults();
    for (const result of results) {
      console.log(result);
      setSpace(result.trackingState  === "tracked" ? result.imageSpace : null);
      // requestAnchor({ relativeTo: "space", space: result.imageSpace});
    }
  });

  return (
    <>
    {/* {planes.length > 0 && !anchor && (() => {
        handlePlaneDetection();
        return null;
    })()} */}

    {space && (
        <XRSpace space={space}>
        <mesh geometry={(model.children[0] as Mesh).geometry} scale={[0.1, 0.1, 0.1]}>
            <meshPhongMaterial map={texture} specularMap={texture} lightMap={texture}/>
        </mesh>
        </XRSpace>
    )}
    </>
  );
}
