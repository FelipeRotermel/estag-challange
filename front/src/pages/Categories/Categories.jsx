import { useEffect, useState } from 'react';
import Form from '../../components/Categories/Form';
import Thead from '../../components/Categories/Thead';
import Tbody from '../../components/Categories/Tbody';
import './Categories.css';

function Categories() {

    const [categories, setCategories] = useState([]);
    const specialChars = /[!@#$%^&*()_+={}\[\]:;<>,.?~]/;

    useEffect(() => {

        fetch("http://localhost/routes/categories.php?action=get", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data);
        })
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="Container">
            <Form/>
            <div className="Column Line">
                <table className="ProductsTable">
                    <Thead />
                    <Tbody categories={categories} specialChars={specialChars} />
                </table>
            </div>
        </div>
    )

}

export default Categories;