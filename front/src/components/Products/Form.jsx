function Form({categories, specialChars}) {

    return( 
        <form className="Column" action="http://localhost/routes/products.php" method="POST">
            <input 
                type="hidden" 
                name="action" 
                value="post"
            />
            <input
                className="TextInput" 
                placeholder="Product Name"
                pattern="[a-zA-Z0-9]+"
                maxLength="100" 
                name="name" 
                type="text" 
                id="name"
                required
            />
            <input 
                className="TextInput"
                placeholder="Amount" 
                pattern="[0-9]+"
                type="number" 
                name="amount" 
                id="amount" 
                max="9999" 
                required
                min="1"
            />
            <input 
                className="TextInput"
                placeholder="Price" 
                pattern="[0-9]+"
                type="number" 
                name="price" 
                id="price" 
                max="9999" 
                required
                min="1"
            />
            <select className="TextInput" id="category" name="category_code">
                {categories.map((category) => {

                    /* Verificação de caracteres especiais */
                    if (specialChars.test(category.name)) {
                        return;
                    }
                    
                    return (
                        <option key={category.code} value={category.code}>{category.name}</option>
                    )
                })}
                </select>
            <br/><br/>
            <button className="AddButton" type="submit">Add Product</button>
        </form>
    )

}

export default Form;