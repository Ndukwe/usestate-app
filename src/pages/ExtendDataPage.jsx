import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./ExtendDataPage.css";

function ExtendData() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDog = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://dog.ceo/api/breeds/image/random",
      );
      setImage(response.data.message);
    } catch {
      setError("We couldn't load a dog photo. Please try again.");
    } finally {
      setLoading(false);
    }
   
  }, []);

  useEffect(() => {
    void loadDog();
     console.log('runing');
  }, [loadDog]);

  return (
    <main className="dog-page">
      <section className="dog-explorer" aria-labelledby="dog-page-title">
        <div className="dog-copy">
          <p className="dog-eyebrow">
            <span aria-hidden="true">✦</span> A little joy, on demand
          </p>
          <h1 id="dog-page-title">Meet your new favorite dog.</h1>
          <p className="dog-description">
            Need a tiny break? Discover a surprise pup and brighten your day.
          </p>

          <button
            className="dog-refresh"
            type="button"
            onClick={loadDog}
            disabled={loading}
          >
            {loading ? "Finding a pup..." : "Show me another dog"}
            {!loading && <span aria-hidden="true">→</span>}
          </button>
          <p className="dog-hint">A fresh photo with every click.</p>
        </div>

        <div className="dog-photo-card">
          <div className="dog-photo-frame">
            {loading && (
              <div className="dog-message" role="status" aria-live="polite">
                <span className="dog-spinner" aria-hidden="true" />
                <span>Finding your surprise pup...</span>
              </div>
            )}

            {!loading && error && (
              <div className="dog-message dog-error" role="alert">
                <span aria-hidden="true">🐾</span>
                <p>{error}</p>
                <button type="button" onClick={loadDog}>
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && image && (
              <img
                className="dog-photo"
                src={image}
                alt="A randomly selected dog"
              />
            )}
          </div>
          <span className="dog-card-caption">
            <span aria-hidden="true">♥</span> Good dogs. Good vibes.
          </span>
        </div>
      </section>
    </main>
  );
}

export default ExtendData;
