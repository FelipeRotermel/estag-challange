function Tbody({products, specialChars}) {

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
        <tbody className="ProductsProductsItemsTable">
            {products.map((product) => {

                /* Verificação de caracteres especiais */
                if (specialChars.test(product.productname)) {
                    return;
                }

                return(
                    <tr key={product.productcode}>
                        <td className="ID">{product.productcode}</td>
                        <td className="Item">{product.productname}</td>
                        <td className="Others">{product.amount}</td>
                        <td className="InputWithButton"><input type="number" min={product.amount} /><button onClick={Edit}>Edit</button></td>
                        <td className='Others'>{product.price}</td>
                        <td className="Others">{product.categoryname}</td>
                        <td className="Others">
                            <button
                                className="RemoveButton"
                                onClick={() => location.href=`http://localhost/routes/products.php?action=delete&code=${product.productcode}`}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            })} 
        </tbody>
    )

}

export default Tbody;