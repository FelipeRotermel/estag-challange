import { useEffect, useState } from 'react';
import ProductsThead from '../../components/Home/ProductsThead';
import ProductsTbody from '../../components/Home/ProductsTbody';
import CartThead from '../../components/Home/CartThead';
import CartTbody from '../../components/Home/CartTbody';
import DeleteAllProducts from '../../components/Home/Buttons/DeleteAllProductsButton';
import BuyAllProducts from '../../components/Home/Buttons/BuyAllProductsButton';
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
            <div className="Column">
                <h2>Products</h2><br/>
                <table className="ProductsTable">
                    <ProductsThead/>
                    <ProductsTbody products={products} specialChars={specialChars} setCarts={setCarts}/>
                </table>
            </div>
            <div className="Column Line">
                <h2>Cart</h2><br/>
                <table className="ProductsTable">
                    <CartThead/>
                    <CartTbody carts={carts} specialChars={specialChars} setTax={setTax} setTotal={setTotal}/>
                </table>
                <div className="Payment">
                    <table className='PaymentTable'>
                        <thead>
                            <tr>
                                <td><h2>Tax R$:</h2></td>
                                <td className="Tax"><h2>{tax}</h2></td>
                            </tr>
                            <tr>
                                <td><h2>Total R$:</h2></td>
                                <td className="Total"><h2>{total}</h2></td>
                            </tr>
                        </thead>
                    </table>
                    <div className="PaymentButtons">
                        <DeleteAllProducts/>
                        <BuyAllProducts carts={carts} total={total} tax={tax}/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home;