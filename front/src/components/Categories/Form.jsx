function Form() {

    return (
        <form className="Column CategoryColumn" action="http://localhost/routes/categories.php" method="POST">
            <input 
                type="hidden" 
                name="action" 
                value="post"
            />
            <input 
                placeholder="Category Name" 
                className="TextInput" 
                pattern="[a-zA-Z0-9]+"
                maxLength="100" 
                type="text" 
                name="name"
                id="name" 
                required    
            />
            <input 
                className="TextInput"
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
            <button className="AddButton" type="submit">Add Category</button>
        </form>
    )

}

export default Form;