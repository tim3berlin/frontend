import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post("/users", {
      email,
      password,
    });

    if (response.data.success) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return { success: true, user: response.data.user };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Error during login", error);
    return { success: false, message: "Login failed! Please try again." };
  }
};

export default apiClient;

// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: "http://localhost:5000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default apiClient;
