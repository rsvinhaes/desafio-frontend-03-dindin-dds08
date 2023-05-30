import './styles.css';
import CloseIcon from '../../assets/closeIcon.svg'
import { useState, useEffect } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input';
import api from '../../services/api';
import Option from '../Option';
import { formatDateEdit } from '../../utils/formatDateEdit'
import { getItem, setItem } from '../../utils/storage'


function Registro({ open, setOpen, handleClose, modalEdit, setModalEdit, editId, perfilEdit, setPerfilEdit }) {

    const [tipo, setTipo] = useState('saida')
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState([]);
    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [editTipo, setEditTipo] = useState('');
    const [editValor, setEditValor] = useState('');
    const [editCategoria, setEditCategoria] = useState('');
    const [editData, setEditData] = useState('');
    const [editDescricao, setEditDescricao] = useState('');
    const [categoria_id, setCategoria_id] = useState('')
    const [editPerfilName, setEditPerfilName] = useState('')
    const [editPerfilEmail, setEditPerfilEmail] = useState('')
    const [editPerfilSenha, setEditPerfilSenha] = useState('')
    const [editPerfilConfSenha, setEditPerfilConfSenha] = useState('')


    async function handleCategory() {

        try {
            const response = await api.get('/categoria', {

            })

            const categoriaDados = response.data

            setCategoria([...categoriaDados])

        } catch (error) {
            const erro = error.response.data.mensagem

            return alert(erro)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            if (!valor || !categoria_id || !data || !descricao) {

                return alert('Preencha todos os campos')
            }

            const response = await api.post('/transacao', {
                tipo,
                valor,
                categoria_id,
                data,
                descricao
            });
            setValor('')
            setData('')
            setDescricao('')
            setOpen(false)
            setTipo('saida')

        } catch (error) {
            const erro = error.response.data.mensagem
            return alert(erro)
        }

    }

    function handleTypeEntry() {
        setTipo('entrada')
        setEditTipo('entrada')
    }

    function handleTarget(e) {
        const target = e.target.value

        setCategoria_id(target)
    }

    async function handleEditModal() {

        try {

            const response = await api.get(`/transacao/${editId}`)

            const dadosEncontrados = response.data

            setEditTipo(dadosEncontrados.tipo)
            setEditValor(`R$ ${(dadosEncontrados.valor / 100).toFixed(2)}`)
            setEditCategoria(dadosEncontrados.categoria_id)
            setEditDescricao(dadosEncontrados.descricao)
            setEditData(formatDateEdit(dadosEncontrados.data))


        } catch (error) {
            const erro = error.response
            return alert(erro)
        }

    }

    async function handleSubmitEdit(e) {

        e.preventDefault();

        try {

            if (!editValor || !editCategoria || !editData || !editDescricao) {
                return alert('Preencha todos os campos')
            }

            const response = await api.put(`/transacao/${editId}`, {
                tipo: editTipo,
                valor: editValor,
                categoria_id: editCategoria,
                data: editData,
                descricao: editDescricao
            });
            setEditValor('')
            setEditData('')
            setEditDescricao('')
            setModalEdit(false)

        } catch (error) {
            const erro = error.response.data.mensagem
            return alert(erro)
        }

    }

    function handleEditPerfil() {
        const perfilName = getItem('usuario')
        const perfilEmail = getItem('email')

        setEditPerfilName(perfilName)
        setEditPerfilEmail(perfilEmail)
    }

    async function handleSubmitPerfil(e) {
        {
            e.preventDefault(e);

            try {
                if (!editPerfilEmail || !editPerfilName || !editPerfilSenha || !editPerfilConfSenha) {
                    console.log(editPerfilEmail, editPerfilName)
                    return alert('Preencha todos os campos')
                }

                if (editPerfilSenha !== editPerfilConfSenha) {
                    return alert('A senha e a confirmação da senha devem ser iguais')
                }

                const response = await api.put('/usuario', {
                    email: editPerfilEmail,
                    nome: editPerfilName,
                    senha: editPerfilSenha
                });

                setEditPerfilSenha('')
                setEditPerfilConfSenha('')
                setPerfilEdit(false)
                setItem('usuario', editPerfilName)

            } catch (error) {
                const erro = error.response.data.mensagem
                return alert(erro)
            }
        }
    }

    useEffect(() => {
        if (modalEdit) {
            handleEditModal()
        }

    }, [editId])


    useEffect(() => {
        handleCategory()
        handleEditPerfil()

    }, [])

    return (
        <>
            {open &&
                <div className='container-modal'>

                    <div className='modal'>

                        <div className='modal-body'>

                            <div className='modal-header'>
                                <h1 className='modal-title'>Adicionar Registro</h1>
                                <img
                                    className='close'
                                    src={CloseIcon}
                                    alt="close icon"
                                    onClick={() => handleClose()}
                                />
                            </div>
                            <div className='modal-button'>
                                <Button
                                    text='Entrada'
                                    name={tipo === 'entrada' ? 'modal-button-blue' : 'modal-button-entrada'}
                                    navigate={() => handleTypeEntry()}
                                />
                                <Button
                                    text='Saída'
                                    name={tipo === 'saida' ? 'modal-button-red' : 'modal-button-saida'}
                                    navigate={() => setTipo('saida')}
                                />
                            </div>
                            <form onSubmit={handleSubmit} className='form-modal-categoria' >
                                <div>

                                    <Input
                                        text='Valor'
                                        type='text'
                                        labelStyle='form-label-categoria'
                                        inputStyle='form-input-categoria'
                                        value={valor}
                                        onchange={(e) => setValor(e.target.value)}
                                    />

                                    <label htmlFor="" className='form-label-categoria'>Categoria</label>

                                    <select className='select-categoria' name="Categorias"
                                        onChange={(e) => handleTarget(e)}  >
                                        {
                                            categoria.map((item) => (
                                                <Option
                                                    key={item.id}
                                                    value={item.id}
                                                    name={item.descricao}
                                                />
                                            ))
                                        }

                                    </select>

                                    <Input
                                        text='Data'
                                        type='date'
                                        labelStyle='form-label-categoria'
                                        inputStyle='form-input-categoria'
                                        value={data}
                                        onchange={(e) => setData(e.target.value)}
                                    />

                                    <Input
                                        text='Descrição'
                                        type='text'
                                        labelStyle='form-label-categoria'
                                        inputStyle='form-input-categoria'
                                        value={descricao}
                                        onchange={(e) => setDescricao(e.target.value)}
                                    />

                                </div>


                                <Button
                                    text='Confirmar'
                                    name='modal-button-confirmar'

                                />

                            </form>

                        </div>

                    </div>
                </div>
            }

            {modalEdit &&
                <div className='container-modal'>

                    <div className='modal'>

                        <div className='modal-body'>

                            <div className='modal-header'>
                                <h1 className='modal-title'>Editar Registro</h1>
                                <img
                                    className='close'
                                    src={CloseIcon}
                                    alt="close icon"
                                    onClick={() => handleClose()}
                                />
                            </div>
                            <div className='modal-button'>
                                <Button
                                    text='Entrada'
                                    name={editTipo === 'entrada' ? 'modal-button-blue' : 'modal-button-entrada'}
                                    navigate={() => handleTypeEntry()}
                                />
                                <Button
                                    text='Saída'
                                    name={editTipo === 'saida' ? 'modal-button-red' : 'modal-button-saida'}
                                    navigate={() => setEditTipo('saida')}
                                />
                            </div>
                            <form onSubmit={handleSubmitEdit} className='form-modal-categoria' >
                                <div>

                                    <Input
                                        text='Valor'
                                        type='text'
                                        labelStyle='form-label-categoria'
                                        inputStyle='form-input-categoria'
                                        value={editValor || ''}
                                        onchange={(e) => setEditValor(e.target.value)}
                                    />

                                    <label htmlFor="" className='form-label-categoria'>Categoria</label>

                                    <select className='select-categoria' name="Categorias"
                                        onChange={(e) => handleTarget(e)}  >
                                        {
                                            categoria.map((item) => (
                                                <Option
                                                    key={item.id}
                                                    value={item.id}
                                                    name={item.descricao}
                                                    currentId={editCategoria}
                                                />
                                            ))
                                        }

                                    </select>

                                    <Input
                                        text='Data'
                                        type='date'
                                        labelStyle='form-label-categoria'
                                        inputStyle='form-input-categoria'
                                        value={editData || ''}
                                        onchange={(e) => setEditData(e.target.value)}
                                    />

                                    <Input
                                        text='Descrição'
                                        type='text'
                                        labelStyle='form-label-categoria'
                                        inputStyle='form-input-categoria'
                                        value={editDescricao || ''}
                                        onchange={(e) => setEditDescricao(e.target.value)}
                                    />

                                </div>

                                <Button
                                    text='Confirmar'
                                    name='modal-button-confirmar'

                                />

                            </form>

                        </div>

                    </div>
                </div>
            }

            {perfilEdit &&
                <div className='container-modal'>

                    <div className='modal'>

                        <div className='modal-body'>

                            <div className='modal-header'>
                                <h1 className='modal-title'>Editar Perfil</h1>
                                <img
                                    className='close'
                                    src={CloseIcon}
                                    alt="close icon"
                                    onClick={() => handleClose()}
                                />
                            </div>

                            <form onSubmit={handleSubmitPerfil} className='form-modal-categoria' >
                                <div>

                                    <Input
                                        text='Nome'
                                        type='text'
                                        labelStyle='form-label-categoria'
                                        inputStyle='form-input-categoria'
                                        value={editPerfilName}
                                        onchange={(e) => setEditPerfilName(e.target.value)}
                                    />

                                    <Input
                                        text='Email'
                                        type='text'
                                        labelStyle='form-label-categoria'
                                        inputStyle='form-input-categoria'
                                        value={editPerfilEmail}
                                        onchange={(e) => setEditPerfilEmail(e.target.value)}
                                    />

                                    <Input
                                        text='Senha'
                                        type='password'
                                        labelStyle='form-label-categoria'
                                        inputStyle='form-input-categoria'
                                        value={editPerfilSenha}
                                        onchange={(e) => setEditPerfilSenha(e.target.value)}
                                    />

                                    <Input
                                        text='Confirmação de senha'
                                        type='password'
                                        labelStyle='form-label-categoria'
                                        inputStyle='form-input-categoria'
                                        value={editPerfilConfSenha}
                                        onchange={(e) => setEditPerfilConfSenha(e.target.value)}
                                    />

                                </div>

                                <Button
                                    text='Confirmar'
                                    name='modal-button-confirmar'

                                />

                            </form>

                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default Registro