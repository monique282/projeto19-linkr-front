import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import { Lato400 } from "../../StyleComponents/StylesComponents";
import * as styles from "./PostComponent.styles";

export function EditPost({
  isEditing,
  setIsEditing,
  content,
  setLoading,
  loading,
  postId,
}) {
  const [postContent, setContent] = useState(content);
  const [hashtags, setHashtags] = useState([]);

  const contentEdit = useCallback((inputElement) => {
    if (inputElement) inputElement.focus();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const extractedHashtags = [];
    reactStringReplace(postContent, /#(\w+)/g, (match, i) => {
      extractedHashtags.push(match);
    });
    setHashtags(extractedHashtags);
  }, [postContent]);

  function handleKeyEvent(event) {
    if (event.key === "Escape") {
      setIsEditing(false);
      setContent(content);
    }
    if (event.key === "Enter") {
      setLoading(true);
      const obj = {
        content: postContent,
        hashtags,
      };
      axios
        .patch(`${process.env.REACT_APP_API_URL}/edit/${postId}`, obj)
        .then(() => setIsEditing(false))
        .catch((err) => alert(err.response.data))
        .finally(() => setLoading(false));
    }
  }

  return (
    <>
      {isEditing ? (
        <styles.EditInput
          value={postContent}
          disabled={loading}
          onBlur={() => {
            setIsEditing(false);
            setContent(content);
          }}
          onKeyDown={handleKeyEvent}
          onChange={(event) => setContent(event.target.value)}
          ref={contentEdit}
        />
      ) : (
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
      )}
    </>
  );
}

export function ReturnModal({ setIsModalOpen, postId, isModalOpen }) {
  function handleDeleteConfirmation() {
    setIsModalOpen(false);
    Delete(postId);
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
  );
}

// função para poder aparecer o modal do post
export function RepostModal({
  setIsModalOpenRepost,
  postId,
  isModalOpenRepost,
}) {
  function handleRepostConfirmation() {
    alert(`post ${postId} foi repostado`);
    setIsModalOpenRepost(false);
    // Repost(postId);
  }

  function Repost(id) {
    const url = `${process.env.REACT_APP_API_URL}/repost/${id}`;
    const promise = axios.delete(url);
    promise.then((response) => {
      setIsModalOpenRepost(false);
      window.location.reload();
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  }
  return (
    <Modal
      isOpen={isModalOpenRepost}
      onRequestClose={() => setIsModalOpenRepost(false)}
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
      <p
        style={{
          width: "299px",
          height: "70px",
          fontFamily: "Lato",
          fontSize: "29px",
          fontWeight: "700",
          textAlign: "center",
          lineHeight: "1.5",
          marginBottom: "30px",
        }}
      >
        Do you want to re-post this link?
      </p>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => setIsModalOpenRepost(false)}
          data-test="cancel"
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
            border: "none",
          }}
        >
          No, cancel
        </button>
        <button
          data-test="confirm"
          onClick={handleRepostConfirmation}
          style={{
            marginRight: "10px",
            width: "134px",
            height: "37px",
            flexShrink: "0",
            borderRadius: "5px",
            fontFamily: "Lato",
            fontSize: "18px",
            fontWeight: "700",
            lineHeight: "22px",
            backgroundColor: "rgba(24, 119, 242, 1)",
            color: "rgba(255, 255, 255, 1)",
            border: "none",
          }}
        >
          Yes, share!
        </button>
      </div>
    </Modal>
  );
}

export function LikesTooltip(
  likes,
  isLiked,
  likedUserIds,
  userId,
  numberLikes
) {
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

export function PostOwner({
  setIsEditing,
  isEditing,
  idUser,
  userId,
  setIsModalOpen,
}) {
  return (
    <>
      {Number(userId) === idUser ? (
        <div>
          <styles.StyledPencil
            data-test="edit-btn"
            onClick={() => setIsEditing(!isEditing)}
          />
          <styles.StyledTrash
            data-test="delete-btn"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export function getCommentsById(id, comments, setComments, object) {
  axios
    .get(`${process.env.REACT_APP_API_URL}/comments/${id}`, object)
    .then((res) => setComments(res.data.reverse()))
    .catch((res) => console.log(res));
}

export function postComment(e, id, content, object) { 
  e.preventDefault()
  console.log(content, id)
}