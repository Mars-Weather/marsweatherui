import react, { useState } from "react";
import Header from "./components/Header";
import FrontPage from "./components/FrontPage";
import WeekData from "./components/WeekDate";
import StatisticsPage from "./components/StatisticsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

function App() {
    const [tempUnit, setTempUnit] = useState("C");
    const [currentSolNum, setcurrentSolNum] = useState(0);

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

    //update current sol number
    const updateCurrentSolNumber = (sol_num) => {
        setcurrentSolNum(sol_num);
    };

    return (
        <BrowserRouter>
            <Container>
                <Header
                    set_Celsius={set_Celsius}
                    set_Fahrenheit={set_Fahrenheit}
                    currentSolNum={currentSolNum}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <FrontPage
                                tempUnit={tempUnit}
                                getTemperature={getTemperature}
                                updateCurrentSolNumber={updateCurrentSolNumber}
                            />
                        }
                    ></Route>
                    <Route
                        path="/weekData"
                        element={<WeekData />}
                        updateCurrentSolNumber={updateCurrentSolNumber}
                    ></Route>
                    <Route
                        path="/statistics"
                        element={
                            <StatisticsPage
                                tempUnit={tempUnit}
                                getTemperature={getTemperature}
                                updateCurrentSolNumber={updateCurrentSolNumber}
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
