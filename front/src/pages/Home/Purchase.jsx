import { useEffect, useState } from 'react';
import './Home.css';

function Purchase() {
    
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

    /* Add Product to Cart */
    function BuyProductsInCart() {

        let carts = JSON.parse(localStorage.getItem('carts'));
        
        carts.forEach(cart => {
            fetch('http://localhost/routes/orders.php?action=get')
                .then(response => response.json())
                .then((data) => {
                    data.forEach(order => {
                        $.ajax({
                            url: 'http://localhost/routes/orders.php?action=postorder',
                            type: 'POST',
                            data: {
                                productCode: JSON.stringify(parseInt(cart.id)),
                                orderCode: JSON.stringify(order.max),
                                amount: JSON.stringify(parseFloat(cart.amount)),
                                price: JSON.stringify(parseFloat(cart.newUnitPrice)),
                                tax: JSON.stringify(parseFloat(cart.tax)),
                            },
                            success: function (data) {
                                console.log(data);
                            }
                        })

                        let amount = cart.amount;
                        let code = cart.id;
                        location.href=`http://localhost/routes/orders.php?action=updateOrder&amount=${amount}&code=${code}`;
                        localStorage.removeItem('carts');
                    });
                });
        });
    }

    function Cancel(){
        location.href=`http://localhost/routes/orders.php?action=del`;
        location.href = "http://localhost:5173/";
    }

    return (
        <div className="Container">
            <div className="Column ColumnFilter">
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
                                        <button className="ProductsAddButton">
                                            Add
                                        </button>
                                    </td>
                                </tr>
                            )
                        })} 
                    </tbody>
                </table>
            </div>
            <div className="Column Line ColumnFilter">
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
                                    <button>-</button>
                                    <input className="quantity" min="1" max={cart.totalAmount} defaultValue={cart.amount} name="quantity" type="number" id="getCartAmount" />
                                    <button>+</button>
                                </td>
                                <td className="Others">{cart.category}</td>
                                <td className="Others">
                                    <button className="ProductsDeleteButton">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                        })} 
                    </tbody>
                </table>
                <div className="PaymentPurchase">
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
                    <div className="PaymentPurchaseButtons">
                        <button className="PaymentButtonCancel">Cancel</button>
                        <button className="PaymentButtonFinish">Finish</button>
                    </div>
                </div>
            </div>
            <div className="ConfirmationPayment">
            <h1>Are you sure?</h1>
            <button className="table-cancel-btn" onClick={Cancel}>No</button>
            <button className="table-finish-btn" onClick={BuyProductsInCart}>Yes</button>
            <div>
                <form action="" id="form">
                </form>
            </div>
        </div>
        </div>
    )

}

export default Purchase;