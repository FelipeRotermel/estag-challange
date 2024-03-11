import { useEffect, useState } from 'react';
import './History.css';

function History() {

    const [history, setHistory] = useState([]);
    const [item, setItem] = useState([]);
    const specialChars = /[!@#$%^&*()_+={}\[\]:;<>,.?~]/;

    /* Get Products */
    useEffect(() => {

        fetch("http://localhost/routes/orders.php?action=getall", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

        })
        .then((resp) => resp.json())
        .then((data) => {
            setHistory(data);
        })
        .catch(err => console.error(err));
    }, []);

    function viewProducts(event) {
        var button = event.target.parentElement.parentElement;
        var code = button.children[0].innerText;
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
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
        <>
            <div className="ContainerHistory">
                <div className="Column ColumnHistory">
                    <h2>History</h2>
                    <table className="HistoryTable">
                        <thead className="HistoryTableInfo">
                            <tr>
                                <th>Code</th>
                                <th>Tax</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="HistoryTableItems">
                            {history.map((item) => {
                                return (
                                    <tr key={item.code}>
                                        <td>{item.code}</td>
                                        <td>{parseFloat(item.tax).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</td>
                                        <td>{parseFloat(item.total).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</td>
                                        <td>
                                            <button onClick={viewProducts}>View</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <br/>
                </div>
            </div>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <table>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Amount</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody id="modal-tbody">
                            {item.map((product) => {
                                return (
                                    <tr key={product.code}>
                                        <td className='Item'>{product.code}</td>
                                        <td className='Item'>{product.name}</td>
                                        <td className='Item'>{parseFloat(product[4]).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</td>
                                        <td className='Item'>{product[3]}</td>
                                        <td className='Item'>{(product[3] * product[4]).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}

export default History;