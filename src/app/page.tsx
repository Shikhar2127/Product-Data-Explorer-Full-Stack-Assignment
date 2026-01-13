"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function HomePage() {
  const [nav, setNav] = useState<any[]>([]);

  useEffect(() => {
    api.get("/navigation").then(res => setNav(res.data));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Data Explorer</h1>

      <div className="grid grid-cols-2 gap-4">
        {nav.map(n => (
          <Link
            key={n.id}
            href={`/categories/${n.slug}`}
            className="p-4 bg-white rounded shadow hover:bg-gray-50"
          >
            {n.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
