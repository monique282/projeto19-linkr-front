import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import HashtagBox from "../components/PageComponents/HashtagBox";
import NavBar from "../components/PageComponents/NavBar";
import { Background } from "../components/PageComponents/PageComponents";
import Post from "../components/PageComponents/PostComponent/PostComponent";
import { FontPageTitle } from "../components/StyleComponents/StylesComponents";
import { configToken } from "../services/api";
import { StyledInfiniteScroll } from "./TimelinePage";
import { Box, CircularProgress } from "@mui/material";

export default function HashtagPage() {
  const { hashtag } = useParams();
  const token = localStorage.getItem("token");
  const object = { headers: { Authorization: `Bearer ${token}` } };
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);

  const [atualizeHashtag, setAtualizeHashtag] = useState(false)
  const [lastItemCreated, setLastItem] = useState(0)
  const [hasMore, setMore] = useState(true);

  function handleScroll() {
    if(object){
      axios.get(`${process.env.REACT_APP_API_URL}/hashtagScroll/${hashtag}?lastPost=${lastItemCreated}`, object)
        .then(res => {
          console.log(res)
          if(res.data.length === 0) setMore(false)
          else {
            setPosts([...posts,...res.data]);
            setLastItem(res.data[res.data.length -1].createdAt)
            setMore(true)
          }
      })}
  }

  useEffect(() => {
    const URL = process.env.REACT_APP_API_URL;
    const headers = configToken();
    axios
      .get(`${URL}/hashtags/likes/${hashtag}`, headers)
      .then((res) => {
        setLikes(res.data)})
      .catch((err) => console.log(err));

    axios
      .get(`${URL}/hashtag/${hashtag}`, headers)
      .then((res) => {
        setPosts(res.data);
        setLastItem(res.data[res.data.length -1].createdAt)
        setMore(true)
      })
      .catch((err) => console.log(err));
  }, [hashtag, atualizeHashtag]);

  return (
    <Background>
      <NavBar />
      <Content>
        <Feed>
          <FontPageTitle data-test="hashtag-title"># {hashtag}</FontPageTitle>
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
          >
          <Posts>
            {posts.length === 0 ? (
              <FontPageTitle style={{ textAlign: "center" }}>
                There are no posts yet
              </FontPageTitle>
            ) : (
              posts.map((post, i) => (
                <Post
                  key={post.postId}
                  post={post}
                  setHashtagPosts={setPosts}
                  setHashtagLikes={setLikes}
                  setAtualizeHashtag={setAtualizeHashtag}
                  hashtag={hashtag}
                  likes={
                    likes[i]?.likedUserNames[0] === null
                      ? []
                      : likes[i]?.likedUserNames
                  }
                />
              ))
            )}
          </Posts>
          </StyledInfiniteScroll>
        </Feed>
        <Trending>
          <HashtagBox />
        </Trending>
      </Content>
    </Background>
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

const Feed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Trending = styled.div`
  padding-top: 77px;
`;

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Content = styled.div`
  display: flex;
  gap: 25px;
  padding-top: 50px;
`;
