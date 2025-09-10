import type { Product } from "../types/product";

interface ProductListItemProps {
  product: Product;
  onClick: (product: Product) => void;
  onDelete: (product: Product, e: React.MouseEvent) => void;
}

export const ProductListItem = ({
  product,
  onClick,
  onDelete,
}: ProductListItemProps) => (
  <li className="border rounded p-4 flex flex-col justify-between cursor-pointer">
    <div onClick={() => onClick(product)}>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">Count: {product.count}</p>
    </div>
    <button
      className="bg-red-400 text-white px-4 py-2 rounded cursor-pointer"
      onClick={(e) => onDelete(product, e)}
    >
      Delete
    </button>
  </li>
);
