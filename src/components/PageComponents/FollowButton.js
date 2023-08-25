import axios from "axios";
import { configToken } from "../../services/api";
import { useState } from "react";

export default function FollowButton({ statusFollow, userId, disable, setDisable }) {
    const [disabled, setDisabled] = useState(false);
    function changeFollow() {
        const URL = `${process.env.REACT_APP_API_URL}/follows`;
        const body = { userId };
        const config = configToken();
        setDisabled(true);
        axios
            .post(URL, body, config)
            .then(res => {
                setDisabled(false);
            })
            .catch(err => {
                alert("Não foi possível executar a operação.")
                setDisabled(false);
            })
            .finally(() => setDisable(false));
    }

    return (
        <button
            onClick={changeFollow}
            disabled={disabled}
            style={{
                backgroundColor: statusFollow === "following" ? "#FFFFFF" : "#1877F2",
                color: statusFollow === "following" ? "#1877F2" : "#FFFFFF",
                border: `1px solid ${statusFollow === "following" ? "#FFFFFF" : "#1877F2"}`,
            }}
            data-test="follow-btn"
        >
            {statusFollow === "following" ? "Unfollow" : "Follow"}
        </button>
    );
}
