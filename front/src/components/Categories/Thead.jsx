function Thead() {

    function FilterByName() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.querySelector(".FilterInput");
        filter = input.value.toUpperCase();
        table = document.querySelector(".ProductsTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }

    return (
        <thead className="CategoriesProductsTableThead">
            <tr>
                <th className="TableTheadCode">Code</th>
                <th className="TableTheadItem"><input className="FilterInput" type="text" onKeyUp={FilterByName} placeholder="Category" /></th>
                <th className="TableTheadOthers">Tax</th>
                <th className="TableTheadOthers">Action</th>
            </tr>
        </thead>
    )

}

export default Thead;