import { supabase } from "@/lib/supabase";
import { Place, PlacePhoto } from "@/lib/types";
import { notFound } from "next/navigation";
import PlaceMap from "@/components/PlaceMap";

export async function generateMetadata({ params }: any) {
  const place = await getPlace(params.id);
  if (!place) return { title: "Place not found" };

  return {
    title: `${place.name} - Dog-Friendly in Martin County | Picked by Locals`,
    description: place.description || `Find dog-friendly information about ${place.name} in ${place.county} County, Florida.`,
    openGraph: {
      title: place.name,
      description: place.description,
      url: `https://pickedbylocals.com/places/${place.id}`,
    },
  };
}

async function getPlace(id: string): Promise<Place | null> {
  const { data, error } = await supabase
    .from("places_with_coords")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as Place;
}

async function getPlacePhotos(placeId: string): Promise<PlacePhoto[]> {
  const { data, error } = await supabase
    .from("place_photos")
    .select("*")
    .eq("place_id", placeId)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data as PlacePhoto[];
}

export default async function PlaceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const place = await getPlace(params.id);
  if (!place) return notFound();

  const photos = await getPlacePhotos(params.id);

  return (
    <article style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
      {/* Hero Section */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          marginBottom: 16,
        }}>
          <div>
            <div style={{ 
              fontSize: 12, 
              opacity: 0.6, 
              textTransform: "capitalize",
              letterSpacing: "0.5px",
              fontWeight: 600,
              color: "#1d9e75",
              marginBottom: 8,
            }}>
              {place.category.replace("_", " ")} · {place.county.replace("_", " ")} county
            </div>
            {place.logo_url && (
  <div style={{ marginBottom: 24 }}>
    <img 
      src={place.logo_url} 
      alt={place.name}
      style={{
        maxWidth: 200,
        height: "auto",
        borderRadius: 8,
      }}
    />
  </div>
)}

            <h1 style={{ 
              fontSize: 42, 
              margin: 0, 
              fontWeight: 700,
              lineHeight: 1.2,
            }}>
              {place.name}
            </h1>
          </div>
        </div>
        
        <p style={{ 
          opacity: 0.7, 
          fontSize: 16,
          margin: "8px 0 0 0",
        }}>
          {place.address}
        </p>
      </div>

   

      {place.description && (
        <div style={{ 
          marginBottom: 32, 
          fontSize: 16, 
          lineHeight: 1.6,
          padding: "24px",
          background: "#f9fafb",
          borderRadius: 12,
          borderLeft: "4px solid #1d9e75",
        }}>
          {place.description}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ 
        display: "flex", 
        gap: 12, 
        marginBottom: 32, 
        flexWrap: "wrap",
      }}>
        {place.phone && (
          <a href={`tel:${place.phone}`} style={{
            padding: "12px 24px",
            background: "#1d9e75",
            color: "white",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
          }}>
            📞 Call
          </a>
        )}
        {place.website && (
          <a href={place.website} target="_blank" rel="noreferrer" style={{
            padding: "12px 24px",
            background: "#f3f4f6",
            color: "#1d9e75",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
            border: "1px solid #d1d5db",
          }}>
            🌐 Website
          </a>
        )}
        {place.lng && place.lat && (
          <a href={`https://maps.google.com/?q=${place.lat},${place.lng}`} target="_blank" rel="noreferrer" style={{
            padding: "12px 24px",
            background: "#f3f4f6",
            color: "#1d9e75",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
            border: "1px solid #d1d5db",
          }}>
            📍 Directions
          </a>
        )}
      </div>

      {/* Dog Policy Section */}
      <section style={{
        marginBottom: 32,
        padding: 24,
        background: "#f0fdf4",
        borderRadius: 12,
        border: "1px solid #dcfce7",
      }}>
        <h2 style={{ 
          fontSize: 20, 
          marginTop: 0,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          🐕 Dog Policy
        </h2>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>
          {place.dog_policy}
        </p>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          fontSize: 14,
        }}>
          {place.leash_required !== null && (
            <div style={{ padding: 12, background: "white", borderRadius: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 4, color: "#1d9e75" }}>Leash Required</div>
              <div>{place.leash_required ? "✅ Yes" : "✅ No"}</div>
            </div>
          )}
          {place.dogs_allowed_indoors !== null && (
            <div style={{ padding: 12, background: "white", borderRadius: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 4, color: "#1d9e75" }}>Allowed Indoors</div>
              <div>{place.dogs_allowed_indoors ? "✅ Yes" : "❌ No"}</div>
            </div>
          )}
          {place.water_access && (
            <div style={{ padding: 12, background: "white", borderRadius: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 4, color: "#1d9e75" }}>Water Access</div>
              <div>{place.water_access}</div>
            </div>
          )}
          {place.fee && (
            <div style={{ padding: 12, background: "white", borderRadius: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 4, color: "#1d9e75" }}>Fee</div>
              <div>{place.fee}</div>
            </div>
          )}
        </div>
      </section>

      {/* Hours & Contact Section */}
      {(place.hours || place.phone || place.website) && (
        <section style={{
          marginBottom: 32,
          padding: 24,
          background: "#f9fafb",
          borderRadius: 12,
          border: "1px solid #e5e7eb",
        }}>
          <h2 style={{ fontSize: 20, marginTop: 0, marginBottom: 16 }}>Details</h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 16,
            fontSize: 14,
          }}>
            {place.hours && (
  <div>
    <div style={{ fontWeight: 600, marginBottom: 8, color: "#1d9e75" }}>⏰ Hours</div>
    <div style={{ 
      fontSize: 14, 
      lineHeight: 1.8,
      whiteSpace: "pre-wrap",
    }}>
      {place.hours.split(" | ").map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
    </div>
  </div>
)}
            {place.phone && (
              <div>
                <div style={{ fontWeight: 600, marginBottom: 8, color: "#1d9e75" }}>📞 Phone</div>
                <a href={`tel:${place.phone}`} style={{ color: "#1d9e75", textDecoration: "none" }}>
                  {place.phone}
                </a>
              </div>
            )}
            {place.website && (
              <div>
                <div style={{ fontWeight: 600, marginBottom: 8, color: "#1d9e75" }}>🌐 Website</div>
                <a href={place.website} target="_blank" rel="noreferrer" style={{ color: "#1d9e75", textDecoration: "none", wordBreak: "break-all" }}>
                  Visit website
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Photos Section */}
      {photos.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 16 }}>📸 Photos</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 280px)",
              gap: 16,
            }}
          >
            {photos.map((photo) => (
              <div key={photo.id} style={{ borderRadius: 12, overflow: "hidden" }}>
                <img
                  src={photo.url}
                  alt={photo.caption || place.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {photo.caption && (
                  <p style={{ fontSize: 13, opacity: 0.6, margin: "8px 0 0 0" }}>
                    {photo.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

{photos.length > 0 && (
  <section style={{ 
    marginTop: 24,
    padding: "20px",
    background: "#f0fdf4",
    borderRadius: 8,
    textAlign: "center",
  }}>
    <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>
      Have a photo of this place? Use the hashtag on Instagram or TikTok <strong>#DogFriendlyMartinCounty</strong>
    </p>
  </section>
)}

      {/* Map Section */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16 }}>📍 Location</h2>
        <PlaceMap place={place} />
      </section>

      {/* Footer */}
      {place.last_verified_date && (
        <p style={{ 
          marginTop: 24, 
          fontSize: 12, 
          opacity: 0.5,
          textAlign: "center",
          paddingTop: 24,
          borderTop: "1px solid #e5e7eb",
        }}>
          Last verified {place.last_verified_date}
        </p>
      )}
    </article>
  );
}