import { useEffect, useState } from "react";

// Used for page-level loading overlays; browser/network caching is handled separately by hosting headers.
function useImagePreloader(imageSources, { maxWait = 3200 } = {}) {
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const imageSourceKey = imageSources.filter(Boolean).join("\n");

  useEffect(() => {
    let isActive = true;
    let loadedImages = 0;
    const sources = imageSourceKey.split("\n").filter(Boolean);

    if (sources.length === 0) {
      setIsLoadingImages(false);
      return () => {
        isActive = false;
      };
    }

    setIsLoadingImages(true);

    const fallbackTimer = window.setTimeout(() => {
      if (isActive) {
        setIsLoadingImages(false);
      }
    }, maxWait);

    const markLoaded = () => {
      loadedImages += 1;

      if (loadedImages === sources.length && isActive) {
        window.clearTimeout(fallbackTimer);
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
      window.clearTimeout(fallbackTimer);
    };
  }, [imageSourceKey, maxWait]);

  return isLoadingImages;
}

export default useImagePreloader;
