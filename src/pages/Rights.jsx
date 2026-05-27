import "./Rights.css";

function Rights() {
  return (
    <main className="rights-page">
      <section className="rights-hero">
        <p className="eyebrow">Image Rights</p>
        <h1>Use requires written approval.</h1>
        <p>
          Cataphract Visuals is built from original photographs. Viewing this
          website does not grant permission to copy, download, reproduce,
          modify, distribute, or reuse any image.
        </p>
      </section>

      <section className="rights-content" aria-label="Image usage terms">
        <article>
          <h2>Ownership</h2>
          <p>
            All photographs displayed on this website are owned by Cataphract
            Visuals unless otherwise stated. The published web versions are
            provided for viewing only.
          </p>
        </article>

        <article>
          <h2>Permission</h2>
          <p>
            No photograph may be copied, downloaded, screenshotted for
            redistribution, edited, printed, reposted, published, sold, used in
            datasets, used for AI training, or used commercially without prior
            signed written approval from Cataphract Visuals.
          </p>
        </article>

        <article>
          <h2>Sharing</h2>
          <p>
            Sharing a link to the website is welcome. Re-uploading image files,
            extracting images from the site, or presenting the photographs as
            separate assets is not permitted.
          </p>
        </article>

        <article>
          <h2>Requests</h2>
          <p>
            For permission requests, contact Cataphract Visuals through the
            official Instagram account. Approval must be given in writing before
            any use takes place.
          </p>
          <a
            href="https://www.instagram.com/cataphract.visuals/"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="rights-instagram-icon"
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
        </article>
      </section>
    </main>
  );
}

export default Rights;
