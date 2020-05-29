import styled from 'styled-components';
import { TextField, Button, FormGroup } from "@material-ui/core";

export const DARK_BLUE = '#194360';
export const BLUE = '#2A5777';
export const LIGHT_BLUE = '#0080E3';
export const HIGHLIGHT_BLUE = '#71C4FF';
export const GREEN = '#5DA03E';
export const RED = '#EF223B';
export const WHITE = '#F9F9F9';
export const GRAY = '#E8E8E8';
export const BLACK = '#26262B';

export const StyledTitle = styled.p`
  align-self: flex-start;
  color: ${WHITE};
  font-weight: bold;

  &.title {
    font-size: 4rem;
    align-self: center;
    margin: 0;
  }

  &.par {
    font-size: 1.3rem;
    align-self: center;
    font-weight: normal;
    margin: 0;
    margin-bottom: 100px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;

  background: ${BLUE};

  width: 100vw;
  height: 100vh;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
  }
`;

export const StyledButton = styled(Button)`
  background: ${(props) => props.color === 'green' ? GREEN : LIGHT_BLUE};
  width: ${(props) => props.color === 'green' ? '100%' : 'auto'};
  color: ${WHITE};
  font-weight: bold;
  margin-top: ${(props) => props.color === 'green' ? '0' : '10px'};
  padding: ${(props) => props.color === 'green' ? 'auto' : '5px 15px'};
  align-self: ${(props) => props.color === 'green' ? 'auto' : 'flex-start'};
`;

export const StyledTextField = styled.input`
  width: 100%;
  height: 45px;
  padding-left: 15px;
  border: 0;
  border-radius: 5px;

  &:nth-of-type(2) {
    margin: 10px 0;
  }

  &:active, &:focus {
    outline: none;
  }
`;

export const StyledFormGroup = styled(FormGroup)`
  width: 100%;
`;

export const StyledWrapper = styled.div`
  width: 30%;
`;

export const MarginLeft = styled(Button)`
  margin-left: auto !important;
`;

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;