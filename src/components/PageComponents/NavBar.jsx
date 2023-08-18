import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import styled from "styled-components";
import { FontHeader, Lato700 } from "../StyleComponents/StylesComponents";

export default function NavBar() {
  const [image, setImage] = useState(
    "https://i.pinimg.com/originals/52/37/04/5237042f152ca9cf6c54daf824f1dc5d.jpg"
  );
  const [isClicked, setClicked] = useState("false");
  function handleClick(value) {
    setClicked(value);
  }
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
            <button><Lato700 style={{letterSpacing:"0.75px", fontSize:"15px", color:"#FFF"}}>LogOut</Lato700></button>
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
