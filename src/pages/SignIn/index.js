import './styles.css'
import '../../global.css'
import Logo from '../../components/Logo';
import Input from '../../components/Input'
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import api from '../../services/api';
import { setItem, getItem } from '../../utils/storage'


function SignIn() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();


        try {
            if (!email || !senha) {
                return alert('Preencha todos os campos')
            }

            const response = await api.post('/login', {
                email,
                senha
            });



            const { token } = response.data
            setItem('token', token)

            const { nome } = response.data.usuario
            setItem('usuario', nome)

            const { id } = response.data.usuario
            setItem('id', id)

            const emailPerfil = response.data.usuario.email

            setItem('email', emailPerfil)

            setEmail('')
            setSenha('')

            navigate('/Main')

        } catch (error) {
            const erro = error.response.data.mensagem
            return alert(erro)
        }

    }

    useEffect(() => {
        const token = getItem('token')
        if (token) {
            navigate('/Main')
        }
    }, [])

    return (
        <div className='container'>

            <Logo />
            <div className='login-description'>
                <h1>Controle suas <span>finanças</span>,
                    sem planilha chata.</h1>
                <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
                <Button
                    text='Cadastre-se'
                    name='login-btn'
                    navigate={() => navigate('/signUp')}
                />
            </div>

            <form onSubmit={handleSubmit} className='form-login'>
                <h1>Login</h1>

                <div className='form' >

                    <Input
                        type='text'
                        text='E-mail'
                        inputStyle='form-input-signIn'
                        value={email}
                        onchange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type='Password'
                        text='Password'
                        inputStyle='form-input-signIn'
                        value={senha}
                        onchange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <Button
                    text='Entrar'
                    name='form-btn-signIn'
                />


            </form>

        </div >
    );
}

export default SignIn;