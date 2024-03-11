function BuyProductsButton() {

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

    return (
        <button className="table-finish-btn" onClick={BuyProductsInCart}>Yes</button>
    )

}

export default BuyProductsButton;