import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const res = await axios.get(`${base}/api/locations`);
        setLocations(res.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load locations');
      }
    }
    fetchLocations();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pacific Northwest Heritage Explorer</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {locations.map((loc) => (
          <Link key={loc.id} href={`/locations/${loc.id}`} className="block">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {loc.images && loc.images.card ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${loc.images.card}`}
                  alt={loc.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{loc.title}</h2>
                <p className="text-gray-600 text-sm">
                  {loc.description?.slice(0, 120)}
                  {loc.description && loc.description.length > 120 ? '…' : ''}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}