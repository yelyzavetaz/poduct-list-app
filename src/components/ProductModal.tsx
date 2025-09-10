import { useState, useEffect } from "react";
import type { Product } from "../types/product";

interface ProductModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product) => void;
  initialProduct?: Product | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isModalOpen,
  onClose,
  onConfirm,
  initialProduct = null,
}) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [count, setCount] = useState<number>(1);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setImageUrl(initialProduct.imageUrl);
      setCount(initialProduct.count);
      setWidth(initialProduct.size.width);
      setHeight(initialProduct.size.height);
      setWeight(initialProduct.weight);
    } else {
      setName("");
      setImageUrl("");
      setCount(1);
      setWidth(0);
      setHeight(0);
      setWeight(0);
    }
  }, [initialProduct, isModalOpen]);

  const isValid =
    name.trim() &&
    imageUrl.trim() &&
    count > 0 &&
    width > 0 &&
    height > 0 &&
    weight > 0;

  const handleConfirm = () => {
    if (!isValid) return;
    const product: Product = {
      id: initialProduct?.id ?? Date.now(),
      name,
      imageUrl,
      count,
      size: { width, height },
      weight,
      comments: initialProduct?.comments ?? [],
    };
    onConfirm(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">
          {initialProduct ? "View/Edit Product" : "Add Product"}
        </h2>
        <label>
          Product name
          <input
            className="border rounded px-2 py-1 w-full mb-2"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Image URL
          <input
            className="border rounded px-2 py-1 w-full mb-2"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label>
          Product count
          <input
            className="border rounded px-2 py-1 w-full mb-2"
            type="number"
            min={1}
            placeholder="Count"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </label>
        <label>
          Product width
          <input
            className="border rounded px-2 py-1 w-full mb-2"
            type="number"
            min={1}
            placeholder="Width"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </label>
        <label>
          Product height
          <input
            className="border rounded px-2 py-1 w-full mb-2"
            type="number"
            min={1}
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </label>
        <label>
          Product weight
          <input
            className="border rounded px-2 py-1 w-full mb-4"
            type="number"
            min={1}
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </label>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-300" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={handleConfirm}
            disabled={!isValid}
          >
            {initialProduct ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};
