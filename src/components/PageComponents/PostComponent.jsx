import axios from "axios";
import { useContext, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbTrashFilled } from "react-icons/tb";
import { TiPencil } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import reactStringReplace from 'react-string-replace';
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import { AuthContext } from "../../contexts/UserContext.js";
import { Lato400, Lato700 } from "../StyleComponents/StylesComponents.js";

export default function Post(props) {
  const { name, image, content, url, numberLikes, userId:idUser, postId, likedUserIds } = props.post;
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(likedUserIds.includes(Number(userId)));
  const token = localStorage.getItem('token');
  const object = {headers: {'Authorization': `Bearer ${token}`}}
  const {setPosts} = useContext(AuthContext)

  function getPosts(){
    axios.get(`${process.env.REACT_APP_API_URL}/timeline`, object)
    .then(res => setPosts(res.data.rows))
    .catch(err => console.log(err))
}
  function handleToggleLike () {
    setLoading(true)
    const obj = {
      isLiked, userId:Number(userId), postId
    }

    if(token) {
      axios.post(`${process.env.REACT_APP_API_URL}/like`, obj, object)
      .then((res) => {
        setIsLiked((prevIsLiked) => !prevIsLiked);
        console.log(res)
        getPosts();
      })
      .catch(err => {
        console.log(`Error in like toggle: `, err)})
      .finally(()=> setLoading(false))
    }
  };

  return (
    <Container>
      <Info>
        <figure>
          <img src={image} alt="profile" />
        </figure>
        
        <StyledIcon 
        onClick={handleToggleLike}
        disabled={loading}
        isLiked={isLiked}/>
        <Lato700>
        <Tooltip id="my-tooltip" place="bottom" style={{ background:"rgba(255, 255, 255, 0.90)", borderRadius:"3px", color:"#505050", fontSize:"12px" }}/>
        </Lato700>
        
        <Lato400 data-tooltip-id="my-tooltip" 
        data-tooltip-content={isLiked ? "Você, fulano e outras 11 pessoas curtiram" : "Fulano, beltrano e outras 10 pessoas curtiram"} style={{ color: "#fff", fontSize: "11px" }}>
          {Number(numberLikes) === 1 ? (`${numberLikes} Like`) : (`${numberLikes} Likes`)} 
        </Lato400>
      </Info>
      <Content>
        <div className="userName">
          <Lato400 style={{ color: "#fff", fontSize: "19px" }}>{name}</Lato400>
          {Number(userId) === idUser ? (
          <div>
            <StyledPencil />
            <StyledTrash />  
          </div>) : ""}
        </div>
        <Lato400 style={{ color: "#B7B7B7", fontSize: "17px" }}>
        {reactStringReplace(content, /#(\w+)/g, (match, i) => (
            <span key={i} onClick={() => navigate(`/hashtag/${match}`)} > #{match} </span>
          ))}
        </Lato400>
      </Content>
    </Container>
  );
}

const StyledIcon = styled(({ isLiked, ...rest }) =>
isLiked ? <AiFillHeart {...rest} /> : <AiOutlineHeart {...rest} />
)`
  font-size: 16px;
  color: ${(props) => (props.isLiked ? '#AC0000' : '#fff')};
  cursor: pointer;
`;
const StyledPencil = styled(TiPencil)`
  color: #FFF;
  height: 23px;
  width: 23px;
`
const StyledTrash = styled(TbTrashFilled)`
  color: #FFF;
  height: 23px;
  width: 23px;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  gap: 7px;
  display: flex;
  flex-direction: column;
  .userName{
    display: flex;
    justify-content: space-between;
  }
  span {
    color: #fff;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;
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
