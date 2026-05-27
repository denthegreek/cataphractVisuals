import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import sample2 from "../assets/sample2.JPG";
import { getPhotoByPath, getPhotoPath, photoCategories } from "../data/photos";
import "./Home.css";

const getRandomPhoto = (theme) => {
  if (theme.photos.length === 0) {
    return "";
  }

  const photo = theme.photos[Math.floor(Math.random() * theme.photos.length)];
  return getPhotoPath(theme.id, photo.file);
};

const featuredPhoto = getPhotoPath("sea", "fishing-boat-greek-flag.jpg");
const ypapantiPhoto = getPhotoPath("faith", "ypapanti.jpg");
const heroLogo = "/logo-shadow.png";
const featuredPhotoData = getPhotoByPath(featuredPhoto);
const ypapantiPhotoData = getPhotoByPath(ypapantiPhoto);

function HomeImage({
  src,
  alt,
  className = "",
  priority = false,
  decorative = false,
  loader = true,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <span
      className={`home-image-frame ${loader ? "" : "home-image-frame-plain"} ${
        isLoaded ? "is-loaded" : ""
      } ${className}`}
    >
      {loader && <span className="home-image-loader" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        aria-hidden={decorative ? "true" : undefined}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </span>
  );
}

function Home() {
  const [isHeroBackgroundLoaded, setIsHeroBackgroundLoaded] = useState(false);
  const featuredThemes = useMemo(
    () =>
      photoCategories.map((theme) => ({
        ...theme,
        photo: getRandomPhoto(theme),
      })),
    [],
  );
  return (
    <>
      <section className={`hero-section ${isHeroBackgroundLoaded ? "is-bg-loaded" : ""}`}>
        <img
          className="hero-background-preload"
          src={sample2}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          onLoad={() => setIsHeroBackgroundLoaded(true)}
          onError={() => setIsHeroBackgroundLoaded(true)}
        />
        <div
          className="hero-background"
          style={{ backgroundImage: `url(${sample2})` }}
          aria-hidden="true"
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-brand-row">
            <div className="hero-text">
              <p className="eyebrow">35mm Film Photography</p>

              <div className="hero-title-row">
                <h1 className="hero-logo-title">
                  <HomeImage
                    src={heroLogo}
                    alt="Cataphract Visuals logo"
                    className="hero-title-logo"
                    priority
                    loader={false}
                  />
                </h1>
              </div>

              <p className="hero-subtitle">
                Visual storytelling. Chasing light. Framing meaning.
              </p>

              <div className="hero-actions">
                <Link to="/gallery" className="button primary-button">
                  View Gallery
                </Link>

                <Link to="/collections" className="button secondary-button">
                  Explore Collections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <p className="eyebrow">Harbor Frame</p>
          <h2>Harbor's edge.</h2>
        </div>

        <article className="featured-photo">
          <div className="featured-image">
            <HomeImage
              src={featuredPhoto}
              alt="Fishing boat with a Greek flag in a harbor"
            />
          </div>

          <div className="featured-copy">
            <p className="eyebrow">Sea / Harbor</p>

            <h3>Harbor's Edge</h3>

            <p className="poem">
              At the harbor's edge,
              <br />
              There stands a little old cafe.
              <br />
              Where sailors linger before they go.
              <br />
              Bitter is the boats' call.
            </p>

            <div className="photo-meta">
              <span>Camera: {featuredPhotoData.camera}</span>
              <span>Film: {featuredPhotoData.film}</span>
              <span>Theme: Sea / Harbor</span>
              <span>Location: {featuredPhotoData.location}</span>
              <span>
                #35mmfilm #filmphotography #boat #greecephotography
                #fishinglife
              </span>
            </div>
          </div>
        </article>
      </section>

      <section className="themes-preview-section">
        <div className="section-heading">
          <p className="eyebrow">Explore by Theme</p>
          <h2>Each theme is a different kind of silence.</h2>
        </div>

        <div className="theme-grid">
          {featuredThemes.map((theme) => (
            <Link
              className="theme-card"
              key={theme.id}
              to={`/gallery?category=${encodeURIComponent(theme.id)}`}
            >
              {theme.photo && (
                <HomeImage
                  className="theme-card-image"
                  src={theme.photo}
                  alt=""
                  decorative
                />
              )}

              <div className="theme-card-content">
                <h3>{theme.label}</h3>
                <p>{theme.homeDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="gold-featured-section">
        <article className="featured-photo featured-photo-reversed">
          <div className="featured-copy">
            <p className="eyebrow">Faith</p>

            <h3>Ypapanti</h3>

            <p className="poem">
              Faith is the door to mysteries,
              <br />
              Walked with wonder on bent knees.
              <br />
              Not seeking crowns nor victories,
              <br />
              Only the grace that softly frees.
            </p>

            <div className="photo-meta">
              <span>Camera: {ypapantiPhotoData.camera}</span>
              <span>Film: {ypapantiPhotoData.film}</span>
              <span>Theme: Faith</span>
              <span>Location: {ypapantiPhotoData.location}</span>
              <span>#ilfordhp5 #filmphotography #blackandwhitephotography #greekarchitecture #orthodoxchurch</span>
            </div>
          </div>

          <div className="featured-image">
            <HomeImage
              src={ypapantiPhoto}
              alt="Narrow balcony alley near Ypapanti in Kalamata"
            />
          </div>
        </article>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">One image equals 1000 words</p>
          <h2>Visual Poetry</h2>
          <p>
            Cataphract Visuals is not only a gallery. Many images carry a
            small poem, turning the photograph into a memory, a symbol, or a
            quiet scene from another time. Through interpretation, the viewer
            can begin to discover the photographer's intention.
          </p>
          <Link to="/poetry" className="text-link">
            Read the poems
          </Link>
        </div>

        <div>
          <p className="eyebrow">Tools of the Work</p>
          <h2>Equipment</h2>
          <p>
            The equipment is part of the identity: mechanical cameras, film
            grain, old lenses, imperfect light, and the discipline of waiting.
            <br />
            <br />
            Take a look under the hood and see what we use to freeze time.
          </p>
          <Link to="/equipment" className="text-link">
            View equipment
          </Link>
        </div>
      </section>

      <section className="equipment-teaser">
        <p className="eyebrow">Phone Shots</p>
        <h2>Simple tools can still capture real moments.</h2>
        <p>
          A separate section celebrates phone photography: direct, casual,
          honest images made in the moment. These frames keep the practice
          open and immediate, proving that attention, timing, and instinct can
          matter more than the equipment in hand.
        </p>
        <Link to="/phone-shots" className="button secondary-button">
          View phone shots
        </Link>
      </section>
    </>
  );
}

export default Home;
