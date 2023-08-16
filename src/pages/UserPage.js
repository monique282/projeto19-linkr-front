import styled from "styled-components";
import NavBar from "../components/PageComponents/NavBar";

export default function UserPage() {
  return (
    <>
      <NavBar />
      <Container>
        <header>
          <h1>{"Vitor"} posts</h1>
        </header>
        <section>
          <article></article>
        </section>
      </Container>
    </>
  );
}

const Container = styled.main`
  width: 100%;
  min-height: calc(100vh - 72px);
  height: 100%;
  margin-top: 72px;

  display: flex;
  justify-content: center;

  background-color: #333333;

  header {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    h1 {
      color: #fff;
      font-family: Oswald;
      font-size: 43px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
`;
