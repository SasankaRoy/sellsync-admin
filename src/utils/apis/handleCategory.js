
import axiosInstance from "../axios-interceptor";

export const getAllCategoryList = async () => {
    try {
        const categoryList = await axiosInstance.post('/api/v1/common/category-list', {
            page: 1,
            limit: 100,
        })
        if (categoryList.data && categoryList.status) {
            return categoryList.data.results
        }
        return categoryList.data.results
    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Something went wrong while fetching the category list'
    }
}



export const getCategoryDetails = async (id) => {
    try {
        const categoryDetails = await axiosInstance.get(`/api/v1/common/category-details/${id}`)
        if (categoryDetails.data && categoryDetails.status) {
            return categoryDetails.data.categoryDetails || {}
        }
        return categoryDetails.data.categoryDetails || {}
    } catch (error) {
        console.error(error);
        return error.message || error.response.data.message || 'Something went wrong while fetching the category details'
    }
}