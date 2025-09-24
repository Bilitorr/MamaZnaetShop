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
loadProducts();


