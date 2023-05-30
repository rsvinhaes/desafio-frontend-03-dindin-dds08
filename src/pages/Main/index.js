
import './style.css';
import Header from '../../components/Header'
import btnFilter from '../../assets/btnFilter.svg'
import upImage from '../../assets/upImage.svg'
import Summary from '../../components/Summary';
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Dados from '../../components/Dados';
import { formatDate } from '../../utils/formatDate'
import { formatDay } from '../../utils/formatDay'
import Registro from '../../components/Registro';
import Filter from '../../components/Filter';


function Main() {

  const [entrada, setEntrada] = useState('')
  const [saida, setSaida] = useState('')
  const [saldo, setSaldo] = useState('')
  const [transacoes, setTransacoes] = useState([])
  const [open, setOpen] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [editId, setEditId] = useState('')
  const [perfilEdit, setPerfilEdit] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)

  async function handleSummary() {

    try {

      const response = await api.get('/transacao/extrato', {

      });

      const valorEntrada = response.data.entrada / 100
      const valorSaida = response.data.saida / 100
      const valorSaldo = valorEntrada - valorSaida

      setEntrada(`R$ ${(valorEntrada.toFixed(2)).replace('.', ',')}`)
      setSaida(`R$ ${(valorSaida.toFixed(2)).replace('.', ',')}`)
      setSaldo(`R$ ${(valorSaldo.toFixed(2)).replace('.', ',')}`)

    } catch (error) {
      const erro = error.response.data.mensagem
      return alert(erro)

    }
  }

  async function handleRecords() {
    try {

      const response = await api.get('/transacao', {

      });

      const transacoesDados = response.data

      setTransacoes([...transacoesDados])

    } catch (error) {
      const erro = error.response.data.mensagem
      return alert(erro)

    }
  }

  function handleClose() {
    setOpen(false)
    setModalEdit(false)
    setPerfilEdit(false)
  }

  function handleOpen() {
    setOpen(true)
  }

  function handleFilter() {
    openFilter === true ? setOpenFilter(false) : setOpenFilter(true)
  }

  useEffect(() => {
    handleSummary()
    handleRecords()

  }, [open, modalEdit])

  return (
    <div className='container-main' >
      <Header
        setPerfilEdit={setPerfilEdit}
      />

      <div className='container-main-dados' >
        <div onClick={handleFilter} className='btn-filter' >
          <div><img src={btnFilter} alt="btn-filter" /></div>
          <div><span>Filtrar</span></div>
        </div>
        <>
          {openFilter && <div className='filter-container'>
            <div className='filter-container-dados'>
              <div>
                <h1>Categoria</h1>
              </div>

              <div className='filter-dados'>
                {transacoes.map((item) => (
                  <Filter
                    key={item.id}
                    id={item.id}
                    categoria={item.categoria_nome}
                    setTransacoes={setTransacoes}
                  />
                ))}
              </div>

              <div className='btn-filter-select'>
                <button onClick={handleRecords} className='btn-clear'>Limpar Filtro</button>
                <button className='btn-insert'>Aplicar Filtro</button>
              </div>
            </div>
          </div>
          }
        </>

        <div>
          <div className='category-main'>
            <div className='list-category'>
              <div className='date'>
                <span>Data</span>
                <img src={upImage} alt="seta para cima" />
              </div>
              <div>
                <span>Dia da semana</span>
              </div>
              <div>
                <span>Descrição</span>
              </div>
              <div>
                <span>Categoria</span>
              </div>
              <div>
                <span>Valor</span>
              </div>
              <div className='list-category-names'>
                <strong></strong>
              </div>
            </div>
            <div>
              {transacoes.map((item) => (
                <Dados
                  key={item.id}
                  id={item.id}
                  data={formatDate(item.data)}
                  dia={formatDay(item.data)}
                  descricao={item.descricao}
                  categoria={item.categoria_nome}
                  valor={item.valor}
                  type={item.tipo}
                  setModalEdit={setModalEdit}
                  setEditId={setEditId}
                  handleRecords={handleRecords}
                  handleSummary={handleSummary}
                />

              ))}
            </div>
          </div>

          <Summary
            entrada={entrada}
            saida={saida}
            saldo={saldo}
            handleCategory={handleOpen}
          />

        </div>
      </div>

      <Registro
        open={open}
        handleClose={handleClose}
        setOpen={setOpen}
        modalEdit={modalEdit}
        setModalEdit={setModalEdit}
        editId={editId}
        perfilEdit={perfilEdit}
        setPerfilEdit={setPerfilEdit}
      />

    </div>

  );
}

export default Main;
