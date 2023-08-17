
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
                    <Title>linkr</Title>
                    <Slogam>save, share and discover
                        the best links on the web</Slogam>
                </RegisteLogin>
                <SingInContainer>
                    <form onSubmit={login}>
                        <Input placeholder="e-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabled} />
                        <Input placeholder="password" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={disabled} />
                        <button type='submit' disabled={disabled} data-test="sign-in-submit">
                            <p>Log In</p>
                        </button>
                        <Register to = {"/sing-up"}>First time? Create an account!</Register>
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
`
const RegisteLogin = styled.div`
    width: 905px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #151515;
`
const Title = styled.p`
    font-family: 'Passion One';
    font-size: 106px;
    font-weight: 700;
    line-height: 117px;
    text-align: left;
    color: rgba(255, 255, 255, 1);
    margin-left: -228px;
`
const Slogam = styled.p`
    width: 442px;
    height: 128px;
    font-family: Oswald;
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    text-align: left;
    color: rgba(255, 255, 255, 1);
`

const SingInContainer = styled.section`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 317px;
    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

            button{
                color: #ffff;
                width: 429px;
                height: 65px;
                border-radius: 10px;
                margin-top: 10px;
                border-radius: 6px;
                background-color: rgba(24, 119, 242, 1);
                border: none;
                text-align: center;
                font-size: 27px ;
                font-weight: 700;
                line-height: 40px;
                margin-bottom: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
} }
`
const Input = styled.input`
    width: 429px;
    height: 65px;
    margin-top: 10px;
    border-radius: 6px;
    background: #FFF;
    outline: none;
    padding: 15px;
    font-size: 27px;
    color: rgba(159, 159, 159, 1);
    font-family: 'Oswald';
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    text-align: left;

`
const Register = styled(Link)`
    font-family: 'Lato';
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: rgba(255, 255, 255, 1);
`


