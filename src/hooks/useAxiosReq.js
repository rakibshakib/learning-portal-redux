import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";

const useAxiosReq = (initialValue, method) => {
    const [data, setData] = useState(initialValue || []);
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const createRequest = (url, payload, cb, isToast) => {
        setLoading(true)
        axios({
            method: method ? method : "get",
            url: url,
            data: payload && payload,
        }).then(res => {
            const response = res?.data;
            setData(response);
            cb?.(response);
            setErrorMessage("")
            setLoading(false);
            if (isToast) {
                toast.success(
                    response?.message ||
                    response?.Message ||
                    "Submitted Successfully"
                );
            }
        }).catch(err => {
            setData([]);
            setErrorMessage(err.response?.data?.message || "An error occurred"); // Extract error message
            setLoading(false);
            if (isToast) {
                toast.warn(
                    err?.data?.message ||
                    err?.data?.Message ||
                    "Failed, try again"
                );
            }
        })
    };
    return [data, createRequest, isLoading, setData, errorMessage]
}
export default useAxiosReq;