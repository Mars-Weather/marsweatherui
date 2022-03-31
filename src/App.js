import react, { useState } from "react";
import Header from "./components/Header";
import FrontPage from "./components/FrontPage";
import WeekData from "./components/WeekData";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

function App() {
    const [tempUnit, setTempUnit] = useState("C");

    const set_Celsius = () => {
        setTempUnit("C");
    };
    const set_Fahrenheit = () => {
        setTempUnit("F");
    };

    return (
        <BrowserRouter>
            <Container>
                <Header
                    set_Celsius={set_Celsius}
                    set_Fahrenheit={set_Fahrenheit}
                />
                <Routes>
                    <Route
                        path="/"
                        element={<FrontPage tempUnit={tempUnit} />}
                    ></Route>
                    <Route path="/weekdata" element={WeekData()}></Route>
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;

const Container = styled.div``;
