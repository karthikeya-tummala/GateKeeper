import axios from "axios";

// const FINAL_URL = "http://localhost:9000";

const FINAL_URL = "https://fbf7-103-103-209-145.ngrok-free.app";

export const Raxios = axios.create({ baseURL: FINAL_URL });
export default Raxios;
