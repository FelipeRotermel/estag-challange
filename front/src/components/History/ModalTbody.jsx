function ModalTbody({item, specialChars}) {

    return (
        <tbody className='HistoryModalContentItems'>
            {item.map((product) => {

                /* Verificação de caracteres especiais */
                if (specialChars.test(product.name)) {
                    return;
                }

                return (
                    <tr key={product.code}>
                        <td className='HistoryItem'>{product.code}</td>
                        <td className='HistoryItem'>{product.name}</td>
                        <td className='HistoryItem'>{parseFloat(product[4]).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</td>
                        <td className='HistoryItem'>{product[3]}</td>
                        <td className='HistoryItem'>{(product[3] * product[4]).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</td>
                    </tr>
                )
            })}
        </tbody>
    )

}

export default ModalTbody;