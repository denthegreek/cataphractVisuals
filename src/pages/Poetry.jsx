import { useEffect, useRef, useState } from "react";
import { getPhotoByPath, getPhotoTitle } from "../data/photos";
import "./Poetry.css";

const poetrySelections = [
  {
    path: "/photos/animals/bird-upon-a-tree.jpg",
    note: "A small silhouette becomes a voice inside the garden.",
    palette: {
      background: "#10100f",
      panel: "#181713",
      accent: "#c7b98b",
      secondary: "#6e735e",
      text: "#f3eee4",
      muted: "rgba(243, 238, 228, 0.7)",
    },
  },
  {
    path: "/photos/flowers/weeping-bells.jpg",
    note: "Pink bells hold the softness of spring before it passes.",
    palette: {
      background: "#160f13",
      panel: "#211719",
      accent: "#d8a0ac",
      secondary: "#7b8a5d",
      text: "#fff5f0",
      muted: "rgba(255, 245, 240, 0.72)",
    },
  },
  {
    path: "/photos/memory/children-and-dreams.jpg",
    note: "Memory returns as play, fountain light, and half-remembered warmth.",
    palette: {
      background: "#15120d",
      panel: "#211d15",
      accent: "#d7b46a",
      secondary: "#8c6d4a",
      text: "#f8f1e5",
      muted: "rgba(248, 241, 229, 0.72)",
    },
  },
  {
    path: "/photos/flowers/pale-pink-daisies.jpg",
    note: "Flowers beside imagined water, tender as an old afternoon.",
    palette: {
      background: "#121611",
      panel: "#1b2118",
      accent: "#e3b4bd",
      secondary: "#8e9b70",
      text: "#f6f2e8",
      muted: "rgba(246, 242, 232, 0.72)",
    },
  },
  {
    path: "/photos/flowers/white-blossom-sprays.jpg",
    note: "White blossoms catch the threshold between spring and summer.",
    palette: {
      background: "#11150f",
      panel: "#1b2118",
      accent: "#e8dfc3",
      secondary: "#718b61",
      text: "#f7f2e6",
      muted: "rgba(247, 242, 230, 0.72)",
    },
  },
  {
    path: "/photos/sea/fishing-boat-greek-flag.jpg",
    note: "A harbor poem where departure waits beside the old cafe.",
    palette: {
      background: "#0d1113",
      panel: "#151c1f",
      accent: "#d7b46a",
      secondary: "#456f8d",
      text: "#f3eee4",
      muted: "rgba(243, 238, 228, 0.72)",
    },
  },
];

const getDisplayTitle = (photo) => photo.title ?? getPhotoTitle(photo.file);

const getThemeLabel = (photo) =>
  photo.categoryId === "Ancient Greece" ? "Ancient Greece" : photo.categoryId;

function Poetry() {
  const sectionRefs = useRef(new Map());
  const [loadablePoems, setLoadablePoems] = useState(() => new Set());
  const [visiblePoems, setVisiblePoems] = useState(() => new Set());
  const [loadedImages, setLoadedImages] = useState(() => new Set());
  const poems = poetrySelections
    .map((selection) => {
      const photo = getPhotoByPath(selection.path);

      if (!photo) {
        return null;
      }

      return {
        ...selection,
        photo,
        title: getDisplayTitle(photo),
      };
    })
    .filter(Boolean);

  useEffect(() => {
    const sectionElements = Array.from(sectionRefs.current.values());

    if (sectionElements.length === 0) {
      return undefined;
    }

    const markPoemLoadable = (poemId) => {
      setLoadablePoems((currentPoems) => {
        if (currentPoems.has(poemId)) {
          return currentPoems;
        }

        const nextPoems = new Set(currentPoems);
        nextPoems.add(poemId);
        return nextPoems;
      });
    };

    const loadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const poemId = entry.target.getAttribute("data-poem-id");

          if (!poemId) {
            return;
          }

          markPoemLoadable(poemId);
          loadObserver.unobserve(entry.target);
        });
      },
      {
        rootMargin: "520px 0px 520px 0px",
        threshold: 0,
      },
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const poemId = entry.target.getAttribute("data-poem-id");

          if (!poemId) {
            return;
          }

          setVisiblePoems((currentPoems) => {
            if (currentPoems.has(poemId)) {
              return currentPoems;
            }

            const nextPoems = new Set(currentPoems);
            nextPoems.add(poemId);
            return nextPoems;
          });

          revealObserver.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.2,
      },
    );

    sectionElements.forEach((element) => {
      loadObserver.observe(element);
      revealObserver.observe(element);
    });

    return () => {
      loadObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const setPoemRef = (poemId) => (element) => {
    if (element) {
      sectionRefs.current.set(poemId, element);
      return;
    }

    sectionRefs.current.delete(poemId);
  };

  const markImageLoaded = (poemId) => {
    setLoadedImages((currentImages) => {
      if (currentImages.has(poemId)) {
        return currentImages;
      }

      const nextImages = new Set(currentImages);
      nextImages.add(poemId);
      return nextImages;
    });
  };

  return (
    <main className="poetry-page">
      <header className="poetry-hero">
        <p className="eyebrow">Visual Poetry</p>
        <h1>Poetry</h1>
        <p>
          Selected frames where image and verse meet, inviting the viewer to
          read each photograph through light, memory, and interpretation.
        </p>
      </header>

      <div className="poetry-sequence">
        {poems.map((poem, index) => (
          <article
            className={`poetry-feature ${
              index % 2 === 1 ? "poetry-feature-reversed" : ""
            } ${visiblePoems.has(poem.photo.id) ? "is-visible" : ""}`}
            key={poem.photo.id}
            ref={setPoemRef(poem.photo.id)}
            data-poem-id={poem.photo.id}
            style={{
              "--poetry-bg": poem.palette.background,
              "--poetry-panel": poem.palette.panel,
              "--poetry-accent": poem.palette.accent,
              "--poetry-secondary": poem.palette.secondary,
              "--poetry-text": poem.palette.text,
              "--poetry-muted": poem.palette.muted,
            }}
          >
            <div className="poetry-copy">
              <p className="eyebrow">{getThemeLabel(poem.photo)}</p>
              <h2>{poem.title}</h2>
              <p className="poetry-note">{poem.note}</p>

              <p className="poetry-poem">
                {poem.photo.poem.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>

              <div className="poetry-meta">
                <span>Camera: {poem.photo.camera}</span>
                <span>Film: {poem.photo.film}</span>
                <span>Location: {poem.photo.location}</span>
              </div>
            </div>

            <div
              className={`poetry-image ${
                loadedImages.has(poem.photo.id) ? "is-loaded" : ""
              }`}
            >
              <div className="poetry-image-loader" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <img
                src={loadablePoems.has(poem.photo.id) ? poem.photo.image : undefined}
                alt={poem.title}
                loading="lazy"
                onLoad={() => markImageLoaded(poem.photo.id)}
              />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Poetry;
