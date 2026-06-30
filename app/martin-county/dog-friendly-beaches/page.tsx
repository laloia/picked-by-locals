import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { Place } from "@/lib/types";
import PlaceCard from "@/components/PlaceCard";
import MollySection from "@/components/MollySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Dog-Friendly Beaches in Martin County, FL | Picked by Locals",
  description: "Discover the best dog-friendly beaches in Stuart, Martin County, Florida. Off-leash areas, shallow water, lifeguards, and perfect for your pup.",
  keywords: "dog friendly beaches Martin County, dog beaches Stuart FL, off-leash dog beaches, best beaches for dogs Florida",
  openGraph: {
    title: "Best Dog-Friendly Beaches in Martin County, FL",
    description: "Explore dog-friendly beaches in Stuart and Martin County with leash requirements, water access, and pup-perfect amenities.",
    url: "https://pickedbylocals.com/martin-county/dog-friendly-beaches",
    type: "website",
  },
};

export const revalidate = 60;

async function getBeaches(): Promise<Place[]> {
  const { data, error } = await supabase
    .from("places")
    .select("*")
    .eq("county", "martin")
    .eq("category", "beach")
    .order("name", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return data as Place[];
}

export default async function DogFriendlyBeachesPage() {
  const beaches = await getBeaches();

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "60px 0",
          backgroundImage:
            "url('https://vylcfzvavvbppfdvuebh.supabase.co/storage/v1/object/public/place-photos/Mollybeach.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          minHeight: "400px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "1200px",
            padding: "0 24px",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(24px, 8vw, 42px)",
              marginBottom: 16,
              color: "white",
            }}
          >
            Dog-Friendly Beaches in Martin County
          </h1>
          <p
            style={{
              opacity: 0.9,
              marginBottom: 24,
              color: "white",
              fontSize: "clamp(14px, 4vw, 16px)",
            }}
          >
            Discover pristine beaches where your dog can splash, play, and relax.
            From calm lagoons to sandy shores, find your perfect beach day.
          </p>
        </div>
      </section>

      {/* Beaches Grid */}
      <section style={{ padding: "48px 24px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 24,
              marginBottom: 16,
              fontWeight: 700,
              color: "#1d9e75",
            }}
          >
            🏖️ Beaches Perfect for Pups
          </h2>
          <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
            Martin County offers over 22 miles of beautiful beaches where dogs are
            genuinely welcome. Whether your pup loves calm lagoons or crashing
            waves, you'll find the perfect spot here. All of these beaches feature
            lifeguard stations, free parking, and plenty of space for your furry friend
            to enjoy the ocean.
          </p>
        </div>

        {beaches.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No beaches found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 48,
            }}
          >
            {beaches.map((beach) => (
              <PlaceCard key={beach.id} place={beach} />
            ))}
          </div>
        )}
      </section>

      {/* Paw Print Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "48px 0",
          gap: 12,
        }}
      >
        <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        <span style={{ fontSize: 20, opacity: 0.6 }}>🐾</span>
        <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
      </div>

      {/* Molly Section */}
      <MollySection />

      {/* Why These Beaches Section */}
      <section
        style={{
          padding: "48px 24px",
          maxWidth: 960,
          margin: "0 auto",
          background: "#f9fafb",
          borderRadius: 12,
          marginTop: 48,
          marginBottom: 48,
        }}
      >
        <h2 style={{ fontSize: 20, marginBottom: 24, fontWeight: 700 }}>
          Why These Beaches Stand Out
        </h2>
        <div style={{ lineHeight: 1.8, opacity: 0.85 }}>
          <p>
            <strong>Dog-Friendly Policies:</strong> Every beach on this list welcomes
            leashed dogs during specific hours. Some offer off-leash areas under voice
            control—perfect for dogs who love to run free.
          </p>
          <p>
            <strong>Amenities for Your Pup:</strong> Many beaches have water access,
            shade from palm trees, and nearby restaurants with outdoor seating where
            your dog is welcome too.
          </p>
          <p>
            <strong>Verified by Locals:</strong> Each beach has been personally visited
            and tested by Molly and other local dog owners. We know which spots truly
            welcome dogs and which just tolerate them.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Safe & Family-Friendly:</strong> Lifeguard coverage, clean facilities,
            and plenty of space mean you can relax while your dog enjoys the sand and
            surf.
          </p>
        </div>
      </section>

      {/* Beach Tips Section */}
      <section
        style={{
          padding: "48px 24px",
          maxWidth: 960,
          margin: "0 auto",
          marginBottom: 48,
        }}
      >
        <h2 style={{ fontSize: 20, marginBottom: 24, fontWeight: 700 }}>
          🐕 Tips for a Perfect Dog Beach Day
        </h2>
        <div style={{ display: "grid", gap: 20 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Check Hours & Leash Rules
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Some beaches require leashes year-round, while others allow off-leash
              play during specific seasons. Check the beach details above for exact
              policies.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Bring Plenty of Fresh Water
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Salt water isn't safe for dogs to drink. Bring a water bowl and plenty of
              fresh water to keep your pup hydrated.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Protect from the Sun
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Apply dog-safe sunscreen to exposed areas (nose, ears, belly) and seek
              shade regularly. The hot sand can burn paw pads.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Watch for Sea Creatures
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Keep your dog away from jellyfish, stingrays, and shells. If stung, rinse
              with vinegar (ask lifeguards for supplies) and seek vet care if needed.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "48px 24px",
          maxWidth: 960,
          margin: "0 auto",
          textAlign: "center",
          background: "linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%)",
          borderRadius: 16,
          marginBottom: 48,
        }}
      >
        <h2 style={{ fontSize: 20, marginBottom: 16, fontWeight: 700 }}>
          Find More Dog-Friendly Spots
        </h2>
        <p style={{ opacity: 0.8, marginBottom: 24 }}>
          Beaches are just the beginning. Explore dog-friendly restaurants, parks,
          breweries, and coffee shops across Martin County.
        </p>
        <a
          href="/martin-county/dog-friendly"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "#1d9e75",
            color: "white",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Explore All Dog-Friendly Places
        </a>
      </section>

      {/* Hashtag */}
      <section style={{ textAlign: "center", marginBottom: 32, padding: "0 24px" }}>
        <p style={{ fontSize: 14, opacity: 0.7 }}>
          Share your beach days with us! Tag{" "}
          <strong>#DogFriendlyMartinCounty</strong> on Instagram and TikTok for a
          chance to be featured. 🐾
        </p>
      </section>
    </div>
  );
}
