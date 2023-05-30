import './styles.css'
import editImage from '../../assets/editImage.svg'
import deleteImage from '../../assets/deleteImage.svg'
import { useState, useEffect } from 'react'
import api from '../../services/api'





function Dados({ id, data, dia, descricao, categoria, valor, type, setModalEdit, setEditId, handleRecords, handleSummary }) {

    const [modalDelete, setModalDelete] = useState(false)


    async function handleDeleteTransacao() {
        try {

            const response = await api.delete(`/transacao/${id}`);

            setModalDelete(false)

        } catch (error) {
            const erro = error.response.data.mensagem
            return alert(erro)
        }
    }

    async function handleModalEdit(id) {
        setModalEdit(true)
        setEditId(id)
    }
    useEffect(() => {
        handleRecords()
        handleSummary()
    }, [modalDelete])


    return (
        <>
            <div className='dados-list-category'>
                <div className='dados-category-date' >
                    <span>{data}</span>
                </div>

                <div>
                    <span>{dia}</span>
                </div>

                <div>
                    <span>{descricao}</span>
                </div>

                <div>
                    <span>{categoria}</span>
                </div>

                <div className={type}>
                    <span >{`R$ ${((valor / 100).toFixed(2)).replace('.', ',')}`}</span>
                </div>

                <div className='dados-btn' >
                    <img onClick={() => handleModalEdit(id)} src={editImage} alt="editar" />
                    <img onClick={() => setModalDelete(true)} src={deleteImage} alt="deletar" />
                </div>

                {
                    modalDelete && (
                        <div className='modal-delete'>
                            <h3 className='text-modal-delete' >Apagar item?</h3>
                            <div className='button-modal-delete'>
                                <button onClick={() => handleDeleteTransacao(id)} className='button-blue' >Sim</button>
                                <button onClick={() => setModalDelete(false)} className='button-red' >Não</button>
                            </div>
                        </div>
                    )
                }

            </div>



        </>
    )
}

export default Dados