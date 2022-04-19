import react, { useState, useEffect, PureComponent } from "react";
import styled from "styled-components";
import SimpleLineChart from "./SimpleLineChart";

import { baseUrl } from "../services/urls";
const API_URL = baseUrl;

function WeekSolsData({ tempUnit }) {
    const [allWeekData, setAllWeekData] = useState({ "- - - - -": null });
    const [selectedSolsData, setSelectedSolsData] = useState();

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
                makeWeekData(data.$values);
            });
    };

    // set weekData to allWeekData state
    const makeWeekData = (data) => {
        data = data.reverse();
        let temperature_F = [];
        let temperature_C = [];
        let pressure = [];
        let wind = [];
        let sols_numbers = [];
        for (let i = 0; i < data.length; i++) {
            // take only not null objects
            if (
                data[i].temperature.average !== null &&
                data[i].pressure.average !== null &&
                data[i].wind.average !== null
            ) {
                sols_numbers.push(parseInt(data[i]["solNumber"]));
                temperature_F.push({
                    name: data[i]["solNumber"],
                    max: data[i]["temperature"]["maximum"],
                    avg: data[i]["temperature"]["average"],
                    min: data[i]["temperature"]["minimum"],
                });

                temperature_C.push({
                    name: data[i]["solNumber"],
                    max: ((data[i]["temperature"]["maximum"] - 32) * 5) / 9,
                    avg: ((data[i]["temperature"]["average"] - 32) * 5) / 9,
                    min: ((data[i]["temperature"]["minimum"] - 32) * 5) / 9,
                });
                pressure.push({
                    name: data[i]["solNumber"],
                    max: data[i]["pressure"]["maximum"],
                    avg: data[i]["pressure"]["average"],
                    min: data[i]["pressure"]["minimum"],
                });
                wind.push({
                    name: data[i]["solNumber"],
                    max: data[i]["wind"]["maximum"],
                    avg: data[i]["wind"]["average"],
                    min: data[i]["wind"]["minimum"],
                });
            }
            //when there are 7 sols data, put them in AllWeekData
            if (pressure.length === 7) {
                temperature_F.sort((a, b) => (a.name > b.name ? 1 : -1));
                temperature_C.sort((a, b) => (a.name > b.name ? 1 : -1));
                pressure.sort((a, b) => (a.name > b.name ? 1 : -1));
                wind.sort((a, b) => (a.name > b.name ? 1 : -1));

                let sol_range =
                    Math.min(...sols_numbers) + "-" + Math.max(...sols_numbers);

                setAllWeekData((prevState) => ({
                    ...prevState,
                    [sol_range]: {
                        temperature_F: temperature_F,
                        temperature_C: temperature_C,
                        pressure: pressure,
                        wind: wind,
                    },
                }));
                temperature_F = [];
                temperature_C = [];
                pressure = [];
                wind = [];
                sols_numbers = [];
            }
        }
    };

    const handleSelectChange = (event) => {
        Object.keys(allWeekData).forEach((data) => {
            if (data === event.target.value) {
                setSelectedSolsData(data);
            }
        });
    };

    return (
        <Container>
            {allWeekData ? ( // if no data available show Loading div
                <>
                    <Subcontainer>
                        <WeekNumberDiv>
                            <div>
                                <p>Sols:</p>
                            </div>
                            <div className="select-sol-div">
                                <select
                                    name="sols Number"
                                    value={selectedSolsData}
                                    onChange={(event) =>
                                        handleSelectChange(event)
                                    }
                                >
                                    {Object.keys(allWeekData).map((data) => (
                                        <option key={data} value={data}>
                                            {data}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {!allWeekData[selectedSolsData] ? (
                                <div className="helpFullText">
                                    <p>Please choose the sols range</p>
                                </div>
                            ) : (
                                <></>
                            )}
                        </WeekNumberDiv>
                        <TempColumn>
                            <p>Temperature (°{tempUnit})</p>
                            {allWeekData[selectedSolsData] ? (
                                <>
                                    {tempUnit === "F" ? (
                                        <SimpleLineChart
                                            data={
                                                allWeekData[selectedSolsData]
                                                    .temperature_F
                                            }
                                        />
                                    ) : (
                                        <SimpleLineChart
                                            data={
                                                allWeekData[selectedSolsData]
                                                    .temperature_C
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
                            {allWeekData[selectedSolsData] ? (
                                <>
                                    <SimpleLineChart
                                        data={
                                            allWeekData[selectedSolsData]
                                                .pressure
                                        }
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
                            {allWeekData[selectedSolsData] ? (
                                <>
                                    <SimpleLineChart
                                        data={
                                            allWeekData[selectedSolsData].wind
                                        }
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
        padding-right: 0.1rem;
    }

    .select-sol-div {
        display: contents;
    }

    select {
        margin-left: 0.5rem;
        padding: 5px;
        font-size: 2.5rem;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        color: black;
        text-align-last: center;
    }

    .helpFullText {
        display: flex;
        align-items: center;
        p {
            padding-left: 1.5rem;
            font-size: 1.7rem;

            color: red;
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
