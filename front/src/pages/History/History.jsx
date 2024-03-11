import { useEffect, useState } from 'react';
import Thead from '../../components/History/Thead';
import Tbody from '../../components/History/Tbody';
import ModalThead from '../../components/History/ModalThead';
import ModalTbody from '../../components/History/ModalTbody';
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

    return (
        <>
            <div className="HistoryContainer">
                <div className="Column HistoryColumn">
                    <h2>History</h2>
                    <table className="HistoryTable">
                        <Thead/>
                        <Tbody history={history} setItem={setItem}/>
                    </table>
                    <br/>
                </div>
            </div>
            <div className="HistoryModal" id='myModal'>
                <div className="HistoryModalContent">
                    <table>
                        <ModalThead/>
                        <ModalTbody item={item} specialChars={specialChars}/>
                    </table>
                </div>
            </div>
        </>
    )

}

export default History;