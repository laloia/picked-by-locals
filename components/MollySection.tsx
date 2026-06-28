"use client";

export default function MollySection() {
  return (
    <section style={{
      marginBottom: 48,
      padding: "48px 0",
      background: "linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%)",
      width: "100vw",
      marginLeft: "calc(-50vw + 50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>
      <style>{`
        @media (max-width: 768px) {
          .molly-container {
            flex-direction: column !important;
            gap: 24px !important;
          }
          .molly-image-wrapper {
            flex: 1 !important;
          }
          .molly-photo {
            width: 200px !important;
            height: 200px !important;
          }
          .molly-text {
            text-align: center !important;
          }
        }
      `}</style>
      
      <div style={{
        maxWidth: 1200,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 48,
        padding: "0 24px",
        boxSizing: "border-box",
      }} className="molly-container">
        {/* Molly's photo - Left side */}
        <div style={{
          flex: "0 0 300px",
          display: "flex",
          justifyContent: "center",
        }} className="molly-image-wrapper">
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
            className="molly-photo"
          />
        </div>

        {/* Copy - Right side */}
        <div style={{
          flex: 1,
          textAlign: "left",
        }} className="molly-text">
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
  );
}