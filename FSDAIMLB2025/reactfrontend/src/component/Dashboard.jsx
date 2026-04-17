import React, { useState, useEffect } from "react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [user] = useState(() => ({
    name: localStorage.getItem("userName") || ""
  }));

  useEffect(() => {
    // Fetch products
    fetch("http://localhost:4007/data")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.msg);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });

    // Fetch cart
    fetch("http://localhost:4007/cart")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.cart || []);
        setCartCount(data.count || 0);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, [refreshTrigger]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:4007/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newProduct,
        price: parseFloat(newProduct.price),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Product added!");
        setShowForm(false);
        setNewProduct({ title: "", price: "", description: "", image: "" });
        // Refresh by triggering a re-fetch manually if needed, or just let the user refresh.
        // Or better, define fetchProducts globally or use a state trigger.
        // For now, let's use a simple state trigger.
        setRefreshTrigger(prev => prev + 1);
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  const addToCart = (product) => {
    fetch("http://localhost:4007/addToCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        setRefreshTrigger(prev => prev + 1); // Refresh cart items and count
        alert(`Added ${product.title} to cart! Total items: ${data.count}`);
      })
      .catch((err) => console.error("Error adding to cart:", err));
  };

  return (
    <div className="container mt-4">
      <div className="dashboard-header shadow-sm p-4 rounded mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="h3 mb-0">Product Dashboard</h1>
          <p className="text-muted mb-0">
            Logged in as: {user?.name || "Guest"}
          </p>
        </div>
        <div>
          <button
            className="btn btn-outline-primary position-relative px-4"
            onClick={() => setShowCart(true)}
          >
            <i className="bi bi-cart3 me-2"></i>Cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <button
          className="btn btn-success"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add New Product (Manual Entry)"}
        </button>
      </div>

      {showForm && (
        <div className="card p-4 mb-4 shadow">
          <h3>Manual Data Entry</h3>
          <form onSubmit={handleAddProduct}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                required
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://via.placeholder.com/150"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Product
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Fetching premium products...</p>
        </div>
      ) : products && products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm">
                <div
                  className="d-flex align-items-center justify-content-center p-3"
                  style={{ height: "200px" }}
                >
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title text-truncate"
                    title={product.title}
                  >
                    {product.title}
                  </h5>
                  <p className="card-text text-success fw-bold">
                    ${product.price}
                  </p>
                  <p className="card-text text-muted small flex-grow-1">
                    {product.description.substring(0, 60)}...
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn btn-warning w-100 mt-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h3 className="text-muted">No products found</h3>
          <p>Try manual entry or check your connection.</p>
        </div>
      )}

      {/* Cart Modal/Overlay */}
      {showCart && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="card shadow-lg w-75 h-75 overflow-auto">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Your Shopping Cart</h3>
              <button
                className="btn-close btn-close-white"
                onClick={() => setShowCart(false)}
              ></button>
            </div>
            <div className="card-body">
              {cartItems.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Title</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "contain",
                              }}
                            />
                          </td>
                          <td className="align-middle">{item.title}</td>
                          <td className="align-middle text-success fw-bold">
                            ${item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2" className="text-end fw-bold">
                          Total:
                        </td>
                        <td className="fw-bold text-primary">
                          $
                          {cartItems
                            .reduce(
                              (acc, item) => acc + parseFloat(item.price),
                              0,
                            )
                            .toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <p className="text-muted fs-4">Your cart is empty.</p>
                </div>
              )}
            </div>
            <div className="card-footer d-flex justify-content-end">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowCart(false)}
              >
                Close
              </button>
              <button
                className="btn btn-success"
                disabled={cartItems.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
