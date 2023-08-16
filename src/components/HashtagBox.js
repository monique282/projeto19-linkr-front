import styled from 'styled-components';

export default function HashtagBox () {

    const mockHashtagList = [ "javascript", "react", "react-native", "material", "web-dev", "mobile", "css", "html", "node", "sql"]

    return (
        <SCHashtagBox>
            <SCTrending> trending </SCTrending>
            <SCHashtagContent>
                { mockHashtagList.map(word => <SCHashtagWord> # {word} </SCHashtagWord>) }
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

    //COLOCANDO APENAS PARA EDITAR, APAGAR QUANDO FOR USAR EM PRÁTICA
    position:fixed;
    top:150px;
    right:750px;
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
    border: 1px solid #484848;

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