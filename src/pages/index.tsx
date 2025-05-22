import React from "react";

import { Layout } from "../components/Layout";
import { TableContainer } from "../containers/TableContainer";

export const IndexPage = () => {
  return (
    <div data-testid="pets-dashboard-page">
      <Layout>
        <TableContainer />
      </Layout>
    </div>
  );
};
