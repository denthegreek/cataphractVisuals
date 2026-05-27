import { useEffect, useRef, useState } from "react";
import CollectionViewer from "../components/CollectionViewer";
import PageLoader from "../components/PageLoader";
import { collections } from "../data/photos";
import useImagePreloader from "../hooks/useImagePreloader";
import "./Collections.css";

function Collections() {
  const pageRef = useRef(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(() => new Set());
  const pageImages = collections
    .slice(0, 2)
    .map((collection) => collection.frames[0]?.image)
    .filter(Boolean);
  const isLoadingImages = useImagePreloader(pageImages, { maxWait: 1400 });

  useEffect(() => {
    if (!pageRef.current) {
      return undefined;
    }

    const revealElements = Array.from(
      pageRef.current.querySelectorAll("[data-collections-reveal]"),
    );

    if (revealElements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const revealId = entry.target.getAttribute("data-collections-reveal");

          if (!revealId) {
            return;
          }

          setVisibleItems((currentItems) => {
            if (currentItems.has(revealId)) {
              return currentItems;
            }

            const nextItems = new Set(currentItems);
            nextItems.add(revealId);
            return nextItems;
          });

          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.14,
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  const getRevealClass = (revealId) =>
    `collections-reveal ${visibleItems.has(revealId) ? "is-visible" : ""}`;

  const openCollection = (collection) => {
    setSelectedCollection(collection);
    setActiveFrameIndex(0);
  };

  const closeCollection = () => {
    setSelectedCollection(null);
    setActiveFrameIndex(0);
  };

  const showPreviousFrame = () => {
    setActiveFrameIndex((index) => Math.max(index - 1, 0));
  };

  const showNextFrame = () => {
    setActiveFrameIndex((index) =>
      selectedCollection ? Math.min(index + 1, selectedCollection.frames.length - 1) : index,
    );
  };

  return (
    <main className="collections-page" ref={pageRef}>
      <PageLoader isLoading={isLoadingImages} />

      <section
        className={`collections-intro ${getRevealClass("intro")}`}
        data-collections-reveal="intro"
      >
        <div>
          <h1>Collections</h1>
          <p className="collections-eyebrow">
            Curated sequences. Moments in dialogue.
          </p>
          <p>
            Collections are small, curated sequences that explore a place, a
            subject, or a feeling. Each set is arranged with intention,
            inviting you into a quiet visual conversation.
          </p>
        </div>

        <blockquote>
          Some stories are best told
          <br />
          in a few frames.
        </blockquote>
      </section>

      <section className="collections-grid" aria-label="Curated photo collections">
        {collections.map((collection, index) => (
          <article
            className={`collection-card ${getRevealClass(collection.id)}`}
            data-collections-reveal={collection.id}
            id={collection.id}
            key={collection.id}
            style={{ "--collections-delay": `${Math.min(index, 5) * 54}ms` }}
          >
            <div className="collection-preview-strip">
              {collection.frames.slice(0, 3).map((frame, frameIndex) => (
                <div key={frame.id}>
                  <img
                    src={frame.image}
                    alt=""
                    aria-hidden="true"
                    loading={index < 2 && frameIndex === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 2 && frameIndex === 0 ? "high" : "auto"}
                  />
                </div>
              ))}
            </div>

            <div className="collection-card-content">
              <div>
                <p className="collections-eyebrow">{collection.mood}</p>
                <h2>{collection.title}</h2>
              </div>

              <p>{collection.description}</p>

              <div className="collection-card-footer">
                <span className="collection-frame-count">
                  <span aria-hidden="true" />
                  {collection.frames.length} frames
                </span>
                <button type="button" onClick={() => openCollection(collection)}>
                  View Collection
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <p
        className={`collections-closing-line ${getRevealClass("closing")}`}
        data-collections-reveal="closing"
      >
        <span aria-hidden="true">"</span>
        <span>
          I photograph not to explain, but to preserve a moment before it
          becomes memory.
        </span>
        <span aria-hidden="true">"</span>
      </p>

      <CollectionViewer
        collection={selectedCollection}
        activeFrameIndex={activeFrameIndex}
        onClose={closeCollection}
        onPrevious={showPreviousFrame}
        onNext={showNextFrame}
      />
    </main>
  );
}

export default Collections;
