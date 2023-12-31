import axios from "axios"
import { useContext, useEffect, useState } from "react"
import reactStringReplace from "react-string-replace"
import styled from "styled-components"
import { AuthContext } from "../../contexts/UserContext"
import { configToken } from "../../services/api"
import { Lato300, Lato700 } from "../StyleComponents/StylesComponents"

export default function SharePost({userPhoto, loading, setLoading, setAtualize}) { 
  const [post, setPost] = useState({url:"", content:""});
  const [hashtags, setHashtags] = useState([]);
  const [image, setImage] = useState(localStorage.getItem("image"));
  const token = localStorage.getItem('token');
  const object = {headers: {'Authorization': `Bearer ${token}`}}
  const {setPosts, setLikes} = useContext(AuthContext)
  useEffect(()=>{
    const localImage = localStorage.getItem("image");
    setImage(localImage);
  }, [])
  useEffect(() => {
    const extractedHashtags = [];

    reactStringReplace(post.content, /#(\w+)/g, (match, i) => {
      extractedHashtags.push(match);
    });

    setHashtags(extractedHashtags);
  }, [post.content]);

  async function getPosts(){
    axios.get(`${process.env.REACT_APP_API_URL}/timeline`, object)
    .then(res => setPosts(res?.data.rows))
    .catch(err => alert(err.response.data))
}
async function getLikes () {
  const URL = `${process.env.REACT_APP_API_URL}/likes`
  const config = configToken();
  axios.get(URL, config)
      .then( res => setLikes(res?.data) )
      .catch(err => console.log(err))
}

    async function handlePublish(e) {
      e.preventDefault();
      const obj = { url: post.url, content: post.content, hashtags };
      setLoading(true); 
      setAtualize((prev) => !prev);
      if(obj.url.length === 0) {
        setLoading(false)
        return alert('Campo URL é obrigatório!')}
        
      if (token) {
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/new-post`, obj, object);
          setPost({ url: "", content: "" });
          getLikes();
          getPosts();
        } catch (error) {
          alert("Aconteceu um erro no servidor. Tente novamente.");
        }
      }
      setLoading(false);
  }

  return (
    <Container data-test="publish-box" >
      <ContainerImg>
        <img src={image} alt={"profile-img"} />
      </ContainerImg>
      <ContainerContent>
        <ShareTitle>
          <Lato300 style={{ fontSize: "20px", color: "#707070" }}>What are you going to share today?</Lato300>
        </ShareTitle>
        <Form onSubmit={handlePublish}>
          <Input
            data-test="link"
            placeholder="http://..."
            type="url"
            name="url"
            value={post.url}
            required
            disabled={loading}
            onChange={event => {
              const newValue = event.target.value
              setPost(prevState => {
                return {
                  ...prevState,
                  url: newValue
                }
              })
            }}
          />
          <TextArea
            data-test="description"
            rows="5"
            placeholder="Awesome article about #javascript"
            value={post.content}
            disabled={loading}
            onChange={event => {
              const newValue = event.target.value
              setPost(prevState => {
                return {
                  ...prevState,
                  content: newValue
                }
              })
            }}
          />
          <BtnContainer>
            <Button disabled={loading} onClick={handlePublish} data-test="publish-btn" >
              <Lato700 style={{ color: "#FFF", fontSize: "14px" }}>
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
  //background-color: red; 
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

