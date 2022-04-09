import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  decreaseItemCount,
  removeItem,
} from "../../store/cart/cart.action.js";
import { selectCartItems } from "../../store/cart/cart.selectors.js";

import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer,
} from "./checkout-item.styles.jsx";

const CheckOutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const incrementHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const decrementHandler = () =>
    dispatch(decreaseItemCount(cartItems, cartItem));
  const removeHandler = () => dispatch(removeItem(cartItems, cartItem));

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
      <TextContainer>${price}</TextContainer>
      <RemoveButtonContainer onClick={removeHandler}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

export default CheckOutItem;
