import { supabase } from "@/lib/supabase";
import { Place } from "@/lib/types";
import PlaceCard from "@/components/PlaceCard";
import PlacesDirectory from "@/components/PlacesDirectory";
import { Suspense } from "react";

export const revalidate = 60;

async function getFeaturedPlaces(): Promise<Place[]> {
  const { data, error } = await supabase
    .from("places")
    .select("*")
    .eq("county", "martin")
    .eq("featured", true)
    .limit(3);

  if (error) {
    console.error(error);
    return [];
  }
  return data as Place[];
}

export default async function HomePage() {
  const featured = await getFeaturedPlaces();

  return (
    <div>
       <section style={{ 
  textAlign: "center", 
  padding: "60px 0",
  backgroundImage: "url('https://vylcfzvavvbppfdvuebh.supabase.co/storage/v1/object/public/place-photos/Mollybeach.jpg')",
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
}}>
        {/* Dark overlay for text readability */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.3)",
        }} />
        
        <div style={{ 
    position: "relative", 
    zIndex: 1, 
    width: "100%",
    maxWidth: "1200px",
    padding: "0 24px",
    boxSizing: "border-box",
  }}>
    <h1 style={{ 
      fontSize: "clamp(24px, 8vw, 42px)", 
      marginBottom: 16, 
      color: "white",
    }}>
      Find dog-friendly spots in Martin County
    </h1>
    <p style={{ 
      opacity: 0.9, 
      marginBottom: 24, 
      color: "white",
      fontSize: "clamp(14px, 4vw, 16px)",
    }}>
      Discover the best beaches, waterfront restaurants, breweries, coffee shops, parks, and hidden gems—all personally verified by local dog owners.
    </p>
    <a href="/martin-county/dog-friendly"
      style={{
        display: "inline-block",
        padding: "12px 24px",
        background: "#1d9e75",
        color: "white",
        borderRadius: 8,
        textDecoration: "none",
        marginBottom: 32,
        whiteSpace: "nowrap",
      }}
    >
      Browse the map
    </a>

            {/* Category Shortcuts */}
    <div style={{ 
      display: "flex", 
      flexWrap: "wrap", 
      gap: 8, 
      justifyContent: "center",
      width: "100%",
    }}>
  <a href="/martin-county/dog-friendly?category=beach" style={{ padding: "10px 16px", background: "rgba(255,255,255,0.2)", color: "white", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, backdropFilter: "blur(10px)" }}>🏖️ Beaches</a>
  <a href="/martin-county/dog-friendly?category=coffee_shop" style={{ padding: "10px 16px", background: "rgba(255,255,255,0.2)", color: "white", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, backdropFilter: "blur(10px)" }}>☕ Coffee</a>
  <a href="/martin-county/dog-friendly?category=brewery" style={{ padding: "10px 16px", background: "rgba(255,255,255,0.2)", color: "white", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, backdropFilter: "blur(10px)" }}>🍺 Breweries</a>
  <a href="/martin-county/dog-friendly?category=restaurant" style={{ padding: "10px 16px", background: "rgba(255,255,255,0.2)", color: "white", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, backdropFilter: "blur(10px)" }}>🥘  Restaurants</a>
  <a href="/martin-county/dog-friendly?category=park" style={{ padding: "10px 16px", background: "rgba(255,255,255,0.2)", color: "white", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, backdropFilter: "blur(10px)" }}>🌳 Parks</a>
</div>
        </div>
      </section>
      <section style={{ 
        marginBottom: 0,
        background: "linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%)",
        borderRadius: 16,
        //borderLeft: "4px solid #1d9e75",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        padding: "42px 0",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>⭐</span>
              <h2 style={{ fontSize: 24, margin: 0, fontWeight: 700, color: "#1d9e75" }}>Featured Places</h2>
            </div>
            <p style={{ margin: 0, opacity: 0.7, fontSize: 14 }}>Highly rated and verified by our community</p>
          </div>
          
          {featured.length === 0 ? (
            <p style={{ opacity: 0.6 }}>
              No featured listings yet — mark some as featured in Supabase to see them here.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
               {featured.map((place) => (
                
                <div key={place.id} style={{ position: "relative" }}>
                  
                 {/* <div style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "#1d9e75",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    zIndex: 10,
                  }}>
                    Featured
                </div> */}
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          )}
        </div>
        
      </section>

      <div style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "48px 0",
  gap: 12,
}}>
  <div style={{ flex: 1, height: 1, background: "#e5e7eb" }}/>
  <span style={{ fontSize: 20, opacity: 0.6 }}>🐾</span>
  <div style={{ flex: 1, height: 1, background: "#e5e7eb" }}/>
</div>
     

      <section style={{
  marginBottom: 48,
  marginTop: 0,
  padding: "48px 24px",
  background: "linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%)",
  width: "100vw",
  marginLeft: "calc(-50vw + 50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}}>
   
  <div style={{
    maxWidth: 1200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 48,
    padding: "0 24px",
  }}>
    {/* Molly's photo - Left side */}
    <div style={{
      flex: "0 0 300px",
      display: "flex",
      justifyContent: "center",
    }}>
      <img
        src="https://vylcfzvavvbppfdvuebh.supabase.co/storage/v1/object/public/place-photos/molly.jpg"
        alt="Molly - Local Tour Guide"
        style={{
          width: 280,
          height: 280,
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid #1d9e75",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      />
    </div>

    {/* Copy - Right side */}
    <div style={{
      flex: 1,
      textAlign: "left",
    }}>
      <h2 style={{ fontSize: 28, marginBottom: 24, fontWeight: 700, color: "#1d9e75", marginTop: 0 }}>
        Meet Your Local Tour Guide
      </h2>
      
      <h3 style={{ fontSize: 24, marginBottom: 16, color: "#1f2937", marginTop: 0 }}>
        Molly 🐾
      </h3>
      <p style={{ 
        fontSize: 16, 
        lineHeight: 1.8, 
        color: "#4b5563",
        marginBottom: 16,
      }}>
        Meet Molly, a local Martin County pup with impeccable taste in dog-friendly spots. After years of exploring beaches, breweries, restaurants, and parks across the Treasure Coast, Molly knows exactly where dogs are truly welcome—and where the best treats are hidden.
      </p>
      <p style={{ 
        fontSize: 16, 
        lineHeight: 1.8, 
        color: "#4b5563",
        marginBottom: 0,
      }}>
        Every place on Picked by Locals has been personally tested by Molly and verified by local dog owners who share her passion for finding spots where pups are genuinely loved. We don't list every place with a dog bowl—we only feature locations where your dog will have as good a time as you do.
      </p>
    </div>
  </div>
</section>





      <section id="all-places">
  <h2 style={{ fontSize: 20, marginBottom: 16 }}>All places</h2>
  <Suspense fallback={<div>Loading places...</div>}>
    <PlacesDirectory />
  </Suspense>
</section>
    </div>
  );
}