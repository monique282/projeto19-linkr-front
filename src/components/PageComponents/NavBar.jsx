import { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import styled from "styled-components";
import { FontHeader, Lato700 } from "../StyleComponents/StylesComponents";
import { AuthContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NavBar() {
  const [image, setImage] = useState(localStorage.getItem("image"));
  const { setToken, token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const localImage = localStorage.getItem("image");
    setImage(localImage);
  }, [])

  const [isClicked, setClicked] = useState("false");
  function handleClick(value) {
    setClicked(value);
  }


  // essa parte vai deslogar a pessoa
  function Logout() {

    const url = `${process.env.REACT_APP_API_URL}/logout`
    const confi = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    console.log('ate aqui')
    const promise = axios.delete(url, confi);
    promise.then(resposta => {
      // apagar o local storage
      localStorage.clear();
      setToken('');
      navigate("/");
    })
      .catch(err => {
        alert(err.response.data);
      });
  };

  return (
    <Container>
      <FontHeader>linkr</FontHeader>
      <form>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for people"
        />
      </form>
      <figure>

        {isClicked === "false" ? (
          <StyledIconDown onClick={() => handleClick("true")} />
        ) : (
          <div>
            <StyledIconUp onClick={() => handleClick("false")} />
            <button onClick={() => Logout()} ><Lato700 style={{ letterSpacing: "0.75px", fontSize: "15px", color: "#FFF" }}>LogOut</Lato700></button>
          </div>
        )}

        <img src={image} alt="profile" />
      </figure>
    </Container>
  );
}

const StyledIconDown = styled(MdKeyboardArrowDown)`
  color: #fff;
  font-size: 25px;
  cursor: pointer;
`;
const StyledIconUp = styled(MdKeyboardArrowUp)`
  color: #fff;
  font-size: 25px;
  cursor: pointer;
`;

const Container = styled.nav`
  width: 100%;
  height: 72px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  background-color: #151515;
  padding: 0px 30px 0px 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: 563px;
    height: 45px;
    padding-left: 10px;

    border: none;
    border-radius: 8px;
    background: #fff;

    color: #c6c6c6;
    font-family: Lato;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  figure {
    display: flex;
    align-items: center;
    gap: 5px;

    img {
      width: 53px;
      height: 53px;
      flex-shrink: 0;

      border-radius: 26.5px;
    }

    button {
      width: 150px;
      height: 47px;
      flex-shrink: 0;
      position: absolute;
      top: 72px;
      right: 0px;

      border-radius: 0px 0px 20px 20px;
      background: #171717;
    }
  }
`;
