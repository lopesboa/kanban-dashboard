import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 100%;
  background: "#F5F6FA";
  &:not(:nth-last-child(1)) {
    border-right: 1px solid lightgrey;
  }
  padding: 0 0 1rem 0;
`;

export const ColumnTitle = styled.h3`
  padding: 1rem 0 0 1rem;
`;
export const TaskList = styled.div`
  padding: 0.6rem;
`;
