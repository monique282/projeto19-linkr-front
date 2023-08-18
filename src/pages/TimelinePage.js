import styled from "styled-components"
import { Background } from "../components/PageComponents/PageComponents"
import SharePost from "../components/PageComponents/SharePost"
import Post from "../components/PageComponents/PostComponent"
import HashtagBox from "../components/PageComponents/HashtagBox"
import { useState } from "react"

export default function TimelinePage(){
    const [posts, setPosts] = useState([
        {
          name: "Vitor",
          picture:
            "https://i.pinimg.com/originals/52/37/04/5237042f152ca9cf6c54daf824f1dc5d.jpg",
          content: "post 1 #anime #2023",
          url: "https://www.aficionados.com.br/animes-2023/",
          tags: [],
          likes: 13,
        },
      ]);
    return (
        <Background>
            <Feed>
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
        </Background>
    )
}
const Feed = styled.div`
    display: flex;
    flex-direction:column;
    gap: 30px;`

const Trending = styled.div``

const Posts = styled.div`
    display:flex;
    flex-direction: column;
    gap:15px;`