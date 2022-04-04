import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import { selectCategoriesMap } from "../../store/categories/catgory.selector";

import {
  CategoryContainer,
  CategoryTitleContainer,
} from "./category.styles.jsx";

const Category = () => {
  const { category } = useParams();
  console.log("category", category);
  const categoriesMap = useSelector(selectCategoriesMap);
  console.log("categoriesMap", categoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  console.log("products", products);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitleContainer>{category.toUpperCase()}</CategoryTitleContainer>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
