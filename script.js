import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Берём ключи из переменных окружения Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function loadProducts() {
  const { data, error } = await supabase.from("SkladMamaZnaet").select("*")

  if (error) {
    console.error("Ошибка загрузки:", error)
    document.getElementById("products").innerText = "Ошибка загрузки товаров"
    return
  }

  const container = document.getElementById("products")
  container.innerHTML = ""

  data.forEach(item => {
    const card = document.createElement("div")
    card.className = "product-card"
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>Цена: ${item.price} тг</p>
      <button onclick="alert('Заказ: ${item.name} за ${item.price} тг')">Заказать</button>
    `
    container.appendChild(card)
  })
}

window.onload = loadProducts


