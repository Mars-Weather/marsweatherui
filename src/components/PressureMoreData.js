import react, { useState } from "react";
import styled from "styled-components";

function PressureMoreData() {
   return (
      <MainDiv>
         <div style={{ padding: "1rem" }}>1</div>
         <div style={{ padding: "1rem" }}>2</div>
         <BottomDiv>
            <div>3</div>
            <div>4</div>
         </BottomDiv>
      </MainDiv>
   );
}

export default PressureMoreData;

const MainDiv = styled.div`
   width: 20rem;
   height: 20rem;

   div {
      flex: 1;
      border: 1px solid;
      border-color: black;
   }
`;

const BottomDiv = styled.div`
   display: flex;
   flex-direction: wrap;
   padding: 0rem;

   div {
      height: 5rem;
      padding: 1rem;
   }
`;
