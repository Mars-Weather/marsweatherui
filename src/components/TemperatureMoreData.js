import react, { useState } from "react";
import styled from "styled-components";

function TemperatureMoreData({ tempData, getTemperature }) {
    return (
        <Container>
            <TopDiv>
                <div>
                    <Title>ATMOSPHERIC</Title>
                    <Title>TEMPERATURE</Title>
                </div>
            </TopDiv>
            <CentralDiv>
                <div className="min-temp-div">
                    <Title>MIN</Title>
                    <p>{getTemperature(tempData.minimum)}</p>
                </div>
                <div className="max-temp-div">
                    <Title>MAX</Title>
                    <p>{getTemperature(tempData.maximum)}</p>
                </div>
            </CentralDiv>
            <BottomDiv>
                <div>
                    <Title>AVG</Title>
                    <p>{getTemperature(tempData.average)}</p>
                </div>
            </BottomDiv>
        </Container>
    );
}

export default TemperatureMoreData;

const Container = styled.div`
    width: 25.5rem;
    height: 28rem;
    display: flex;
    flex-direction: column;
    padding-left: 1rem;

    div {
        margin: 2px;
    }
`;
const TopDiv = styled.div`
    flex: 1;
    display: flex;
    background-color: rgba(255, 255, 255, 0.4);

    div {
        padding: 1rem;
        width: 100%;
    }
`;

const CentralDiv = styled.div`
    flex: 2;
    display: flex;
    flex-direction: wrap;
    padding: 0rem;

    div {
        padding: 1rem;
        width: 100%;

        p {
            font-size: 1.8rem;
            margin: 0;
            font-weight: bold;
        }
    }

    .min-temp-div {
        background-color: rgba(162, 162, 162, 0.9);
        margin: 0;
    }
    .min-temp-div p {
        padding-bottom: 2rem;
    }

    .max-temp-div {
        background-color: rgba(212, 212, 212, 0.9);
        margin: 0;
    }
    .max-temp-div p {
        padding-bottom: 2rem;
    }
`;

const BottomDiv = styled.div`
    flex: 1;
    display: flex;
    padding: 0rem;
    background-color: rgba(227, 227, 227, 0.8);

    div {
        padding: 1rem;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        p {
            font-size: 1.8rem;
            margin: 0;
            font-weight: bold;
        }
    }
`;

const Title = styled.p`
    color: #2f2f2f;
    font-size: 1.8rem;
    margin: 0;
    font-weight: bold;
`;
