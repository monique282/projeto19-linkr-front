import axios from "axios";
import { useContext, useEffect, useState } from "react";
import * as styles from "./PostComponent.styles"
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/UserContext.js";
import { configToken } from "../../../services/api.js";
import { Lato400, Lato700 } from "../../StyleComponents/StylesComponents.js";
import { EditPost, LikesTooltip, PostOwner, ReturnModal } from "./PostComponent.functions";

export default function Post(props) {
  const {
    name,
    image,
    content,
    url,
    numberLikes,
    numberComments,
    userId: idUser,
    postId,
    likedUserIds,
    commentsUserIds,
  } = props.post;

  const {
    setUserPosts,
    id,
    likes = [],
    comments = [],
    setUserLikes,
    setInfo,
    setHashtagPosts,
    setHashtagLikes,
    hashtag,
    setAtualizeHashtag
  } = props;

  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(likedUserIds.includes(Number(userId)));
  
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    image: undefined,
  });
  const [isEditing, setIsEditing] = useState(false)
  const token = localStorage.getItem("token");
  const object = { headers: { Authorization: `Bearer ${token}` } };

  const { setPosts, setLikes } = useContext(AuthContext);
  
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

  return (
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
          data-tooltip-content={LikesTooltip(likes, isLiked, likedUserIds, userId, numberLikes)}
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
            //onClick={handleToggleComment}
            disabled={loading}
            //isLiked={isLiked}
            data-test="comment-btn"
          />

          <Lato400
            style={{ color: "#fff", fontSize: "11px", marginTop: "5px" }}
            data-test="counter"
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
            data-test="like-btn"
          />
          <Lato400
            style={{ color: "#fff", fontSize: "15px", marginTop: "5px" }}
            data-test="counter"
          >
            {Number(numberLikes) === 1
              ? `${numberLikes} repost`
              : `${numberLikes} reposts`}
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
          <PostOwner setIsEditing={setIsEditing} isEditing={isEditing} userId={userId} idUser={idUser}/>
        </div>
        <EditPost isEditing={isEditing} setIsEditing={setIsEditing} content={content} postId={postId} loading={loading} setLoading={setLoading}/>
        <a href={url} target="_blank" data-test="link">
          <styles.SCMetadata>
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
          </styles.SCMetadata>
        </a>
      </styles.Content>
      {/* caixa que mostra se realmente a pessoa quer apagar o post */}
      <ReturnModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} postId={postId}/>
    </styles.Container>
  );
}
