import react, { useState } from "react";

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
      <div>
         <p>Hello</p>
         <button onClick={() => show_hide_more_data()}>More Data</button>
         <TemperatureMoreData moreDataIsVisible={moreDataIsVisible} />
         <PressureMoreData moreDataIsVisible={moreDataIsVisible} />
      </div>
   );
}

export default FrontPage;
