
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  const [basket, setBasket] = useState(() => {
    try {
      const savedBasket = localStorage.getItem('basket')
      return savedBasket ? JSON.parse(savedBasket) : []
    } catch {
      return []
    }
  })

  const [page, setPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Save the basket in browser local storage
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket))
  }, [basket])

  // Fetch products from AWS API Gateway
 useEffect(() => {
  fetch('https://x6vdt6btc5.execute-api.eu-west-2.amazonaws.com/products')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load products')
      }
      return response.json()
    })
    .then(data => {
      setProducts(data)
      setError(null)
    })
    .catch(error => {
      setError(error.message)
    })
}, [])

  // Calculate the basket total
  const total = basket.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )

  // Add a product or increase its quantity
  const addToBasket = (product) => {
    const existingProduct = basket.find(
      item => item.id === product.id
    )

    if (existingProduct) {
      setBasket(
        basket.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setBasket([...basket, { ...product, quantity: 1 }])
    }
  }

  // Change a product quantity
  const changeQuantity = (productId, amount) => {
    setBasket(
      basket
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  // Remove a product completely
  const removeFromBasket = (productId) => {
    setBasket(basket.filter(item => item.id !== productId))
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

            {!error && products.length === 0 && (
              <p>Loading products...</p>
            )}

            <div className="products">
              {products.map(product => (
                <div className="product-card" key={product.id}>
                  <img src={product.image} alt={product.name} />

                  <h2>{product.name}</h2>
                  <p>£{Number(product.price).toFixed(2)}</p>

                  <button onClick={() => addToBasket(product)}>
                    Add to Basket
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProduct(product)
                      setPage('product')
                    }}
                  >
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

            {basket.map(product => (
              <div key={product.id}>
                <p>
                  {product.name} × {product.quantity} - £
                  {(product.price * product.quantity).toFixed(2)}
                </p>

                <div className="quantity-controls">
                  <button
                    onClick={() => changeQuantity(product.id, -1)}
                    disabled={product.quantity <= 1}
                    aria-label={`Decrease ${product.name} quantity`}
                  >
                    −
                  </button>

                  <span>{product.quantity}</span>

                  <button
                    onClick={() => changeQuantity(product.id, 1)}
                    aria-label={`Increase ${product.name} quantity`}
                  >
                    +
                  </button>

                  <button onClick={() => removeFromBasket(product.id)}>
                    Remove
                  </button>
                </div>
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
              <h2>£{Number(selectedProduct.price).toFixed(2)}</h2>

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