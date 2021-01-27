import React, { Component } from "react";
import Http from "../../Http";
import { Link } from "react-router-dom";
import "./css/CategoryListComponent.scss";

class CategoryList extends Component {
    render() {
        let parent_categories = this.props.parent_categories;
        return (
            <div className="category-list">
                {parent_categories.map((category, index, categories) => (
                    <a
                        href="https://www.furlenco.com/mumbai/bedroom-furniture-on-rent?ref=Home-Explore-Products-Bedroom"
                        key={category.category_id}
                    >
                        <div className="category-card">
                            <img src={category.category_image_url} />
                            <div className="category-card-title">
                                {category.category_name}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        );
    }
}
export default CategoryList;
