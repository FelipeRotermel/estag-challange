function IncreaseAmountButton({GetCartsAmounts}) {

    /* Increase the Amount of the Product in the Cart */
    function IncreaseAmount(event) {
        let amount = event.target.parentElement.querySelector('.quantity');
        
        /* Don't let the Amount be more than the TotalAmount */
        if (amount.value >= parseInt(amount.max)) {
            amount.value = (amount.max) -1;
        }

        amount.value = parseInt(amount.value) + 1;
        
        GetCartsAmounts(event);
    }

    return (
        <button onClick={IncreaseAmount}>+</button>
    )

}

export default IncreaseAmountButton;