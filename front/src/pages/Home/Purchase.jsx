import { useEffect, useState } from 'react';
import BuyProductsButton from '../../components/Home/Purchase/BuyProductsButton';
import CancelProductsButton from '../../components/Home/Purchase/CancelProductsButton';
import ProductsThead from '../../components/Home/ProductsThead';
import ProductsTbody from '../../components/Home/ProductsTbody';
import CartThead from '../../components/Home/CartThead';
import CartTbody from '../../components/Home/CartTbody';
import DeleteAllProducts from '../../components/Home/Buttons/DeleteAllProductsButton';
import BuyAllProducts from '../../components/Home/Buttons/BuyAllProductsButton';
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

    return (
        <div className="Container">
            <div className="Column ColumnFilter">
                <h2>Products</h2><br/>
                <table className="ProductsTable">
                    <ProductsThead/>
                    <ProductsTbody products={products} specialChars={specialChars} setCarts={setCarts}/>
                </table>
            </div>
            <div className="Column Line ColumnFilter">
                <h2>Cart</h2><br/>
                <table className="ProductsTable">
                    <CartThead/>
                    <CartTbody carts={carts} specialChars={specialChars} setTax={setTax} setTotal={setTotal}/>
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
                        <DeleteAllProducts/>
                        <BuyAllProducts carts={carts} total={total} tax={tax}/>
                    </div>
                </div>
            </div>
            <div className="ConfirmationPayment">
                <h1>Are you sure?</h1>
                <CancelProductsButton/>
                <BuyProductsButton/>
                <div>
                    <form action="" id="form">
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Purchase;