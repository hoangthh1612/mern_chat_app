import axios from "axios";
const BASE_URL = 'http://localhost:9090/apis'

export const axiosRequest = axios.create({
    baseURL: BASE_URL
})