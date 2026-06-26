"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
  "beach",
  "restaurant",
  "park",
  "coffee_shop",
  "brewery",
];

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: "",
    userEmail: "",
    category: "restaurant",
    address: "",
    description: "",
    dogPolicy: "",
    leashRequired: false,
    dogsAllowedIndoors: false,
    waterAccess: "",
    fenced: false,
    fee: "",
    hours: "",
    phone: "",
    website: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (name: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: insertError } = await supabase.from("submissions").insert({
        name: formData.name,
        user_email: formData.userEmail,
        category: formData.category,
        address: formData.address,
        description: formData.description,
        dog_policy: formData.dogPolicy,
        leash_required: formData.leashRequired,
        dogs_allowed_indoors: formData.dogsAllowedIndoors,
        water_access: formData.waterAccess,
        fenced: formData.fenced,
        fee: formData.fee,
        hours: formData.hours,
        phone: formData.phone,
        website: formData.website,
      });

      if (insertError) {
        setError("Failed to submit. Please try again.");
        return;
      }

      setSubmitted(true);
      setFormData({
        name: "",
        userEmail: "",
        category: "restaurant",
        address: "",
        description: "",
        dogPolicy: "",
        leashRequired: false,
        dogsAllowedIndoors: false,
        waterAccess: "",
        fenced: false,
        fee: "",
        hours: "",
        phone: "",
        website: "",
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Thank you!</h1>
        <p style={{ fontSize: 16, opacity: 0.7, marginBottom: 24 }}>
          Your submission has been received. We'll review it and add it to the site soon.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Submit a Dog-Friendly Place</h1>
      <p style={{ opacity: 0.7, marginBottom: 32 }}>
        Help us grow the directory by sharing your favorite dog-friendly spot in Martin County.
      </p>

      <div style={{
  padding: "24px",
  background: "#fef3c7",
  borderRadius: 12,
  marginBottom: 24,
  textAlign: "center",
}}>
  <h3 style={{ margin: "0 0 8px 0" }}>Another way to share</h3>
  <p style={{ margin: 0, fontSize: 14 }}>
    Have photos? Share them on Instagram with <strong>#DogFriendlyMartinCounty</strong> and we'll feature the best ones!
  </p>
</div>

      <form onSubmit={handleSubmit}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, marginBottom: 16, fontWeight: 600 }}>Required</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Place Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Baxter's Doghouse"
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Your Email *</label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }}
            />
          </div>
        </section>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat === "coffee_shop" ? "Coffee Shop" : cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St, Stuart, FL 34994" style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about this place..." rows={3} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Dog Policy</label>
          <textarea name="dogPolicy" value={formData.dogPolicy} onChange={handleChange} placeholder="e.g. Leashed dogs welcome on the patio" rows={2} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, boxSizing: "border-box", fontFamily: "inherit" }} />
        </div>

        <section style={{ marginBottom: 24, padding: 16, background: "#f9fafb", borderRadius: 8 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 12 }}>Dog Amenities</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input type="checkbox" checked={formData.leashRequired} onChange={() => handleCheckbox("leashRequired")} style={{ cursor: "pointer" }} />
              <span>Off-leash welcome</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input type="checkbox" checked={formData.dogsAllowedIndoors} onChange={() => handleCheckbox("dogsAllowedIndoors")} style={{ cursor: "pointer" }} />
              <span>Dogs allowed indoors</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input type="checkbox" checked={formData.fenced} onChange={() => handleCheckbox("fenced")} style={{ cursor: "pointer" }} />
              <span>Fenced area</span>
            </label>
          </div>
        </section>

        <section style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Additional Info</h3>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Water Access</label>
            <input type="text" name="waterAccess" value={formData.waterAccess} onChange={handleChange} placeholder="e.g. Water bowls provided" style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Fee</label>
            <input type="text" name="fee" value={formData.fee} onChange={handleChange} placeholder="e.g. Free or $10 per day" style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Hours</label>
            <input type="text" name="hours" value={formData.hours} onChange={handleChange} placeholder="e.g. Monday-Friday 9am-5pm | Saturday 10am-4pm" style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(772) 123-4567" style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Website</label>
            <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://example.com" style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
          </div>
        </section>

        {error && <div style={{ marginBottom: 16, padding: 12, background: "#fee2e2", color: "#991b1b", borderRadius: 6, fontSize: 14 }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px 24px", background: "#1d9e75", color: "white", border: "none", borderRadius: 6, fontSize: 16, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}>
          {loading ? "Submitting..." : "Submit Place"}
        </button>
      </form>
    </div>
  );
}