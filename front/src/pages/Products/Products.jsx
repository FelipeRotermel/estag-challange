import { useEffect, useState } from 'react';
import Form from '../../components/Products/Form';
import Thead from '../../components/Products/Thead';
import Tbody from '../../components/Products/Tbody';
import './Products.css';

function Products() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const specialChars = /[!@#$%^&*()_+={}\[\]:;<>,.?~]/;

    /* Get Categories */
    useEffect(() => {

        fetch("http://localhost/routes/categories.php?action=get", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data);
        })
        .catch(err => console.error(err));
    }, []);

    /* Get Products */
    useEffect(() => {

        fetch("http://localhost/routes/products.php?action=get", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

        })
        .then((resp) => resp.json())
        .then((data) => {
            setProducts(data);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="Container">
            <Form categories={categories} specialChars={specialChars}/>
            <div className="Column Line">
                <table className="ProductsTable">
                    <Thead/>
                    <Tbody  products={products} specialChars={specialChars}/>
                </table>
            </div>
        </div>
    )

}


export default Products;