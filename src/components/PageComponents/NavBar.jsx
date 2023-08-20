import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DebounceInput } from 'react-debounce-input';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/UserContext";
import { FontHeader, Lato700 } from "../StyleComponents/StylesComponents";


export default function NavBar() {
  const navigate = useNavigate()
  const [image, setImage] = useState(localStorage.getItem("image"));
  const { setToken, token } = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);



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

  // Função para realizar a busca no servidor
  function performSearchNoServer(name) {
    const url = `${process.env.REACT_APP_API_URL}/search/${name}`
    
    const promise = axios.get(url)
    promise.then((response) => {
      // Atualiza os resultados da busca
      // setSearchResults(response.data)
      console.log(response.data)
    });

    promise.catch(err => {
      alert(err.response.data);
    })
  }

  // // essa junção é pra quando gor clicado em qualque ligar fora do logout, para ele fechar
  // function handleClick(value) {
  //   setMenuOpen(value === "true");
  // }
  

  return (
    <Container>
      <FontHeader onClick={() => navigate("/timeline")}>linkr</FontHeader>
      <form>
        <DebounceInput
          type="text"
          id="search"
          name="search"
          placeholder="Search for people"
          value={searchResults}
          minLength={3}
          debounceTimeout={300}
          onChange={(e) => {
            const searchText = e.target.value;
            console.log(e.target.value)
            // if (searchText.length < 3) {
            //   return alert("É necessário no mínimo 3 carateres para fazer a busca")
            // }
            if (searchText.length >= 3) {
              performSearchNoServer(searchText); //  função de busca no servidor
            } else {
              setSearchResults([]); // Limpa os resultados se o texto for menor que 3 caracteres
            }
          }}
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
