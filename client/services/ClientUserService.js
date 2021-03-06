import axios from "axios";

const ClientUserService = (() => {
    let currentUser = null;

    return {
        isAuthenticated: () => {
            console.log(currentUser !== null);
            return currentUser !== null
        },
        setUser: (user) => { currentUser = user},
        getUser: () => currentUser,
        authenticateUser: (username, password) => {
            return axios({
                method: "post",
                url: "/api/login",
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: username,
                    password: password
                }
            }).then(response => {
                let data = response.data;
                if (data.authenticated) {
                    currentUser = data.user;
                    ClientUserService.saveUser(currentUser);
                }
                return response.data;
            });
        },
        logoutUser: () => {
            localStorage.removeItem("food_tracker_user");
        },
        saveUser: (user) => {
            localStorage.setItem("food_tracker_user", JSON.stringify(user));
        }
    }
})();

export default ClientUserService;