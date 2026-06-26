"use client";
import Link from "next/link";
import { Place } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  beach: "🏖️ Beach",
  restaurant: "🥘 Restaurant",
  park: "🌳 Park",
  coffee_shop: "☕ Coffee",
  brewery: "🍺 Brewery",
  trail: "🥾 Trail",
  hotel: "🏨 Hotel",
  shop: "🛍️ Shop",
};

const categoryColors: Record<string, string> = {
  beach: "#e5e7eb",
  restaurant: "#e5e7eb",
  park: "#e5e7eb",
  coffee_shop: "#e5e7eb",
  brewery: "#e5e7eb",
};

export default function PlaceCard({ place }: { place: Place }) {
  const categoryColor = categoryColors[place.category] ?? "#1d9e75";

  return (
    <Link
      href={`/places/${place.id}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        transition: "all 0.3s ease",
        backgroundColor: "white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
        el.style.transform = "translateY(0)";
      }}>
        {/* Category Badge */}
        <div style={{
          background: categoryColor,
          color: 666,
          padding: "8px 12px",
          fontSize: 12,
          fontWeight: 600,
          display: "inline-block",
          margin: 12,
          marginBottom: 0,
          borderRadius: 6,
          width: "fit-content",
        }}>
          {categoryLabels[place.category] ?? place.category}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
  {place.featured && place.logo_url && (
    <img 
      src={place.logo_url} 
      alt={place.name} 
      style={{ width: 50, height: 50, objectFit: "contain", borderRadius: 4, position: "absolute", top:12, right: 16, }} 
    />
  )}
</div>

        {/* Content */}
        <div style={{ padding: "12px 16px 16px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ 
            fontSize: 18, 
            fontWeight: 700,
            marginBottom: 8,
            lineHeight: 1.3,
            color: "#1f2937",
          }}>
            {place.name}
          </div>

          <div style={{ 
            fontSize: 13, 
            opacity: 0.65, 
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}>
            📍 {place.address}
          </div>

          <div style={{ 
            fontSize: 13, 
            lineHeight: 1.5,
            marginBottom: 12,
            flex: 1,
            color: "#4b5563",
          }}>
            {place.dog_policy}
          </div>

          {/* Quick Info Pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
            {place.leash_required === false && (
              <span style={{
                fontSize: 11,
                padding: "4px 8px",
                background: "#dcfce7",
                color: "#166534",
                borderRadius: 4,
                fontWeight: 600,
              }}>
                ✓ Off-leash
              </span>
            )}
            {place.dogs_allowed_indoors && (
              <span style={{
                fontSize: 11,
                padding: "4px 8px",
                background: "#e0e7ff",
                color: "#3730a3",
                borderRadius: 4,
                fontWeight: 600,
              }}>
                🐕 Indoors
              </span>
            )}
            {place.water_access && (
              <span style={{
                fontSize: 11,
                padding: "4px 8px",
                background: "#cffafe",
                color: "#164e63",
                borderRadius: 4,
                fontWeight: 600,
              }}>
                💧 Water
              </span>
            )}
            {place.fenced && (
              <span style={{
                fontSize: 11,
                padding: "4px 8px",
                background: "#fef3c7",
                color: "#92400e",
                borderRadius: 4,
                fontWeight: 600,
              }}>
                🚧 Fenced
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}