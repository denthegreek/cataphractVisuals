import { useEffect, useRef, useState } from "react";
import { photos } from "../data/photos";
import "./Equipment.css";

const heroImage = "/equipment/1000025566.jpg";
const filmStocks = [...new Set(photos.map((photo) => photo.film).filter(Boolean))].sort();
const detailPageSize = 4;

const getPagedDetails = (item, page) => {
  if (!item.paginateDetails) {
    return item.details.map((detail) => ({ detail, isPlaceholder: false }));
  }

  const details = item.details
    .slice(page * detailPageSize, page * detailPageSize + detailPageSize)
    .map((detail) => ({ detail, isPlaceholder: false }));

  while (details.length < detailPageSize) {
    details.push({
      detail: `placeholder-${page}-${details.length}`,
      isPlaceholder: true,
    });
  }

  return details;
};

const equipmentItems = [
  {
    title: "Olympus OM-1",
    type: "Camera Body",
    image: "/equipment/1000024223.jpg",
    description:
      "A compact mechanical 35mm SLR with a quiet presence, tactile controls, and the kind of simplicity that keeps attention on timing and light.",
    details: ["35mm SLR", "Mechanical handling", "Primary film camera"],
  },
  {
    title: "Zuiko Prime Lens",
    type: "Lens",
    image: "/equipment/1000024294.jpg",
    description:
      "The everyday lens currently mounted on the OM-1: direct, small, and expressive enough for streets, harbors, flowers, and quiet architectural frames.",
    details: ["Manual focus", "Mounted on the OM system", "Everyday field lens"],
  },
  {
    title: "List of Films",
    type: "Film",
    image: "/equipment/1000025325.jpg",
    description: "",
    details: filmStocks,
    detailStyle: "list",
  },
  {
    title: "Accessories",
    type: "Accessory Kit",
    image: "/equipment/1000025567.jpg",
    description:
      "Small support pieces for filters, carrying, cleaning, lens protection, and keeping the camera ready in the field.",
    details: [
      "Besnfoto small camera bag",
      "Neewer filter storage bag",
      "Kodak 35mm film case",
      "Kodak olive camera strap",
      "Urth 49mm filter caps",
      "JJC 49mm lens hood",
      "Tiffen Yellow 15 filter",
      "Tiffen Red 25 filter",
      "Tiffen Orange 21 filter",
      "K&F ND1000 filter",
      "Hot shoe cover and shutter buttons",
      "JJC soft shutter buttons",
      "Koala microfiber cloths",
      "K&F air blower",
    ],
    detailStyle: "list",
    paginateDetails: true,
  },
];

function EquipmentImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`equipment-image ${isLoaded ? "is-loaded" : ""}`}>
      <div className="equipment-image-loader" aria-hidden="true" />
      <img src={src} alt={alt} loading="lazy" onLoad={() => setIsLoaded(true)} />
    </div>
  );
}

function Equipment() {
  const pageRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(() => new Set());
  const [isHeroImageLoaded, setIsHeroImageLoaded] = useState(false);
  const [detailPages, setDetailPages] = useState({});

  useEffect(() => {
    if (!pageRef.current) {
      return undefined;
    }

    const revealElements = Array.from(
      pageRef.current.querySelectorAll("[data-reveal-id]"),
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

          const revealId = entry.target.getAttribute("data-reveal-id");

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
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  const getRevealClass = (revealId) =>
    `equipment-reveal ${visibleItems.has(revealId) ? "is-visible" : ""}`;

  const getDetailPage = (item) => detailPages[item.title] ?? 0;

  const changeDetailPage = (item, direction) => {
    const maxPage = Math.ceil(item.details.length / detailPageSize) - 1;

    setDetailPages((currentPages) => {
      const currentPage = currentPages[item.title] ?? 0;
      const nextPage = Math.min(Math.max(currentPage + direction, 0), maxPage);

      return {
        ...currentPages,
        [item.title]: nextPage,
      };
    });
  };

  return (
    <main className="equipment-page" ref={pageRef}>
      <section className={`equipment-hero ${isHeroImageLoaded ? "is-bg-loaded" : ""}`}>
        <img
          className="equipment-hero-preload"
          src={heroImage}
          alt=""
          aria-hidden="true"
          onLoad={() => setIsHeroImageLoaded(true)}
        />
        <div className="equipment-hero-copy">
          <p className="eyebrow">Tools of the Work</p>
          <h1>Equipment</h1>
          <p>
            The kit is small on purpose: a mechanical camera, a few trusted
            lenses, film stocks with character, and the patience to let the
            frame arrive.
          </p>
        </div>

        <div
          className="equipment-hero-image"
          style={{ backgroundImage: `url(${heroImage})` }}
          aria-hidden="true"
        />
      </section>

      <section
        className={`equipment-feature ${getRevealClass("main-camera")}`}
        data-reveal-id="main-camera"
      >
        <div>
          <p className="eyebrow">Main Camera</p>
          <h2>Olympus OM-1</h2>
          <p>
            This camera anchors the practice. It is compact, fully manual, and
            direct enough to disappear in the hand, leaving only exposure,
            focus, breath, and the decision to release the shutter.
          </p>
        </div>

        <EquipmentImage src="/equipment/1000024210.jpg" alt="Olympus OM-1 camera front" />
      </section>

      <section
        className={`equipment-grid-section ${getRevealClass("equipment-list")}`}
        data-reveal-id="equipment-list"
      >
        <div className="equipment-section-heading">
          <p className="eyebrow">Current Kit</p>
          <h2>Equipment List</h2>
        </div>

        <div className="equipment-grid">
          {equipmentItems.map((item) => (
            <article
              className={`equipment-card ${getRevealClass(item.title)}`}
              key={item.title}
              data-reveal-id={item.title}
            >
              <EquipmentImage src={item.image} alt={item.title} />

              <div className="equipment-card-copy">
                <p className="eyebrow">{item.type}</p>
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}

                {item.paginateDetails ? (
                  <div className="equipment-detail-pager">
                    <button
                      type="button"
                      aria-label={`Previous ${item.title} accessories`}
                      onClick={() => changeDetailPage(item, -1)}
                      disabled={getDetailPage(item) === 0}
                    >
                      &lt;
                    </button>
                    <span>
                      {getDetailPage(item) + 1} /{" "}
                      {Math.ceil(item.details.length / detailPageSize)}
                    </span>
                    <button
                      type="button"
                      aria-label={`Next ${item.title} accessories`}
                      onClick={() => changeDetailPage(item, 1)}
                      disabled={
                        getDetailPage(item) ===
                        Math.ceil(item.details.length / detailPageSize) - 1
                      }
                    >
                      &gt;
                    </button>
                  </div>
                ) : null}

                <div
                  className={`equipment-detail-list ${
                    item.detailStyle === "list" ? "equipment-detail-list-plain" : ""
                  }`}
                >
                  {getPagedDetails(item, getDetailPage(item)).map(
                    ({ detail, isPlaceholder }) => (
                      <span
                        aria-hidden={isPlaceholder ? "true" : undefined}
                        className={isPlaceholder ? "equipment-detail-placeholder" : ""}
                        key={detail}
                      >
                        {isPlaceholder ? "\u00a0" : detail}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Equipment;
