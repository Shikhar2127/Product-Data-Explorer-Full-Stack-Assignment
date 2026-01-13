"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ProductsPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${slug}`)
      .then(res => setProducts(res.data));
  }, [slug]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => (
          <Link
            key={p.id}
            href={`/products/detail/${p.id}`}
            className="border p-2 rounded"
          >
            <img src={p.imageUrl} className="h-40 w-full object-cover" />
            <p className="mt-2 text-sm">{p.title}</p>
            <p className="font-bold">£{p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
