import './styles.css';
import api from '../../services/api';

function Filter({ categoria, setTransacoes }) {

    async function handleFilter(categoria) {
        try {

            const response = await api.get(`/transacao?filtro[]=${categoria}`);

            const transacoesDados = response.data

            setTransacoes([...transacoesDados])

        } catch (error) {
            const erro = error.response.data.mensagem
            return alert(erro)

        }
    }

    return (

        <div >
            <button onClick={() => handleFilter(categoria)} className='btn-filter-category'>{categoria} { }</button>
        </div>
    )

}
export default Filter