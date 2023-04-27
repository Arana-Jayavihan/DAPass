import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';

const parseJwt = (token) => {
    try {
        const pt = JSON.parse(atob(token.split(".")[1]));
        return pt
    } catch (e) {
        console.log('error')
        return null;
    }
};

const AuthVerify = (props) => {
    const cookies = new Cookies()
    let location = useLocation()

    useEffect(() => {
        try {
            const token = cookies.get('token');
            if (token) {
                const decodedJwt = parseJwt(token);
                console.log(decodedJwt.exp * 1000, Date.now(), decodedJwt.exp * 1000 < Date.now(), decodedJwt.exp * 1000 - Date.now(), decodedJwt.exp * 1000 - Date.now() < 2500000)

                // Handle automatic log out
                if (decodedJwt.exp * 1000 < Date.now()) {
                    props.logOut();
                }
                // Handle keep logged in
                if (decodedJwt.exp * 1000 - Date.now() < 2500000) {
                    props.refreshToken();
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }, [location, props]);
}

export default AuthVerify;