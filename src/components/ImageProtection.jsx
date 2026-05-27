import { useEffect } from "react";
import "./ImageProtection.css";

const protectedSelectors = [
  "img",
  "picture",
  ".gallery-frame",
  ".gallery-thumbnail",
  ".collection-modal-image",
  ".collection-preview-strip",
  ".phone-shot-image",
  ".equipment-image",
].join(", ");

// This is a casual-copy deterrent, not DRM; screenshots and network inspection cannot be fully blocked on the web.
function isProtectedTarget(target) {
  return target instanceof Element && Boolean(target.closest(protectedSelectors));
}

function ImageProtection() {
  useEffect(() => {
    // Capture-phase listeners catch attempts from nested image wrappers across the app.
    const preventImageContextMenu = (event) => {
      if (isProtectedTarget(event.target)) {
        event.preventDefault();
      }
    };

    const preventImageDrag = (event) => {
      if (isProtectedTarget(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventImageContextMenu, true);
    document.addEventListener("dragstart", preventImageDrag, true);

    return () => {
      document.removeEventListener("contextmenu", preventImageContextMenu, true);
      document.removeEventListener("dragstart", preventImageDrag, true);
    };
  }, []);

  return null;
}

export default ImageProtection;