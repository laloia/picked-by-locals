import { supabase } from "@/lib/supabase";
import { Place } from "@/lib/types";
import PlaceCard from "@/components/PlaceCard";
import PlacesDirectory from "@/components/PlacesDirectory";

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
          padding: "96px 24px",
          backgroundImage: "url('https://vylcfzvavvbppfdvuebh.supabase.co/storage/v1/object/public/place-photos/Mollybeach.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
          width: "100vw",
          maxWidth: "100vw",
          minHeight: "400px",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          overflow: "hidden",
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
        
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto", padding: "0 24px"  }}>
          <h1 style={{ fontSize: 42, marginBottom: 8, color: "white" }}>
            Find dog-friendly spots in Martin County
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 24, color: "white" }}>
          Discover the best beaches, waterfront restaurants, breweries, coffee shops, parks, and hidden gems—all personally verified by local dog owners.
          </p>
        
          
            <a href="/map"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#1d9e75",
              color: "white",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Browse the map
          </a>
        </div>
      </section>
      <section style={{ 
        marginBottom: 48,
        background: "linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%)",
        borderRadius: 16,
        //borderLeft: "4px solid #1d9e75",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        padding: "32px 0",
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
      <section style={{ marginBottom: 32, padding: 24, background: "#f6f6f4", borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>About this guide</h2>
        <p style={{ lineHeight: 1.6, opacity: 0.85 }}>
        We don't list every place with a dog bowl and outdoor seating. Picked by Locals features only spots where dogs are genuinely welcome—places where the staff loves dogs, the environment is designed for them, and your pup will have as good a time as you do.        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>All places</h2>
        <PlacesDirectory />
      </section>
    </div>
  );
}