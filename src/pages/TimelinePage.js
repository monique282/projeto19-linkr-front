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
    const token = localStorage.getItem('token')
    const object = {headers: {'Authorization': `Bearer ${token}`}}
    
    useEffect(()=>{  
        if(token) axios.get(`${process.env.REACT_APP_API_URL}/timeline`, object)
        .then(res => setPosts(res.data.rows))
        .catch(err => console.log(err))
        console.log(posts)
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
                    {posts.length === 0 ? (<FontPageTitle style={{textAlign:"center"}}>There are no posts yes</FontPageTitle>) : (posts.map(post => (
                        <Post post={post}/>
                    )))}
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