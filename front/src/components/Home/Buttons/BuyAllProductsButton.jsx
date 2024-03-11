function BuyAllProductsButton({carts, total, tax}) {

    /* Buy Products in the Cart */
    function BuyProducts() {

        /* Check if the Cart is empty */
        if(carts.length == 0) {
            alert("Empty Cart!")
            return;
        }

        location.href = `http://localhost/routes/orders.php?action=post&total=${total}&tax=${tax}`
    }

    return (
        <button className="PaymentButtonFinish" onClick={BuyProducts}>Finish</button>
    )

}

export default BuyAllProductsButton;