import react, { useState, useEffect, PureComponent } from "react";
import styled from "styled-components";
import SimpleLineChart from "./SimpleLineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { baseUrl } from "../services/urls";
const API_URL = baseUrl;

function WeekSolsData({ tempUnit, updateCurrentSolNumber }) {
    const [allData, setAllData] = useState([]);
    const [selectedSolsData, setSelectedSolsData] = useState({});
    const [selectedSolDataFrom, setSelectedSolDataFrom] = useState([]);
    const [selectedSolDataTo, setSelectedSolDataTo] = useState([]);
    const [dataForToSelect, setDataForToSelect] = useState([]);
    const [toSelectIsDisabled, setToSelectIsDisabled] = useState(true);

    // get all data, then load website
    useEffect(() => {
        getAllData(API_URL);
        // asyncCall();
    }, []);

    // get all data from BackEnd
    const getAllData = (url) => {
        fetch(url + "/sol/")
            .then((res) => res.json())
            .then((data) => {
                let new_data = data.$values;
                new_data.unshift({ solNumber: "000", id: "0" }); // add 000 object
                setAllData(new_data);
                updateCurrentSolNumber(data.$values.slice(-1)[0].solNumber);
            });
    };

    //create SelectedSolsData in range of From To
    const makeSelectedSolsData = () => {
        let temperature_F = [];
        let temperature_C = [];
        let pressure = [];
        let wind = [];
        let i = allData.indexOf(selectedSolDataFrom);
        while (true) {
            if (
                allData[i].temperature.average !== null &&
                allData[i].pressure.average !== null &&
                allData[i].wind.average !== null
            ) {
                temperature_F.push({
                    name: allData[i]["solNumber"],
                    max: allData[i]["temperature"]["maximum"],
                    avg: allData[i]["temperature"]["average"],
                    min: allData[i]["temperature"]["minimum"],
                });

                temperature_C.push({
                    name: allData[i]["solNumber"],
                    max: ((allData[i]["temperature"]["maximum"] - 32) * 5) / 9,
                    avg: ((allData[i]["temperature"]["average"] - 32) * 5) / 9,
                    min: ((allData[i]["temperature"]["minimum"] - 32) * 5) / 9,
                });
                pressure.push({
                    name: allData[i]["solNumber"],
                    max: allData[i]["pressure"]["maximum"],
                    avg: allData[i]["pressure"]["average"],
                    min: allData[i]["pressure"]["minimum"],
                });
                wind.push({
                    name: allData[i]["solNumber"],
                    max: allData[i]["wind"]["maximum"],
                    avg: allData[i]["wind"]["average"],
                    min: allData[i]["wind"]["minimum"],
                });
            }
            if (allData[i].solNumber == selectedSolDataTo.solNumber) {
                break;
            } else {
                i++;
            }
        }

        setSelectedSolsData({
            temperature_F: temperature_F,
            temperature_C: temperature_C,
            pressure: pressure,
            wind: wind,
        });
    };

    const handleSelectChangeFrom = (event) => {
        allData.shift(); // remove 000 object from list of allData
        allData.forEach((data) => {
            if (data.solNumber == event.target.value) {
                setSelectedSolDataFrom(data);
                setDataForToSelect(
                    allData.filter((el) => el.solNumber > data.solNumber)
                );
                setToSelectIsDisabled(false);
            }
        });
    };

    const handleSelectChangeTo = (event) => {
        allData.forEach((data) => {
            if (data.solNumber == event.target.value) {
                setSelectedSolDataTo(data);
            }
        });
    };

    return (
        <Container>
            {allData.length > 0 ? ( // if no data available show Loading div
                <>
                    <Subcontainer>
                        <WeekNumberDiv>
                            <div>
                                <p>Sols From: </p>
                            </div>
                            <div className="select-sol-div">
                                <select
                                    name="sols Number From"
                                    // value={selectedSolsData}
                                    onChange={(event) =>
                                        handleSelectChangeFrom(event)
                                    }
                                >
                                    {allData.map((data) => (
                                        <option
                                            key={data.id}
                                            value={data.solNumber}
                                        >
                                            {data.solNumber}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <p>To: </p>
                            </div>
                            <div className="select-sol-div">
                                <select
                                    disabled={toSelectIsDisabled}
                                    name="sols Number To"
                                    // value={selectedSolsData}
                                    onChange={(event) =>
                                        handleSelectChangeTo(event)
                                    }
                                >
                                    {dataForToSelect.map((data) => (
                                        <option
                                            key={data.id}
                                            value={data.solNumber}
                                        >
                                            {data.solNumber}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="btn">
                                <button
                                    onClick={() => makeSelectedSolsData()}
                                    style={{ width: "3rem", height: "3rem" }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {/* shows hints depending on what is selected and
                            what is not */}
                            {Object.keys(selectedSolsData).length === 0 ? (
                                <>
                                    {toSelectIsDisabled ? (
                                        <div className="help-full-text">
                                            <p>Please choose a FROM sol</p>
                                        </div>
                                    ) : (
                                        <div className="help-full-text">
                                            <p>Please choose a TO sol</p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </WeekNumberDiv>
                        <TempColumn>
                            <p>Temperature (°{tempUnit})</p>
                            {Object.keys(selectedSolsData).length !== 0 ? (
                                <>
                                    {tempUnit === "F" ? (
                                        <SimpleLineChart
                                            data={
                                                selectedSolsData.temperature_F
                                            }
                                        />
                                    ) : (
                                        <SimpleLineChart
                                            data={
                                                selectedSolsData.temperature_C
                                            }
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    <SimpleLineChart />
                                </>
                            )}
                        </TempColumn>
                        <PressureColumn>
                            <p>Pressure (Pa)</p>
                            {Object.keys(selectedSolsData).length !== 0 ? (
                                <>
                                    <SimpleLineChart
                                        data={selectedSolsData.pressure}
                                    />
                                </>
                            ) : (
                                <>
                                    <SimpleLineChart />
                                </>
                            )}
                        </PressureColumn>
                        <WindColumn>
                            <p>Wind (m/s)</p>
                            {Object.keys(selectedSolsData).length !== 0 ? (
                                <>
                                    <SimpleLineChart
                                        data={selectedSolsData.wind}
                                    />
                                </>
                            ) : (
                                <>
                                    <SimpleLineChart />
                                </>
                            )}
                        </WindColumn>
                    </Subcontainer>
                </>
            ) : (
                <LoadingDiv>
                    <p>Loading...</p>
                </LoadingDiv>
            )}
        </Container>
    );
}

export default WeekSolsData;

const Container = styled.div`
    min-height: calc(100vh - 70px);
    position: relative;
    overflow-x: hidden;
    padding: 0 calc(3.5vw + 5px);

    &:before {
        background: url("/images/mars.jpg") center center / cover no-repeat;
        position: absolute;
        content: "";
        opacity: 0.8;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`;

const Subcontainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const WeekNumberDiv = styled.div`
    text-align: left;
    padding-left: 2rem;
    display: flex;
    font-weight: 500;

    p {
        font-size: 2.5rem;
        color: white;
        margin: 0;
    }

    .btn {
        align-self: center;
        align-items: center;

        button {
            margin: 0;
            padding: 0.2rem;
            background-color: transparent;
            border: 4px solid white;
            border-radius: 18px;
        }
        button:hover {
            cursor: pointer;
            box-shadow: 0px 0px 7.5px 4px white;
        }

        button:active {
            transform: translateY(2px);
        }

        svg {
            color: white;
        }
    }

    .select-sol-div {
        /* display: contents; */
    }

    select {
        min-width: 8rem;
        margin-left: 0.5rem;
        padding: 5px;
        font-size: 2.5rem;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        color: black;
        text-align-last: center;
        margin-right: 2rem;
    }

    .help-full-text {
        display: flex;
        align-items: center;
        p {
            padding-left: 1.5rem;
            font-size: 1.7rem;

            color: #ff8f00;
        }
    }
`;

const TempColumn = styled.div`
    height: 22vh;
    padding-bottom: 3rem;
    background-color: grey;
    border-radius: 10px;
    opacity: 0.8;
    margin-bottom: 1rem;
    margin-top: 0.5rem;

    p {
        margin: 0;
        padding: 0.5rem;
        color: white;
        font-size: 1.5rem;
        padding-left: 5rem;
    }
`;

const PressureColumn = styled.div`
    height: 22vh;
    padding-bottom: 3rem;
    background-color: grey;
    border-radius: 10px;
    opacity: 0.8;
    margin-bottom: 1rem;

    p {
        margin: 0;
        padding: 0.5rem;
        color: white;
        font-size: 1.5rem;
        padding-left: 5rem;
    }
`;

const WindColumn = styled.div`
    height: 22vh;
    background-color: grey;
    border-radius: 10px;
    opacity: 0.8;
    padding-bottom: 3rem;

    p {
        margin: 0;
        padding: 0.5rem;
        color: white;
        font-size: 1.5rem;
        padding-left: 5rem;
    }
`;

const LoadingDiv = styled.div`
    //   SHOULD BE IN CENTER;
    /* position: absolute; */
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 70px);

    p {
        margin: 0;
        font-size: 5rem;
        color: white;
        -webkit-text-stroke: 1px #4d4d4d;
    }
`;
