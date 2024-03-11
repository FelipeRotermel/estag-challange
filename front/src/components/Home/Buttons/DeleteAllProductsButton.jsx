function DeleteAllProductsButton() {

    /* Delete all Products from the Cart */
    function DeleteAllProductsInTheCart() {
        localStorage.removeItem('carts')
        location.reload();
    }

    return (
        <button className="PaymentButtonCancel" onClick={DeleteAllProductsInTheCart}>Cancel</button>
    )

}

export default DeleteAllProductsButton;