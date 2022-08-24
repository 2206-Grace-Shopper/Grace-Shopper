import React from "react";
import {
  deleteProduct,
  getMyInfo,
  getUnpurchasedCart,
  getOrderItemByCart,
} from "../api";

const DeleteFromCart = ({ cart, setCart, isLoggedIn, id }) => {
  async function handleDelete(event) {
    event.preventDefault();
    if (isLoggedIn) {
      const user = await getMyInfo(localStorage.getItem("token"));
      if (localStorage.getItem("email") === user.email) {
        const orderItem = await getOrderItemByCart(cart.cartId);
        await deleteProduct(orderItem.id);
        const result = await getUnpurchasedCart(user.id);
        setCart(result);
      } else {
        alert("You must be logged in to perform this function!");
      }
    } else {
      const cartProducts = JSON.parse(localStorage.getItem("cart"));
      const newCartProducts = cartProducts.filter(
        (cartProduct) => cartProduct.id !== id
      );
      const newCart = localStorage.setItem(
        "cart",
        JSON.stringify(newCartProducts)
      );
      setCart(newCart);
    }
  }
  return (
    <form className="CartText" onSubmit={handleDelete}>
      <button id="deleteButton" type="Submit">
        DELETE
      </button>
    </form>
  );
};

export default DeleteFromCart;
