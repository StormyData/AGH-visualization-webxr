import { MeshProps, useGraph, useLoader } from '@react-three/fiber';
// import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

import * as THREE from 'three'
import dragonModel from "./assets/dragon.obj?url";
import dragonMtl from "./assets/dragon.mtl?url";
import dragonTexture from "./assets/dragonskingold.jpg?url";
import { useTexture } from '@react-three/drei';
import { MTLLoader } from 'three/examples/jsm/Addons.js';
import { Mesh } from 'three';

export interface DragonProps extends MeshProps {

}

export default function Dragon(props: DragonProps) {
    const mtl = useLoader(MTLLoader, dragonMtl);
    const model = useLoader(OBJLoader, dragonModel, (loader) => {
        mtl.preload();
        loader.setMaterials(mtl);
    });
    const {nodes, materials} = useGraph(model);
    const texture = useTexture(dragonTexture);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
     
    return ( <>
        <mesh geometry={(nodes.dragon as Mesh).geometry} {...props}>
            <meshPhongMaterial {...materials.Material} map={texture} specularMap={texture} lightMap={texture}/>
        </mesh>
    </>
    );
}