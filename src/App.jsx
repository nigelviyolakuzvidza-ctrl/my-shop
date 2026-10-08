import { useState, useEffect } from 'react'
import './App.css'
function App() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [basket, setBasket] = useState(() => {
  const savedBasket = localStorage.getItem('basket')
  return savedBasket ? JSON.parse(savedBasket) : []
})
  useEffect(() => {
  localStorage.setItem('basket', JSON.stringify(basket))
}, [basket])
useEffect(() => {
  fetch('http://localhost:3000/products')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load products')
      }

      return response.json()
    })
    .then(data => setProducts(data))
    .catch(error => setError(error.message))
}, [])
const [page, setPage] = useState('home')
const [selectedProduct, setSelectedProduct] = useState(null)
 
const total = basket.reduce(
  (sum, product) => sum + product.price * product.quantity,
  0
)
const addToBasket = (product) => {
  const existingProduct = basket.find(
    (item) => item.id === product.id
  )

  if (existingProduct) {
    const updatedBasket = basket.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )

    setBasket(updatedBasket)
  } else {
    setBasket([...basket, { ...product, quantity: 1 }])
  }
}
  return (
    <div>
    <nav>
  <button onClick={() => setPage('home')}>Home</button>
  <button onClick={() => setPage('products')}>Products</button>
  <button onClick={() => setPage('about')}>About</button>
  <button onClick={() => setPage('basket')}>
  Basket ({basket.reduce((sum, product) => sum + product.quantity, 0)})
  </button>
</nav> 

      <main>
      {page === 'home' && (
  <div>
    <h1>My Shop</h1>
    <p>Welcome to my online store.</p>
   <button onClick={() => setPage('products')}>
  Shop Now
</button> 
  </div>
)}
{page === 'products' && (
  <div>
    {error && <p>{error}</p>}

    <div className="products">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} />

          <h2>{product.name}</h2>

          <p>£{product.price}</p>

          <button onClick={() => addToBasket(product)}>
            Add to Basket
          </button>

          <button onClick={() => {
            setSelectedProduct(product)
            setPage('product')
          }}>
            View Details
          </button>
        </div>
      ))}
    </div>
  </div>
)}
{page === 'basket' && (
  <div>
    <h2>Your Basket</h2>
{basket.length === 0 && (
  <div>
    <p>Your basket is empty.</p>

    <button onClick={() => setPage('products')}>
      Continue Shopping
    </button>
  </div>
)}
    {basket.map((product, index) => (
      <div key={product.id}>
        <p>
  {product.name} × {product.quantity} - £{(product.price * product.quantity).toFixed(2)}
</p>
<div className="quantity-controls">
  {/* your − button */}
  {/* your + button */}
  {/* your Remove button */}
</div>
<button onClick={() => {
  if (product.quantity > 1) {
    const updatedBasket = basket.map((item, i) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )

    setBasket(updatedBasket)
  }
}}>
  −
</button>
<button onClick={() => {
  const updatedBasket = basket.map((item, i) =>
    item.id === product.id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  )

  setBasket(updatedBasket)
}}>
  +
</button>

        <button onClick={() => {
  if (product.quantity > 1) {
    const updatedBasket = basket.map((item, i) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )

    setBasket(updatedBasket)
  } else {
    const newBasket = basket.filter((_, i) => i !== index)
    setBasket(newBasket)
  }
}}>
  Remove
</button>
      </div>
    ))}

    <p>Total: £{total.toFixed(2)}</p>
  </div>
)}
{page === 'about' && (
  <div>
    <h1>About My Shop</h1>
    <p>
      Welcome to My Shop. We sell quality technology products
      at affordable prices.
    </p>
  </div>
)}
{page === 'product' && selectedProduct && (
<div className="product-details">
  <div className="product-details-image">
    <img
      src={selectedProduct.image}
      alt={selectedProduct.name}
    />
  </div>

  <div className="product-details-info">
    <h1>{selectedProduct.name}</h1>
    <h2>£{selectedProduct.price}</h2>

    <p>
      High-quality technology product from My Shop.
    </p>

    <button onClick={() => addToBasket(selectedProduct)}>
      Add to Basket
    </button>

    <button onClick={() => setPage('products')}>
      Back to Products
    </button>
  </div>
</div>
)}
      </main>
    </div>
  )
}


export default App