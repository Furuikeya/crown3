import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import CheckOutItem from "../../components/checkout-item/checkout-item.component";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlockContainer,
  TotalContainer,
} from "./checkout.styles.jsx";

const CheckOut = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlockContainer>image</HeaderBlockContainer>
        <HeaderBlockContainer>description</HeaderBlockContainer>
        <HeaderBlockContainer>quantity</HeaderBlockContainer>
        <HeaderBlockContainer>price</HeaderBlockContainer>
        <HeaderBlockContainer>remove</HeaderBlockContainer>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckOutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <TotalContainer>TOTAL: ${totalPrice}</TotalContainer>
    </CheckoutContainer>
  );
};

export default CheckOut;
