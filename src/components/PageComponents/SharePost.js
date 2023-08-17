import styled from "styled-components"
import { Lato300, Lato700 } from "../StyleComponents/StylesComponents"
import { useEffect, useState } from "react"
import axios from "axios"
import reactStringReplace from "react-string-replace"

export default function SharePost({userPhoto, config}) { 
  const [post, setPost] = useState({url:"", content:""})
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    const extractedHashtags = [];

    reactStringReplace(post.content, /#(\w+)/g, (match, i) => {
      extractedHashtags.push(match);
    });

    setHashtags(extractedHashtags);
  }, [post.content]);

  function handlePublish(e) {
    e.preventDefault();

    const obj = {url: post.url, content:post.content, hashtags}

    console.log(obj)

    axios.post(`${process.env.REACT_APP_API_URL}/new-post`, {url: post.url, content:post.content, hashtags}, config)
  }

  return (
    <Container>
      <ContainerImg>
        <img src={userPhoto} alt={"profile-img"}/>
      </ContainerImg>
      <ContainerContent>
        <ShareTitle>
          <Title>What are you going to share today?</Title>
        </ShareTitle>
        <Form onSubmit={handlePublish}>
          <Input 
          placeholder="http://..." 
          type="url"
          name="url"
          required
          onChange={event => {
            const newValue = event.target.value
            setPost(prevState => {
            return {
            ...prevState,
              url: newValue
            }
          })}}/>
          <TextArea rows="5" 
          placeholder="Awesome article about #javascript"
          onChange={event => {
            const newValue = event.target.value
            setPost(prevState => {
            return {
            ...prevState,
              content: newValue
            }
          })}}/>
          <BtnContainer>
            <Button onClick={handlePublish}>
              <FontBtn>
                Publish
              </FontBtn>
            </Button>
          </BtnContainer>
          
        </Form>
      </ContainerContent>
    </Container>
  )
}

const Container = styled.div`
  padding: 15px 15px 0 15px;
  height: 210px;
  width: 611px;
  gap: 18px;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`
const ContainerImg = styled.div`
  display: flex;
  `
const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 90%;
`
const ShareTitle = styled.div`
`
const Title = styled(Lato300)`
  font-size: 20px;
  color: #707070
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const Input = styled.input`
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: #EFEFEF;
  ::placeholder { 
    ${Lato300}
    color: #949494;
    font-size: 15px;
  }
`
const TextArea = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  background: #EFEFEF;
  border-radius: 5px;
  ::placeholder { 
    ${Lato300}
    color: #949494;
    font-size: 15px;
  }`


const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Button = styled.button`
  width: 110px;
  height: 30px;
  border: none;
  background: #1877F2;
  border-radius: 5px;`

const FontBtn = styled(Lato700)`
  color: #FFF;
  font-size: 14px;`