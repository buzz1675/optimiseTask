import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (isInitial = false) => {
    if (!isInitial) setLoading(true);
    try {
      const response = await fetch(
        `/api/products?code=${code}&description=${desc}`,
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        await fetchProducts();
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchProducts();
  };

  return (
    <div className="container">
      <header>
        <h1>Product Inventory</h1>
        <p>Optimise Technical Task — Database Search</p>
      </header>

      <section className="search-card">
        <form onSubmit={handleSearch} className="search-form">
          <div className="input-group">
            <label>Product Code</label>
            <input
              placeholder="e.g. HT"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Description</label>
            <input
              placeholder="e.g. DAVOS"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? "Searching..." : "Search Products"}
          </button>
        </form>
      </section>

      <section className="table-container">
        {loading ? (
          <div className="loader">Loading results...</div>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Description</th>
                <th>Model</th>
                <th>Group</th>
                <th>Stock Level</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p, i) => (
                  <tr key={i}>
                    <td>
                      <strong>{p.code}</strong>
                    </td>
                    <td>{p.description}</td>
                    <td>{p.model}</td>
                    <td>
                      <span className="badge">{p.productGroup}</span>
                    </td>
                    <td className={p.stockLevel < 10 ? "low-stock" : ""}>
                      {p.stockLevel}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No products found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;
