import {
  CartItemContainer,
  ImgContainer,
  ItemDetails,
  NameContainer,
} from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <ImgContainer src={imageUrl} alt={name} />
      <ItemDetails>
        <NameContainer>{name}</NameContainer>
        <NameContainer>
          {quantity} x ${price}
        </NameContainer>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
