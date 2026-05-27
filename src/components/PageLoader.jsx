import "./PageLoader.css";

function PageLoader({ isLoading, label = "Loading Frames" }) {
  return (
    <div
      className={`page-loader ${isLoading ? "" : "page-loader-hidden"}`}
      aria-hidden={!isLoading}
    >
      <div className="loader-frame">
        <span />
        <span />
        <span />
        <span />
      </div>
      <p className="page-loader-label">{label}</p>
    </div>
  );
}

export default PageLoader;
