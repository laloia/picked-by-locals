import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { Place } from "@/lib/types";
import PlaceCard from "@/components/PlaceCard";
import MollySection from "@/components/MollySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Dog-Friendly Restaurants in Martin County, FL | Picked by Locals",
  description: "Discover the best dog-friendly restaurants in Stuart, Martin County, Florida. Outdoor seating, water bowls, and welcoming patios for your pup.",
  keywords: "dog friendly restaurants Martin County, dog restaurants Stuart FL, pet friendly dining, outdoor patio dogs",
  openGraph: {
    title: "Best Dog-Friendly Restaurants in Martin County, FL",
    description: "Explore dog-friendly restaurants in Stuart with outdoor seating, dog-friendly patios, and restaurants that love pups.",
    url: "https://pickedbylocals.com/martin-county/dog-friendly-restaurants",
    type: "website",
  },
};

export const revalidate = 60;

async function getRestaurants(): Promise<Place[]> {
  const { data, error } = await supabase
    .from("places")
    .select("*")
    .eq("county", "martin")
    .eq("category", "restaurant")
    .order("name", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return data as Place[];
}

export default async function DogFriendlyRestaurantsPage() {
  const restaurants = await getRestaurants();

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
            Dog-Friendly Restaurants in Martin County
          </h1>
          <p
            style={{
              opacity: 0.9,
              marginBottom: 24,
              color: "white",
              fontSize: "clamp(14px, 4vw, 16px)",
            }}
          >
            Enjoy delicious meals while your pup relaxes by your side. From casual
            outdoor patios to waterfront dining, find restaurants where dogs are truly
            welcome.
          </p>
        </div>
      </section>

      {/* Restaurants Grid */}
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
            🍽️ Restaurants Perfect for Pups
          </h2>
          <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
            Martin County boasts an incredible dining scene, and the best part? Many
            restaurants welcome dogs on their outdoor patios and seating areas. From
            casual lunch spots to upscale waterfront dining, you'll find places where
            your dog is treated like family. All restaurants listed here have been
            personally verified by Molly and local dog owners.
          </p>
        </div>

        {restaurants.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No restaurants found yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
              marginBottom: 48,
            }}
          >
            {restaurants.map((restaurant) => (
              <PlaceCard key={restaurant.id} place={restaurant} />
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

      {/* Why These Restaurants Stand Out */}
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
          Why These Restaurants Stand Out
        </h2>
        <div style={{ lineHeight: 1.8, opacity: 0.85 }}>
          <p>
            <strong>Dog-Welcoming Atmosphere:</strong> Every restaurant on this list
            genuinely welcomes dogs. Staff bring water bowls without asking, treat your
            pup kindly, and some even offer dog-friendly menu items.
          </p>
          <p>
            <strong>Outdoor Seating:</strong> We prioritize restaurants with spacious
            patios, shaded areas, and dog-friendly outdoor dining. Your pup can enjoy
            the fresh air while you savor your meal.
          </p>
          <p>
            <strong>Location & Ambiance:</strong> From waterfront dining on the St.
            Lucie River to downtown patios with local charm, each restaurant offers a
            unique experience where dogs fit naturally into the scene.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Verified by Locals:</strong> Each restaurant has been personally
            visited and tested by Molly and other dog-owning locals. We know which
            places truly roll out the welcome mat for pups.
          </p>
        </div>
      </section>

      {/* Tips for Dining with Dogs */}
      <section
        style={{
          padding: "48px 24px",
          maxWidth: 960,
          margin: "0 auto",
          marginBottom: 48,
        }}
      >
        <h2 style={{ fontSize: 20, marginBottom: 24, fontWeight: 700 }}>
          🐕 Tips for Dining Out with Your Dog
        </h2>
        <div style={{ display: "grid", gap: 20 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Check Patio Policies First
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Most restaurants welcome dogs on patios but not inside dining areas. Call
              ahead to confirm seating and any leash requirements. Some have enclosed
              patios that are perfect for dogs.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Bring a Water Bowl & Stay Hydrated
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Even though many restaurants provide water, bring a collapsible bowl just
              in case. Florida heat is intense—offer water frequently to keep your pup
              cool and comfortable.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Choose Shaded Seating When Possible
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Request outdoor tables under umbrellas or near shade. Direct sun + hot
              concrete can be uncomfortable for your dog. Many waterfront restaurants
              have natural shade from palm trees.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Keep Them on a Short Leash
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Use a short, secure leash on restaurant patios. Other diners, servers
              carrying food, and neighboring tables require extra caution. A well-behaved
              dog is welcome everywhere.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Be Mindful of Your Pup's Behavior
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Excessive barking or jumping on guests can result in being asked to leave.
              Bring treats and toys to keep your dog calm and entertained. A quiet,
              well-mannered pup is a welcome companion.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Avoid Peak Hours
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Lunch (11 AM - 1 PM) and dinner (6 PM - 8 PM) can get hectic. Visit during
              off-peak times for a more relaxed experience where staff can better
              accommodate your pup.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              Never Leave Your Dog Unattended
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Always keep an eye on your pup. Theft, heat exhaustion, and accidents can
              happen quickly. If you need to step away, take your dog with you or ask a
              friend to watch them.
            </p>
          </div>
        </div>
      </section>

      {/* Best Restaurants by Vibe */}
      <section
        style={{
          padding: "48px 24px",
          maxWidth: 960,
          margin: "0 auto",
          marginBottom: 48,
        }}
      >
        <h2 style={{ fontSize: 20, marginBottom: 24, fontWeight: 700 }}>
          Find Your Perfect Dining Experience
        </h2>
        <div style={{ display: "grid", gap: 20 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              🌊 Waterfront Dining
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Enjoy river views and ocean breezes. Stuart's waterfront restaurants offer
              stunning scenery and often have spacious patios perfect for dogs.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              🏙️ Downtown Casual
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Historic downtown Stuart is walkable and dog-friendly. Enjoy local vibes,
              street-side patios, and a community that loves dogs.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              🍔 Casual & Quick Bites
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Perfect for lunch or a quick bite. Many casual restaurants have outdoor
              seating and love dogs. Low pressure, high fun.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              🦞 Seafood Specialties
            </h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Martin County is famous for fresh seafood. Many seafood restaurants welcome
              dogs and have that laid-back coastal vibe.
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
          Explore More Dog-Friendly Spots
        </h2>
        <p style={{ opacity: 0.8, marginBottom: 24 }}>
          Restaurants are just the beginning. Discover dog-friendly beaches, parks,
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
          Tag us in your dining adventures! Use <strong>#DogFriendlyMartinCounty</strong>{" "}
          on Instagram and TikTok for a chance to be featured. 🐾
        </p>
      </section>
    </div>
  );
}
