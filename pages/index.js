import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    axios.get(`${apiBase}/api/ads`)
      .then(res => setAds(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Anzeigen</h1>
        <Link href="/new" className="text-blue-600 hover:underline">
          + Neue Anzeige
        </Link>
      </div>

      {ads.length === 0 ? (
        <p className="text-gray-500">Keine Anzeigen verfügbar.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {ads.map(ad => (
            <li key={ad._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{ad.title}</h2>
              <p className="text-gray-700 mb-4">{ad.description}</p>
              <p className="text-sm text-gray-500">Verkäufer: {ad.sellerType}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

