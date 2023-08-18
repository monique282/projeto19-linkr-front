import styled from "styled-components"
import { Lato300, Lato700 } from "../StyleComponents/StylesComponents"
import { useEffect, useState } from "react"
import axios from "axios"
import reactStringReplace from "react-string-replace"
import { configToken } from "../../services/api"

export default function SharePost({userPhoto}) { 
  const [post, setPost] = useState({url:"", content:""});
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(localStorage.getItem("image"));
  const token = localStorage.getItem('token');

  useEffect(()=>{
    const localImage = localStorage.getItem("image");
    setImage(localImage);
  },[])
  
  const object = {headers: {'Authorization': `Bearer ${token}`}}
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
    setLoading(true)

    if(token) axios.post(`${process.env.REACT_APP_API_URL}/new-post`, obj, object)
    .then(res => setPost({url:"", content:""}))
    .catch(err => console.log(err))
    .finally(setLoading(false))
  }

  return (
    <Container>
      <ContainerImg>
        <img src={image} alt={"profile-img"}/>
      </ContainerImg>
      <ContainerContent>
        <ShareTitle>
          <Lato300 style={{  fontSize: "20px", color: "#707070"}}>What are you going to share today?</Lato300>
        </ShareTitle>
        <Form onSubmit={handlePublish}>
          <Input 
          placeholder="http://..." 
          type="url"
          name="url"
          required
          disabled={loading}
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
          disabled={loading}
          onChange={event => {
            const newValue = event.target.value
            setPost(prevState => {
            return {
            ...prevState,
              content: newValue
            }
          })}}/>
          <BtnContainer>
            <Button disabled={loading} onClick={handlePublish}>
              <Lato700 style={{  color: "#FFF",  fontSize: "14px"}}>
                {loading ? "Publishing..." : "Publish"}
              </Lato700>
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
  margin-bottom: 15px;
`
const Button = styled.button`
  width: 110px;
  height: 30px;
  border: none;
  background: #1877F2;
  border-radius: 5px;`

