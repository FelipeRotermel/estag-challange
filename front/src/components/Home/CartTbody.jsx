import ReduceButton from './Buttons/ReduceAmountButton';
import IncreaseButton from './Buttons/IncreaseAmountButton';
import DeleteButton from './Buttons/DeleteProductButton';

function CartTbody({carts, specialChars, setTax, setTotal}) {

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

    return (
        <tbody className="CartProductsItems">
            {carts.map((cart) => {
                
            /* Checks if the Cart Name has special characters */
            if (specialChars.test(cart.name)) {
                return;
            }
            
            return (
                <tr key={cart.id}>
                    <td className="ID">{cart.id}</td>
                    <td className="Item">{cart.name}</td>
                    <td className="Others">{cart.newUnitPrice}</td>
                    <td className="number-input">
                        <ReduceButton GetCartsAmounts={GetCartsAmounts}/>
                        <input className="quantity" min="1" max={cart.totalAmount} defaultValue={cart.amount} name="quantity" type="number" id="getCartAmount" />
                        <IncreaseButton GetCartsAmounts={GetCartsAmounts}/>
                    </td>
                    <td className="Others">{cart.category}</td>
                    <td className="Others">
                        <DeleteButton/>
                    </td>
                </tr>
            );
            })} 
        </tbody>
    )

}

export default CartTbody;