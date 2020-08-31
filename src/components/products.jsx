import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import getProduct from "../services/productService";
import getCategories from "../services/fakeCategoryService";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./../common/listGroup";
import ProductsTable from "./productsTable";

class Products extends Component {
  state = {
    products: [],
    categories: [],
    pageSize: 3,
    currentPage: 1,
    sortColumn: { column: "name", order: "asc" },
    selectedCategory: { _id: "", name: "AllCategories" },
  };

  componentDidMount() {
    const categories = [{ _id: "", name: "AllCategories" }, ...getCategories()];

    const products = getProduct();
    this.setState({ products, categories });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleItemSelect = (category) => {
    this.setState({ selectedCategory: category, currentPage: 1 });
  };
  handelEnable = (product) => {
    let cloned = [...this.state.products];
    let index = cloned.indexOf(product);
    cloned[index] = { ...cloned[index] }; // if dirctly edited it will edit the state object dirctly cause it is the same reffrence
    cloned[index].enabled = !cloned[index].enabled;
    alert("Are you sure of Changing product Status");
    this.setState({ products: cloned });
  };
  handleDelete = (product) => {
    let cloned = [...this.state.products];
    let index = cloned.indexOf(product);
    //cloned[index] = { ...cloned[index] };
    cloned.splice(index, 1);
    this.setState({ products: cloned });
  };
  handleSort = (clonedSortColumn) => {
    this.setState({ sortColumn: clonedSortColumn });
  };

  render() {
    // OPerations over list must be 1-filtering 2-sorting 3-pagination
    const { user } = this.props;

    const {
      pageSize,
      currentPage,
      products: allProducts,
      selectedCategory,
      sortColumn,
    } = this.state;

    const filterd =
      selectedCategory && selectedCategory._id
        ? allProducts.filter((p) => p.category.name === selectedCategory.name)
        : allProducts;

    const sorted = _.orderBy(filterd, [sortColumn.column], [sortColumn.order]);

    const paginatedProducts = paginate(sorted, currentPage, pageSize);

    return (
      <React.Fragment>
        <h3 className="headline">ProductsTable</h3>
        <div className="row transaction-row">
          <div className="col-12  col-sm-12   col-md-3  col-lg-3">
            {user.role.name === "Admin" && (
              <Link
                type="button"
                className="btn btn-primary ml-auto   btn-small-style"
                to="/products/new"
                // style={{ marginBottom: 20 }}
              >
                AddProduct
              </Link>
            )}
            <ListGroup
              items={this.state.categories}
              selectedItem={this.state.selectedCategory}
              onItemSelect={this.handleItemSelect}
            />

            <h6 className="items-count">
              Showing {filterd.length} products of {allProducts.length}
            </h6>
          </div>

          <div className="col-12  col-sm-12   col-md-9  col-lg-9  table-container">
            <ProductsTable
              paginatedProducts={paginatedProducts}
              onEnable={this.handelEnable}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
              user={user}
            />

            <Pagination
              pageSize={pageSize}
              currentPage={currentPage}
              itemsCount={filterd.length}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Products;
