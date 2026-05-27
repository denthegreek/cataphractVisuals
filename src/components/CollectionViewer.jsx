import { useCallback, useEffect, useRef, useState } from "react";
import { getPhotoByPath, getPhotoTitle } from "../data/photos";
import "./CollectionViewer.css";

// Preload neighboring collection frames without loading the entire collection up front.
function preloadImage(src) {
  if (!src || typeof Image === "undefined") {
    return;
  }

  const image = new Image();
  image.decoding = "async";
  image.src = src;
}

function CollectionViewer({
  collection,
  activeFrameIndex,
  onClose,
  onPrevious,
  onNext,
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [displayedFrameIndex, setDisplayedFrameIndex] =
    useState(activeFrameIndex);
  const [frameTransition, setFrameTransition] = useState("is-ready");
  const closeTimerRef = useRef(null);
  const frameLeaveTimerRef = useRef(null);
  const frameSwapTimerRef = useRef(null);
  const frameSettleTimerRef = useRef(null);
  const touchStartRef = useRef(null);
  const collectionId = collection?.id;
  const activeFrame = collection?.frames[displayedFrameIndex];
  const frameCount = collection?.frames.length ?? 0;
  const canGoPrevious = activeFrameIndex > 0;
  const canGoNext = activeFrameIndex < frameCount - 1;
  const activePhoto = activeFrame ? getPhotoByPath(activeFrame.image) : null;
  const frameTitle =
    activePhoto?.title ??
    activeFrame?.title ??
    (activePhoto?.file ? getPhotoTitle(activePhoto.file) : "");
  const framePoem = activePhoto?.poem ?? activeFrame?.poem ?? [];
  const frameCamera = activePhoto?.camera ?? activeFrame?.camera;
  const frameFilm = activePhoto?.film ?? activeFrame?.film;
  const frameLocation = activePhoto?.location ?? activeFrame?.location;

  const closeWithAnimation = useCallback(() => {
    if (isClosing) {
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 240);
  }, [isClosing, onClose]);

  const goPrevious = useCallback(() => {
    if (canGoPrevious) {
      onPrevious();
    }
  }, [canGoPrevious, onPrevious]);

  const goNext = useCallback(() => {
    if (canGoNext) {
      onNext();
    }
  }, [canGoNext, onNext]);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event) => {
    if (!touchStartRef.current) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const isHorizontalSwipe =
      Math.abs(deltaX) > 56 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35;

    touchStartRef.current = null;

    if (!isHorizontalSwipe) {
      return;
    }

    if (deltaX < 0) {
      goNext();
      return;
    }

    goPrevious();
  };

  useEffect(() => {
    if (!collection) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeWithAnimation();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeWithAnimation, collection, goNext, goPrevious]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (frameSwapTimerRef.current) {
        window.clearTimeout(frameSwapTimerRef.current);
      }

      if (frameLeaveTimerRef.current) {
        window.clearTimeout(frameLeaveTimerRef.current);
      }

      if (frameSettleTimerRef.current) {
        window.clearTimeout(frameSettleTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const resetTimer = window.setTimeout(() => {
      setDisplayedFrameIndex(0);
      setFrameTransition("is-ready");
    }, 0);

    return () => {
      window.clearTimeout(resetTimer);
    };
  }, [collectionId]);

  // The modal only needs the immediate previous and next frames for smooth navigation.
  useEffect(() => {
    if (!collection) {
      return;
    }

    [activeFrameIndex - 1, activeFrameIndex + 1].forEach((frameIndex) => {
      preloadImage(collection.frames[frameIndex]?.image);
    });
  }, [activeFrameIndex, collection]);

  useEffect(() => {
    if (!collectionId || activeFrameIndex === displayedFrameIndex) {
      return undefined;
    }

    if (frameSwapTimerRef.current) {
      window.clearTimeout(frameSwapTimerRef.current);
    }

    if (frameLeaveTimerRef.current) {
      window.clearTimeout(frameLeaveTimerRef.current);
    }

    if (frameSettleTimerRef.current) {
      window.clearTimeout(frameSettleTimerRef.current);
    }

    frameLeaveTimerRef.current = window.setTimeout(() => {
      setFrameTransition("is-leaving");
    }, 0);

    frameSwapTimerRef.current = window.setTimeout(() => {
      setDisplayedFrameIndex(activeFrameIndex);
      setFrameTransition("is-entering");

      frameSettleTimerRef.current = window.setTimeout(() => {
        setFrameTransition("is-ready");
      }, 260);
    }, 150);

    return () => {
      if (frameLeaveTimerRef.current) {
        window.clearTimeout(frameLeaveTimerRef.current);
      }

      if (frameSwapTimerRef.current) {
        window.clearTimeout(frameSwapTimerRef.current);
      }

      if (frameSettleTimerRef.current) {
        window.clearTimeout(frameSettleTimerRef.current);
      }
    };
  }, [activeFrameIndex, collectionId, displayedFrameIndex]);

  if (!collection || !activeFrame) {
    return null;
  }

  return (
    <div
      className={`collection-modal-backdrop ${isClosing ? "is-closing" : ""}`}
      onClick={closeWithAnimation}
      role="presentation"
    >
      <p className="collection-modal-desktop-guide">
        Use left and right arrow keys to move through the collection. You can
        press ESC anytime to exit.
      </p>

      <section
        className="collection-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${collection.title} collection viewer`}
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className="collection-modal-close"
          type="button"
          onClick={closeWithAnimation}
          aria-label="Close collection viewer"
        >
          Close
        </button>

        <div className={`collection-modal-image ${frameTransition}`}>
          <img src={activeFrame.image} alt={frameTitle} />
        </div>

        <div className={`collection-modal-content ${frameTransition}`}>
          <div className="collection-modal-details">
            <div className="collection-modal-heading">
              <p className="collections-eyebrow">{collection.mood}</p>
              <h2>{collection.title}</h2>
              <span className="collection-modal-count">
                {displayedFrameIndex + 1} of {collection.frames.length}
              </span>
              <p className="collection-modal-hint">
                <span className="collection-modal-hint-mobile">
                  Swipe left or right to change photo. Scroll down for poem and
                  details.
                </span>
              </p>
            </div>

            <div className="collection-frame-copy">
              <h3>{frameTitle}</h3>

              {framePoem.length > 0 ? (
                <p className="collection-frame-poem">
                  {framePoem.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              ) : (
                <p className="collection-frame-poem collection-frame-poem-empty">
                  This poem is not written just yet.
                </p>
              )}
            </div>

            <div className="collection-frame-meta">
              {frameCamera && <span>Camera: {frameCamera}</span>}
              {frameFilm && <span>Film: {frameFilm}</span>}
              {frameLocation && <span>Location: {frameLocation}</span>}
            </div>
          </div>

          <div className="collection-modal-actions">
            <button
              type="button"
              onClick={goPrevious}
              disabled={!canGoPrevious}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CollectionViewer;
