import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import HashtagBox from "../components/PageComponents/HashtagBox.js";
import NavBar from "../components/PageComponents/NavBar.jsx";
import Post from "../components/PageComponents/PostComponent.jsx";
import { FontPageTitle } from "../components/StyleComponents/StylesComponents.js";
import { AuthContext } from "../contexts/UserContext.js";

export default function UserPage() {
  const { setPosts, posts } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const object = { headers: { Authorization: `Bearer ${token}` } };
  console.log(likes);
  function getPosts() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${id}`, object)
      .then((res) => {
        setInfo(res.data);
        setPosts(res.data.posts);
        console.log(res)
      })
      .catch((res) => console.log(res))
  }

  async function getLikes() {
    const URL = `${process.env.REACT_APP_API_URL}/likes/${id}`;
    axios
      .get(URL, object)
      .then((res) => setLikes(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getPosts();
    getLikes();
  }, [id]);

  return (
    <>
      <NavBar />
      <Container>
        <Content>
          <header>
            <img src={info.image} alt="profile" />
            <h1>{info.name} posts</h1>
          </header>
          <section>
            <article>
              {posts.length === 0 ? (
                <FontPageTitle>O usuário não tem posts!</FontPageTitle>
              ) : (
                posts.map((post, i) => (
                  <Post
                    post={post}
                    id={id}
                    setInfo={setInfo}
                    likes={
                      likes.length === 0
                        ? []
                        : likes[i].likedUserNames[0] === null
                        ? []
                        : likes[i].likedUserNames
                    }
                  />
                ))
              )}
            </article>
            <article>
              <HashtagBox />
            </article>
          </section>
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 72px);
  height: 100%;
  margin-top: 53px;
  display: flex;
  justify-content: center;
`;
const Content = styled.main`
  width: 80%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  gap: 25px;

  background-color: #333333;

  section {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 25px;
    article {
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 15px;
    }
  }

  header {
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 15px;

    h1 {
      color: #fff;
      font-family: Oswald;
      font-size: 43px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 26.5px;
    }
  }
`;
