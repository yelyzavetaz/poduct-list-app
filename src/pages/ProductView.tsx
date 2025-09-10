import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../context/store";
import {
  fetchProductById,
  updateProduct,
  fetchProductComments,
  addProductComment,
  deleteProductComment,
} from "../features/products/productsSlice";
import { ProductModal } from "./ProductModal";
import type { Product } from "../types/product";
import type { Comment } from "../types/comment";

export const ProductView = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector(
    (state: RootState) => state.products.currentProduct
  );
  const loading = useSelector((state: RootState) => state.products.loading);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
      dispatch(fetchProductComments(Number(id)));
    }
  }, [dispatch, id]);

  const handleEdit = (updated: Product) => {
    if (id) {
      dispatch(
        updateProduct({
          id: Number(id),
          changes: {
            name: updated.name,
            imageUrl: updated.imageUrl,
            count: updated.count,
            size: updated.size,
            weight: updated.weight,
            comments: [],
          },
        })
      );
      setIsEditOpen(false);
    }
  };

  const handleAddComment = () => {
    if (id && commentText.trim()) {
      dispatch(
        addProductComment({ productId: Number(id), descriprion: commentText })
      );
      setCommentText("");
    }
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteProductComment(commentId));
  };

  if (loading || !product) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <p>Loading...</p>
        <button className="mt-4 text-blue-600" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button className="mb-4 text-blue-600" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="flex gap-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-48 h-48 object-cover rounded border"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p>
            <b>Count:</b> {product.count}
          </p>
          <p>
            <b>Size:</b> {product.size.width} x {product.size.height}
          </p>
          <p>
            <b>Weight:</b> {product.weight}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setIsEditOpen(true)}
          >
            Edit
          </button>
        </div>
      </div>

      {isEditOpen && (
        <ProductModal
          isModalOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onConfirm={handleEdit}
          initialProduct={product}
        />
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <div className="flex gap-2 mb-4">
          <input
            className="border rounded px-2 py-1 flex-1"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded"
            onClick={handleAddComment}
            disabled={!commentText.trim()}
          >
            Add
          </button>
        </div>
        {!product.comments || product.comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-2">
            {product.comments.map((c: Comment) => (
              <li
                key={c.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{c.description}</span>
                <button
                  className="text-red-500 text-sm"
                  onClick={() => handleDeleteComment(c.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
