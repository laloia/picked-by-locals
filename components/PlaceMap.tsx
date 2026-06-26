"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Place } from "@/lib/types";

export default function PlaceMap({ place }: { place: Place }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    if (!place.lng || !place.lat) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
    
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [place.lng, place.lat],
      zoom: 14,
    });

    new mapboxgl.Marker({ color: "#1d9e75" })
      .setLngLat([place.lng, place.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 24 }).setHTML(
          `<strong>${place.name}</strong>`
        )
      )
      .addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [place]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: 400, borderRadius: 12, marginTop: 24, background: "#333" }}
    />
  );
}