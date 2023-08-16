
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/UserContext";



export default function SigninPage() {

    const { setToken, setName } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    function login(e) {
        e.preventDefault();

        // dados que vão pro servidor
        const data = {
            email: email,
            password: password,
        }

        const url = `${process.env.REACT_APP_API_URL}/signin`
        const promise = axios.post(url, data);
        setDisabled(true);
        promise.then(response => {
            setToken(response.data.token);
            setName(response.data.name)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("photo", response.data.photo);
            navigate("/timeline");
        });
        promise.catch(err => {
            alert(err.response.data.message);
            setDisabled(false);
        });
    }

    return (
        < Total>

            <Backgroun>
                <RegisteLogin>
                    testandp
                </RegisteLogin>
                <SingInContainer>
                    <form onSubmit={login}>
                        <Input placeholder="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabled} />
                        <Input placeholder="Senha" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={disabled} />
                        <button type='submit' disabled={disabled} data-test="sign-in-submit">
                            <p>Entrar</p>
                        </button>
                    </form>
                </SingInContainer>
            </Backgroun>

        </Total>
    )
}
const Backgroun = styled.div`
    background: #333;
    height: 100%;
    display: flex;
    justify-content:center;
`
const Total = styled.div`
    width: 100%;
    height: 100vh; 
    display: flex;
`;
const RegisteLogin = styled.div`
    width: 905px;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    background-color: #151515;
`

const SingInContainer = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

            button{
                color: wheat;
                width: 769px;
                height: 60px;
                border-radius: 10px;
                margin-top: 25px;
                border-radius: 12px;
                border: 1px solid rgb(230, 68, 225);
                background: #FFF;
                box-shadow: 0px 4px 24px 0px rgb(230, 68, 225);
                background-color: #d540e9;
            }
    }
    
`
const Input = styled.input`
    width: 769px;
    height: 60px;
    margin-top: 10px;
    border-radius: 12px;
    border: 1px solid rgba(216, 47, 232, 0.916);
    background: #FFF;
    box-shadow: 0px 4px 10px 0px rgba(216, 47, 232, 0.916);
    outline: none;
    padding: 15px;
    font-size: 15px;
`