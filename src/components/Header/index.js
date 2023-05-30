import './styles.css'
import btn from '../../assets/btnClose.svg'
import logo from '../../assets/logo.svg'
import avatar from '../../assets/avatar.svg'
import { getItem, setItem } from '../../utils/storage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Header({ setPerfilEdit }) {
    const navigate = useNavigate()

    const userName = getItem('usuario')

    function handleEditPerfil() {
        setPerfilEdit(true)
    }

    function handleLogout() {
        setItem('token', '')
        navigate('/')
    }

    useEffect(() => {

    }, [])

    return (
        <>
            <header className='container-header' >
                <div className='logo-main'>
                    <img src={logo} alt="logo" />
                </div>

                <div className='header-login' >
                    <div>
                        <img
                            onClick={() => handleEditPerfil()}
                            src={avatar}
                            alt="btn"
                        />
                    </div>
                    <div>
                        <h1>{userName}</h1>
                    </div>
                    <div>
                        <img
                            onClick={() => handleLogout()}
                            src={btn}
                            alt="btn"
                        />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header