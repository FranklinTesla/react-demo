/**
 * ------------------------------------
 * @param {}
 * @export 导出变量
 * ------------------------------------
 */
import React from 'react';
import ReactDOM from 'react-dom';

class ProductCategoryRow extends React.Component {
    render() {
        return <tr><th colSpan="2">{this.props.category}</th></tr>;
    }
}

class ProductRow extends React.Component {
    render() {
        const name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };
    }
    changeFilter(filterText) {
        this.setState({filterText});
    }
    changeStock(inStockOnly) {
        this.setState({inStockOnly});
    }
    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    changeFilter={this.changeFilter.bind(this)}
                    changeStock={this.changeStock.bind(this)}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

function _isMatch(name, filterText) {
    const lowerName = name.toLowerCase()
        , lowerFilter = filterText.toLowerCase();

    const regEscape= function(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };
    return new RegExp('^'+regEscape(lowerFilter)).test(lowerName);
}

class ProductTable extends React.Component {
    render() {
        const props = this.props;
        let lastCategory = null
            , rows = [];
        props.products.forEach(function(product) {
            if (props.filterText && !_isMatch(product.name, props.filterText)
                || props.inStockOnly && !product.stocked) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    handleInput(e) {
        this.props.changeFilter(e.target.value);
    }
    handleClick(e) {
        this.props.changeStock(e.target.checked);
    }
    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText} onInput={this.handleInput.bind(this)}/>
                <p>
                    <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleClick.bind(this)}/>
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);
