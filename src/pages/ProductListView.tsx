import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // <-- Add this import
import { ProductModal } from "./ProductModal";
import type { Product } from "../types/product";
import type { AppDispatch, RootState } from "../context/store";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
} from "../features/products/productsSlice";

export const ProductListView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddClick = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleConfirm = (product: Product) => {
    if (!selectedProduct) {
      dispatch(
        addProduct({
          name: product.name,
          imageUrl: product.imageUrl,
          count: product.count,
          size: product.size,
          weight: product.weight,
          comments: [],
        })
      );
    }
  };

  const handleDelete = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddClick}
        >
          + Add Product
        </button>
      </div>

      {isModalOpen && (
        <ProductModal
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          initialProduct={selectedProduct}
        />
      )}

      {products.length === 0 ? (
        <p className="text-gray-500">
          No products yet. Add your first product!
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="border rounded p-4 flex flex-col justify-between cursor-pointer"
              onClick={() => handleProductClick(product)} // <-- Add this
            >
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">Count: {product.count}</p>
              </div>
              <button
                className="bg-red-400 text-white px-4 py-2 rounded"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when deleting
                  handleDelete(product.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
