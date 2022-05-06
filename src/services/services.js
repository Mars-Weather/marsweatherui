import { sols, weekSols } from "./urls";

/**
 * Function that fetches jason
 * @param url api endpoint
 * @returns {Promise<any>}
 */
const fetch_json_payload = async(url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getAllSols = fetch_json_payload(sols);

export const getWeekSols = fetch_json_payload(weekSols);
