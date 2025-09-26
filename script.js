import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔑 ВСТАВЬ СВОИ ДАННЫЕ
const supabaseUrl = "https://noonqvygvomppqlnjbxr.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vb25xdnlndm9tcHBxbG5qYnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NTI2OTEsImV4cCI6MjA3NDIyODY5MX0.okTdksHMpOBjR627G9vbWBToW0gyjXYP5-WLtkDanqw"

// Создаем клиент
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

  if (!data || data.length === 0) {
    container.innerText = "Товары пока отсутствуют"
    return
  }

  data.forEach(item => {
    const card = document.createElement("div")
    card.className = "product-card"
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>Цена: ${item.price} тг</p>
      <p>В наличии: ${item.quantity}</p>
      <button onclick="alert('Заказ: ${item.name} за ${item.price} тг')">Заказать</button>
    `
    container.appendChild(card)
  })
}

window.onload = loadProducts


