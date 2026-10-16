import { useState } from "react";
import { ArrowLeft, ChevronRight, Crosshair, LoaderCircle, MapPin, Search, X } from "lucide-react";
import { STATES, searchLocations } from "@/data/locations";
import "./PreHomeAuth.css";

function save(value: string) {
  try {
    window.localStorage.setItem("basera:location", value);
  } catch {
    // Location memory is a convenience; ignore storage failures.
  }
}

export function LocationSelection({ onDone }: { onDone: () => void }) {
  const [stateName, setStateName] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [notice, setNotice] = useState("");

  const pick = (value: string) => {
    save(value);
    onDone();
  };

  const detect = () => {
    if (detecting) return;
    setNotice("");
    if (!("geolocation" in navigator)) {
      setNotice("Location is not supported on this device. Please choose below.");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      () => pick("Near me"),
      () => {
        setDetecting(false);
        setNotice("We couldn't detect your location. Please choose below.");
      },
      { timeout: 10000 },
    );
  };

  const current = stateName ? STATES.find((s) => s.name === stateName) : undefined;
  const hits = searchLocations(query, stateName ?? undefined);
  const searching = query.trim().length > 0;

  return (
    <main className="prehome-auth loc-screen" aria-label="Select your location">
      <section className="loc-panel">
        <header className="loc-header">
          {current ? (
            <button type="button" className="loc-icon" aria-label="Back to states" onClick={() => { setStateName(null); setQuery(""); }}>
              <ArrowLeft />
            </button>
          ) : (
            <button type="button" className="loc-icon" aria-label="Close" onClick={onDone}>
              <X />
            </button>
          )}
          <h1>{current ? current.name : "Location"}</h1>
        </header>

        <label className="loc-search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            maxLength={60}
            placeholder="Search city, area or neighbourhood"
            aria-label="Search city, area or neighbourhood"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        {searching ? (
          <ul className="loc-list" aria-label="Search results">
            {hits.length === 0 && <li className="loc-empty">No matches for “{query.trim()}”.</li>}
            {hits.map((h, index) => (
              <li key={`${h.label}-${index}`}>
                <button
                  type="button"
                  className="loc-row"
                  onClick={() => (h.town ? pick(h.label) : (setStateName(h.state), setQuery("")))}
                >
                  <MapPin size={16} aria-hidden="true" />
                  <span>{h.label}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : current ? (
          <>
            <button type="button" className="loc-row loc-blue" onClick={() => pick(current.name)}>
              All in {current.name}
            </button>
            <p className="loc-heading">{current.selectionHeading ?? "CHOOSE CITY"}</p>
            <ul className="loc-list">
              {current.towns.map((t, index) => (
                <li key={`${t.name}-${index}`}>
                  <button type="button" className="loc-row" onClick={() => pick(`${t.name}, ${current.name}`)}>
                    <span>{t.name}</span>
                    {t.arrow && <ChevronRight size={18} aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <button type="button" className="loc-row loc-blue loc-gps" onClick={detect}>
              {detecting ? <LoaderCircle className="animate-spin" size={20} /> : <Crosshair size={20} />}
              <span className="loc-gps-text">
                <strong>Use current location</strong>
                <small>{detecting ? "Detecting…" : "Enable Location"}</small>
              </span>
            </button>
            {notice && <p className="loc-notice" role="alert">{notice}</p>}
            <p className="loc-heading">CHOOSE STATE</p>
            <ul className="loc-list">
              {STATES.map((s) => (
                <li key={s.name}>
                  <button type="button" className="loc-row" onClick={() => setStateName(s.name)}>
                    <span>{s.name}</span>
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}
