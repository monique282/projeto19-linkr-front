import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FollowButton from "../components/PageComponents/FollowButton.js";
import HashtagBox from "../components/PageComponents/HashtagBox.js";
import NavBar from "../components/PageComponents/NavBar.js";
import Post from "../components/PageComponents/PostComponent/PostComponent";
import { FontPageTitle } from "../components/StyleComponents/StylesComponents.js";
import { Box, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";

export default function UserPage() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [info, setInfo] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const object = { headers: { Authorization: `Bearer ${token}` } };

  const [disable, setDisable] = useState(false);
  const [lastItemCreated, setLastItem] = useState(0)
  const [hasMore, setMore] = useState(true);

  function handleScroll() {
    console.log(lastItemCreated, posts)
    if(object){
      axios.get(`${process.env.REACT_APP_API_URL}/userScroll/${id}?lastPost=${lastItemCreated}`, object)
        .then(res => {
          if(res.data.posts.length === 0) setMore(false)
          else {
            setPosts([...posts,...res.data.posts]);
            setLastItem(res.data.posts[res.data.posts.length -1].createdAt)
          }
      })}
  }
  console.log(posts)

  useEffect(() => {
    if (token) {

      const URL = `${process.env.REACT_APP_API_URL}/likes/${id}`;
      axios
        .get(URL, object)
        .then((res) => {
          setLikes(res.data);
        })
        .catch((err) => console.log(err));
      }

      axios
        .get(`${process.env.REACT_APP_API_URL}/user/${id}`, object)
        .then((res) => {
          console.log(res)
          setInfo(res.data);
          setPosts(res.data.posts);
          setLastItem(res.data.posts[res.data.posts.length -1].createdAt)
          setMore(true)
        })
        .catch((res) => console.log(res));
  }, [id, disable]);

  return (
    <>
      <NavBar />
      <Container>
        <Content>
          <header>
            <img src={info.image} alt={info.image} />
            <h1>{info.name} posts</h1>
          </header>
          { !info.isUser && (<FollowButton statusFollow={info.statusFollow} userId={info.id} disable={disable} setDisable={setDisable} isUser={info.isUser} />)}
          <section>
            <article>
              {posts.length === 0 ? (
                <FontPageTitle>O usuário não tem posts!</FontPageTitle>
              ) : (
                <StyledInfiniteScroll
                  pageStart={0}
                  loadMore={handleScroll}
                  hasMore={hasMore}
                  loader={
                  <div className="progressContent" key={0}>
                    <Box>
                      <CircularProgress color="inherit" size={50}/>
                    </Box>
                    Loading more posts...
                  </div>}
                  >{posts.map((post, i) => (
                        <Post
                          key={post.postId}
                          post={post}
                          userPosts={posts}
                          setUserPosts={setPosts}
                          setInfo={setInfo}
                          setUserLikes={setLikes}
                          id={id}
                          likes={
                            likes[i]?.likedUserNames[0] === null
                              ? []
                              : likes[i]?.likedUserNames
                          }
                        />
                      ))
                    }
                </StyledInfiniteScroll>)}
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

  position: relative;

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

  >button {
    width: 112px;
    height: 31px;
    position: absolute;
    top: 70px;
    right: 270px;
    border-radius: 5px;
    cursor: pointer;
  }
`;
const StyledInfiniteScroll = styled(InfiniteScroll)`
  color:#6d6d6d;
  display: flex;
  flex-direction: column;
  gap: 25px;
  .progressContent{
    text-align: center;
  }`
