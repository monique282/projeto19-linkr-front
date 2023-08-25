import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { TbTrashFilled } from "react-icons/tb";
import { TiPencil } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

export const SCMetadata = styled.div`
  width: 100%;
  min-height: 155px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #4d4d4d;
  border-radius: 11px;

  div {
    :first-child {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 15px;
      h3 {
        :first-child {
          color: #cecece;
          font-size: 16px;
        }
        :nth-child(2) {
          color: #9b9595;
          font-size: 11px;
          line-height: 13px;
        }
        :last-child {
          color: #cecece;
          font-size: 11px;
          line-height: 13px;
        }
      }
    }
    :last-child {
      width: 155px;
      height: 155px;
    }
  }

  p {
    color: #fff;
    font-family: Lato;
    font-size: 14px;
    font-weight: 400;
    margin: 0;
  }

  img {
    width: 155px;
    height: 100%;
    border-radius: 11px;
  }
`;
export const StyledTooltip = styled(Tooltip)`
  background: "rgba(255, 255, 255, 0.90)";
  border-radius: "3px";
  color: "#505050";
  font-size: "12px";
`
export const StyledIcon = styled(({ isLiked, ...rest }) =>
  isLiked ? <AiFillHeart {...rest} /> : <AiOutlineHeart {...rest} />
)`font-size: 16px;
  color: ${(props) => (props.isLiked ? "#AC0000" : "#fff")};
  cursor: pointer;
  margin-top: 10px;
  height: 25px;
  width: 27px;`
  
export const StyledPencil = styled(TiPencil)`
  color: #fff;
  height: 23px;
  width: 23px;
  margin-right: 12px;
`;
export const StyledTrash = styled(TbTrashFilled)`
  color: #fff;
  height: 23px;
  width: 23px;
`;
export const EditInput = styled.input`
  font-size: 14px;
  color: #4c4c4c;
  font-family: Lato;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 7px;
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  gap: 7px;
  display: flex;
  flex-direction: column;
  .userName {
    display: flex;
    justify-content: space-between;
  }
  span {
    color: #fff;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
`;

export const Info = styled.div`
  width: 70px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-bottom: 5px;
  }
`;

export const Container = styled.div`
  width: 611px;
  height: 276px;
  flex-shrink: 0;
  padding: 18px;
  gap: 15px;
  display: flex;
  border-radius: 16px;
  background: #171717;
  z-index: 3;
`;
export const StyledIconComment = styled(AiOutlineComment)`
  font-size: 16px;
  color:  #fff;
  cursor: pointer;
  margin-top: 10px;
  height: 25px;
  width: 27px;
`;

export const StyledIconRepost = styled(BiRepost)`
  font-size: 27px;
  color:  #fff;
  cursor: pointer;
  margin-top: 10px;
`;
