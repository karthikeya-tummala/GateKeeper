import axios from "axios";

// const FINAL_URL = "http://localhost:9000";

const FINAL_URL = "https://5fnq6y247ak5bswlq4c3a2wqum0dpckf.lambda-url.ap-south-1.on.aws";

export const Raxios = axios.create({ baseURL: FINAL_URL });
export default Raxios;
