function ReduceAmountButton({GetCartsAmounts}) {

    /* Reduces the Amount of the Product in the Cart */
    function ReduceAmount(event) {
        let amount = event.target.parentElement.querySelector('.quantity');

        /* Don't let the Amount be less than 1 */
        if (amount.value < 2) {
            amount.value = 2;
        }

        amount.value = parseInt(amount.value) - 1;

        GetCartsAmounts(event);
    }

    return (
        <button onClick={ReduceAmount}>-</button>
    )

}

export default ReduceAmountButton;