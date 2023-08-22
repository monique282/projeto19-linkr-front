import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbTrashFilled } from "react-icons/tb";
import { TiPencil } from "react-icons/ti";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import { AuthContext } from "../../contexts/UserContext.js";
import { configToken } from "../../services/api.js";
import { Lato400, Lato700 } from "../StyleComponents/StylesComponents.js";

export default function Post(props) {
  const {
    name,
    image,
    content,
    url,
    numberLikes,
    userId: idUser,
    postId,
    likedUserIds,
  } = props.post;

  const {
    setUserPosts,
    id,
    likes = [],
    setUserLikes,
    setInfo,
    setHashtagPosts,
    setHashtagLikes,
    hashtag,
    setAtualizeHashtag
  } = props;

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setContent] = useState(content);
  const [hashtags, setHashtags] = useState([]);
  const [isLiked, setIsLiked] = useState(likedUserIds.includes(Number(userId)));
  
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    image: undefined,
  });
  const [isEditign, setIsEditing] = useState(false)
  const token = localStorage.getItem("token");
  const object = { headers: { Authorization: `Bearer ${token}` } };

  const { setPosts, setLikes } = useContext(AuthContext);
  const contentEdit = useCallback((inputElement)=> {
    if(inputElement) inputElement.focus()
  }, [])
  function getPosts(){
    axios
    .get(`${process.env.REACT_APP_API_URL}/timeline`, object)
    .then((res) => setPosts(res.data.rows))
    .catch((err) =>alert(err.response.data))
  }
  function getLikes(){
    const URL = `${process.env.REACT_APP_API_URL}/likes`;
    axios
      .get(URL, object)
      .then((res) => {setLikes(res.data)})
      .catch((err) => alert(err.response.data));
    }
  useEffect(() => {
    const extractedHashtags = [];
    reactStringReplace(postContent, /#(\w+)/g, (match, i) => {
      extractedHashtags.push(match);
    });
    setHashtags(extractedHashtags)
  }, [postContent]);

  useEffect(()=>{
    if ( setAtualizeHashtag ) setAtualizeHashtag(prev => !prev);
  },[numberLikes])

  useEffect(() => {
    if (token) {
      getPosts();
      getLikes();
    }
  }, [loading]);

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


  function likesTooltip() {
    if (likes.length === 0) {
      return "Ninguém curtiu ainda";
    } else if (isLiked) {
      if (likes.length === 1) {
        return "Apenas você curtiu";
      } else {
        const firstLikedUser = likedUserIds[0] === userId ? likes[1] : likes[0];
        const otherLikedUsers =
          likedUserIds[0] !== userId ? likes.slice(2) : likes.slice(1);

        const othersText = `e outros ${numberLikes - 2} curtiram`;

        if (otherLikedUsers.length === 0) {
          return `Você e ${firstLikedUser} curtiram`;
        } else if (otherLikedUsers.length === 1) {
          return `Você, ${firstLikedUser} e ${otherLikedUsers[0]} curtiram`;
        } else {
          return `Você, ${firstLikedUser}, ${otherLikedUsers[0]} ${othersText}`;
        }
      }
    } else {
      if (likes.length === 1) {
        return `Apenas ${likes[0]} curtiu`;
      } else if (likes.length === 2) {
        return `${likes[0]} e ${likes[1]} curtiram`;
      } else {
        return `${likes.slice(0, 2).join(", ")} e outros ${
          numberLikes - 2
        } curtiram`;
      }
    }
  }

  function handleEditPost() {
    setIsEditing(!isEditign)
  }

  function handleToggleLike() {
    setLoading(true);
    const obj = {
      isLiked,
      userId: Number(userId),
      postId,
    };

    if (token) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/like`, obj, object)
        .then((res) => {
          setIsLiked((prevIsLiked) => !prevIsLiked);
          if (id !== undefined) {
            axios
              .get(`${process.env.REACT_APP_API_URL}/user/${id}`, object)
              .then((res) => {
                setInfo(res.data);
                setUserPosts(res.data.posts);
              })
              .catch((res) => console.log(res));

            const URL = `${process.env.REACT_APP_API_URL}/likes/${id}`;
            axios
              .get(URL, object)
              .then((res) => setUserLikes(res.data))
              .catch((err) => console.log(err));
          }

          if (hashtag !== undefined) {
            const URL = process.env.REACT_APP_API_URL;
            const headers = configToken();

            axios
              .get(`${URL}/likes`, headers)
              .then((res) => {
                setLikes(res.data)
                setHashtagLikes(res.data);
              })
              .catch((err) => console.log(err));

            axios
              .get(`${URL}/hashtag/${hashtag}`, headers)
              .then((res) => {
                setHashtagPosts(res.data);
              })
              .catch((err) => console.log(err));
          } else {
            axios
              .get(`${process.env.REACT_APP_API_URL}/timeline`, object)
              .then((res) => setPosts(res.data.rows))
              .catch((err) => console.log(err));

            const URL = `${process.env.REACT_APP_API_URL}/likes`;
            const config = configToken();
            axios
              .get(URL, config)
              .then((res) => setLikes(res.data))
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          console.log(`Error in like toggle: `, err);
        })
        .finally(() => setLoading(false));
    }
  }

  // essa função vai ser para abrir fechar o modal e chamar a função que expliu o post
  function handleDeleteConfirmation() {
    setIsModalOpen(false);
    Delete(postId);
  }
  function handleKeyEvent(event){
      if(event.key === "Escape") {
        setIsEditing(false)
        setContent(content)
      }
      if(event.key === "Enter") {
        setLoading(true)
        const obj = {
          content: postContent,
          hashtags
        }
        axios.patch(`${process.env.REACT_APP_API_URL}/edit/${postId}`, obj)
        .then(() => setIsEditing(false))
        .catch(err => alert(err.response.data))
        .finally(()=> setLoading(false))
      }
  }
  
  function Delete(id) {
    const url = `${process.env.REACT_APP_API_URL}/postDelete/${id}`;
    const promise = axios.delete(url);
    promise.then((response) => {
      setIsModalOpen(false);
      window.location.reload();
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  }

  return (
    <Container data-test="post">
      <Info>
        <figure>
          <img src={image} alt="profile" />
        </figure>

        <StyledIcon
          onClick={handleToggleLike}
          disabled={loading}
          isLiked={isLiked}
          data-test="like-btn"
        />
        <Lato700>
          <Tooltip
            id="my-tooltip"
            place="bottom"
            style={{
              background: "rgba(255, 255, 255, 0.90)",
              borderRadius: "3px",
              color: "#505050",
              fontSize: "12px",
            }}
            data-test="tooltip"
          />
        </Lato700>

        <Lato400
          data-tooltip-id="my-tooltip"
          data-tooltip-content={likesTooltip()}
          style={{ color: "#fff", fontSize: "11px" }}
          data-test="counter"
        >
          {Number(numberLikes) === 1
            ? `${numberLikes} Like`
            : `${numberLikes} Likes`}
        </Lato400>
      </Info>
      <Content>
        <div className="userName">
          <Link to={`/user/${props.post.userId}`}>
            <Lato400
              style={{ color: "#fff", fontSize: "19px" }}
              data-test="username"
            >
              {name}
            </Lato400>
          </Link>
          {Number(userId) === idUser ? (
            <div>
              <StyledPencil data-test="edit-btn" onClick={handleEditPost}/>
              <StyledTrash data-test="delete-btn" onClick={() => setIsModalOpen(true)} />
            </div>
          ) : (
            ""
          )}
        </div>
        {isEditign ? 
        (<EditInput 
          value={postContent}
          disabled={loading} 
          onBlur={()=> {setIsEditing(false)
          setContent(content)}}
          onKeyDown={handleKeyEvent}
          onChange={(event)=> setContent(event.target.value)} 
          ref={contentEdit}/>) : 
        (<Lato400
          style={{ color: "#B7B7B7", fontSize: "17px" }}
          data-test="description">
          {reactStringReplace(content, /#(\w+)/g, (match, i) => (
            <span key={i} onClick={() => navigate(`/hashtag/${match}`)}>
              {" "}
              #{match}{" "}
            </span>
          ))}</Lato400>)
          }
        <a href={url} target="_blank" data-test="link">
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

      {/* caixa que mostra se realmente a pessoa quer apagar o post */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            zIndex: 1000,
            backgroundColor: " rgba(255, 255, 255, 0.9)",
          },
          content: {
            width: "597px",
            height: "262px",
            margin: "auto",
            borderRadius: "50px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
            marginBottom: "10px",
            backgroundColor: "rgba(51, 51, 51, 1)",
            color: "rgba(255, 255, 255, 1)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Delete Confirmation"
      >
        <p style={{
          fontFamily: "Lato",
          fontSize: "34px",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "30px"
        }} >Are you sure you want to delete this post?</p>
        <div style={{ display: "flex" }} >
          <button onClick={() => setIsModalOpen(false)}
            style={{
              marginRight: "10px",
              width: "134px",
              height: "37px",
              borderRadius: "5px",
              fontFamily: "Lato",
              fontSize: "18px",
              fontWeight: "700",
              lineHeight: "22px",
              color: "rgba(24, 119, 242, 1)",
              backgroundColor: "rgba(255, 255, 255, 1)",
            }}
          >
            No, go back
          </button>
          <button
            onClick={handleDeleteConfirmation}
            style={{
              marginRight: "10px",
              width: "134px",
              height: "37px",
              borderRadius: "5px",
              fontFamily: "Lato",
              fontSize: "18px",
              fontWeight: "700",
              lineHeight: "22px",
              backgroundColor: "rgba(24, 119, 242, 1)",
              color: "rgba(255, 255, 255, 1)",
            }}
          >
            Yes, delete it
          </button>
        </div>
      </Modal>
    </Container>
  );
}

const SCMetadata = styled.div`
  width: 100%;
  min-height: 155px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #4d4d4d;
  border-radius: 11px;

  div {
    :first-child {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 15px;
      h3 {
        :first-child {
          color: #cecece;
          font-size: 16px;
        }
        :nth-child(2) {
          color: #9b9595;
          font-size: 11px;
          line-height: 13px;
        }
        :last-child {
          color: #cecece;
          font-size: 11px;
          line-height: 13px;
        }
      }
    }
    :last-child {
      width: 155px;
      height: 155px;
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
    width: 155px;
    height: 100%;
    border-radius: 11px;
  }
`;

const StyledIcon = styled(({ isLiked, ...rest }) =>
  isLiked ? <AiFillHeart {...rest} /> : <AiOutlineHeart {...rest} />
)`
  font-size: 16px;
  color: ${(props) => (props.isLiked ? "#AC0000" : "#fff")};
  cursor: pointer;
`;
const StyledPencil = styled(TiPencil)`
  color: #fff;
  height: 23px;
  width: 23px;
`;
const StyledTrash = styled(TbTrashFilled)`
  color: #fff;
  height: 23px;
  width: 23px;
`;
const EditInput = styled.input`
  font-size: 14px;
  color: #4c4c4c;
  font-family: Lato;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 7px;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  gap: 7px;
  display: flex;
  flex-direction: column;
  .userName {
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
    text-decoration: none;
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
