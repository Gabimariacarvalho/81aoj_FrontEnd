import { useState } from "react";
import axios from 'axios';
import { executeRequest } from "../services/api";
import { NextPage } from "next";
import { AccessTokenProps } from "../types/AccessTokenProps";
import { Modal } from "react-bootstrap";

import { CadastroUsuario } from "../components/CadastroUsuario";
/* eslint-disable @next/next/no-img-element */

export const Login: NextPage<AccessTokenProps>= ({
    setToken
}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [Nome, setNome] = useState('');
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [msgErro, setMsgErro] = useState('');

    const closeModal = () => {
        setNome('');
        setEmail('');
        setSenha('');
        setShowModal(false);
    }
    const doLogin = async () => {
        try {
            setLoading(true);
            setError('');
            if (!login && !password) {
                setError('Favor informar email e senha');
                setLoading(false);
                return;
            }

            const body = {
                login,
                password
            }

            const result = await executeRequest('login', 'POST', body);
            if (result && result.data) {
                localStorage.setItem('accessToken', result.data.token);
                localStorage.setItem('userName', result.data.name);
                localStorage.setItem('userMail', result.data.mail);
                setToken(result.data.token);
            } else {
                setError('Não foi possivel processar login, tente novamente');
            }
        } catch (e: any) {
            console.log(e);
            if (e?.response?.data?.error) {
                setError(e?.response?.data?.error);
            } else {
                setError('Não foi possivel processar login, tente novamente');
            }
        }

        setTimeout(() => {
            setLoading(false);
        }, 2000)

    }
    const doSave = async() => {
        try {
            setLoading(true);
            setMsgErro('');

            if (!Nome && !Email && !Senha) {
                setMsgErro('Favor informar os dados para cadastro');
                setLoading(false);
                return;
            }

            const body = {
                Nome,
                Email,
                Senha
            }

            const result = await executeRequest('user', 'POST', body);
            if (result && result.data) {
               
                closeModal();
            }
        } catch (e: any) {
            console.log(e);
            if (e?.response?.data?.error) {
                setMsgErro(e?.response?.data?.error);
            } else {
                setMsgErro('Não foi possivel cadastrar tarefa, tente novamente');
            }
        }

        setLoading(false);
    }
  

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            <form>
                <p className="error">{error}</p>
                <div className="input">
                    <img src="/mail.svg" alt="Informe seu email" />
                    <input type="text" placeholder="Informe seu email"
                        value={login} onChange={evento => setLogin(evento.target.value)} />
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Informe sua senha" />
                    <input type="password" placeholder="Informe sua senha"
                        value={password} onChange={evento => setPassword(evento.target.value)} />
                </div>
                <button type="button" onClick={doLogin} disabled={isLoading}
                    className={isLoading ? 'loading' : ''}>
                    {isLoading ? '...Carregando' : 'Login'}
                </button>
                <CadastroUsuario showModal={() => setShowModal(true)}/>
                <Modal show={showModal}
                className="container-modal">
                <Modal.Body>
                    <p>Criar Cadastro</p>
                    <input type="text"
                        placeholder="Nome"
                        value={Nome}
                        onChange={e => setNome(e.target.value)} />
                    <input type="text"
                        placeholder="Email"
                        value={Email}
                        onChange={e=> setEmail(e.target.value)} />
                        <input type="password"
                        placeholder = "Senha"
                        value={Senha}
                        onChange={e=> setSenha(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <div className="button col-12">
                        <button
                            onClick={doSave}
                            disabled={isLoading}
                        >{isLoading ? "...Enviando dados" : "Cadastrar"}</button>
                        <span onClick={closeModal}>Cancelar</span>
                    </div>
                </Modal.Footer>
            </Modal>
            </form>
        </div>
    )
}