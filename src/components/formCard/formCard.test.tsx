import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CandidatesProvider } from "../../context/CandidatesContext";
import "@testing-library/jest-dom";

import { FormCompleted } from ".";

describe("Testa o FormCompleted", () => {
  const renderComponent = () => {
    render(
      <Router>
        <CandidatesProvider>
          <FormCompleted />
        </CandidatesProvider>
      </Router>
    );
  };

  test("Renderiza o componente", () => {
    renderComponent();
    expect(screen.getByTestId("formCompleted")).toBeInTheDocument();
  });
});
