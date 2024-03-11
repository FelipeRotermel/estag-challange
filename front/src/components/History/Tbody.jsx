function Tbody({history, setItem}) {

    function viewProducts(event) {
        var button = event.target.parentElement.parentElement;
        var code = button.children[0].innerText;
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("HistoryClose")[0];
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        span.onclick = function () {
            modal.style.display = "none";
        }
        modal.style.display = "block";

        fetch(`http://localhost/routes/orders.php?action=getdetail&code=${code}`)
            .then(response => response.json())
            .then((data) => {
                setItem(data);
            })
    }

    return (
        <tbody className="HistoryTableItems">
            {history.map((item) => {
                return (
                    <tr key={item.code}>
                        <td>{item.code}</td>
                        <td>{parseFloat(item.tax).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</td>
                        <td>{parseFloat(item.total).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</td>
                        <td>
                            <button className='HistoryViewButton' onClick={viewProducts}>View</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )

}

export default Tbody;