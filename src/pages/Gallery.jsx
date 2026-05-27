import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getCategoryById,
  getFilteredPhotos,
  getPhotoPath,
  getPhotoTitle,
  photoCategories,
} from "../data/photos";
import "./Gallery.css";

const photosPerPage = 8;

// Warm adjacent full-size frames so keyboard, swipe, auto-play, and button navigation feel immediate.
function preloadImage(src) {
  if (!src || typeof Image === "undefined") {
    return;
  }

  const image = new Image();
  image.decoding = "async";
  image.src = src;
}

function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryCategory = searchParams.get("category");
  const activeCategory = getCategoryById(queryCategory) ?? photoCategories[0];
  const [toneFilter, setToneFilter] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loadedThumbnails, setLoadedThumbnails] = useState({});
  const [touchStartX, setTouchStartX] = useState(null);
  const [idleResetKey, setIdleResetKey] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const activePhotos = useMemo(
    () => getFilteredPhotos(activeCategory, toneFilter),
    [activeCategory, toneFilter],
  );
  const selectedPhoto = activePhotos[selectedIndex];
  const selectedPhotoTitle = selectedPhoto.title ?? getPhotoTitle(selectedPhoto.file);
  const totalPages = Math.max(1, Math.ceil(activePhotos.length / photosPerPage));
  const pageStart = currentPage * photosPerPage;
  const visiblePhotos = activePhotos.slice(pageStart, pageStart + photosPerPage);
  const selectedPhotoSrc = getPhotoPath(activeCategory.id, selectedPhoto.file);
  const hasPreviousPhoto = selectedIndex > 0;
  const hasNextPhoto = selectedIndex < activePhotos.length - 1;

  // Keep the current category lightweight while preparing only the two most likely next requests.
  useEffect(() => {
    [selectedIndex - 1, selectedIndex + 1].forEach((photoIndex) => {
      const adjacentPhoto = activePhotos[photoIndex];

      if (adjacentPhoto) {
        preloadImage(getPhotoPath(activeCategory.id, adjacentPhoto.file));
      }
    });
  }, [activeCategory.id, activePhotos, selectedIndex]);

  const resetSelection = () => {
    setSelectedIndex(0);
    setCurrentPage(0);
    setIsImageLoaded(false);
  };

  const selectCategory = (categoryId) => {
    if (categoryId === activeCategory.id) {
      return;
    }

    setSearchParams({ category: categoryId });
    resetSelection();
  };

  const selectToneFilter = (filter) => {
    setToneFilter(filter);
    resetSelection();
  };

  const selectPhoto = (photoIndex) => {
    if (photoIndex === selectedIndex) {
      return;
    }

    setSelectedIndex(photoIndex);
    setIsImageLoaded(false);
  };

  const markThumbnailLoaded = (thumbnailSrc) => {
    setLoadedThumbnails((currentLoadedThumbnails) => {
      if (currentLoadedThumbnails[thumbnailSrc]) {
        return currentLoadedThumbnails;
      }

      return {
        ...currentLoadedThumbnails,
        [thumbnailSrc]: true,
      };
    });
  };

  const changePage = (direction) => {
    const nextPage =
      direction === "next"
        ? Math.min(currentPage + 1, totalPages - 1)
        : Math.max(currentPage - 1, 0);

    setCurrentPage(nextPage);
    setSelectedIndex(nextPage * photosPerPage);
    setIsImageLoaded(false);
  };

  const showPhoto = (nextIndex) => {
    if (nextIndex === selectedIndex) {
      return;
    }

    setSelectedIndex(nextIndex);
    setCurrentPage(Math.floor(nextIndex / photosPerPage));
    setIsImageLoaded(false);
  };

  const navigatePhoto = (direction) => {
    const nextIndex =
      direction === "next"
        ? Math.min(selectedIndex + 1, activePhotos.length - 1)
        : Math.max(selectedIndex - 1, 0);

    showPhoto(nextIndex);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;
    const minimumSwipeDistance = 52;

    if (Math.abs(swipeDistance) >= minimumSwipeDistance) {
      navigatePhoto(swipeDistance < 0 ? "next" : "previous");
    }

    setTouchStartX(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
          return;
        }

        event.preventDefault();
        const activeCategoryIndex = photoCategories.findIndex(
          (category) => category.id === activeCategory.id,
        );
        const nextCategoryIndex =
          event.key === "ArrowDown"
            ? Math.min(activeCategoryIndex + 1, photoCategories.length - 1)
            : Math.max(activeCategoryIndex - 1, 0);

        if (nextCategoryIndex === activeCategoryIndex) {
          return;
        }

        setSearchParams({ category: photoCategories[nextCategoryIndex].id });
        setSelectedIndex(0);
        setCurrentPage(0);
        setIsImageLoaded(false);
        return;
      }

      event.preventDefault();
      const nextIndex =
        event.key === "ArrowRight"
          ? Math.min(selectedIndex + 1, activePhotos.length - 1)
          : Math.max(selectedIndex - 1, 0);

      if (nextIndex === selectedIndex) {
        return;
      }

      setSelectedIndex(nextIndex);
      setCurrentPage(Math.floor(nextIndex / photosPerPage));
      setIsImageLoaded(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCategory.id, activePhotos.length, selectedIndex, setSearchParams]);

  useEffect(() => {
    const resetIdleTimer = () => {
      setIsAutoPlaying(false);
      setIdleResetKey((currentKey) => currentKey + 1);
    };
    const interactionEvents = ["pointerdown", "keydown", "wheel", "touchstart"];

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetIdleTimer, { passive: true });
    });

    return () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetIdleTimer);
      });
    };
  }, []);

  useEffect(() => {
    const idleDelay = isAutoPlaying ? 10000 : 30000;
    const idleTimer = window.setTimeout(() => {
      setIsAutoPlaying(true);

      if (selectedIndex < activePhotos.length - 1) {
        const nextIndex = selectedIndex + 1;

        setSelectedIndex(nextIndex);
        setCurrentPage(Math.floor(nextIndex / photosPerPage));
        setIsImageLoaded(false);
        return;
      }

      const activeCategoryIndex = photoCategories.findIndex(
        (category) => category.id === activeCategory.id,
      );
      const orderedCategories = [
        ...photoCategories.slice(activeCategoryIndex + 1),
        ...photoCategories.slice(0, activeCategoryIndex + 1),
      ];
      const nextCategory = orderedCategories.find(
        (category) => getFilteredPhotos(category, toneFilter).length > 0,
      );

      if (!nextCategory) {
        return;
      }

      setSearchParams({ category: nextCategory.id });
      setSelectedIndex(0);
      setCurrentPage(0);
      setIsImageLoaded(false);
    }, idleDelay);

    return () => {
      window.clearTimeout(idleTimer);
    };
  }, [
    activeCategory.id,
    activePhotos.length,
    idleResetKey,
    isAutoPlaying,
    selectedIndex,
    setSearchParams,
    toneFilter,
  ]);

  return (
    <main className="gallery-page">
      <aside className="gallery-category-sidebar" aria-label="Gallery categories">
        <p className="gallery-sidebar-label">Categories</p>

        <div className="gallery-filter" aria-label="Image tone filter">
          {[
            ["all", "All"],
            ["color", "Color"],
            ["bw", "B&W"],
          ].map(([value, label]) => (
            <button
              className={toneFilter === value ? "is-active" : ""}
              key={value}
              type="button"
              onClick={() => selectToneFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="gallery-category-list">
          {photoCategories.map((category) => {
            const filteredCount = getFilteredPhotos(category, toneFilter).length;

            return (
              <button
                className={`gallery-category-button ${
                  category.id === activeCategory.id ? "is-active" : ""
                }`}
                key={category.id}
                type="button"
                onClick={() => selectCategory(category.id)}
              >
                <span>{category.label}</span>
                <small>{filteredCount}</small>
              </button>
            );
          })}
        </div>
      </aside>

      <aside className="gallery-photo-sidebar" aria-label={`${activeCategory.label} images`}>
        <div
          className="gallery-photo-sidebar-content"
          key={`${activeCategory.id}-${toneFilter}-${currentPage}`}
        >
          <div className="gallery-photo-sidebar-header">
            <div>
              <p className="gallery-sidebar-label">Images</p>
              <h2>{activeCategory.label}</h2>
            </div>

            <span>
              {currentPage + 1}/{totalPages}
            </span>
          </div>

          <p className="gallery-category-description">
            {activeCategory.galleryDescription}
          </p>

          <div className="gallery-thumbnail-grid">
            {visiblePhotos.map((photo, index) => {
              const absoluteIndex = pageStart + index;
              const isSelected = absoluteIndex === selectedIndex;
              const thumbnailSrc = getPhotoPath(activeCategory.id, photo.file);
              const isThumbnailLoaded = loadedThumbnails[thumbnailSrc];

              return (
                <button
                  className={`gallery-thumbnail ${isSelected ? "is-selected" : ""} ${
                    isThumbnailLoaded ? "is-loaded" : ""
                  }`}
                  key={photo.file}
                  style={{ "--thumbnail-index": index }}
                  type="button"
                  onClick={() => selectPhoto(absoluteIndex)}
                  aria-label={`View ${photo.title ?? getPhotoTitle(photo.file)}`}
                >
                  <span className="gallery-thumbnail-loader" aria-hidden="true" />
                  <img
                    src={thumbnailSrc}
                    alt=""
                    loading="lazy"
                    onLoad={() => markThumbnailLoaded(thumbnailSrc)}
                  />
                </button>
              );
            })}
          </div>

          <div className="gallery-pagination" aria-label="Image pages">
            <button
              type="button"
              onClick={() => changePage("previous")}
              disabled={currentPage === 0}
              aria-label="Previous image page"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => changePage("next")}
              disabled={currentPage === totalPages - 1}
              aria-label="Next image page"
            >
              Next
            </button>
          </div>
        </div>
      </aside>

      <section className="gallery-stage" aria-live="polite">
        <div className="gallery-stage-copy">
          <div>
            <p className="gallery-sidebar-label">{activeCategory.label}</p>
            <h1>{selectedPhotoTitle}</h1>
          </div>

          <span>
            {selectedIndex + 1} of {activePhotos.length}
          </span>
        </div>

        <div className="gallery-stage-body">
          <div
            className={`gallery-frame ${isImageLoaded ? "is-loaded" : ""}`}
            onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
            onTouchEnd={handleTouchEnd}
          >
            <div className="gallery-frame-loader" aria-hidden="true">
              <span />
            </div>
            <img
              key={selectedPhotoSrc}
              src={selectedPhotoSrc}
              alt={selectedPhotoTitle}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>

          <div className="gallery-mobile-arrows" aria-label="Photo navigation">
            <button
              type="button"
              onClick={() => navigatePhoto("previous")}
              disabled={!hasPreviousPhoto}
              aria-label="Previous photo"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => navigatePhoto("next")}
              disabled={!hasNextPhoto}
              aria-label="Next photo"
            >
              Next
            </button>
          </div>

          <aside className="gallery-poem-panel" aria-label="Photo poem">
            <p className="gallery-sidebar-label">Poem</p>

            {selectedPhoto.poem ? (
              <p className="gallery-poem">
                {selectedPhoto.poem.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            ) : (
              <p className="gallery-poem gallery-poem-empty">
                This poem is not written just yet.
              </p>
            )}

            <div className="gallery-photo-meta">
              {selectedPhoto.camera && <span>Camera: {selectedPhoto.camera}</span>}
              {selectedPhoto.film && <span>Film: {selectedPhoto.film}</span>}
              {selectedPhoto.location && <span>Location: {selectedPhoto.location}</span>}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Gallery;
