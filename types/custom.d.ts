declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        ar?: boolean;
        autoRotate?: boolean;
        cameraControls?: boolean;
        exposure?: string; // Changed from number to string.
        environmentImage?: string;
        skyboxImage?: string;
      };
    }
  }
}


export {};