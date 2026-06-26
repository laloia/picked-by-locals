"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Place, PlaceCategory } from "@/lib/types";
import PlaceCard from "./PlaceCard";

const CATEGORIES: PlaceCategory[] = [
  "beach",
  "restaurant",
  "park",
  "brewery",
  "coffee_shop",
];

const COUNTIES = ["martin"];

export default function PlacesDirectory() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | "all">(
    "all"
  );
  const [activeCounty, setActiveCounty] = useState<string | "all">("all");
  const [allowsIndoors, setAllowsIndoors] = useState(false);
  const [leashNotRequired, setLeashNotRequired] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    async function fetchPlaces() {
      let query = supabase
        .from("places")
        .select("*")
        .eq("county", "martin");

      if (activeCategory !== "all") {
        query = query.eq("category", activeCategory);
      }
      if (activeCounty !== "all") {
        query = query.eq("county", activeCounty);
      }
      if (allowsIndoors) {
        query = query.eq("dogs_allowed_indoors", true);
      }
      if (leashNotRequired) {
        query = query.eq("leash_required", false);
      }

      const { data, error } = await query.order("name", { ascending: true });

      if (error) {
        console.error(error);
        setPlaces([]);
      } else {
        setPlaces((data as Place[]) ?? []);
      }
      setLoading(false);
      
      window.scrollTo(0, scrollYRef.current);
    }

    fetchPlaces();
  }, [activeCategory, activeCounty, allowsIndoors, leashNotRequired]);

  const handleCategoryClick = (cat: PlaceCategory | "all") => {
    scrollYRef.current = window.scrollY;
    setActiveCategory(cat);
  };

  const handleCountyClick = (county: string | "all") => {
    scrollYRef.current = window.scrollY;
    setActiveCounty(county);
  };

  const handleIndoorsToggle = () => {
    scrollYRef.current = window.scrollY;
    setAllowsIndoors(!allowsIndoors);
  };

  const handleLeashToggle = () => {
    scrollYRef.current = window.scrollY;
    setLeashNotRequired(!leashNotRequired);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 8 }}>
            Category
          </label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => handleCategoryClick("all")}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid #ccc",
                background: activeCategory === "all" ? "#1d9e75" : "white",
                color: activeCategory === "all" ? "white" : "inherit",
                cursor: "pointer",
              }}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: "1px solid #ccc",
                  background: activeCategory === cat ? "#1d9e75" : "white",
                  color: activeCategory === cat ? "white" : "inherit",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {cat === "coffee_shop" ? "Coffee shop" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 8 }}>
            County
          </label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => handleCountyClick("all")}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid #ccc",
                background: activeCounty === "all" ? "#1d9e75" : "white",
                color: activeCounty === "all" ? "white" : "inherit",
                cursor: "pointer",
              }}
            >
              All
            </button>
            {COUNTIES.map((county) => (
              <button
                type="button"
                key={county}
                onClick={() => handleCountyClick(county)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: "1px solid #ccc",
                  background: activeCounty === county ? "#1d9e75" : "white",
                  color: activeCounty === county ? "white" : "inherit",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {county.replace("_", " ")}
              </button>
            ))}
          </div>
        </div> */}

        <div>
          <label style={{ fontSize: 14, fontWeight: 600, display: "block", marginBottom: 8 }}>
            More options
          </label>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={allowsIndoors}
                onChange={handleIndoorsToggle}
                style={{ cursor: "pointer" }}
              />
              <span style={{ fontSize: 14 }}>Dogs allowed indoors</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={leashNotRequired}
                onChange={handleLeashToggle}
                style={{ cursor: "pointer" }}
              />
              <span style={{ fontSize: 14 }}>Off-leash welcome</span>
            </label>
          </div>
        </div>
      </div>

      {loading ? (
        <p style={{ opacity: 0.6 }}>Loading places...</p>
      ) : places.length === 0 ? (
        <p style={{ opacity: 0.6 }}>
          No places found matching your filters.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}