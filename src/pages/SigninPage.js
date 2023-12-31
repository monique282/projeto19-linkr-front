
import axios from "axios";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/UserContext";



export default function SigninPage() {

    const { setToken, setImage } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    function login(e) {
        e.preventDefault();

        // dados que vão pro servidor
        const data = {
            email: email,
            password: password
        }

        const url = `${process.env.REACT_APP_API_URL}/signin`
        const promise = axios.post(url, data);
        setDisabled(true);
        promise.then(response => {
            const {token, image, userId} = response.data
            setToken(token);
            localStorage.setItem("token", token);
            localStorage.setItem("image", image);
            localStorage.setItem("userId", userId);
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
                        <Input placeholder="e-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabled} data-test="email" />
                        <Input placeholder="password" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={disabled} data-test="password" />
                        <button type='submit' disabled={disabled} data-test="login-btn">
                            {disabled ? (
                                <ThreeDots width={32} height={21} border-radius={4.5} background-color="#d540e9" color="#FFFFFF" font-size={9} diplay />
                            ) : (
                                <p>Log In</p>
                            )}
                        </button>
                        <Register to = {"/sign-up"} data-test="sign-up-link" >First time? Create an account!</Register>
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

    @media (max-width: 430px) {
        width: 100%;
        height: 100%;
        flex-direction: column;
    }
`
const Total = styled.div`
    width: 100%;
    height: 100vh; 
    display: flex;

    @media (max-width: 430px) {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
const RegisteLogin = styled.div`
    width: 60vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #151515;

    @media (max-width: 430px) {
        width: 100vw;
        height: 25vh;

        display: flex;
        justify-content: center;
        align-items: center;
  }
`
const Title = styled.p`
    font-family: 'Passion One';
    font-size: 106px;
    font-weight: 700;
    line-height: 117px;
    text-align: left;
    color: rgba(255, 255, 255, 1);
    margin-left: -228px;

    @media (max-width: 430px) {
        font-size: 56px;
        text-align: center;
        line-height: normal;
        margin-left: 0px;
    }
`
const Slogam = styled.p`
    width: 442px;
    font-family: 'Oswald';
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    text-align: left;
    color: rgba(255, 255, 255, 1);

    @media (max-width: 430px) {
        width: 70%;

        font-size: 23px;
        line-height: normal;
        text-align: center;
    }
`

const SingInContainer = styled.section`
    width: 40vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
                font-family: 'Oswald';
                display: flex;
                justify-content: center;
                align-items: center;

                @media (max-width: 430px) {
                    width: 330px;
                    height: 55px;
                    font-size: 22px;
                }
} }
@media (max-width: 430px) {
    width: 100%;
    padding: 30px;
    text-align: center;
    justify-content: flex-start;
}
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

    @media (max-width: 430px) {
        width: 330px;
        height: 55px;
        font-size: 22px;
    }
`
const Register = styled(Link)`
    font-family: 'Lato';
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: rgba(255, 255, 255, 1);

    @media (max-width: 430px) {
        font-size: 17px;
    }
`


