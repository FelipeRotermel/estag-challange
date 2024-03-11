import { useEffect, useState } from 'react';
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

    /* Edit Amount on the Product */
    function Edit(event) {
        let tr = event.target.parentElement.parentElement;
        let code = tr.children[0].innerText;
        let inputValue = tr.children[3].children[0].value;

        /* Check if the Amount is greater than 0 */
        if(inputValue < 0) {
            alert("Amount must be greater than 0")
            return;
        }
       
        location.href=`http://localhost/routes/products.php?action=update&code=${code}&amount=${inputValue}`
    }

    return (
        <div className="Container">
            <form className="Column" action="http://localhost/routes/products.php" method="POST">
                <input 
                    type="hidden" 
                    name="action" 
                    value="post"
                />
                <input 
                    className="ProductNameInput" 
                    placeholder="Product Name"
                    pattern="[a-zA-Z0-9]+"
                    maxLength="100" 
                    name="name" 
                    type="text" 
                    id="name"
                    required
                />
                <br/>
                <input 
                    className="ProductAmountInput" 
                    placeholder="Amount" 
                    pattern="[0-9]+"
                    type="number" 
                    name="amount" 
                    id="amount" 
                    max="9999" 
                    required
                    min="1"
                />
                <input 
                    placeholder="Price" 
                    pattern="[0-9]+"
                    type="number" 
                    name="price" 
                    id="price" 
                    max="9999" 
                    required
                    min="1"
                />
                <select className="ProductSelectInput" id="category" name="category_code">
                    {categories.map((category) => {

                        /* Verificação de caracteres especiais */
                        if (specialChars.test(category.name)) {
                            return;
                        }

                        return (
                            <option key={category.code} value={category.code}>{category.name}</option>
                        )

                    })}
                </select>
                <br/>
                <button className="AddProductButton" type="submit">Enviar</button>
            </form>
            <div className="Column Line">
                <table className="ProductsTable">
                    <thead className="ProductsTableItems">
                        <tr>
                            <th className="ID">ID</th>
                            <th className="Product">Product</th>
                            <th className="Others">Amount</th>
                            <th className="Others">EditAmount</th>
                            <th className="Others">Unit Price</th>
                            <th className="Others">Category</th>
                            <th className="Others">Action</th>
                        </tr>
                    </thead>
                    <tbody className="ProductsProductsItemsTable">
                        {products.map((product) => {

                            /* Verificação de caracteres especiais */
                            if (specialChars.test(product.productname)) {
                                return;
                            }

                            return(
                                <tr key={product.productcode}>
                                    <td className="ID">{product.productcode}</td>
                                    <td className="Product">{product.productname}</td>
                                    <td className="Others">{product.amount}</td>
                                    <td className="inputWithButton"><input type="number" min={product.amount} /><button onClick={Edit}>Edit</button></td>
                                    <td className='Others'>{product.price}</td>
                                    <td className="Others">{product.categoryname}</td>
                                    <td className="Others">
                                        <button
                                            className="ProductsDeleteButton"
                                            onClick={() => location.href=`http://localhost/routes/products.php?action=delete&code=${product.productcode}`}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })} 
                    </tbody>
                </table>
            </div>
        </div>
    )

}


export default Products;