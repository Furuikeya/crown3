import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectCartItems,
  selectTotalPrice,
} from "../../store/cart/cart.selectors";

import CheckOutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlockContainer,
  TotalContainer,
} from "./checkout.styles.jsx";
import { setIsCartOpen } from "../../store/cart/cart.action";

const CheckOut = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  useEffect(() => dispatch(setIsCartOpen(false)));

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
      <PaymentForm />
    </CheckoutContainer>
  );
};

export default CheckOut;
