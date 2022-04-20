import react, { useState } from "react";
import Header from "./components/Header";
import FrontPage from "./components/FrontPage";
import WeekSolsData from "./components/WeekSolsData";
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

    // return temperature and change it from F to C if needed
    const getTemperature = (tempInF) => {
        if (tempInF === null) {
            return "---";
        } else {
            if (tempUnit === "C") {
                return (((tempInF - 32) * 5) / 9).toFixed(2) + "° C";
            } else {
                return tempInF.toFixed(2) + "° F";
            }
        }
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
                        element={
                            <FrontPage
                                tempUnit={tempUnit}
                                getTemperature={getTemperature}
                            />
                        }
                    ></Route>
                    <Route
                        path="/statistics"
                        element={
                            <WeekSolsData
                                tempUnit={tempUnit}
                                getTemperature={getTemperature}
                            />
                        }
                    ></Route>
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;

const Container = styled.div``;
