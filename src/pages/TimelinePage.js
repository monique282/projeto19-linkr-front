import styled from "styled-components"
import { Background } from "../components/PageComponents/PageComponents"
import SharePost from "../components/PageComponents/SharePost"
import Post from "../components/PageComponents/PostComponent"
import HashtagBox from "../components/PageComponents/HashtagBox"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import NavBar from "../components/PageComponents/NavBar"
import { FontPageTitle } from "../components/StyleComponents/StylesComponents"
import { AuthContext } from "../contexts/UserContext"

export default function TimelinePage() {
    const { setPosts, posts } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const object = { headers: { 'Authorization': `Bearer ${token}` } };
    const [message, setMessage] = useState("Loading")
    function getPosts() {
        axios.get(`${process.env.REACT_APP_API_URL}/timeline`, object)
            .then(res => {
                setPosts(res.data.rows)
                if (res.data.rows.length === 0) setMessage("There are no posts yet")
            })
            .catch(err => setMessage(<><div>An error ocurred while trying to fetch the</div><div>posts, please refresh the page</div></>))
    }
    useEffect(() => {
        if (token) getPosts()
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
                        {posts.length === 0 ? (<FontPageTitle style={{ textAlign: "center" }} data-test="message" >{message}</FontPageTitle>) : (posts.map(post => (
                            <Post post={post} />
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