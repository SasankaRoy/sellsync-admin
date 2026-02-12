import { toast } from "react-toastify";
import axiosInstance from "../axios-interceptor";

export const getAllProductList = async (filters) => {
    try {
        const productList = await axiosInstance.post('/api/v1/product/list', {
            "page": filters?.page || 1,
            "limit": filters?.limit || 100,
            "search_text": filters?.search_text || ""
        })
        if (productList?.status === 200 || productList.data) {
            return productList?.data.results;
        }
        return productList.data.results;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const deleteProduct = await axiosInstance.get(`/api/v1/product/delete/${productId}`)
        if (deleteProduct?.status === 200 || deleteProduct.data) {
            toast.success(deleteProduct?.data.message)
            return deleteProduct?.data;
        }
        toast.error(deleteProduct?.data.message)
        return deleteProduct.data;
    } catch (error) {
        toast.error(error.message || error.response.data.message || "Something went wrong while deleting product")
        return error.message || error.response.data.message || "Something went wrong while deleting product"
    }
}