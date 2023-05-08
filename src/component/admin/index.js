import React from "react";
import { SidePanel } from "../side-panel";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 12px;
  margin-left: 64px;
  flex-direction: column;
  width: calc(100vw - 104px);
`;

export const AdminContainer = function ({ ChildComponents }) {
  return (
    <Container>
      {ChildComponents}
      <SidePanel />
    </Container>
  );
};
