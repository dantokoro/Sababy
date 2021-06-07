import React, { Component } from "react";
import Http from "../../Http";
import { Link } from "react-router-dom";
import "./css/homepage.scss";
import { Spin, Pagination } from "antd";
import ProductCard from "../product/ProductCard";
import CategoryList from "../category-list-component/CategoryListComponent";
import { connect } from "react-redux";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            currentPage: 1,
            totalPage: 1,
            isLoading: true,
            isProductLoading: true
        };
        this.getCategories = this.getCategories.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.setIsProductLoading = this.setIsProductLoading.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.categories) {
            this.getCategories();
        }
        this.getProducts(1);
    }

    setIsProductLoading(status) {
        this.setState({
            isProductLoading: status
        });
    }

    getCategories() {
        const uri = "http://localhost:8000/api/category";
        Http.get(uri).then(response => {
            this.props.setCategories(response.data);
        });
    }
    getProducts(page) {
        const uri = "http://localhost:8000/api/product?page=" + page;
        Http.get(uri).then(response => {
            this.props.setProducts(response.data.data);
            this.setState({
                isLoading: false,
                isProductLoading: false,
                totalPage: response.data.total
            });
        });
    }

    handleBookmark(bookmark, index) {
        console.log("handle Bookmark");
        console.log(index);
        console.log(this.props);
    }

    onPageChange(page) {
        this.getProducts(page);
    }

    render() {
        console.log(this.state);
        return (
            <div className="homepage-body fullscreen-min-height">
                {!this.state.isLoading ? (
                    <div className="container">
                        <h3>DANH MỤC SẢN PHẨM</h3>
                        <CategoryList categories={this.props.categories} />
                        <h3 className="trending_title">TẤT CẢ SẢN PHẨM</h3>
                        <div className="product-list">
                            <div className="container">
                                <div className="row">
                                    {!this.state.IsProductLoading &&
                                    this.props.products ? (
                                        this.props.products.map(
                                            (product, index) => (
                                                <ProductCard
                                                    key={product.id}
                                                    product={product}
                                                    index={index}
                                                    setBookmark={
                                                        this.props.setBookmark
                                                    }
                                                    setUnbookmark={
                                                        this.props.setUnbookmark
                                                    }
                                                />
                                            )
                                        )
                                    ) : (
                                        <div className="loading d-flex justify-content-center align-items-center">
                                            <Spin />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="pagination d-flex justify-content-end">
                            <Pagination
                                defaultCurrent={this.state.currentPage}
                                total={this.state.totalPage}
                                pageSize={15}
                                onChange={page => this.onPageChange(page)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="loading d-flex justify-content-center align-items-center">
                        <Spin />
                    </div>
                )}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        categories: state.categoryDetail.categories,
        products: state.productDetail.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCategories: categories => {
            dispatch({
                type: "SET_CATEGORIES",
                payload: categories
            });
        },
        setProducts: products => {
            dispatch({
                type: "SET_PRODUCTS",
                payload: products
            });
        },
        setBookmark: (bookmark, index) => {
            dispatch({
                type: "SET_BOOKMARK",
                payload: bookmark,
                index: index
            });
        },
        setUnbookmark: index => {
            dispatch({
                type: "SET_UNBOOKMARK",
                index: index
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
