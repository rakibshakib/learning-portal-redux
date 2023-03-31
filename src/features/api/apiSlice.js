const axios = "";

// 💥 Unexpected error handling way while callback function invoking 💥
const callBackFn = () => {
  // your condition
};

// api request
const saveData = (payload) => {
  axios.post("https://www.example.com/data", payload).then((res) => {
    // 💥 Approach 1 => Optional Chaining 😁
    callBackFn?.();

    // 💥 Approach 2 => Short-circuit evaluation 😁
    callBackFn && callBackFn();
  });
};
//  #Author: Rakibul Islam😁


saveData();
