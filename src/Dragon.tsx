import {useLoader} from '@react-three/fiber';
import { useState } from 'react';
import {useXRPlanes, XRSpace} from '@react-three/xr';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

import * as THREE from 'three'
import dragonModel from "./assets/dragon.obj?url";
import dragonMtl from "./assets/dragon.mtl?url";
import dragonTexture from "./assets/dragonskingold.jpg?url";
import { useTexture } from '@react-three/drei';
import { MTLLoader } from 'three/examples/jsm/Addons.js';
import { Mesh } from 'three';


export default function Dragon() {
  const [anchorSpace, setAnchorSpace] = useState<XRSpace | null>(null);
  const planes = useXRPlanes();

  const mtl = useLoader(MTLLoader, dragonMtl);
  const model = useLoader(OBJLoader, dragonModel, (loader) => {
    mtl.preload();
    loader.setMaterials(mtl);
  });

  const texture = useTexture(dragonTexture);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const handlePlaneDetection = () => {
    for (const plane of planes) {
      if (plane.semanticLabel === 'desk') {
        setAnchorSpace(plane.planeSpace);
        break;
      }
    }
  };

  return (
    <>
    {planes.length > 0 && !anchorSpace && (() => {
        handlePlaneDetection();
        return null;
    })()}

    {anchorSpace && (
        <XRSpace space={anchorSpace}>
        <mesh geometry={(model.children[0] as Mesh).geometry} scale={[0.5, 0.5, 0.5]}>
            <meshPhongMaterial map={texture} specularMap={texture} lightMap={texture}/>
        </mesh>
        </XRSpace>
    )}
    </>
  );
}
