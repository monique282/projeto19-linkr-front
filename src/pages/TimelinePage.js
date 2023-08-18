import styled from "styled-components"
import { Background } from "../components/PageComponents/PageComponents"
import SharePost from "../components/PageComponents/SharePost"
import Post from "../components/PageComponents/PostComponent"
import HashtagBox from "../components/PageComponents/HashtagBox"
import { useEffect, useState } from "react"
import axios from "axios"
import { configToken } from "../services/api"
import NavBar from "../components/PageComponents/NavBar"
import { FontPageTitle } from "../components/StyleComponents/StylesComponents"

export default function TimelinePage(){

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const headers = configToken();
        axios.get(`${process.env.REACT_APP_API_URL}timeline`, headers)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, [])

    return (
        <Background>
            <NavBar />
            <Content>
                <Feed>
                    <FontPageTitle>
                        timeline
                    </FontPageTitle>
                    <SharePost />
                    <Posts>
                    {posts.map(post => (
                        <Post post={post}/>
                    ))}
                    </Posts>
                </Feed>
                <Trending>
                    <HashtagBox />
                </Trending>
            </Content>
        </Background>
    )
}
const Feed = styled.div`
    display: flex;
    flex-direction:column;
    gap: 30px;`

const Trending = styled.div`
    padding-top: 77px`

const Posts = styled.div`
    display:flex;
    flex-direction: column;
    gap:15px;`

const Content = styled.div`
    display:flex;
    gap: 25px;
    padding-top: 50px;`