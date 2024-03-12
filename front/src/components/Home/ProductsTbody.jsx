function ProductsTbody({products, specialChars, setCarts}) {

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

    return (
        <tbody className="HomeProductsTableTbody">
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
                        <td className="TableTbodyCode">{product.productcode}</td>
                        <td className="TableTbodyItem">{product.productname}</td>
                        <td className="TableTbodyOthers">R$ {product.price}</td>
                        <td className="TableTbodyOthers">{product.tax}</td>
                        <td className="TableTbodyOthers">{product.amount}</td>
                        <td className="TableTbodyOthers">{product.categoryname}</td>
                        <td className="TableTbodyOthers">
                            <button className="AddCart" onClick={AddToCart}>
                                Add
                            </button>
                        </td>
                    </tr>
                )
            })} 
        </tbody>
    )

}

export default ProductsTbody;