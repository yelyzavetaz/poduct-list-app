import type { Product } from "../types/product";
import type { Comment } from "../types/comment";

const BASE_URL =
  import.meta.env?.VITE_API_URL ??
  "https://yelyzavetaz.website/projects/product-list/api";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || res.statusText);
  }
  return res.json() as Promise<T>;
}

export async function apiGetProducts(): Promise<Product[]> {
  return http<Product[]>("/products");
}

export async function apiGetProductById(id: number): Promise<Product> {
  return http<Product>(`/products/${id}`);
}

export async function apiCreateProduct(
  data: Omit<Product, "id" | "comments">
): Promise<Product> {
  return http<Product>("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function apiUpdateProduct(
  id: number,
  data: Partial<Omit<Product, "id" | "comments">>
): Promise<Product> {
  return http<Product>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function apiDeleteProduct(id: number): Promise<{ ok: boolean }> {
  return http<{ ok: boolean }>(`/products/${id}`, { method: "DELETE" });
}

export async function apiGetComments(productId: number): Promise<Comment[]> {
  return http<Comment[]>(`/products/${productId}/comments`);
}

export async function apiAddComment(
  productId: number,
  description: string
): Promise<Comment> {
  return http<Comment>(`/products/${productId}/comments`, {
    method: "POST",
    body: JSON.stringify({ description }),
  });
}

export async function apiUpdateComment(
  id: number,
  description: string
): Promise<Comment> {
  return http<Comment>(`/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({ description }),
  });
}

export async function apiDeleteComment(id: number): Promise<{ ok: boolean }> {
  return http<{ ok: boolean }>(`/comments/${id}`, { method: "DELETE" });
}
