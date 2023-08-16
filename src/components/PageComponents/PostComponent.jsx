import { AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";
import { Lato400 } from "../StyleComponents/StylesComponents.js";

export default function Post(props) {
  const { name, picture, content, url, tags, likes } = props.post;
  return (
    <Container>
      <Info>
        <figure>
          <img src={picture} alt="profile" />
        </figure>
        <StyledIcon />
        <Lato400 style={{ color: "#fff", fontSize: "11px" }}>
          {likes} Likes
        </Lato400>
      </Info>
      <Content>
        <Lato400 style={{ color: "#fff", fontSize: "19px" }}>{name}</Lato400>
        <Lato400 style={{ color: "#B7B7B7", fontSize: "17px" }}>
          {content}{" "}
          <span style={{ color: "#fff", fontSize: "17px" }}>
            {tags.join(" ")}
          </span>
        </Lato400>
      </Content>
    </Container>
  );
}

const StyledIcon = styled(AiOutlineHeart)`
  font-size: 16px;
  color: #fff;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  span {
    color: #fff;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const Info = styled.div`
  width: 50px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-bottom: 5px;
  }
`;

const Container = styled.div`
  width: 611px;
  height: 276px;
  flex-shrink: 0;
  padding: 18px;
  gap: 15px;

  display: flex;
  border-radius: 16px;
  background: #171717;
`;
