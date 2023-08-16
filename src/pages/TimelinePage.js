import styled from "styled-components"
import { Background } from "../components/PageComponents/PageComponents"
import SharePost from "../components/PageComponents/SharePost"

export default function TimelinePage(){
    return (
        <Background>
            <Feed>
                <SharePost />
            </Feed>
            <Trending>

            </Trending>
        </Background>
    )
}
const Feed = styled.div``

const Trending = styled.div``
