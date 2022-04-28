import react, { useState, useEffect } from "react";
import styled from "styled-components";

import TemperatureMoreData from "./TemperatureMoreData";
import PressureMoreData from "./PressureMoreData";
import WindMoreData from "./WindMoreData";
import { sols, baseUrl } from "../services/urls";

//const API_URL = "http://localhost:5019/api/"; // + sol/
const API_URL = baseUrl;

function FrontPage({ getTemperature, updateCurrentSolNumber }) {
    const [moreDataIsVisible, setMoreDataIsVisible] = useState(false);
    const [allData, setAllData] = useState([]);
    const [selectedSolData, setSelectedSolData] = useState([]);

    // get all data, then load website
    useEffect(() => getAllData(API_URL), []);

    // get all data from BackEnd
    const getAllData = (url) => {
        fetch(url + "/sol/")
            .then((res) => res.json())
            .then((data) => {
                setAllData(
                    data.$values.sort((a, b) =>
                        parseInt(a.solNumber) > parseInt(b.solNumber) ? -1 : 1
                    )
                );
                setSelectedSolData(data.$values[0]);
                updateCurrentSolNumber(data.$values[0].solNumber);
            });
    };

    // hide or show more data components
    const show_hide_more_data = () => {
        if (moreDataIsVisible) {
            setMoreDataIsVisible(false);
        } else {
            setMoreDataIsVisible(true);
        }
    };

    // change solData when selected other sol number
    const handleSelectChange = (event) => {
        allData.forEach((data) => {
            if (data.solNumber == event.target.value) {
                setSelectedSolData(data);
            }
        });
    };

    return (
        <Container>
            {selectedSolData.id ? ( // if no data available show Loading div
                <>
                    <Subcontainer>
                        <LeftColumn>
                            <SolNumberDiv>
                                <div>
                                    <p>SOL</p>
                                </div>
                                <div className="select-sol-div">
                                    <select
                                        name="sol Number"
                                        // value={allAvailableSolNumbers}
                                        onChange={(event) =>
                                            handleSelectChange(event)
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
                            </SolNumberDiv>
                            <TempDiv>
                                <div>
                                    {moreDataIsVisible ? (
                                        <TemperatureMoreData
                                            tempData={
                                                selectedSolData.temperature
                                            }
                                            getTemperature={getTemperature}
                                        />
                                    ) : (
                                        <p>
                                            {getTemperature(
                                                selectedSolData.temperature
                                                    .average
                                            )}
                                        </p>
                                    )}
                                </div>
                            </TempDiv>
                            <PressureDiv>
                                <div>
                                    {moreDataIsVisible ? (
                                        <PressureMoreData
                                            pressureData={
                                                selectedSolData.pressure
                                            }
                                        />
                                    ) : (
                                        <>
                                            {selectedSolData.pressure
                                                .average === null ? (
                                                <p>---</p>
                                            ) : (
                                                <p>
                                                    {selectedSolData.pressure.average.toFixed(
                                                        2
                                                    )}{" "}
                                                    PA
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                            </PressureDiv>
                        </LeftColumn>
                        <CenterColumn>
                            <p>Season: {selectedSolData.season}</p>
                        </CenterColumn>
                        <RightColumn>
                            <WindSircleDiv>
                                <div>
                                    {selectedSolData.wind.average === null ? (
                                        <p></p>
                                    ) : (
                                        <img
                                            src={
                                                "/images/wind-circles/" +
                                                selectedSolData.wind
                                                    .mostCommonDirection +
                                                ".png"
                                            }
                                            alt=""
                                        />
                                    )}
                                </div>
                                {moreDataIsVisible ? (
                                    <></>
                                ) : (
                                    <>
                                        {selectedSolData.wind.average ===
                                        null ? (
                                            <p></p>
                                        ) : (
                                            <div>
                                                <p>
                                                    {selectedSolData.wind.average.toFixed(
                                                        2
                                                    )}{" "}
                                                    m/s
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </WindSircleDiv>
                            <WindMoreInfoDiv>
                                <div>
                                    {moreDataIsVisible ? (
                                        <WindMoreData
                                            windData={selectedSolData.wind}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </WindMoreInfoDiv>
                        </RightColumn>
                        <BtnDiv>
                            <div>
                                <Button onClick={() => show_hide_more_data()}>
                                    More data
                                </Button>
                            </div>
                        </BtnDiv>
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

export default FrontPage;

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
const LeftColumn = styled.div`
    min-height: 70vh;
    width: 30vw;
    font-size: 90px;
    color: #d9d9d9;
    -webkit-text-stroke: 1px #4d4d4d;
`;

const SolNumberDiv = styled.div`
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
    }
`;

const TempDiv = styled.div`
    flex: 2;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 2rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
`;

const PressureDiv = styled.div`
    flex: 1;
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 2rem;
`;

const RightColumn = styled.div`
    /* flex: 1; */
    text-align: center;
    display: flex;
    width: 30vw;
    flex-direction: column;
    /* padding: 1rem; */
`;

const CenterColumn = styled.div`
    width: 30vw;
    text-align: center;
    font-size: 45px;
    color: #d9d9d9;
    -webkit-text-stroke: 1px #4d4d4d;

    p {
        font-size: 3rem;
        padding-top: 4rem;
        font-weight: bold;
    }
`;

const BtnDiv = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
    bottom: 30px;
    left: 0;
`;

const WindSircleDiv = styled.div`
    flex: 1.7;
    display: flex;
    /* justify-content: right; */
    align-items: center;
    /* padding-right: 2rem; */
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding-left: 6rem;

    div {
        width: 100%;
    }

    img {
        height: 100%;
        width: 100%;
    }

    p {
        font-size: 2rem;
        margin: 0;
        font-weight: bold;
        color: #d9d9d9;
        padding-top: 5px;
    }
`;

const WindMoreInfoDiv = styled.div`
    flex: 0.71; // ???
    display: flex;
    justify-content: right;
    align-items: center;
    padding-right: 2rem;
    color: #d9d9d9;
    -webkit-text-stroke: 1px #4d4d4d;
`;

const Button = styled.div`
    height: 40px;
    width: 258px;
    color: white;
    display: flex;
    justify-content: center;
    background-color: rgba(23, 26, 32, 0.8);
    border-radius: 100px;
    opacity: 0.65;
    text-transform: uppercase;
    align-items: center;
    cursor: pointer;

    :hover {
        box-shadow: 0px 0px 7.5px 4px white;
    }
    :active {
        transform: translateY(2px);
    }
`;

const Subcontainer = styled.div`
    padding: 50px;
    display: flex;
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
