import { useEffect, useState } from "react";
import axios from "axios";
import "./AddProducts.css";

function fetchProductStats() {
  return axios.get("http://localhost:5000/api/items/stats/summary");
}

const initialProduct = {
  name: "",
  sku: "",
  category: "",
  quantity: "",
  price: "",
  description: "",
};

function AddProducts() {
  const [product, setProduct] = useState(initialProduct);
  const [productStats, setProductStats] = useState(null);
  const [statsError, setStatsError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    fetchProductStats()
      .then(({ data }) => {
        if (isCurrent) {
          setProductStats(data.data);
          setStatsError("");
        }
      })
      .catch((error) => {
        console.error("Unable to load inventory summary:", error);
        if (isCurrent) {
          setStatsError("Inventory summary is currently unavailable.");
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((currentProduct) => ({ ...currentProduct, [name]: value }));
    setFeedback(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    try {
      await axios.post("http://localhost:5000/api/items", {
        ...product,
        quantity: Number(product.quantity),
        price: Number(product.price),
      });

      setFeedback({
        type: "success",
        message: `${product.name} was added to your inventory.`,
      });
      setProduct(initialProduct);
      fetchProductStats()
        .then(({ data }) => {
          setProductStats(data.data);
          setStatsError("");
        })
        .catch((error) => {
          console.error("Unable to refresh inventory summary:", error);
          setStatsError("Inventory summary could not be refreshed.");
        });
    } catch (error) {
      console.error("Unable to add product:", error);
      setFeedback({
        type: "error",
        message: "We couldn’t add this product. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  const stockLabel =
    product.quantity === ""
      ? "Stock level"
      : Number(product.quantity) === 0
        ? "Out of stock"
        : Number(product.quantity) < 10
          ? "Low stock"
          : "In stock";

  return (
    <main className="add-product-page">
      <div className="add-product-content">
        <header className="add-product-heading">
          <div>
            <p className="add-product-eyebrow">INVENTORY MANAGEMENT</p>
            <h1>Add a product</h1>
            <p>
              Create a product record and keep your inventory up to date.
            </p>
          </div>
          <span className="add-product-header-badge">
            <span aria-hidden="true" /> Inventory workspace
          </span>
        </header>

        <section className="add-product-stats" aria-label="Inventory summary">
          <article className="add-product-stat">
            <span className="add-product-stat-icon add-product-stat-icon-blue" aria-hidden="true">
              ◫
            </span>
            <div>
              <p>Total units</p>
              <strong>{productStats?.total_units ?? "—"}</strong>
            </div>
          </article>
          <article className="add-product-stat">
            <span className="add-product-stat-icon add-product-stat-icon-violet" aria-hidden="true">
              $
            </span>
            <div>
              <p>Inventory value</p>
              <strong>{productStats?.total_inventory_value ?? "—"}</strong>
            </div>
          </article>
          <article className="add-product-stat">
            <span className="add-product-stat-icon add-product-stat-icon-green" aria-hidden="true">
              ▤
            </span>
            <div>
              <p>Product types</p>
              <strong>{productStats?.total_items ?? "—"}</strong>
            </div>
          </article>
        </section>
        {statsError && (
          <p className="add-product-stats-error" role="status">
            {statsError}
          </p>
        )}

        <div className="add-product-layout">
          <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="add-product-form-heading">
              <div>
                <h2>Product information</h2>
                <p>Fields marked with <span>*</span> are required.</p>
              </div>
              <span className="add-product-step">01 / 03</span>
            </div>

            <section className="add-product-section" aria-labelledby="details-title">
              <div className="add-product-section-heading">
                <span className="add-product-section-icon" aria-hidden="true">▦</span>
                <div>
                  <h3 id="details-title">Basic details</h3>
                  <p>Give this product a name and category.</p>
                </div>
              </div>
              <div className="add-product-fields">
                <div className="add-product-field add-product-field-wide">
                  <label htmlFor="product-name">Product name <span>*</span></label>
                  <input
                    autoComplete="off"
                    id="product-name"
                    name="name"
                    onChange={handleChange}
                    placeholder="e.g. Everyday Ceramic Mug"
                    required
                    value={product.name}
                  />
                </div>
                <div className="add-product-field">
                  <label htmlFor="product-category">Category <span>*</span></label>
                  <input
                    id="product-category"
                    list="product-categories"
                    name="category"
                    onChange={handleChange}
                    placeholder="Choose or enter a category"
                    required
                    value={product.category}
                  />
                  <datalist id="product-categories">
                    <option value="Accessories" />
                    <option value="Beauty" />
                    <option value="Electronics" />
                    <option value="Furniture" />
                    <option value="Groceries" />
                    <option value="Home" />
                  </datalist>
                </div>
                <div className="add-product-field">
                  <label htmlFor="product-sku">
                    SKU <span className="add-product-optional">Optional</span>
                  </label>
                  <input
                    autoComplete="off"
                    id="product-sku"
                    name="sku"
                    onChange={handleChange}
                    placeholder="e.g. MUG-001"
                    value={product.sku}
                  />
                  <small>Use a unique code to find this item quickly.</small>
                </div>
              </div>
            </section>

            <section className="add-product-section" aria-labelledby="stock-title">
              <div className="add-product-section-heading">
                <span className="add-product-section-icon" aria-hidden="true">$</span>
                <div>
                  <h3 id="stock-title">Pricing &amp; stock</h3>
                  <p>Set a price and enter the available quantity.</p>
                </div>
              </div>
              <div className="add-product-fields">
                <div className="add-product-field">
                  <label htmlFor="product-price">Price <span>*</span></label>
                  <div className="add-product-input-prefix">
                    <span aria-hidden="true">$</span>
                    <input
                      id="product-price"
                      min="0"
                      name="price"
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                      step="0.01"
                      type="number"
                      value={product.price}
                    />
                  </div>
                </div>
                <div className="add-product-field">
                  <label htmlFor="product-quantity">Quantity <span>*</span></label>
                  <input
                    id="product-quantity"
                    min="0"
                    name="quantity"
                    onChange={handleChange}
                    placeholder="0"
                    required
                    step="1"
                    type="number"
                    value={product.quantity}
                  />
                </div>
              </div>
            </section>

            <section className="add-product-section add-product-description" aria-labelledby="description-title">
              <div className="add-product-section-heading">
                <span className="add-product-section-icon" aria-hidden="true">≡</span>
                <div>
                  <h3 id="description-title">Description</h3>
                  <p>Add any useful notes about this product.</p>
                </div>
              </div>
              <div className="add-product-field">
                <label htmlFor="product-description">
                  Product description <span className="add-product-optional">Optional</span>
                </label>
                <textarea
                  id="product-description"
                  name="description"
                  onChange={handleChange}
                  placeholder="Describe key details, materials, or other notes..."
                  rows="4"
                  value={product.description}
                />
              </div>
            </section>

            {feedback && (
              <p
                className={`add-product-feedback add-product-feedback-${feedback.type}`}
                role="status"
              >
                {feedback.message}
              </p>
            )}

            <div className="add-product-actions">
              <p><span>*</span> Required fields</p>
              <button
                className="add-product-submit"
                disabled={isSaving}
                type="submit"
              >
                {isSaving ? "Adding product..." : "Add product"}
                {!isSaving && <span aria-hidden="true">→</span>}
              </button>
            </div>
          </form>

          <aside className="add-product-preview" aria-label="Product preview">
            <div className="add-product-preview-top">
              <span>LIVE PREVIEW</span>
              <span className={`add-product-stock-badge ${stockLabel === "Out of stock" ? "is-empty" : stockLabel === "Low stock" ? "is-low" : ""}`}>
                <span aria-hidden="true" />
                {stockLabel}
              </span>
            </div>
            <div className="add-product-preview-art" aria-hidden="true">
              <span>✳</span>
            </div>
            <p className="add-product-preview-category">
              {product.category || "PRODUCT CATEGORY"}
            </p>
            <h2>{product.name || "Your product name"}</h2>
            <p className="add-product-preview-description">
              {product.description || "A short product description will appear here."}
            </p>
            <div className="add-product-preview-price">
              <span>Unit price</span>
              <strong>
                {product.price
                  ? `$${Number(product.price).toFixed(2)}`
                  : "$0.00"}
              </strong>
            </div>
            <div className="add-product-preview-meta">
              <div>
                <span>SKU</span>
                <strong>{product.sku || "Not set"}</strong>
              </div>
              <div>
                <span>Available</span>
                <strong>{product.quantity || "0"} units</strong>
              </div>
            </div>
            <p className="add-product-preview-note">
              Preview updates automatically as you fill in the form.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default AddProducts;
