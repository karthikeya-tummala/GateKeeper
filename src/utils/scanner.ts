import { message } from "antd";
import Raxios from './axiosHelper';
import { SetStateAction } from "react";

const sendBarcodeToBackend = async (
    value: string,
    setLoading: (value: SetStateAction<boolean>) => void
) => {
    console.log("Preparing to send barcode to backend..."); // Log the start of the process
    setLoading(true);

    try {
        const response = await Raxios.get("/", {
            params: { hash_code: value },
        });
        setLoading(false);
        console.log(response);
        return response;
    } catch (err) {
        console.error("Error sending barcode to backend:", err); // Log the error
        message.error("Failed to send barcode. Please try again.");

        // Ensure loading state is reset in case of failure
        setLoading(false);
        return null; // Return null to indicate failure
    }
};

export { sendBarcodeToBackend };
