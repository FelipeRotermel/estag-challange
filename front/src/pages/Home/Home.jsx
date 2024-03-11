import { useEffect, useState } from 'react';
import './Home.css';

function Home() {
    
    const [products, setProducts] = useState([]);
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem('carts')) || []);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const specialChars = /[!@#$%^&*()_+={}\[\]:;<>,.?~]/;
    
    
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
    
    /* Get TotalPrice and Tax */
    useEffect(() => {
        TotalPriceAndTax();
    }, [carts]);

    /* Add Product in the Cart */
    function AddToCart(event) {
        let carts = JSON.parse(localStorage.getItem('carts')) || [];
        let row = event.target.parentElement.parentElement;

        let id = row.children[0].innerText;
        let name = row.children[1].innerText;
        let totalAmount = row.children[4].innerText;
        let unitPrice = (row.children[2].innerText).replace('R$ ', '');
        let category = row.children[5].innerText;
        let tax = row.children[3].innerText;

        let amount = 1;
        let percent = (parseFloat(tax) / 100);
        let newUnitPrice = (parseFloat(unitPrice) + (parseFloat(unitPrice) * percent)).toFixed(2);
        let totalTax = (parseFloat(unitPrice) * percent).toFixed(2);
        
        const cart = { id, name, newUnitPrice, category, amount, totalAmount, tax, totalTax };
        
        /* Check if the Product is already in the Cart */
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].id == id) {
                alert("Produto já está no carrinho!")
                return;
            }
        }
        
        carts.push(cart);
        localStorage.setItem('carts', JSON.stringify(carts));
        setCarts(carts);
        
    }

    /* Reduces the Amount of the Product in the Cart */
    function ReduceAmount(event) {
        let amount = event.target.parentElement.querySelector('.quantity');

        /* Don't let the Amount be less than 1 */
        if (amount.value < 2) {
            amount.value = 2;
        }

        amount.value = parseInt(amount.value) - 1;

        GetCartsAmounts(event);
    }

    /* Increase the Amount of the Product in the Cart */
    function IncreaseAmount(event) {
        let amount = event.target.parentElement.querySelector('.quantity');
        
        /* Don't let the Amount be more than the TotalAmount */
        if (amount.value >= parseInt(amount.max)) {
            amount.value = (amount.max) -1;
        }

        amount.value = parseInt(amount.value) + 1;
        
        GetCartsAmounts(event);
    }

    /* Put the new Amount of the Product in the Cart */
    function GetCartsAmounts(event) {
        let carts = JSON.parse(localStorage.getItem('carts'));

        let row = event.target.parentElement.parentElement;
        let name = row.children[1].innerText;
        let amount = row.querySelector('.quantity').value;

        carts.forEach(cart => {
            if (cart.name === name) {
                cart.amount = amount;
            }
        });

        localStorage.setItem('carts', JSON.stringify(carts));
        TotalPriceAndTax()
    }


    /* Set TotalPrice and TotalTax */
    function TotalPriceAndTax() {
        let carts = JSON.parse(localStorage.getItem('carts'));
        
        if(carts){

            let total = 0;
            let tax = 0;
            carts.forEach(cart => {
                total += (parseFloat(cart.newUnitPrice) * cart.amount);
                tax += (parseFloat(cart.totalTax) * cart.amount);
            });

            setTotal(total.toFixed(2));
            setTax(tax.toFixed(2));
        }
    }

    /* Buy Products in the Cart */
    function BuyProducts() {

        /* Check if the Cart is empty */
        if(carts.length == 0) {
            alert("Empty Cart!")
            return;
        }

        location.href = `http://localhost/routes/orders.php?action=post&total=${total}&tax=${tax}`
    }

    /* Delete all Products from the Cart */
    function DeleteAllProductsInTheCart() {
        localStorage.removeItem('carts')
        location.reload();
    }
    
    /* Delete the Product from the Cart */
    function DeleteProductInTheCart(event) {
        let row = event.target.parentElement.parentElement;
        let id = row.children[0].innerText;
        let name = row.children[1].innerText;
        let carts = JSON.parse(localStorage.getItem('carts'));
        let newCarts = carts.filter(cart => cart.id !== id && cart.name !== name);
        localStorage.setItem("carts", JSON.stringify(newCarts));
        row.remove();

        location.reload();
    }
    

    return (
        <div className="Container">
            <div className="Column">
                <h2>Products</h2><br/>
                <table className="ProductsTable">
                    <thead className="ProductsTableItems">
                        <tr>
                            <th className="ID">Code</th>
                            <th className="Product">Product</th>
                            <th className="Others">Price</th>
                            <th className="Others">Tax</th>
                            <th className="Others">Disp.</th>
                            <th className="Others">Category</th>
                            <th className="Others">Action</th>
                        </tr>
                    </thead>
                    <tbody className="HomeProductsItemsTable">
                        {products.map((product) => {

                            /* Checks if the Product Name has special characters */
                            if (specialChars.test(product.productname)) {
                                return;
                            }

                            /* Checks if the amount is equal to 0 */
                            if (product.amount == 0) {
                                return;
                            }

                            return(
                                <tr key={product.productcode}>
                                    <td className="ID">{product.productcode}</td>
                                    <td className="Product">{product.productname}</td>
                                    <td className="Others">R$ {product.price}</td>
                                    <td className="Others">{product.tax}</td>
                                    <td className="Others">{product.amount}</td>
                                    <td className="Others">{product.categoryname}</td>
                                    <td className="Others">
                                        <button className="ProductsAddButton" onClick={AddToCart}>
                                            Add
                                        </button>
                                    </td>
                                </tr>
                            )
                        })} 
                    </tbody>
                </table>
            </div>
            <div className="Column Line">
                <h2>Cart</h2><br/>
                <table className="ProductsTable">
                    <thead className="ProductsTableItems">
                        <tr>
                            <th className="Others">Code</th>
                            <th className="Product">Product</th>
                            <th className="Others">Price</th>
                            <th className="Others">Amount</th>
                            <th className="Others">Category</th>
                            <th className="Others">Action</th>
                        </tr>
                    </thead>
                    <tbody className="CartProductsItems">
                        {carts.map((cart) => {

                        /* Checks if the Cart Name has special characters */
                        if (specialChars.test(cart.name)) {
                            return;
                        }

                        return (
                            <tr key={cart.id}>
                                <td className="ID">{cart.id}</td>
                                <td className="Product">{cart.name}</td>
                                <td className="Others">{cart.newUnitPrice}</td>
                                <td className="number-input">
                                    <button onClick={ReduceAmount}>-</button>
                                    <input className="quantity" min="1" max={cart.totalAmount} defaultValue={cart.amount} name="quantity" type="number" id="getCartAmount" />
                                    <button onClick={IncreaseAmount}>+</button>
                                </td>
                                <td className="Others">{cart.category}</td>
                                <td className="Others">
                                    <button className="ProductsDeleteButton" onClick={DeleteProductInTheCart}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                        })} 
                    </tbody>
                </table>
                <div className="Payment">
                    <table>
                        <thead>
                            <tr>
                                <td>Tax R$:</td>
                                <td className="Tax">{tax}</td>
                            </tr>
                            <tr>
                                <td>Total R$:</td>
                                <td className="Total">{total}</td>
                            </tr>
                        </thead>
                    </table>
                    <div className="PaymentButtons">
                        <button className="PaymentButtonCancel" onClick={DeleteAllProductsInTheCart}>Cancel</button>
                        <button className="PaymentButtonFinish" onClick={BuyProducts}>Finish</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home;