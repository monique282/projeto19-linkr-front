import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import HashtagBox from "../components/PageComponents/HashtagBox"
import NavBar from "../components/PageComponents/NavBar"
import { Background } from "../components/PageComponents/PageComponents"
import Post from "../components/PageComponents/PostComponent"
import SharePost from "../components/PageComponents/SharePost"
import { FontPageTitle } from "../components/StyleComponents/StylesComponents"
import { AuthContext } from "../contexts/UserContext"
import { configToken } from "../services/api"

export default function TimelinePage(){
    const {setPosts, posts, likes, setLikes} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const object = { headers: { 'Authorization': `Bearer ${token}` } };
    const [message, setMessage] = useState("Loading")
    const [loading, setLoading] = useState(false);
    const [atualize, setAtualize] = useState(false);
    console.log(likes)

    async function getPosts(){
        axios.get(`${process.env.REACT_APP_API_URL}/timeline`, object)
            .then(res => {
                setPosts(res.data.rows)
                if (res.data.rows.length === 0) setMessage("There are no posts yet")
            })
            .catch(err => setMessage(<><div>An error ocurred while trying to fetch the</div><div>posts, please refresh the page</div></>))
    }
    
    async function getLikes () {
        const URL = `${process.env.REACT_APP_API_URL}/likes`
        const config = configToken();
        axios.get(URL, config)
            .then( res => setLikes(res.data) )
            .catch(err => console.log(err))
    }
    useEffect(()=>{  
        if(token) {
            getLikes();
            getPosts();
        }
    }, [loading])

    return (
        <Background>
            <NavBar />
            <Content>
                <Feed>
                    <FontPageTitle>
                        timeline
                    </FontPageTitle>
                    <SharePost loading={loading} setLoading={setLoading} setAtualize={setAtualize} />
                    <Posts>
                    {posts.length === 0 ? (<FontPageTitle style={{textAlign:"center"}} data-test='message' >{message}</FontPageTitle>) : (posts.map((post, i) => {
                        return <Post post={post} likes={likes.length === 0 ? [] : (likes[i].likedUserNames[0]===null) ? [] : likes[i].likedUserNames}/>
                    }))}
                    </Posts>
                </Feed>
                <Trending>
                    <HashtagBox atualize={atualize} />
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
    padding-top: 77px;`

const Posts = styled.div`
    display:flex;
    flex-direction: column;
    gap:15px;`

const Content = styled.div`
    display:flex;
    gap: 25px;
    padding-top: 50px;`