function Tbody({categories, specialChars}) {

    return (
        <tbody className="CategoriesProductsTableTbody">
            {categories.map((category) => {

                /* Verificação de caracteres especiais */
                if (specialChars.test(category.name)) {
                    return;
                }

                return (
                    <tr key={category.code}>
                        <td className="TableTbodyCode">{category.code}</td>
                        <td className="TableTbodyItem">{category.name}</td>
                        <td className="TableTbodyOthers">{category.tax}</td>
                        <td className="TableTbodyOthers">
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