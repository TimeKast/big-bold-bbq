"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import type { Map as LeafletMap, Marker } from "leaflet";

type City = { name: string; lat: number; lng: number };

// Service-area cities + approx coordinates. Order matches the 2-col list below.
const CITIES: City[] = [
  { name: "Las Vegas", lat: 36.1699, lng: -115.1398 },
  { name: "Henderson", lat: 36.0395, lng: -114.9817 },
  { name: "Summerlin", lat: 36.1339, lng: -115.3289 },
  { name: "North Las Vegas", lat: 36.1989, lng: -115.1175 },
  { name: "Boulder City", lat: 35.9786, lng: -114.8319 },
];

const PIN_HTML = `<svg width="26" height="36" viewBox="0 0 26 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M13 0C5.8 0 0 5.8 0 13c0 8.9 11.3 21.3 11.8 21.8a1.6 1.6 0 0 0 2.4 0C14.7 34.3 26 21.9 26 13 26 5.8 20.2 0 13 0z" fill="#9E2F23"/>
  <circle cx="13" cy="13" r="4.6" fill="#F4E6CF"/>
</svg>`;

export function ServiceAreaMap() {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    let cancelled = false;

    async function init() {
      const mod = await import("leaflet");
      const L = ((mod as { default?: typeof import("leaflet") }).default ??
        mod) as typeof import("leaflet");
      if (cancelled || !elRef.current || mapRef.current) return;

      const map = L.map(elRef.current, {
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView([36.07, -115.08], 10);
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        },
      ).addTo(map);

      // 50-mile service radius, centered on the Strip
      L.circle([36.1147, -115.1728], {
        radius: 50 * 1609.34,
        color: "#9E2F23",
        weight: 1.5,
        opacity: 0.5,
        fillColor: "#9E2F23",
        fillOpacity: 0.05,
        dashArray: "5 6",
      }).addTo(map);

      const icon = L.divIcon({
        html: PIN_HTML,
        className: "bbq-pin",
        iconSize: [26, 36],
        iconAnchor: [13, 34],
        popupAnchor: [0, -30],
      });

      for (const c of CITIES) {
        const m = L.marker([c.lat, c.lng], { icon, title: c.name })
          .addTo(map)
          .bindPopup(`<strong>${c.name}</strong><br/>Catering service area`);
        markersRef.current[c.name] = m;
      }

      // container starts hidden/below fold — recompute size once mounted
      setTimeout(() => map.invalidateSize(), 0);
    }

    // Defer the Leaflet bundle + tiles until the map is near the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void init();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  function focusCity(name: string) {
    const map = mapRef.current;
    const m = markersRef.current[name];
    if (!map || !m) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) map.setView(m.getLatLng(), 12);
    else map.flyTo(m.getLatLng(), 12, { duration: 0.8 });
    m.openPopup();
  }

  return (
    <>
      <figure>
        <div
          ref={elRef}
          role="application"
          aria-label="Interactive map of the Las Vegas valley showing Big Bold BBQ service-area cities"
          className="relative z-0 aspect-[4/3] rounded-xl border border-hickory/15 overflow-hidden shadow-sm bg-parchment-grain"
        />
        <figcaption className="mt-3 flex items-center gap-2 text-xs text-hickory/60 font-medium uppercase tracking-wider">
          <MapPin className="size-3.5 text-firebrick flex-shrink-0" aria-hidden />
          We travel roughly 50 miles from the Las Vegas Strip
        </figcaption>
      </figure>

      <ul className="mt-8 grid grid-cols-2 gap-3">
        {CITIES.map((c) => (
          <li key={c.name}>
            <button
              type="button"
              onClick={() => focusCity(c.name)}
              aria-label={`Show ${c.name} on the map`}
              className="flex w-full items-center gap-2 text-left text-hickory/85 hover:text-firebrick transition-colors rounded focus-visible:outline-2 focus-visible:outline-warmgold focus-visible:outline-offset-2"
            >
              <MapPin className="size-4 text-firebrick flex-shrink-0" aria-hidden />
              <span>{c.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
