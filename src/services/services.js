import {sols} from "./urls";

export const getWeekSols = async() => {
    const result = await fetch(sols)
        .then((res)=>res.json())
        .catch((err) => console.log(err));
    return result;
}