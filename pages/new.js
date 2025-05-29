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
      await axios.post('http://localhost:3000/api/ads', form);
      router.push('/');
    } catch {
      alert('Fehler beim Erstellen der Anzeige');
    }
  };

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Neue Anzeige</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... alle Formularfelder ... */}
      </form>
      <div className="mt-4">
        <Link href="/" className="text-gray-600 hover:underline">
          ← Zurück zur Liste
        </Link>
      </div>
    </main>
  );
}

