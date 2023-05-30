import './style.css'
import '../../global.css'
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';




function SignUp() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');


    async function handleSubmit(e) {
        e.preventDefault();


        try {
            if (!email || !nome || !senha || !confSenha) {

                return alert('Preencha todos os campos')
            }

            if (senha !== confSenha) {
                return alert('A senha e a confirmação da senha devem ser iguais')
            }

            const response = await api.post('/usuario', {
                email,
                nome,
                senha
            });

            alert('usuário cadastrado com sucesso')

            setNome('')
            setEmail('')
            setSenha('')
            setConfSenha('')

            navigate('/')


        } catch (error) {
            const erro = error.response.data.mensagem
            return alert(erro)
        }

    }

    function handleNavigate() {
        navigate('/')
    }

    return (
        <div className='container'>

            <Logo
                onClick={handleNavigate}
            />
            <form onSubmit={handleSubmit} className='form-container-signUp' >
                <h1>Cadastre-se</h1>

                <div className='form-signUp'>
                    <Input
                        text='Nome'
                        type='text'
                        inputStyle='form-input-signUp'
                        value={nome}
                        onchange={(e) => setNome(e.target.value)}
                    />
                    <Input
                        text='E-mail'
                        type='text'
                        inputStyle='form-input-signUp'
                        value={email}
                        onchange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        text='Senha'
                        type='password'
                        inputStyle='form-input-signUp'
                        value={senha}
                        onchange={(e) => setSenha(e.target.value)}
                    />
                    <Input
                        text='Confirmação da Senha'
                        type='password'
                        inputStyle='form-input-signUp'
                        value={confSenha}
                        onchange={(e) => setConfSenha(e.target.value)}
                    />
                </div>

                <Button
                    text='Cadastrar'
                    name='form-btn-signUp'
                />
                <span>Já tem cadastro? <span onClick={handleNavigate}>Clique aqui!</span></span>

            </form>
        </div>
    );
}

export default SignUp;