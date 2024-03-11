import { useEffect, useState } from 'react';
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
            <form className="Column CategoryColumn" action="http://localhost/routes/categories.php" method="POST">
                <input 
                    type="hidden" 
                    name="action" 
                    value="post"
                />
                <input 
                    placeholder="Category Name" 
                    className="CategoryNameInput" 
                    pattern="[a-zA-Z0-9]+"
                    maxLength="100" 
                    type="text" 
                    name="name"
                    id="name" 
                    required    
                />
                <input 
                    className="CategoryTaxInput" 
                    placeholder="Tax" 
                    pattern="[0-9]+"
                    type="number" 
                    name="tax"
                    max="999" 
                    required
                    id="tax" 
                    min="1" 
                />
                <br/>
                <button className="AddCategoryButton" type="submit">Enviar</button>
            </form>
            <div className="Column Line">
                <table className="CategoriesTable">
                    <thead className="CategoriesTableThead">
                        <tr>
                            <th className="ID">ID</th>
                            <th className="Product">Category</th>
                            <th className="Others">Tax</th>
                            <th className="Others">Action</th>
                        </tr>
                    </thead>
                    <tbody className="CategoriesTableTbody">
                        {categories.map((category) => {

                            /* Verificação de caracteres especiais */
                            if (specialChars.test(category.name)) {
                                return;
                            }

                            return (
                                <tr key={category.code}>
                                    <td className="ID">{category.code}</td>
                                    <td className="Product">{category.name}</td>
                                    <td className="Others">{category.tax}</td>
                                    <td className="Others">
                                        <button 
                                            className="RemoveCategoryButton" 
                                            onClick={() => location.href=`http://localhost/routes/categories.php?action=delete&code=${category.code}`}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}                    
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Categories;