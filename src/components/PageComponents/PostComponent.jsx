import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbTrashFilled } from "react-icons/tb";
import { TiPencil } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import reactStringReplace from 'react-string-replace';
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import { AuthContext } from "../../contexts/UserContext.js";
import { configToken } from "../../services/api.js";
import { Lato400, Lato700 } from "../StyleComponents/StylesComponents.js";

export default function Post(props) {
  const { name, image, content, url, numberLikes, userId:idUser, postId, likedUserIds } = props.post;
  const { id } = props;
  const { setInfo } = props;
  const { likes } = props;
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(likedUserIds.includes(Number(userId)));
  const token = localStorage.getItem('token');
  const object = {headers: {'Authorization': `Bearer ${token}`}}
  const {setPosts, setLikes} = useContext(AuthContext)
  const [metadata, setMetadata] = useState({ title: "", description: "", image: undefined})

  useEffect(() => {

    if (url) {
      axios
        .get(`https://jsonlink.io/api/extract?url=${url}`)
        .then((res) => {
          const { title, description, images } = res.data;
          setMetadata((prevMetadata) => ({
            title,
            description,
            image: images[0],
          }));
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  async function getPosts(){
    if (id) {
      axios
      .get(`${process.env.REACT_APP_API_URL}/user/${id}`, object)
      .then((res) => {
        setInfo(res.data);
        setPosts(res.data.posts);
        console.log(res)
      })
      .catch((res) => console.log(res))
    }
    else {
      axios.get(`${process.env.REACT_APP_API_URL}/timeline`, object)
      .then(res => setPosts(res.data.rows))
      .catch(err => console.log(err))
    }
}

  async function getLikes () {
  const URL = `${process.env.REACT_APP_API_URL}/likes`
  const config = configToken();
  axios.get(URL, config)
      .then( res => setLikes(res.data) )
      .catch(err => console.log(err))
}

  function handleToggleLike () {
    setLoading(true)
    const obj = {
      isLiked, userId: Number(userId), postId
    }

    if (token) {
      axios.post(`${process.env.REACT_APP_API_URL}/like`, obj, object)
      .then((res) => {
        setIsLiked((prevIsLiked) => !prevIsLiked);
        console.log(res)
        getLikes();
        getPosts();
      })
      .catch(err => {
       console.log(`Error in like toggle: `, err)})
      .finally(()=> setLoading(false))
    }
  };

  return (
    <Container data-test="post" >
      <Info>
        <figure>
          <img src={image} alt="profile" />
        </figure>

        <StyledIcon
          onClick={handleToggleLike}
          disabled={loading}
          isLiked={isLiked}
          data-test="like-btn" />
        <Lato700>
          <Tooltip id="my-tooltip" place="bottom" style={{ background: "rgba(255, 255, 255, 0.90)", borderRadius: "3px", color: "#505050", fontSize: "12px" }} data-test="tooltip" />
        </Lato700>

        <Lato400 data-tooltip-id="my-tooltip"
          data-tooltip-content={
            (likes.length===0) ? 'Ninguém curtiu ainda' : (isLiked && likes.length===1) ? 'Apenas você curtiu' : (isLiked && likes.length>1) ? `Você, ${likedUserIds[0]!== userId ? likes[0] : likes[1]} e outros ${numberLikes - 2} curtiram` : (!isLiked && likes.length===1) ? `Apenas ${likes[0]} curtiu` : `${likes.slice(0,2).join(', ')} e outras ${numberLikes-2} curtiram`
          }
          style={{ color: "#fff", fontSize: "11px" }}
          data-test="counter">
          {Number(numberLikes) === 1 ? (`${numberLikes} Like`) : (`${numberLikes} Likes`)}
        </Lato400>


      </Info>
      <Content>
        <div className="userName">
          <Lato400 style={{ color: "#fff", fontSize: "19px" }} data-test="username" >{name}</Lato400>
          {Number(userId) === idUser ? (
            <div>
              <StyledPencil />
              <StyledTrash />
            </div>) : ""}
        </div>
        <Lato400 style={{ color: "#B7B7B7", fontSize: "17px" }} data-test="description" >
          {reactStringReplace(content, /#(\w+)/g, (match, i) => (
            <span key={i} onClick={() => navigate(`/hashtag/${match}`)} > #{match} </span>
          ))}
        </Lato400>
        <a href={url} target='_blank' data-test='link' >
          <SCMetadata>
            <div>
              <Lato400>{metadata.title}</Lato400>
              <Lato400>{metadata.description}</Lato400>
              <Lato400>{url}</Lato400>
            </div>
            <div>
            {metadata.image && (
              <img src={metadata.image} alt={metadata.title} />
            )}
            </div>
          </SCMetadata>
        </a>

      </Content>

    </Container>
  );
}

const SCMetadata = styled.div`
  width:100%;
  min-height:155px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #4D4D4D;
  border-radius: 11px;

  div {
    :first-child{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 15px;
      h3{
        :first-child{
          color: #CECECE;
          font-size: 16px;
        }
        :nth-child(2){
          color: #9B9595;
          font-size: 11px;
          line-height:13px;
        }
        :last-child{
          color: #CECECE;
          font-size: 11px;
          line-height:13px;
        }
      }
    }
    :last-child {
      width:155px;
      height:155px;
    }
  }

  p {
    color: #fff;
    font-family: Lato;
    font-size: 14px;
    font-weight: 400;
    margin: 0;
  }

  img {
    width:155px;
    height:100%;
    border-radius:11px;
  }
`;

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
  a {
    text-decoration:none;
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
