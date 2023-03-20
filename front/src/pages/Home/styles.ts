import styled from "styled-components";

export const Container = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Content = styled.div`
  width: 95%;
  height: 95%;
  background: rgba(232, 236, 248, 0.45);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export const CardContents = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: column;
  min-height: 120px;
  margin: 1rem 1.2rem;
`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 100%;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

export const Text = styled.p`
  margin-left: 2rem;
`;
