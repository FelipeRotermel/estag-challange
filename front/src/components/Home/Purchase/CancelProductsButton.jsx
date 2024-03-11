function CancelProductsButton() {

    function Cancel(){
        location.href=`http://localhost/routes/orders.php?action=del`;
        location.href = "http://localhost:5173/";
    }

    return (
        <button className="table-cancel-btn" onClick={Cancel}>No</button>
    )

}

export default CancelProductsButton;