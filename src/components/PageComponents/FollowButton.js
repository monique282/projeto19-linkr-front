import axios from "axios";
import { configToken } from "../../services/api";
import { useState } from "react";

export default function FollowButton( { statusFollow, userId, disable, setDisable } ) {

    console.log(statusFollow);

    function changeFollow () {
        setDisable(true);

        const URL = `${process.env.REACT_APP_API_URL}/follows`;
        const body = { userId };
        const config = configToken();
        axios
            .post(URL, body, config)
            .then( res => {})
            .catch( err => alert("Não foi possível executar a operação."))
            .finally(() => setDisable(false));
    }


    return (
        <button
            onClick={changeFollow}
            disabled={disable}
            style={{
                backgroundColor: statusFollow === "following" ? "#FFFFFF" : "#1877F2",
                color: statusFollow === "following" ? "#1877F2" : "#FFFFFF",
                border: `1px solid ${statusFollow === "following" ? "#FFFFFF" : "#1877F2"}`
            }}            
        >
            {statusFollow === "following" ? "Unfollow" : "Follow"}
        </button>
    );
}
