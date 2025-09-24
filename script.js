import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 👉 сюда вставь свои данные из Supabase (Settings → API)
const supabaseUrl = "https://noonqvygvomppqlnjbxr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vb25xdnlndm9tcHBxbG5qYnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NTI2OTEsImV4cCI6MjA3NDIyODY5MX0.okTdksHMpOBjR627G9vbWBToW0gyjXYP5-WLtkDanqw";

const supabase = createClient(supabaseUrl, supabaseKey);

async function loadProducts() {
  let { data: products, error } = await supabase
    .from("SkladMamaZnaet")
    .select("*");

  if (error) {
    console.error("Ошибка загрузки:", error);
    return;
  }

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${p.image_url || 'https://via.placeholder.com/150'}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description || ''}</p>
      <p><b>${p.price} ₸</b></p>
      <p>На складе: ${p.stock}</p>
      <button>Добавить в корзину</button>
    `;
    container.appendChild(card);
  });
}
export default function Script() {
  async function handleOrder() {
    const orderText = "Тестовый заказ: 2x Мыло Dove, 1x Памперсы"; // пока тест
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
      <h1 className="text-xl font-bold">Каталог товаров</h1>
      {/* здесь у тебя список товаров */}

      <button
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        onClick={handleOrder}
      >
        Оформить заказ
      </button>
    </div>
  );
}
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

loadProducts();




