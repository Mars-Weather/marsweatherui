import react, { useState } from "react";
import styled from "styled-components";

import TemperatureMoreData from "./TemperatureMoreData";
import PressureMoreData from "./PressureMoreData";

function FrontPage() {
   const [moreDataIsVisible, setMoreDataIsVisible] = useState("hidden");

   const show_hide_more_data = () => {
      if (moreDataIsVisible === "hidden") {
         setMoreDataIsVisible("visible");
      } else {
         setMoreDataIsVisible("hidden");
      }
   };

   return (
      <Container>
         <HorizontalDiv>
            <TempDiv>
               <div>
                  {moreDataIsVisible === "hidden" ? (
                     <p>80 ° F</p>
                  ) : (
                     <TemperatureMoreData />
                  )}
               </div>
            </TempDiv>
            <PressureDiv>
               <div>
                  {moreDataIsVisible === "hidden" ? (
                     <p>761 PA</p>
                  ) : (
                     <PressureMoreData />
                  )}
               </div>
            </PressureDiv>
         </HorizontalDiv>
         <HorizontalDiv>
            <div style={{ flex: 8 }}>
               <p style={{ fontSize: "2rem", color: "red" }}>Season: Summer</p>
            </div>
            <ButtonDiv>
               <button onClick={() => show_hide_more_data()}>More Data</button>
            </ButtonDiv>
         </HorizontalDiv>
         <HorizontalDiv>
            <WindSircleDiv>
               <div>
                  <p>wind circle</p>
               </div>
            </WindSircleDiv>
            <WindMoreInfoDiv>
               <p>wind more data comp</p>
            </WindMoreInfoDiv>
         </HorizontalDiv>
         {/*<PressureMoreData moreDataIsVisible={moreDataIsVisible} /> */}
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
`;

const ButtonDiv = styled.div`
   flex: 1;
   border: 2px solid;
   display: flex;
   justify-content: center;
   align-items: center;

   button {
      font-size: 1.5rem;
   }
`;

const TempDiv = styled.div`
   flex: 2;
   border: 1px solid;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const PressureDiv = styled.div`
   flex: 1;
   border: 2px solid;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const WindSircleDiv = styled.div`
   flex: 1.5;
   border: 2px solid;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const WindMoreInfoDiv = styled.div`
   flex: 1;
   border: 2px solid;
   display: flex;
   justify-content: center;
   align-items: center;
`;
