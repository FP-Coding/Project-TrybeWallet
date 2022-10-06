import styled from 'styled-components';

const LoginArea = styled.div`
background-color: black;
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
img { 
  margin-bottom: 5vh;
  width: 25%;
 }
form{ 
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 2vh;
  input{
    &::placeholder{
      color: grey
    }
    &:focus{
      box-shadow: 1px 1px 5px 3px blue;
    }
    outline: none;
    padding: 10px ;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 3px purple;
    border: none
  }
}
`;

export default LoginArea;
