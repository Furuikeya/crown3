import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer,
} from "./checkout-item.styles.jsx";

const CheckOutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, decreaseItemCount, removeItem } =
    useContext(CartContext);

  const incrementHandler = () => addItemToCart(cartItem);
  const decrementHandler = () => decreaseItemCount(cartItem);
  const removeHandler = () => removeItem(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <TextContainer> {name} </TextContainer>
      <QuantityContainer>
        <div onClick={decrementHandler}>&#10094;</div>
        <span>{quantity}</span>
        <div onClick={incrementHandler}>&#10095;</div>
      </QuantityContainer>
      <TextContainer>{price}</TextContainer>
      <RemoveButtonContainer onClick={removeHandler}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

export default CheckOutItem;
