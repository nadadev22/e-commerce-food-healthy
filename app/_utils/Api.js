import axios from "axios";

const axiosGlobal = axios.create({
  baseURL: "http://localhost:1337/api",
});

const getCategory = () => axiosGlobal.get("/categories?populate=*");
const getSlider = () =>
  axiosGlobal.get("/sliders?populate=*").then((resp) => {
    return resp.data.data;
  });

const getCategoryList = () =>
  axiosGlobal.get("/categories?populate=*").then((resp) => {
    return resp.data.data;
  });

const getProductList = () =>
  axiosGlobal.get("/products?populate=*").then((resp) => {
    return resp.data.data;
  });

const getProductByCategory = (category) =>
  axiosGlobal
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((resp) => {
      return resp.data.data;
    });

const registerUser = (username, email, password) =>
  axiosGlobal.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const signIn = (email, password) =>
  axiosGlobal.post("/auth/local", {
    identifier: email,
    password: password,
  });
const addToCart = (data, jwt) =>
  axiosGlobal.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItems = (userId, jwt) =>
  axiosGlobal
    .get(
      "/user-carts?filters[userId][$eq]=" +
        userId +
        "&[populate][products][populate]=image",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;
      const cartItemList = data.map((item, index) => {
        const product = item?.products[0];

        return {
          name: product?.name,
          quantity: item?.quantity,
          amount: item?.amount,

          image: product.image[0]?.formats?.large?.url,
          sellingPrice: product?.sellingPrice,
          id: item.id,
          product: product.id,
        };
      });

      return cartItemList;
    });

const createOrder = (data, jwt) =>
  axiosGlobal.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

// const myOrders = (userId, jwt) =>
//   axiosGlobal
//     .get(
//       "/orders?[userId][$eq]=" +
//         userId +
//         "&[populate][orderItemList][populate][product][populate]=image"
//     )
//     .then((resp) => {
//       const response = resp.data.data;
//       console.log("Orders Data:", response);
//       const orderList = response.map((item, index) => ({
//         id: item.id,
//         totalOrderAmount: item.totalOrderAmount,
//         orderItemList: item.orderItemList,
//         createdAt: item.createdAt,
//       }));

//       return orderList;
//     });

export default {
  getCategory,
  getSlider,
  getCategoryList,
  getProductList,
  getProductByCategory,
  registerUser,
  signIn,
  addToCart,
  getCartItems,
  createOrder,
  // myOrders,
};
