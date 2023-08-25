import axios from "axios";
import { useState } from "react";
import useInterval from "use-interval";
import { configToken } from "../services/api";
import styled from "styled-components";
import { Lato400 } from "./StyleComponents/StylesComponents";
import { FiRefreshCw } from "react-icons/fi";

export default function RefreshNewPost({ lastestPost, count, setCount, setRefresh }) {
  const [postsToReceive, setPostsToReceive] = useState([]);

  useInterval(() => {
    const token = configToken();
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/timeline`, token)
        .then((res) => {
          const newPosts = res.data.rows.filter(
            (item) => item.createdAt > lastestPost
          );
          setPostsToReceive(newPosts);
          setCount(newPosts.length);
        });
    }
  }, 15000000);

  if (postsToReceive.length > 0) {
    return (
      <Content data-test="load-btn" onClick={()=> {
        setRefresh(2)
        setPostsToReceive([])}}>
        <StyledLato>
          {count} new posts, load more! <StyledIcon />
        </StyledLato>
      </Content>
    );
  } else {
    return null;
  }
}

const Content = styled.div`
  background: #1877f2;
  border-radius: 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding-top: 23px;
  padding-bottom: 23px;
  text-align: center;
`;

const StyledLato = styled(Lato400)`
  font-size: 16px;
  color: #fff;
`;

const StyledIcon = styled(FiRefreshCw)``;