export default async function sitemap() {
    const places = await fetch('https://vylcfzvavvbppfdvuebh.supabase.co/rest/v1/places?county=eq.martin&select=id', {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      },
    })
      .then(res => res.json())
      .catch(() => [])
  
    const placeUrls = places.map((place: any) => ({
      url: `https://pickedbylocals.com/places/${place.id}`,
      lastModified: new Date(),
      priority: 0.6,
    }))
  
    return [
      {
        url: 'https://pickedbylocals.com',
        lastModified: new Date(),
        priority: 1.0,
      },
      {
        url: 'https://pickedbylocals.com/martin-county/dog-friendly',
        lastModified: new Date(),
        priority: 0.9,
      },
      {
        url: 'https://pickedbylocals.com/map',
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: 'https://pickedbylocals.com/submit',
        lastModified: new Date(),
        priority: 0.7,
      },
      ...placeUrls,
    ]
  }