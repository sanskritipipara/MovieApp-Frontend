import { API } from "../backend";

const APIurl = API ||"https://mernmovieapp.herokuapp.com/api";
export const getMovies = () => {
    return fetch(`${APIurl}/movies`, {method: "GET"})
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}