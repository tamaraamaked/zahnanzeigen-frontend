import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NewAd() {
  const router = useRouter();
  const [form, setForm] = useState({
    sellerType: 'Student',
    title: '',
    description: '',
    sellerContact: { email: '', phone: '' }
  });

  const handleChange = e => {
    const { name, value } = e.target;
    if (name.startsWith('sellerContact.')) {
      const key = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        sellerContact: { ...prev.sellerContact, [key]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      await axios.post(`${apiBase}/api/ads`, form);
      router.push('/');
    } catch {
      alert('Fehler beim Erstellen der Anzeige');
    }
  };

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Neue Anzeige</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Seller Type */}
        <div>
          <label className="block mb-1">Typ</label>
          <select
            name="sellerType"
            value={form.sellerType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Student</option>
            <option>Praxis</option>
            <option>Labor</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1">Titel</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Beschreibung</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Kontakt (E-Mail) */}
        <div>
          <label className="block mb-1">Kontakt (E-Mail)</label>
          <input
            name="sellerContact.email"
            value={form.sellerContact.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Anzeige erstellen
        </button>
      </form>

      <div className="mt-4">
        <Link href="/" className="text-gray-600 hover:underline">
          ← Zurück zur Liste
        </Link>
      </div>
    </main>
  );
}

