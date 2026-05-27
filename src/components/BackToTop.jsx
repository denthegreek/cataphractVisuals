import { useEffect, useState } from "react";
import "./BackToTop.css";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 520);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? "is-visible" : ""}`}
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <span aria-hidden="true" />
    </button>
  );
}

export default BackToTop;
