import react, { useState } from "react";
import styled from "styled-components";

function TemperatureMoreData() {
   return (
      <MainDiv>
         <div style={{ padding: "1rem" }}>1</div>
         <CentralDiv>
            <div>2</div>
            <div>3</div>
         </CentralDiv>
         <div style={{ padding: "1rem" }}>4</div>
      </MainDiv>
   );
}

export default TemperatureMoreData;

const MainDiv = styled.div`
   width: 15rem;
   height: 20rem;

   div {
      flex: 1;
      border: 1px solid;
      border-color: black;
   }
`;

const CentralDiv = styled.div`
   display: flex;
   flex-direction: wrap;
   padding: 0rem;

   div {
      height: 10rem;
      padding: 1rem;
   }
`;
