import { useState, type FormEvent } from "react";
import { LoaderCircle, MapPin, Navigation, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./PreHomeAuth.css";

const CITIES = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Jaipur",
  "Lucknow",
  "Ahmedabad",
  "Indore",
  "Noida",
];

export function LocationSelection({ onDone }: { onDone: () => void }) {
  const [query, setQuery] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [notice, setNotice] = useState("");

  const needle = query.trim().toLowerCase();
  const cities = needle.length > 0 ? CITIES.filter((city) => city.toLowerCase().includes(needle)) : CITIES;

  const pickCity = (city: string) => {
    try {
      window.localStorage.setItem("basera:location", city);
    } catch {
      // Location memory is a convenience; ignore storage failures.
    }
    onDone();
  };

  const detectLocation = () => {
    if (detecting) return;
    setNotice("");
    if (!("geolocation" in navigator)) {
      setNotice("Location is not supported on this device. Please pick your city below.");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        try {
          window.localStorage.setItem("basera:location", "Near me");
        } catch {
          // Location memory is a convenience; ignore storage failures.
        }
        onDone();
      },
      () => {
        setDetecting(false);
        setNotice("We couldn't detect your location. Please pick your city below.");
      },
      { timeout: 10000 },
    );
  };

  const searchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cities.length > 0) pickCity(cities[0]);
  };

  return (
    <main className="prehome-auth prehome-location-screen" aria-label="Select your location">
      <section className="prehome-location">
        <MapPin className="prehome-location-pin" aria-hidden="true" />
        <h1>Where is your location?</h1>
        <p className="prehome-location-sub">Choose your city to see homes available near you.</p>

        <Button type="button" variant="outline" className="prehome-social prehome-gps" onClick={detectLocation}>
          {detecting ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <Navigation aria-hidden="true" />}
          {detecting ? "Detecting your location…" : "Use my current location"}
        </Button>

        <div className="prehome-divider"><span>OR</span></div>

        <form className="prehome-location-search" onSubmit={searchSubmit}>
          <span className="prehome-input-wrap">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              maxLength={60}
              placeholder="Search your city"
              aria-label="Search your city"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </span>
        </form>

        <p className="prehome-city-label">Popular cities</p>
        {cities.length > 0 ? (
          <div className="prehome-cities">
            {cities.map((city) => (
              <Button key={city} type="button" variant="outline" className="prehome-city" onClick={() => pickCity(city)}>
                {city}
              </Button>
            ))}
          </div>
        ) : (
          <p className="prehome-location-empty">No city matches “{query.trim()}”. Please try another spelling.</p>
        )}
        {notice && <p className="prehome-location-notice" role="alert">{notice}</p>}
      </section>
    </main>
  );
}
