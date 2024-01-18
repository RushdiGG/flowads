import axios from "axios";

export var register = (newUser) => {
  return axios
    .post("/api/users/register", {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    })
    .then((res) => {
      return res;
    });
};

export var login = (user) => {
  return axios
    .post("/api/users/login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
