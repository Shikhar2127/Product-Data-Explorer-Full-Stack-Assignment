"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/detail/${id}`)
      .then(res => setDetail(res.data));
  }, [id]);

  if (!detail) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Detail</h1>
      <p>{detail.description}</p>
    </div>
  );
}
