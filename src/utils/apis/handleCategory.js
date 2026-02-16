
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