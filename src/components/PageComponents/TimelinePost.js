import styled from "styled-components"
import {  Lato400, Lato700 } from "../StyleComponents/StylesComponents"
import {Tooltip} from 'react-tooltip'

export default function TimelinePost(){
  // {userPhoto, userName, post, hashtags}
  
  const userPhoto = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80"
  const userName = "Alber Jhonson"
  const likes = "554 likes"
  const post = "Muito maneiro esse tutorial de Material UI com React!"
  const hashtags = "#React #ReactNative"
  return(
    <Container>
      <ContainerImg>
        <img src={userPhoto} alt={"profile-img"}/>
        <Likes data-tooltip-id="my-tooltip" data-tooltip-content={`Mensagem`}>
        <ion-icon isLiked={isLiked} name={isLiked ? "heart" : "heart-ouline"}></ion-icon>{likes}</Likes>
        <Tooltip id="my-tooltip" />
      </ContainerImg>
      <ContainerContent>
        <div>
          <Name >{userName}</Name>
        </div>
        <ContainerPost>
          <Post>{post}</Post><Hashtags>{hashtags}</Hashtags>
        </ContainerPost>
      </ContainerContent>
    </Container>
    
  )
}

const Container = styled.div`
  background: #171717;
  border-radius: 16px;
  height: 275px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const ContainerImg = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  `
const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 90%;
`
const Name = styled(Lato400)`
  font-size: 19px;
  color: #FFF;
`
const ContainerPost = styled.div`
  display: flex;`
const Post = styled(Lato400)`
  font-size:17px;
  color: #b7b7b7;`
const Hashtags = styled(Lato700)`
  font-size: 17px;
  color: #fff;`

const Likes = styled(Lato400)`
  font-size:11px;
  color:#FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  ion-icon{
    height: 20px;
    width: 20px;
    color: ${props => (props.isLiked ? #AC0000 : #FFF)};
  }`