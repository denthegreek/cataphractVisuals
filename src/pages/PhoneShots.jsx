import { useEffect, useRef, useState } from "react";
import "./PhoneShots.css";

const phoneShots = [
  {
    title: "Distant Cargo Ship",
    image: "/photos/phone/distant-cargo-ship.jpg",
    tone: "Sea / Distance",
    note: "A far vessel held in haze, proof that a quick frame can still find scale.",
    orientation: "landscape",
  },
  {
    title: "Blue Balcony Moon",
    image: "/photos/phone/blue-balcony-moon.jpg",
    tone: "Urban / Color",
    note: "Bright shutters, hard sun, and the small surprise of a daytime moon.",
    orientation: "portrait",
  },
  {
    title: "Yellow Cab Over Graffiti",
    image: "/photos/phone/yellow-car-over-graffiti.jpg",
    tone: "Street / Contrast",
    note: "Color, concrete, and motion paused before the scene disappears.",
    orientation: "portrait",
  },
  {
    title: "Dome Above Trees",
    image: "/photos/phone/dome-above-trees.jpg",
    tone: "Faith / Evening",
    note: "A dome rises quietly from the trees, caught without ceremony.",
    orientation: "landscape",
  },
  {
    title: "Wind Turbines Hillside",
    image: "/photos/phone/wind-turbines-hillside.jpg",
    tone: "Landscape / Still",
    note: "Quiet machines on a dark ridge, almost swallowed by the weather.",
    orientation: "landscape",
  },
  {
    title: "Catamaran Before Hills",
    image: "/photos/phone/catamaran-before-hills.jpg",
    tone: "Sea / Weather",
    note: "A white boat rests beneath low clouds and a hillside of muted green.",
    orientation: "portrait",
  },
  {
    title: "Night Cafe Lights",
    image: "/photos/phone/night-cafe-lights.jpg",
    tone: "Night / Street",
    note: "Warm bulbs and wet pavement turn a quiet road into a small stage.",
    orientation: "portrait",
  },
  {
    title: "Traditional Harbor Boat",
    image: "/photos/phone/traditional-harbor-boat.jpg",
    tone: "Sea / Craft",
    note: "Wood, rigging, and hillside houses gathered into one harbor pause.",
    orientation: "portrait",
  },
  {
    title: "Flag Balcony Cacti",
    image: "/photos/phone/flag-balcony-cacti.jpg",
    tone: "Home / Detail",
    note: "A balcony of plants and a moving flag, caught before the wind changes.",
    orientation: "portrait",
  },
  {
    title: "Tiled Rooftops Window",
    image: "/photos/phone/tiled-rooftops-window.jpg",
    tone: "Architecture / Texture",
    note: "A layered view of old tile, stone, shade, and hillside green.",
    orientation: "portrait",
  },
  {
    title: "Child In Motion Monochrome",
    image: "/photos/phone/child-in-motion-monochrome.jpg",
    tone: "Memory / Monochrome",
    note: "A small moving figure becomes all gesture, blur, and concentration.",
    orientation: "portrait",
  },
  {
    title: "Ochre Balcony Facade",
    image: "/photos/phone/ochre-balcony-facade.jpg",
    tone: "Urban / Warmth",
    note: "A balcony and roofline held in soft ochre light.",
    orientation: "portrait",
  },
  {
    title: "Twin Balcony Windows",
    image: "/photos/phone/twin-balcony-windows.jpg",
    tone: "Urban / Geometry",
    note: "Windows, railings, and color blocks make a quiet architectural rhythm.",
    orientation: "portrait",
  },
  {
    title: "Souvenir Stand Knights",
    image: "/photos/phone/souvenir-stand-knights.jpg",
    tone: "Street / Objects",
    note: "Toys, masks, and wooden bats turn a simple stand into a crowded still life.",
    orientation: "portrait",
  },
  {
    title: "Ancient Columns Golden Hour",
    image: "/photos/phone/ancient-columns-golden-hour.jpg",
    tone: "Ancient / Gold",
    note: "Columns and cypress trees dissolve into the last amber light.",
    orientation: "portrait",
  },
  {
    title: "Golden Balcony Silhouette",
    image: "/photos/phone/golden-balcony-silhouette.jpg",
    tone: "City / Gold",
    note: "Balconies and wires become black marks against a burning sky.",
    orientation: "portrait",
  },
  {
    title: "White Blossoms Close",
    image: "/photos/phone/white-blossoms-close.jpg",
    tone: "Botanical / Soft",
    note: "A close frame of white petals, leaves, and bright uneven light.",
    orientation: "portrait",
  },
  {
    title: "Marina Catamarans Reflection",
    image: "/photos/phone/marina-catamarans-reflection.jpg",
    tone: "Sea / Reflection",
    note: "Masts, apartment blocks, and still water arranged into pale order.",
    orientation: "landscape",
  },
  {
    title: "Dark Hull Marina Boat",
    image: "/photos/phone/dark-hull-marina-boat.jpg",
    tone: "Sea / Motion",
    note: "A dark hull glides through the marina, sharp against the pale boats behind it.",
    orientation: "landscape",
  },
  {
    title: "Small Boat Harbor Water",
    image: "/photos/phone/small-boat-harbor-water.jpg",
    tone: "Sea / Quiet",
    note: "A small boat crosses the harbor surface, almost alone inside the frame.",
    orientation: "landscape",
  },
  {
    title: "Reed Shade Swimmers",
    image: "/photos/phone/reed-shade-swimmers.jpg",
    tone: "Summer / Shore",
    note: "A small summer scene, made from glare, shade, and bodies in water.",
    orientation: "portrait",
  },
  {
    title: "Bee On Red Blossom",
    image: "/photos/phone/bee-on-red-blossom.jpg",
    tone: "Botanical / Close",
    note: "Attention does the work here: a brief visit, a red field, a living detail.",
    orientation: "portrait",
  },
  {
    title: "Evening Branch Silhouette",
    image: "/photos/phone/evening-branch-silhouette.jpg",
    tone: "Light / Minimal",
    note: "Leaves become ink against the last warmth of the sky.",
    orientation: "portrait",
  },
  {
    title: "Orange Buoy Reflection",
    image: "/photos/phone/orange-buoy-reflection.jpg",
    tone: "Water / Color",
    note: "One orange mark is enough to organize the whole surface.",
    orientation: "portrait",
  },
  {
    title: "Highway Signs",
    image: "/photos/phone/highway-signs.jpg",
    tone: "Road / Passing",
    note: "A moving view through glass, imperfect and alive with direction.",
    orientation: "portrait",
  },
  {
    title: "Steel Bridge Clouds",
    image: "/photos/phone/steel-bridge-clouds.jpg",
    tone: "Structure / Sky",
    note: "Iron lines and bright cloud forms, seen in the rhythm of travel.",
    orientation: "portrait",
  },
  {
    title: "Neon Crosswalk Sunset",
    image: "/photos/phone/neon-crosswalk-sunset.jpg",
    tone: "Street / Nightfall",
    note: "A crowded crossing lit by signs, traffic, and an impossible orange sky.",
    orientation: "portrait",
  },
  {
    title: "Golden Rooftop Horizon",
    image: "/photos/phone/golden-rooftop-horizon.jpg",
    tone: "City / Gold",
    note: "Antennas and rooftops catch the hour when ordinary buildings turn theatrical.",
    orientation: "landscape",
  },
  {
    title: "Carrier And Speedboat",
    image: "/photos/phone/carrier-and-speedboat.jpg",
    tone: "Sea / Scale",
    note: "Two vessels share the frame, one massive and one almost fleeting.",
    orientation: "landscape",
  },
  {
    title: "Storm Ship Offshore",
    image: "/photos/phone/storm-ship-offshore.jpg",
    tone: "Sea / Weather",
    note: "A vessel sits inside rough water and low cloud, heavy with atmosphere.",
    orientation: "portrait",
  },
  {
    title: "Quiet Flower Arrangement",
    image: "/photos/phone/quiet-flower-arrangement.jpg",
    tone: "Still Life / Soft",
    note: "A modest arrangement becomes a study in shadow, color, and pause.",
    orientation: "landscape",
  },
  {
    title: "Dartboard Center",
    image: "/photos/phone/dartboard-center.jpg",
    tone: "Still Life / Monochrome",
    note: "Two darts land close to the center, turning a game into a pattern study.",
    orientation: "portrait",
  },
];

