import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Importar GLTFLoader
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // Importar OrbitControls

const ObjLoaderComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Crear la escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    // Establecer el tamaño del renderizador a la mitad de la pantalla
    const height = window.innerHeight / 2;
    const width = window.innerWidth / 2;
    renderer.setSize(width, height);

    // Eliminar cualquier canvas existente antes de agregar el nuevo
    const existingCanvas = containerRef.current.querySelector("canvas");
    if (existingCanvas) {
      containerRef.current.removeChild(existingCanvas);
    }

    containerRef.current.appendChild(renderer.domElement);

    // // Cambiar el tamaño del contenedor para que coincida con el canvas
    // containerRef.current.style.width = `${width}px`;
    // containerRef.current.style.height = `${height}px`;

    // Cambiar el color de fondo de la escena a negro
    scene.background = null; // Negro

    // Habilitar sombras en el renderizador
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Tipo de sombra suave

    // Agregar luz a la escena
    const ambientLight = new THREE.AmbientLight(0x888888, 1); // Luz suave
    scene.add(ambientLight);

    // Luz direccional para las sombras
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    directionalLight.castShadow = true; // Permite que la luz proyecte sombras
    scene.add(directionalLight);

    // Configuración de la luz direccional para mejorar las sombras
    directionalLight.shadow.mapSize.width = 1024; // Mejorar la resolución de las sombras
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;

    // Cargar el modelo .obj
    const loader = new GLTFLoader();
    let loadedObject = null;

    loader.load(
      "./nethound.glb", // Ruta a tu archivo .obj, asegúrate que sea correcta
      (gltf) => {
        const object = gltf.scene;

        // Asegúrate de que el objeto tenga un material blanco
        object.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xffffff, // Blanco
              roughness: 0.5, // Rugosidad
              metalness: 0.1, // Metalicidad
            });
            child.castShadow = true; // El objeto proyectará sombras
            child.receiveShadow = true; // El objeto recibirá sombras
          }
        });

        // Escalar el objeto para que no sea tan grande
        object.scale.set(0.2, 0.2, 0.2); // Ajusta el tamaño aquí
        object.position.set(0, -10, 0); // Centrado en la escena
        object.rotation.set(0, Math.PI * 0.8, 0); // Rotación inicial
        scene.add(object);

        loadedObject = object; // Guardamos el objeto cargado
      },
      // Progreso de la carga
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% cargado");
      },
      // En caso de error
      (error) => {
        console.error("Un error ocurrió al cargar el modelo:", error);
      }
    );

    // Posicionar la cámara a una distancia adecuada para ver el objeto
    camera.position.set(0, 10, 50); // Posición más alta para un ángulo superior

    // Configurar OrbitControls para mover la cámara con el ratón
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Habilitar amortiguamiento para movimientos más suaves
    controls.dampingFactor = 0.25; // Factor de amortiguamiento
    controls.screenSpacePanning = false; // Evitar que la cámara se mueva fuera de la vista
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    // Función de animación para actualizar la escena
    const animate = () => {
      requestAnimationFrame(animate);

      // Hacer que el objeto gire (si ha sido cargado)
      if (loadedObject) {
        loadedObject.rotation.y = (window.scrollY) / 200 + Math.PI * 0.8; // Gira el objeto alrededor del eje Y
      }

      // Actualizar controles para que se mueva con el ratón
      controls.update(); // Solo es necesario si `enableDamping` es true

      renderer.render(scene, camera);
    };

    animate();

    // debug
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    // Ajustar la cámara cuando se cambia el tamaño de la ventana
    const onWindowResize = () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onWindowResize);

    // Cleanup (eliminar el listener y la escena cuando el componente se desmonte)
    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-container" />; //style={{ width: "100%", height: "100vh" }}
};

export default ObjLoaderComponent;
