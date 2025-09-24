"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Script() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("SkladMamaZnaet").select("*");
    if (error) {
      console.error(error);
    } else {
      setProducts(data);
    }
  }

  async function handleOrder() {
    const orderText = products.map(p => `${p.name} — ${p.price}₸ (ост. ${p.quantity})`).join("\n");

    await fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
        text: `Новый заказ 🛒\n\n${orderText}`
      })
    });

    alert("Заказ отправлен менеджеру в Telegram ✅");
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Каталог товаров</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border rounded p-3 shadow">
            <img src={p.image_url} alt={p.name} className="w-full h-40 object-cover mb-2 rounded" />
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p>{p.price} ₸</p>
            <p className="text-sm text-gray-500">В наличии: {p.quantity}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleOrder}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Оформить заказ
      </button>
    </div>
  );
}
