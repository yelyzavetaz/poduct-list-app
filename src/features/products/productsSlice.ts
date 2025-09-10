import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import type { Comment } from "../../types/comment";
import {
  apiGetProducts,
  apiCreateProduct,
  apiDeleteProduct,
  apiGetProductById,
  apiUpdateProduct,
  apiGetComments,
  apiAddComment,
  apiDeleteComment,
} from "../../api/products";

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await apiGetProducts();
    return response;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (payload: Omit<Product, "id">) => {
    const response = await apiCreateProduct(payload);
    return response as Product;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    await apiDeleteProduct(id);
    return id;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number) => {
    const response = await apiGetProductById(id);
    return response as Product;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, changes }: { id: number; changes: Omit<Product, "id"> }) => {
    const response = await apiUpdateProduct(id, changes);
    return response as Product;
  }
);

export const fetchProductComments = createAsyncThunk(
  "products/fetchProductComments",
  async (productId: number) => {
    const response = await apiGetComments(productId);
    return response;
  }
);

export const addProductComment = createAsyncThunk(
  "products/addComment",
  async ({
    productId,
    descriprion,
  }: {
    productId: number;
    descriprion: string;
  }) => {
    const response = await apiAddComment(productId, descriprion);
    return response;
  }
);

export const deleteProductComment = createAsyncThunk(
  "products/deleteComment",
  async (commentId: number) => {
    await apiDeleteComment(commentId);
    return commentId;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.products.unshift(action.payload);
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      });
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.products = state.products.filter(
            (p) => p.id !== action.payload
          );
          if (state.currentProduct?.id === action.payload) {
            state.currentProduct = null;
          }
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      });
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentProduct = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.currentProduct = action.payload;
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load product";
      });
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          if (state.currentProduct?.id === action.payload.id) {
            state.currentProduct = action.payload;
          }
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      });

    builder
      .addCase(fetchProductComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loading = false;
          if (state.currentProduct) {
            state.currentProduct.comments = action.payload;
          }
        }
      )
      .addCase(fetchProductComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
    builder
      .addCase(addProductComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addProductComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.loading = false;
          state.currentProduct?.comments.unshift(action.payload);
        }
      )
      .addCase(addProductComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      });
    builder
      .addCase(deleteProductComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProductComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          if (state.currentProduct) {
            state.currentProduct.comments =
              state.currentProduct.comments.filter(
                (p) => p.id !== action.payload
              );
          }
        }
      )
      .addCase(deleteProductComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      });
  },
});

export default productsSlice.reducer;
