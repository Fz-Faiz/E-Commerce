import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";


export const useProductStore = create((set) => ({
    products: [],
    isLoading: false,

    setProducts: (products) => set({ products }),
    createProduct : async (productData) => {
        set({ loading: true });
        try {
            const response = await axios.post("/products", productData);
            set((prevState) => ({
                products: [...prevState.products, response.data],
                loading: false,
            }))
        } catch (error) {
            toast.error(error.response.data.error);
            set({ loading: false });
        }
    },
    fetchAllProducts: async () => {
        set({ loading: true })
        try {
            const response = await axios.get("/products");
            set({ products: response.data.products, loading: false })
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false })
            toast.error(error.response.data.error || "Failed to fetch products");
        }
    },
    fetchProductsByCategory: async (category) => {
        set({ loading: true });
        try {
            const response = await axios.get(`/products/category/${category}`);
            set({ products: response.data.products, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false });
            toast.error( error.resposne.data.error || "Failed to fetch products ");
        }
    },
    deleteProduct: async (productId) => {
        set({ loading : true });
        try {
            await axios.delete(`/products/${productId}`);
            set((prevProducts) => ({
                products: prevProducts.products.filter((product) => product._id !== productId),
                loading: false,
            }))
        } catch (error) {
            set({ loading: false })
            toast.error(error.response.data.error || "Failed to delete product" );
        }
    },
    toggleFeaturedProduct: async (productId) => {
        set({ loading : true})
        try {
            const response = await axios.patch(`/products/${productId}`)
            // this will update the isFeatured prop of the product
            set((prev) => ({
                products: prev.products.map((product) =>
                    product._id === productId ? {...product, isFeatured: response.data.isFeatured } : product
                ),
                loading: false,
            }))
        } catch (error) {
            set({ loading: false });
            toast.error( error.response.data.error || "Failed to update product" );
        }
    },

    fetchFeaturedProducts: async () => {
        set({ isLoading: true});
        try {
            const response = await axios.get("/products/featured");
            console.log(response.data);
            set({ products: response.data, isLoading: false})
        } catch (error) {
            set({ error : "Failed to fetch products", isLoading: false})
            console.log("Error fetching featured products:", error)
        }
    }


}))