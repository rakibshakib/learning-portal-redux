import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useAxiosPost = (initialValue, method) => {
  const [res, setRes] = useState(initialValue || []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = (
    url,
    payload,
    cb,
    isToast,
    successMessage,
    errorMessage
  ) => {
    setLoading && setLoading(true);
    axios
      [method || "post"](url, payload)
      .then((res) => {
        setRes(res?.data);
        cb && cb(res?.data);
        setLoading(false);
        if (isToast) {
          toast.success(
            res?.data?.message ||
              res?.data?.Message ||
              successMessage ||
              "Submitted Successfully"
          );
        }
      })
      .catch((err) => {
        setRes(initialValue || []);
        setError(err);
        setLoading(false);
        if (isToast) {
          toast.warn(
            err?.response?.data?.message ||
              err?.response?.data?.Message ||
              errorMessage ||
              "Failed, try again"
          );
        }
      });
  };

  return [res, postData, loading, setRes, error];
};

export default useAxiosPost;
