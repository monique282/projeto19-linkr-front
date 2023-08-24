import styled from "styled-components";

export default function Comments(props) {
  const { name, image, content, identifier } = props.comment;
  let author = "";
  if (identifier === "posts author") author = "post's author";
  else author = identifier;
  
  return (
    <>
      <Container data-test="comment">
        <img src={image} alt="profile"></img>
        <div>
          <h5>
            {name} <span>{identifier === "" ? "" : `• ${author}`}</span>
          </h5>
          <p>{content}</p>
        </div>
      </Container>
      <Split />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  gap: 18px;

  div {
    width: 100%;
    height: 100%;
    max-height: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5px;

    h5 {
      color: #f3f3f3;
      font-family: Lato;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;

      span {
        color: #565656;
        font-family: Lato;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    p {
      color: #acacac;
      font-family: Lato;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      word-break: break-word;
    }
  }
`;

const Split = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #353535;
  border: 1px solid #353535;
`;
