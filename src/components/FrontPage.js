import react, {useState} from 'react';
import styled from 'styled-components';

import TemperatureMoreData from "./TemperatureMoreData";
import PressureMoreData from "./PressureMoreData";
import WindMoreData from "./WindMoreData";

function FrontPage() {
    const [moreDataIsVisible, setMoreDataIsVisible] = useState(false);

    const show_hide_more_data = () => {
        if (moreDataIsVisible) {
            setMoreDataIsVisible(false);
        } else {
            setMoreDataIsVisible(true);
        }
    };

    return (
        <Container>
            <Subcontainer>
                <LeftColumn>
                    {moreDataIsVisible ? (
                    <SolNumberDiv>
                        <p>SOL 259</p>
                    </SolNumberDiv>) : (<div></div>)}
                    <TempDiv>
                        <div>
                            {moreDataIsVisible ? (
                                <TemperatureMoreData/>
                            ) : (
                                <p>80° F</p>
                            )}
                        </div>
                    </TempDiv>
                    <PressureDiv>
                        <div>
                            {moreDataIsVisible ? (
                                <PressureMoreData/>
                            ) : (
                                <p>761 PA</p>
                            )}
                        </div>
                    </PressureDiv>
                </LeftColumn>
                <CenterColumn>
                    <p>Season: summer</p>
                </CenterColumn>
                <HorizontalDiv>
                    <WindSircleDiv>
                        <div>
                            <p style={{fontSize: "5rem", color: "#CBCBCB"}}>
                                wind circle
                            </p>
                        </div>
                    </WindSircleDiv>
                    <WindMoreInfoDiv>
                        <div>{moreDataIsVisible ? <WindMoreData/> : <></>}</div>
                    </WindMoreInfoDiv>
                </HorizontalDiv>
                <RightColumn>
                    <Button onClick={() => show_hide_more_data()}>More data</Button>
                </RightColumn>
            </Subcontainer>

        </Container>
    );
}

export default FrontPage;

const Container = styled.div`
    min-height: calc(100vh - 70px); 
    position: relative; 
    overflow-x: hidden; 
    padding: 0 calc(3.5vw + 5px);
    
    &:before{
        background: url("/images/mars.jpg") center center / cover no-repeat;
        position: absolute;
        content:"";
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
    font-size: 100px; 
    color: #d9d9d9; 
    -webkit-text-stroke: 1px #4d4d4d;
`;

const SolNumberDiv = styled.div`
   text-align: left;
   padding-left: 2rem;

   p {
      font-size: 2.5rem;
      color: white;
      margin: 0;
   }
`;

const TempDiv = styled.div`
   flex: 2;
   display: flex;
   justify-content: left;
   align-items: center;
   padding-left: 2rem;
`;

const PressureDiv = styled.div`
   flex: 1;
   display: flex;
   justify-content: left;
   align-items: center;
   padding-left: 2rem;
`;

const RightColumn = styled.div`
    position: fixed; 
    right: 30px;; 
    bottom: 30px; 
`;

const HorizontalDiv = styled.div`
   flex: 1;
   text-align: center;
   display: flex;
   flex-direction: column;
   padding: 1rem;
`;

const CenterColumn = styled.div`
    width: 30vw;
    text-align: center;
    font-size: 45px; 
    color: #d9d9d9; 
    -webkit-text-stroke: 1px #4d4d4d;
`;

const WindSircleDiv = styled.div`
   flex: 1.7;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const WindMoreInfoDiv = styled.div`
   flex: 1;
   display: flex;
   justify-content: right;
   align-items: center;
   padding-right: 2rem;
`;

const Button = styled.div`
    height: 40px; 
    width: 258px; 
    color: white;
    display: flex; 
    justify-content: center; 
    background-color: rgba(23, 26, 32, 0.8);
    border-radius: 100px; 
    opacity:0.65;
    text-transform: uppercase;
    align-items: center;
    cursor: pointer; 
`;

const Subcontainer = styled.div`
    padding: 50px; 
    display: flex; 
`;