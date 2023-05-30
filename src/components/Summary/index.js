import './styles.css'
import Button from '../../components/Button'
import api from '../../services/api'





function Summary({ entrada, saida, saldo, handleCategory }) {
    return (
        <>
            <div className='content-summary'>
                <h1>Resumo</h1>

                <div className='summary-input'>
                    <div>
                        <strong>Entradas</strong>
                    </div>
                    <div>
                        <span>{entrada}</span>
                    </div>
                </div>

                <div className='summary-exit'>
                    <div>
                        <strong>Saídas</strong>
                    </div>
                    <div>
                        <span>{saida}</span>
                    </div>
                </div>

                <div className='line'></div>

                <div className='summary-balance'>
                    <div>
                        <strong>Saldo</strong>
                    </div>
                    <div>
                        <span>{saldo}</span>
                    </div>
                </div>

            </div>

            <Button
                text='Adicionar Registro'
                name='summary-btn'
                navigate={handleCategory}
            />
        </>
    )
}

export default Summary