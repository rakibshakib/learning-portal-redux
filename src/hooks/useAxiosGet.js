import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useAxiosGet = (initialValue) => {
  const [res, setRes] = useState(initialValue || []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = (url, cb, obj) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        if (cb) {
          cb && cb(res?.data);
        } else {
          setRes(res?.data);
        }
        if (obj?.isSuccessToast) {
          toast.warn(obj?.successMessage || res?.data?.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        setRes(initialValue || []);
        setError(err);
        setLoading(false);
        if (obj?.isErrorToast) {
          toast.warn(obj?.errorMessage || err?.response?.data?.message);
        }
      });
  };

  return [res, getData, loading, setRes, error];
};

export default useAxiosGet;
