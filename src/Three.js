// import logo from './logo.svg';

import React from 'react';
import { useEffect, useRef } from "react";
import * as THREE from "three";

import waterImage from './textures/texture.jpg'

function Three() {

  const mountRef = useRef(null);

  useEffect(() => {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 25, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();

    // var container = document.getElementById('container')

    renderer.setSize( window.innerWidth, window.innerHeight);
    mountRef.current.appendChild( renderer.domElement );


    var geometry = new THREE.BoxGeometry( 3, 3, 3 );
    var texture = new THREE.TextureLoader().load( waterImage );

    // var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    var material = new THREE.MeshBasicMaterial({map: texture})

    var cube = new THREE.Mesh( geometry, material );

    scene.add( cube );

    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )
    scene.add(light)

    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    }

    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    window.addEventListener("resize", onWindowResize, false);

    animate();

    return () => mountRef.current.removeChild( renderer.domElement);
  }, []);

  return (
    <div>
      <div ref = {mountRef}/>
    </div>
  );
}

export default Three;