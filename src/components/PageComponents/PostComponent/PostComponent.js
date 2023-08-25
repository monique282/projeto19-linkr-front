import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../contexts/UserContext.js";
import { configToken } from "../../../services/api.js";
import { Lato400, Lato700 } from "../../StyleComponents/StylesComponents.js";
import Comment from "./CommentsComponent.js";
import {
  EditPost,
  LikesTooltip,
  PostOwner,
  RepostModal,
  ReturnModal,
  getCommentsById,
} from "./PostComponent.functions";
import * as styles from "./PostComponent.styles";

export default function Post(props) {
  const {
    name,
    image,
    content,
    url,
    numberLikes,
    numberComments,
    numberReposts,
    userId: idUser,
    postId,
    likedUserIds,
    repostedBy,
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
    setAtualizeHashtag,
  } = props;

  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRepost, setIsModalOpenRepost] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(likedUserIds.includes(Number(userId)));
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    image: undefined,
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
  const object = { headers: { Authorization: `Bearer ${token}` } };
  const { setPosts, setLikes } = useContext(AuthContext);
  const [img, setImage] = useState(localStorage.getItem("image"));

  function getPosts() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/timeline`, object)
      .then((res) => {
        setPosts(res.data.rows)})
      .catch((err) => alert(err.response.data));
  }

  function getLikes() {
    const URL = `${process.env.REACT_APP_API_URL}/likes`;
    axios
      .get(URL, object)
      .then((res) => {
        setLikes(res.data);
      })
      .catch((err) => alert(err.response.data));
  }

  useEffect(() => {
    if (setAtualizeHashtag) setAtualizeHashtag((prev) => !prev);
  }, [numberLikes]);

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
        }).catch((err) => console.log(err));
    }
  }, [url]);

  function postComment(e) {
    e.preventDefault();
    if (token) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/comment/${postId}`,
          { content: comment },
          object
        )
        .then((res) => {
          setComment("");
          getCommentsById(postId, comments, setComments, object);
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
                setLikes(res.data);
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
              .catch((err) => alert(err.response.data));

            const URL = `${process.env.REACT_APP_API_URL}/likes`;
            const config = configToken();
            axios
              .get(URL, config)
              .then((res) => setLikes(res.data))
              .catch((err) => console.log(err));
          }
        })
        .catch((res) => alert(res.response.data));
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
                setLikes(res.data);
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
              .catch((err) => alert(err.response.data));

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

  return (
    <>
      {repostedBy ? (
        <ContainerReposted>
          <div>
            <styles.StyledIconRepost />
            <p>
              Re-posted by <span>{repostedBy}</span>
            </p>
          </div>
        </ContainerReposted>
      ) : (
        <></>
      )}
      <styles.Container data-test="post">
        <styles.Info>
          <figure>
            <img src={image} alt="profile" />
          </figure>
          <styles.StyledIcon
            onClick={handleToggleLike}
            disabled={loading}
            isLiked={isLiked}
            data-test="like-btn"
          />
          <Lato700>
            <styles.StyledTooltip
              id="my-tooltip"
              place="bottom"
              data-test="tooltip"
            />
          </Lato700>
          <Lato400
            data-tooltip-id="my-tooltip"
            data-tooltip-content={LikesTooltip(
              likes,
              isLiked,
              likedUserIds,
              userId,
              numberLikes
            )}
            style={{ color: "#fff", fontSize: "11px" }}
            data-test="counter"
          >
            {Number(numberLikes) === 1
              ? `${numberLikes} Like`
              : `${numberLikes} Likes`}
          </Lato400>
          {/* esse aqui é os comentarios */}
          <>
            <styles.StyledIconComment
              disabled={loading}
              onClick={() => {
                if (isCommentOpen === false) {
                  setCommentOpen(true);
                  getCommentsById(postId, comments, setComments, object);
                } else setCommentOpen(false);
              }}
              data-test="comment-btn"
            />

            <Lato400
              style={{ color: "#fff", fontSize: "11px", marginTop: "5px" }}
              data-test="comment-counter"
            >
              {Number(numberComments) === 1
                ? `${numberComments} comment`
                : `${numberComments} comments`}
            </Lato400>
          </>
          {/* esse aqui é os reposts */}
          <>
            <styles.StyledIconRepost
              disabled={loading}
              onClick={() => setIsModalOpenRepost(true)}
              data-test="repost-btn"
            />
            <Lato400
              style={{ color: "#fff", fontSize: "11px", marginTop: "5px" }}
              data-test="repost-counter"
            >
              {Number(numberReposts) === 1
                ? `${numberReposts} repost`
                : `${numberReposts} reposts`}
            </Lato400>
          </>
        </styles.Info>
        <styles.Content>
          <div className="userName">
            <Link to={`/user/${props.post.userId}`}>
              <Lato400
                style={{ color: "#fff", fontSize: "19px" }}
                data-test="username"
              >
                {name}
              </Lato400>
            </Link>
            <PostOwner
              setIsModalOpen={setIsModalOpen}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              userId={userId}
              idUser={idUser}
            />
          </div>
          <EditPost
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            content={content}
            postId={postId}
            loading={loading}
            setLoading={setLoading}
          />
          <a href={url} target="_blank" data-test="link">
            <styles.SCMetadata>
              <div style={{width:"100%"}}>
                <Lato400>{metadata.title}</Lato400>
                <Lato400>{metadata.description}</Lato400>
                <Lato400>{url}</Lato400>
              </div>
              <div>
                {metadata.image && (
                  <img src={metadata.image} alt={metadata.title} />
                )}
              </div>
            </styles.SCMetadata>
          </a>
        </styles.Content>
        {/* caixa que mostra se realmente a pessoa quer apagar o post */}
        <ReturnModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          postId={postId}
        />
        {/* caixa que mostra se realmente a pessoa quer repostar um post */}
        <RepostModal
          setIsModalOpenRepost={setIsModalOpenRepost}
          isModalOpenRepost={isModalOpenRepost}
          postId={postId}
          object={object}
          token={token}
        />
      </styles.Container>
      {isCommentOpen === true ? (
        <ContainerComments data-test="comment-box">
          {comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}

          <form onSubmit={postComment}>
            <img src={img} alt="profile"></img>
            <div>
              <input
                name="comment"
                id="comment"
                placeholder="write a comment..."
                type="text"
                value={comment}
                data-test="comment-input"
                onChange={(e) => {
                  setLoading(true);
                  setComment(e.target.value);
                  setLoading(false);
                }}
                required
              ></input>
              <button type="submit" data-test="comment-submit">
                <StyledSend />
              </button>
            </div>
          </form>
        </ContainerComments>
      ) : (
        <></>
      )}
    </>
  );
}

