import { useEffect, useState } from "react";

// Used for page-level loading overlays; browser/network caching is handled separately by hosting headers.
function useImagePreloader(imageSources) {
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const imageSourceKey = imageSources.filter(Boolean).join("\n");

  useEffect(() => {
    let isActive = true;
    let loadedImages = 0;
    const sources = imageSourceKey.split("\n").filter(Boolean);

    const markLoaded = () => {
      loadedImages += 1;

      if (loadedImages === sources.length && isActive) {
        setIsLoadingImages(false);
      }
    };

    sources.forEach((src) => {
      const image = new Image();

      image.onload = markLoaded;
      image.onerror = markLoaded;
      image.src = src;
    });

    return () => {
      isActive = false;
    };
  }, [imageSourceKey]);

  return isLoadingImages;
}

export default useImagePreloader;
