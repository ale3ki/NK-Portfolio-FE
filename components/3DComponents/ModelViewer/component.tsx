import Script from 'next/script';

export default function ModelViewer() {
  // ...
  return (
    <div className='' style={{ position: 'relative', marginTop: '100px', width: '100vw', height: '100vh' }}>
      <h1>Hello</h1>
      <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js"></Script>
      <div style={{ width: '100%', height: '100%' }}>
        <model-viewer
          src="/jukebox.glb"
          alt="A 3D model of a jukebox"
          ar
          auto-rotate
          camera-controls
          exposure="1"
          skybox-image="/restingPlace.hdr"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        >
        </model-viewer>
      </div>
    </div>
  );
}