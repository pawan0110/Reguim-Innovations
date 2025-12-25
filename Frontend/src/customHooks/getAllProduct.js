import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { setProductData } from "../redux/productSlice";

const useGetAllProducts = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.product);

  useEffect(() => {
    if (productData.length > 0) return;

    const fetchProducts = async () => {
      const res = await api.get("/api/product/getallproduct");
      dispatch(setProductData(res.data.products));
    };

    fetchProducts();
  }, [dispatch, productData.length]);
};

export default useGetAllProducts;
