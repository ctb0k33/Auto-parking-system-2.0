import { BASE_URL } from "../constants";
/**
 * 
 * @param {string} path 
 * @param {URLSearchParams} params 
 * @returns the URL with the path and the query parameters
 */


export const buildUrl = (path, params) => `${BASE_URL}${path}?${params.toString()}`;