"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function CategoriesPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    axios
      .get(`http://localhost:3001/api/categories/${slug}`)
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(cat => (
          <Link
            key={cat.id}
            href={`/products/${cat.slug}`}
            className="border p-4 rounded hover:bg-gray-100"
          >
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
