import api from "./axios"

export const getProductsApi = async (params?: {
  page?: number
  limit?: number
  search?: string
  category?: string
  sort?: string
  minPrice?: number
  maxPrice?: number
}) => {
  const response = await api.get("/products", { params })
  return response.data
}

export const getProductBySlugApi = async (slug: string) => {
  const response = await api.get(`/products/slug/${slug}`)
  return response.data
}

export const getFeaturedProductsApi = async () => {
  const response = await api.get("/products/featured")
  return response.data
}
