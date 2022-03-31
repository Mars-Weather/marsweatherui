import react, { useState } from "react";
import styled from "styled-components";

function WindMoreData({ windData }) {
    return (
        <Container>
            <TopDiv>
                <div>
                    <Title>Horizontal wind speed</Title>
                </div>
            </TopDiv>
            <CentralDiv>
                <div>
                    <Title>AVG</Title>
                    <p>{windData.average.toFixed(2)} m/s</p>
                </div>
            </CentralDiv>
            <BottomDiv>
                <div className="min-temp-div">
                    <Title style={{ paddingBottom: "2rem" }}>MIN</Title>
                    <p>{windData.minimum.toFixed(2)} m/s</p>
                </div>
                <div className="max-temp-div">
                    <Title style={{ paddingBottom: "2rem" }}>MAX</Title>
                    <p>{windData.maximum.toFixed(2)} m/s</p>
                </div>
            </BottomDiv>
        </Container>
    );
}

export default WindMoreData;

const Container = styled.div`
    width: 25rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    padding-right: 1rem;

    div {
        margin: 2px;
    }
`;

const TopDiv = styled.div`
    flex: 1;
    padding: 0rem;
    background-color: rgba(255, 255, 255, 0.4);

    div {
        padding: 1rem;
        width: auto;

        p {
            font-size: 1.8rem;
            margin: 0;
            text-align: left;
        }
    }
`;
const CentralDiv = styled.div`
    flex: 1;
    display: flex;
    background-color: rgba(227, 227, 227, 0.8);

    div {
        padding: 1rem;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    p {
        font-size: 1.8rem;
        margin: 0;
        font-weight: bold;
    }
`;

const BottomDiv = styled.div`
    flex: 3;
    display: flex;
    flex-direction: wrap;

    div {
        padding: 1rem;
        width: 100%;
    }

    p {
        font-size: 1.8rem;
        margin: 0;
        font-weight: bold;
    }

    .min-temp-div {
        background-color: rgba(162, 162, 162, 0.9);
        margin: 0;
    }

    .max-temp-div {
        background-color: rgba(212, 212, 212, 0.9);
        margin: 0;
    }
`;

const Title = styled.p`
    color: #2f2f2f;
    font-size: 1.8rem;
    margin: 0;
    font-weight: bold;
`;
