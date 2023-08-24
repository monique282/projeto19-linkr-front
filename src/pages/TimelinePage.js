import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import HashtagBox from "../components/PageComponents/HashtagBox";
import NavBar from "../components/PageComponents/NavBar";
import { Background } from "../components/PageComponents/PageComponents";
import Post from "../components/PageComponents/PostComponent/PostComponent";
import SharePost from "../components/PageComponents/SharePost";
import { FontPageTitle } from "../components/StyleComponents/StylesComponents";
import { AuthContext } from "../contexts/UserContext";
import RefreshNewPost from "../components/UseInterval";

export default function TimelinePage() {
  const { setPosts, setLikes, posts, likes, comments, setComments } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const object = { headers: { Authorization: `Bearer ${token}` } };
  const [message, setMessage] = useState("Loading");
  const [loading, setLoading] = useState(false);
  const [atualize, setAtualize] = useState(false);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(0);
  function getLikes() {
    const URL = `${process.env.REACT_APP_API_URL}/likes`;
    axios
      .get(URL, object)
      .then((res) => { setLikes(res.data) })
      .catch((err) => {
        alert(err.response.data)
  
      });
  }


  function getPosts() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/timeline`, object)
      .then((res) => {
        setPosts(res?.data.rows || []);
        if (res.data.rows.length === 0 && res.data.status === "not following") setMessage(
          <>
            <div>You don't follow anyone yet.</div>
            <div>Search for new Friends!</div>
          </>
          );
        
        if (res.data.rows.length === 0 && res.data.status === "following") setMessage(
            <div>No post found from your friends.</div>
        )
      })
      .catch((err) => {
        alert(err.response.data)
        setMessage(
          <>
            <div>An error ocurred while trying to fetch the</div>
            <div>posts, please refresh the page</div>
          </>
        )
      }
      );
  }
  useEffect(() => {
    if (token) {
      getPosts();
      getLikes();
    }
  }, [loading, refresh]);

  return (
    <Background>
      <NavBar />
      <Content>
        <Feed>
          <FontPageTitle>timeline</FontPageTitle>
          <SharePost
            loading={loading}
            setLoading={setLoading}
            setAtualize={setAtualize}
          />
          <RefreshNewPost count={count} setCount={setCount} lastestPost={posts[0]?.postId} setRefresh={setRefresh}/>
          <Posts>
            {posts.length === 0 ? (
              <FontPageTitle
                style={{ textAlign: "center" }}
                data-test="message"
              >
                {message}
              </FontPageTitle>
            ) : (
              posts.map((post, i) => {
                return (
                  <Post
                    key={post.postId}
                    post={post}
                    loading={loading}
                    setLoading={setLoading}
                    likes={
                      likes[i]?.likedUserNames[0] === null
                        ? []
                        : likes[i]?.likedUserNames
                    }
                  />
                );
              })
            )}
          </Posts>
        </Feed>
        <Trending>
          <HashtagBox atualize={atualize} />
        </Trending>
      </Content>
    </Background>
  );
}
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
