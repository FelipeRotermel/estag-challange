function DeleteProductButton() {

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
        <button className="RemoveButton" onClick={DeleteProductInTheCart}>Delete</button>
    )

}

export default DeleteProductButton;