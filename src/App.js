import react from "react";
import Header from "./components/Header";
import FrontPage from "./components/FrontPage";
import styled from "styled-components";

function App() {
   return (
      <Container>
         <Header />
         <FrontPage />
      </Container>
   );
}

export default App;

const Container = styled.div``;
