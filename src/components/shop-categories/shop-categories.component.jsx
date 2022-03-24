import CategoryItem from "../category-item/category-item.component";

import "./shop-categories.styles.scss";

const ShopCategories = ({ categories }) => {
  return (
    <div className="shop-categories-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default ShopCategories;
