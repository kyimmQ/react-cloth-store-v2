import React from "react";

import ProductCard from "../product-card/product-card.component";

import "./category-preview.styles.scss";
import { Link } from "react-router-dom";

const CategoryPreview = ({ title, products }) => (
  <div className="category-preview-container">
    <h2>
      <span className="title">
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </span>
    </h2>
    <div className="preview">
      {products
        .filter((_, idx) => idx < 4)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  </div>
);

export default CategoryPreview;
