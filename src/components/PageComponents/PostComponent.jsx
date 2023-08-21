import axios from "axios";
import Modal from "react-modal";
import styled from "styled-components";
import reactStringReplace from "react-string-replace";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TiPencil } from "react-icons/ti";
import { TbTrashFilled } from "react-icons/tb";
import { Lato400, Lato700 } from "../StyleComponents/StylesComponents.js";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/UserContext.js";
import { configToken } from "../../services/api.js";

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
  const { likes } = props;
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(
    likedUserIds?.includes(Number(userId))
  );
  const token = localStorage.getItem("token");
  const object = { headers: { Authorization: `Bearer ${token}` } };
  const { setPosts, setLikes, posts } = useContext(AuthContext);
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    image: undefined,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  async function getPosts() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/timeline`, object)
      .then((res) => setPosts(res.data.rows))
      .catch((err) => console.log(err));
  }

  async function getLikes() {
    const URL = `${process.env.REACT_APP_API_URL}/likes`;
    const config = configToken();
    axios
      .get(URL, config)
      .then((res) => setLikes(res.data))
      .catch((err) => console.log(err));
  }
  function likesMessage() {
    if (likes.length === 0) {
      return "Ninguém curtiu ainda";
    } else if (isLiked) {
      if (likes.length === 1) {
        return "Apenas você curtiu";
      } else {
        const firstLikedUser = likedUserIds[0] !== userId ? likes[1] : likes[0];
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
          console.log(res);
          getLikes();
          getPosts();
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

  function Delete(id) {
    console.log(id);
    const url = `${process.env.REACT_APP_API_URL}/postDelete/${id}`;
    const promise = axios.delete(url);
    promise.then((response) => {
      alert("Produto deletado");
      getPosts();
      setIsModalOpen(false);
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  }

  return (
    <Container data-test="post">
      <Info>
        <figure>
          <img
            onClick={() => navigate(`/user/${idUser}`)}
            src={image}
            alt="profile"
          />
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
          data-tooltip-content={
            likesMessage()
          }
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
          <Lato400
            style={{ color: "#fff", fontSize: "19px" }}
            onClick={() => navigate(`/user/${idUser}`)}
            data-test="username"
          >
            {name}
          </Lato400>
          {Number(userId) === idUser ? (
            <div>
              {/* <StyledPencil /> */}

              <StyledTrash onClick={() => setIsModalOpen(true)} />
            </div>) : ""}
        </div>
        <Lato400
          style={{ color: "#B7B7B7", fontSize: "17px" }}
          data-test="description"
        >
          {reactStringReplace(content, /#(\w+)/g, (match, i) => (
            <span key={i} onClick={() => navigate(`/hashtag/${match}`)}>
              {" "}
              #{match}{" "}
            </span>
          ))}
        </Lato400>
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
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
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
        {/* <h2 style={{ fontFamily: "Lato", fontSize: "34px", fontWeight: "700"  }} >Confirm Deletion</h2> */}
        <p
          style={{
            fontFamily: "Lato",
            fontSize: "34px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Are you sure you want to delete this post?
        </p>
        <div style={{ display: "flex" }}>
          <button
            onClick={() => setIsModalOpen(false)}
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
  color: #ef1717;
  height: 23px;
  width: 23px;
`;

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
