function Tbody({categories, specialChars}) {

    return (
        <tbody className="CategoriesTableTbody">
            {categories.map((category) => {

                /* Verificação de caracteres especiais */
                if (specialChars.test(category.name)) {
                    return;
                }

                return (
                    <tr key={category.code}>
                        <td className="ID">{category.code}</td>
                        <td className="Item">{category.name}</td>
                        <td className="Others">{category.tax}</td>
                        <td className="Others">
                            <button 
                                className="RemoveButton" 
                                onClick={() => location.href=`http://localhost/routes/categories.php?action=delete&code=${category.code}`}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            })}        
        </tbody>
    )

}

export default Tbody;