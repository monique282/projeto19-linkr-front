import styled from "styled-components"
import { Background } from "../components/PageComponents/PageComponents"
import SharePost from "../components/PageComponents/SharePost"
import TimelinePost from "../components/PageComponents/TimelinePost"

export default function TimelinePage(){
    return (
        <Background>
            <Feed>
                <SharePost />
                <Posts>
                    <TimelinePost />
                </Posts>
                
            </Feed>
            <Trending>

            </Trending>
        </Background>
    )
}
const Feed = styled.div`
    display: flex;
    flex-direction:column;`

const Trending = styled.div``

const Posts = styled.div`
    display:flex;
    flex-direction: column;
    gap:15px;`