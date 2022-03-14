import react from "react";
import Header from "./components/Header";
import FrontPage from "./components/FrontPage";
import WeekData from "./components/WeekData";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import styled from "styled-components";

function App() {
    return (
        <BrowserRouter>
            <Container>
                <Header/>
                <Routes>
                    <Route path='/' element={FrontPage()}></Route>
                    <Route path='/weekdata' element={WeekData()}></Route>
                </Routes>
            </Container>
        </BrowserRouter>

    );
}

export default App;

const Container = styled.div`
`;
