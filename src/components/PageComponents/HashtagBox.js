import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { configToken } from '../../services/api';
import { useEffect, useState } from 'react';

export default function HashtagBox () {

    // const mockHashtagList = [ "javascript", "react", "react-native", "material", "web-dev", "mobile", "css", "html", "node", "sql"];

    const navigate = useNavigate();
    const [hashtagsList, setHashtagsList] = useState([]);

    const URL = `${process.env.REACT_APP_API_URL}/hashtags`;
    const headers = configToken();

    useEffect(() => {

        axios.get(URL, headers)
            .then(res => setHashtagsList(res.data))
            .catch(err => console.log(err));

    },
    []) // COLOCAR DENTRO A VARIAVEL DE ESTADO QUE ATUALIZA O GET DOS POSTS!!!!!!!!!!!!!!!!!!

    return (
        <SCHashtagBox data-test="trending" > 
            <SCTrending> trending </SCTrending>
            <SCHashtagContent>
                { hashtagsList.map((hashtag, i) => <SCHashtagWord key={i} onClick={() => navigate(`/hashtag/${hashtag.hashtag}`)} data-test="hashtag" > # {hashtag.hashtag} </SCHashtagWord>) }
            </SCHashtagContent>
        </SCHashtagBox>
    )
}

const SCHashtagBox = styled.div`
    width: 301px;
    height:406px;
    background-color: #171717;
    border-radius: 10px;

    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
`

const SCTrending = styled.div`
    width:100%;
    height:70px;
    padding-left:15px;

    font-family:'Oswald';
    font-weight:700;
    font-size:27px;
    color: #FFFFFF;

    display:flex;
    align-items:center;
    justify-content:start;
    border-bottom: 1px solid #484848;

    box-sizing:border-box;
`

const SCHashtagContent = styled.div`
    width:100%;
    height:336px;
    padding-left:15px;
    padding-top:18px;

    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-items:space-between;
    gap:7px;    

    box-sizing:border-box;
`

const SCHashtagWord = styled.p`
    font-family: 'Lato';
    font-weight:700;
    font-size: 19px;
    line-height:23px;
    color: #ffffff;
    cursor:pointer;
`