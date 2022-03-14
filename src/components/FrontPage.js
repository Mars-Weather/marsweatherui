import react, { useState } from "react";
import styled from "styled-components";

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
         <HorizontalDiv>
            <SolNumberDiv>
               <p>SOL 259</p>
            </SolNumberDiv>
            <TempDiv>
               <div>
                  {moreDataIsVisible ? (
                     <TemperatureMoreData />
                  ) : (
                     <p className="general-information">80° F</p>
                  )}
               </div>
            </TempDiv>
            <PressureDiv>
               <div>
                  {moreDataIsVisible ? (
                     <PressureMoreData />
                  ) : (
                     <p className="general-information">761 PA</p>
                  )}
               </div>
            </PressureDiv>
         </HorizontalDiv>
         <HorizontalDiv>
            <div style={{ flex: 8 }}>
               <p style={{ fontSize: "2rem", color: "white", marginTop: 0 }}>
                  Season: Summer
               </p>
            </div>
            <ButtonDiv>
               <button onClick={() => show_hide_more_data()}>More Data</button>
            </ButtonDiv>
         </HorizontalDiv>
         <HorizontalDiv>
            <WindSircleDiv>
               <div>
                  <p style={{ fontSize: "5rem", color: "#CBCBCB" }}>
                     wind circle
                  </p>
               </div>
            </WindSircleDiv>
            <WindMoreInfoDiv>
               <div>{moreDataIsVisible ? <WindMoreData /> : <></>}</div>
            </WindMoreInfoDiv>
         </HorizontalDiv>
      </Container>
   );
}

export default FrontPage;

const Container = styled.div`
   min-height: calc(100vh - 70px);
   position: relative;
   overflow-x: hidden;
   padding: 0 calc(3.5vw + 5px);
   display: flex;
   flex-direction: row;

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

const HorizontalDiv = styled.div`
   flex: 1;
   text-align: center;
   display: flex;
   flex-direction: column;
   padding: 1rem;
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

const ButtonDiv = styled.div`
   flex: 1;
   display: flex;
   justify-content: center;
   align-items: center;

   button {
      font-size: 1.5rem;
   }
`;

const TempDiv = styled.div`
   flex: 2;
   display: flex;
   justify-content: left;
   align-items: center;
   padding-left: 2rem;

   .general-information {
      color: #cbcbcb;
      font-size: 8rem;
      padding-left: 1rem;
   }
`;

const PressureDiv = styled.div`
   flex: 1;
   display: flex;
   justify-content: left;
   align-items: center;
   padding-left: 2rem;

   .general-information {
      color: #cbcbcb;
      font-size: 8rem;
      padding-left: 1rem;
   }
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
