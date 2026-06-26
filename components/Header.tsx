"use client";

export default function Header() {
  return (
    <header style={{ padding: "16px 24px", background: "white", borderBottom: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 }}>
      <a href="/martin-county/dog-friendly" style={{ fontWeight: 700, textDecoration: "none", color: "inherit", fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
      📍 Picked by Locals
      </a>
      <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <a href="/map" style={{ textDecoration: "none", color: "#4b5563", fontSize: 14, fontWeight: 500 }}>
          Browse Map
        </a>
        
        <a href="/submit" style={{ textDecoration: "none", color: "white", fontSize: 14, fontWeight: 600, background: "#1d9e75", padding: "8px 16px", borderRadius: 6 }}>
          Submit a Place
        </a>
      </nav>
    </header>
  );
}