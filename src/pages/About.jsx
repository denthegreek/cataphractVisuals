import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import "./About.css";

function About() {
  const pageRef = useRef(null);
  const [isHeroImageLoaded, setIsHeroImageLoaded] = useState(false);
  const [visibleItems, setVisibleItems] = useState(() => new Set(["hero"]));

  useEffect(() => {
    if (!pageRef.current) {
      return undefined;
    }

    const revealElements = Array.from(
      pageRef.current.querySelectorAll("[data-about-reveal]"),
    );

    if (revealElements.length === 0) {
      return undefined;
    }

    const prefersDesktopReveal = window.matchMedia("(min-width: 901px)").matches;

    if (!prefersDesktopReveal) {
      setVisibleItems(
        new Set(
          revealElements
            .map((element) => element.getAttribute("data-about-reveal"))
            .filter(Boolean),
        ),
      );
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const revealId = entry.target.getAttribute("data-about-reveal");

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
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  const getRevealClass = (revealId) =>
    `about-reveal ${visibleItems.has(revealId) ? "is-visible" : ""}`;

  return (
    <main className="about-page" ref={pageRef}>
      <section
        className={`about-hero ${isHeroImageLoaded ? "is-bg-loaded" : ""} ${getRevealClass("hero")}`}
        data-about-reveal="hero"
      >
        <img
          className="about-hero-preload"
          src="/equipment/1000024295.jpg"
          alt=""
          aria-hidden="true"
          onLoad={() => setIsHeroImageLoaded(true)}
        />
        <div className="about-hero-copy">
          <p className="eyebrow">Memory / Film / Poetry</p>
          <h1>About</h1>
          <h3>Cataphract Visuals</h3>
          <p>
            Cataphract Visuals is a photography identity built around memory,
            atmosphere, and the quiet act of preserving a frame before it
            disappears.
          </p>
        </div>

        <div className="about-hero-mark" aria-hidden="true">
          <img src={logo} alt="" />
        </div>
      </section>

      <section
        className={`about-statement ${getRevealClass("statement")}`}
        data-about-reveal="statement"
      >
        <p>
          I photograph to preserve the feeling of a moment as I saw it, not only
          what stood in front of me, but what it seemed to become in memory. A
          frame can be a place, a face, a flower, a street, a shadow, or a small
          trace of faith and silence. What matters is not only the subject, but
          the feeling it leaves behind.
        </p>
      </section>

      <section
        className={`about-section about-split ${getRevealClass("interpretation")}`}
        data-about-reveal="interpretation"
      >
        <div>
          <p className="eyebrow">Interpretation</p>
          <h2>The frame remains open.</h2>
        </div>

        <p>
          Every image is an invitation. I do not want to close the meaning of a
          photograph. I want to leave enough space for you to enter it with me,
          to read it through your own personal lenses, and to decide what registers.
        </p>
      </section>

      <section
        className={`about-section about-split about-poetry-panel ${getRevealClass("poetry")}`}
        data-about-reveal="poetry"
      >
        <div>
          <p className="eyebrow">Poetry</p>
          <h2>Small echoes beside the image.</h2>
        </div>

        <p>
          Many frames are accompanied by short four-line poems. They are not
          explanations. They are small echoes, a way to romanticize the frame, to
          give it rhythm, and to let the image continue speaking after the eye
          has moved away.
        </p>
      </section>

      <section
        className={`about-tools ${getRevealClass("tools")}`}
        data-about-reveal="tools"
        aria-label="Photographic tools"
      >
        <article>
          <p className="eyebrow">Film Photography</p>
          <h2>35mm patience</h2>
          <p>
            Much of the work is made on 35mm film, especially with the Olympus
            OM-1. Film asks me to wait, to accept grain, to trust a slower
            rhythm, and to let the frame earn its place.
          </p>
        </article>

        <article>
          <p className="eyebrow">Phone Photography</p>
          <h2>Simple tools</h2>
          <p>
            Phone photography also belongs here. A simple tool can still hold a
            real moment. Vision, attention, and timing matter more than the gear
            in hand.
          </p>
        </article>
      </section>

      <section
        className={`about-section about-themes ${getRevealClass("themes")}`}
        data-about-reveal="themes"
      >
        <p className="eyebrow">Recurring Subjects</p>
        <h2>Whatever asks to be preserved.</h2>
        <p>
          The archive often returns to the sea, flowers, urban corners, animals,
          sacred details, and memory itself. But the work is not limited to a
          fixed list of subjects. Cataphract Visuals follows whatever asks to be
          preserved.
        </p>
      </section>

      <blockquote
        className={`about-quote ${getRevealClass("quote")}`}
        data-about-reveal="quote"
      >
        "I photograph not to explain, but to preserve a moment before it becomes
        memory."
      </blockquote>

      <section
        className={`about-contact ${getRevealClass("contact")}`}
        data-about-reveal="contact"
      >
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Follow Cataphract Visuals</h2>
        </div>

        <div className="about-contact-links">
          <a
            href="https://www.instagram.com/cataphract.visuals/"
            aria-label="Cataphract Visuals Instagram"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="about-contact-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" />
            </svg>
            Instagram
          </a>
        </div>
      </section>
    </main>
  );
}

export default About;
