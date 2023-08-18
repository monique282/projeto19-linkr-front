import { useEffect, useState } from "react";
import NavBar from "../components/PageComponents/NavBar";
import Post from "../components/PageComponents/PostComponent";
import styled from "styled-components";
import HashtagBox from "../components/PageComponents/HashtagBox";
import { useParams } from "react-router-dom";
import axios from "axios";
import { configToken } from "../services/api";

export default function HashtagPage() {
  const { hashtag } = useParams();

  const [posts, setPosts] = useState([
    {
      name: "Vitor",
      picture:
        "https://i.pinimg.com/originals/52/37/04/5237042f152ca9cf6c54daf824f1dc5d.jpg",
      content: "post 1 #anime #2023",
      url: "https://www.aficionados.com.br/animes-2023/",
      likes: 13,
    },
    {
      name: "Vitor",
      picture:
        "https://i.pinimg.com/originals/52/37/04/5237042f152ca9cf6c54daf824f1dc5d.jpg",
      content: "post 1 #anime #2023",
      url: "https://www.aficionados.com.br/animes-2023/",
      likes: 13,
    },
  ]);

  useEffect(() => {
    const URL = process.env.REACT_APP_API_URL;
    const headers = configToken();

    axios
      .get(`http://${URL}/hashtag/${hashtag}`, headers)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Content>
          <header>
            <h1> # {hashtag}</h1>
          </header>
          <section>
            <article>
              {posts.map((post) => (
                <Post post={post} />
              ))}
            </article>
          </section>
        </Content>
        <HashtagBox />
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
  width: 35%;
  height: 100%;

  gap: 41px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: #333333;

  section {
    width: 100%;
    article {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
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