const ContainerReposted = styled.div`
  width: 611px;
  height: 60px;
  margin-bottom: -47px;
  padding: 0px 0px 25px 25px;
  border-radius: 16px;
  background-color: #1e1e1e;
  div {
    height: auto;
    display: flex;
    align-items: center;
    gap: 5px;

    text-align: center;

    p {
      margin-top: 10px;
      color: #fff;
      font-family: Lato;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      span {
        color: #fff;
        font-family: Lato;
        font-size: 11px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }
  }
`;

const ContainerComments = styled.div`
  width: 611px;
  height: auto;
  border-radius: 16px;

  background: #1e1e1e;
  padding: 45px 18px 18px 18px;
  margin-top: -50px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 15px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
  }

  form {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    gap: 15px;

    div {
      display: flex;
      align-items: center;
      border-radius: 8px;
      background: #252525;

      button {
        background: transparent;
        border: none;
        cursor: pointer;
      }

      input {
        width: 470px;
        height: 39px;
        flex-shrink: 0;
        padding-left: 15px;

        border-radius: 8px;
        background: #252525;
        border: none;

        color: #575757;
        font-family: Lato;
        font-size: 14px;
        font-style: italic;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 0.7px;
      }
    }
  }
`;

const StyledSend = styled(BsSend)`
  color: #fff;
  font-size: 35px;
  padding: 10px;
`;