const featuredShot =
  phoneShots.find((shot) => shot.image === "/photos/phone/small-boat-harbor-water.jpg") ??
  phoneShots[0];

const landscapeShots = phoneShots.filter(
  (shot) => shot.orientation === "landscape" && shot.image !== featuredShot.image,
);

const portraitShots = phoneShots.filter((shot) => shot.orientation === "portrait");

// Phone images load in sequence: each shot becomes eligible only after the previous card is revealed.
const sequencedShots = [...landscapeShots, ...portraitShots];

function PhoneImage({ shot, shouldLoad = true }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`phone-shot-image ${isLoaded ? "is-loaded" : ""}`}>
      <div className="phone-shot-loader" aria-hidden="true" />
      <img
        src={shouldLoad ? shot.image : undefined}
        alt={shot.title}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

function PhoneShots() {
  const pageRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(() => new Set());

  useEffect(() => {
    if (!pageRef.current) {
      return undefined;
    }

    const revealElements = Array.from(
      pageRef.current.querySelectorAll("[data-phone-reveal]"),
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

          const revealId = entry.target.getAttribute("data-phone-reveal");

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
        threshold: 0.16,
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  const getRevealClass = (revealId) =>
    `phone-reveal ${visibleItems.has(revealId) ? "is-visible" : ""}`;

  const loadableShots = new Set();

  // Derive load eligibility during render so React does not need an extra state update cycle.
  sequencedShots.forEach((shot, index) => {
    const previousRevealId = index === 0 ? "hero" : sequencedShots[index - 1].title;

    if (visibleItems.has(previousRevealId)) {
      loadableShots.add(shot.title);
    }
  });

  return (
    <main className="phone-page" ref={pageRef}>
      <section
        className={`phone-hero ${getRevealClass("hero")}`}
        data-phone-reveal="hero"
      >
        <div className="phone-hero-copy">
          <p className="eyebrow">Phone Shots</p>
          <h1>Simple tools. Real frames.</h1>
          <p>
            This section keeps space for photographs made with a phone: direct,
            casual, and alert to the moment. The image still depends on light,
            timing, patience, and instinct, not only on film, metal, and
            sophisticated equipment.
          </p>
        </div>

        <article className="phone-hero-frame">
          <PhoneImage shot={featuredShot} />
          <div>
            <p className="eyebrow">{featuredShot.tone}</p>
            <h2>{featuredShot.title}</h2>
            <p>{featuredShot.note}</p>
          </div>
        </article>
      </section>

      <section className="phone-section phone-landscape-section">
        <div className="phone-section-heading">
          <p className="eyebrow">Horizontal Frames</p>
          <h2>Open Scenes</h2>
        </div>

        <div className="phone-landscape-grid" aria-label="Horizontal phone photography">
          {landscapeShots.map((shot, index) => (
            <article
              className={`phone-shot-card phone-shot-landscape ${getRevealClass(shot.title)}`}
              data-phone-reveal={shot.title}
              key={shot.image}
              style={{ "--phone-delay": `${Math.min(index, 5) * 42}ms` }}
            >
              <PhoneImage shot={shot} shouldLoad={loadableShots.has(shot.title)} />

              <div className="phone-shot-copy">
                <p className="eyebrow">{shot.tone}</p>
                <h2>{shot.title}</h2>
                <p>{shot.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`phone-manifesto ${getRevealClass("manifesto")}`}
        data-phone-reveal="manifesto"
      >
        <p>
          The phone camera is not treated here as a lesser instrument. It is a
          different kind of notebook: always nearby, imperfect in useful ways,
          and ready when a scene gives only a few seconds of permission.
        </p>
      </section>

      <section className="phone-section phone-portrait-section">
        <div className="phone-section-heading">
          <p className="eyebrow">Vertical Notes</p>
          <h2>Quick Observations</h2>
        </div>

        <div className="phone-portrait-grid" aria-label="Vertical phone photography">
          {portraitShots.map((shot, index) => (
            <article
              className={`phone-shot-card phone-shot-${shot.orientation} ${getRevealClass(shot.title)}`}
              data-phone-reveal={shot.title}
              key={shot.image}
              style={{ "--phone-delay": `${Math.min(index, 5) * 42}ms` }}
            >
              <PhoneImage shot={shot} shouldLoad={loadableShots.has(shot.title)} />

              <div className="phone-shot-copy">
                <p className="eyebrow">{shot.tone}</p>
                <h2>{shot.title}</h2>
                <p>{shot.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default PhoneShots;
