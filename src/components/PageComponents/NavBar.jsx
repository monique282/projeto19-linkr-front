import { useContext, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import styled from "styled-components";
import { FontHeader, Lato700 } from "../StyleComponents/StylesComponents";
import { AuthContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DebounceInput } from 'react-debounce-input';


export default function NavBar() {
  const navigate = useNavigate()
  const [image, setImage] = useState(localStorage.getItem("image"));
  const { setToken, token } = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState([]);

  const [isClicked, setClicked] = useState("false");



  useEffect(() => {
    const localImage = localStorage.getItem("image");
    setImage(localImage);
  }, [])

  // função para identificar se ouve algum clique na seta
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
      setSearchResults(response.data)
      console.log(response.data)
    });

    promise.catch(err => {
      alert(err.response.data);
    })
  }

  // essa função serve pra mostrar o nome do usuario com a 1 letra de cada nome maiuscula
  function formatName(name) {
    // divide o nome em palavras separadas por espaços
    const words = name.split(' ');

    // capitaliza a primeira letra de cada palavra
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    // Junta as palavras de volta em um nome formatado
    const formattedName = capitalizedWords.join(' ');

    return formattedName;
  }


  return (
    <Container>
      <FontHeader onClick={() => navigate("/timeline")}>linkr</FontHeader>
      <form>
        <UserSearch>
          <DebounceInput
            data-test="search"
            type="text"
            id="search"
            name="search"
            placeholder="Search for people"
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
                setSearchResults([]); // limpa os resultados se o texto for menor que 3 caracteres
              }
            }}
          />
          {searchResults.map(searchResults => (
            <DirectByLink data-test="user-search" to={`/user/${searchResults.id}`} key={searchResults.id} onClick={() => setSearchResults([])}>
              <img src={searchResults.image} alt="" />
              <Title>{formatName(searchResults.name)}</Title>
            </DirectByLink>
          ))}
        </UserSearch>
      </form>
      <figure>

        {isClicked === "false" ? (
          <StyledIconDown onClick={() => handleClick("true")} />
        ) : (
          <div data-test="menu">
            <StyledIconUp
              onClick={() => {
                handleClick("false");
              }}
              className="icon"
            />
            <button data-test="logout" onClick={() => Logout()}>
              <Lato700 style={{ letterSpacing: "0.75px", fontSize: "15px", color: "#FFF" }}>
                LogOut
              </Lato700>
            </button>
          </div>
        )}

        <img ata-test="avatar"
          src={image}
          alt="profile"
          onClick={() => {
            handleClick("false");
          }}
        />
      </figure>
    </Container>
  );
}

const Menu = styled.div`
  position: relative;

  .icon {
    color: #fff;
    font-size: 25px;
    cursor: pointer;
  }

  .open {
    display: block;
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
`;


const Title = styled.div`
    font-family: 'Lato';
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
    text-decoration: none;
    color: rgba(81, 81, 81, 1);
    margin-top: 5px;

`
const DirectByLink = styled(Link)`
    margin-top: 10px;
    display: flex;
    margin-bottom: 10px;
    text-decoration: none;
      img{
        width: 39px;
        height: 39px;
        border-radius: 304px;
        margin-left: 10px;
        margin-right: 10px;
      }
`
const UserSearch = styled.div`
    background-color: rgba(231, 231, 231, 1);
    border: none;
    border-radius: 8px;
    position: absolute;
    top: 20px;
    left: calc(50% - 280px);

`

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

