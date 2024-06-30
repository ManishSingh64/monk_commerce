import { styled } from "styled-components";

export const Wrapper = styled.div`
  //   border: 1px solid red;
  width: 35%;
  height: 100%;
  padding-top: 5rem;
`;

export const Header = styled.div`
  font-weight: 600;

  font-size: 1.5rem;
  font-family: sans-serif;
  //   padding: 1rem;
`;

export const InputHeader = styled.div`
  //   border: 1px solid green;
  font-size: 1.2rem;
  font-family: sans-serif;
  //   padding: 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
`;
export const DiscountHeader = styled.div`
  font-size: 1.2rem;
  font-family: sans-serif;
`;
export const InputWrapper = styled.div`
  margin-top: 1rem;
  // border: 1px solid blue;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const DiscountButton = styled.button`
  border: none;

  height: 3.5rem;
  background-color: #65a365;
  color: white;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid #65a365;

  &:hover {
    background-color: #fff;
    color: #65a365;
  }
`;

export const AddProductButton = styled.button`
  border: none;
  margin-top: 1rem;
  width: 45%;
  height: 3rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid #65a365;
  background-color: #fff;
  color: #65a365;
  float: right;
  &:hover {
    background-color: #65a365;
    color: white;
  }
`;
