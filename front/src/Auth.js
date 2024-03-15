import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
    
    const token = JSON.stringify(sessionStorage.getItem('user'));

    if(token == "null") {
        return;
    } else {
        let decodedToken = jwtDecode(token);
        let loggedIn = decodedToken.is_admin;
        return loggedIn;
    }
    
}