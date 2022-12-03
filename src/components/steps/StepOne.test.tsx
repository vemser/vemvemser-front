import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CandidatesProvider } from "../../context/CandidatesContext";
import { StepOne } from "./StepOne";
import "@testing-library/jest-dom";

describe("Testa os primeiro passo do registro", () => {
  const renderComponent = () => {
    render(
      <Router>
        <CandidatesProvider>
          <StepOne />
        </CandidatesProvider>
      </Router>
    );
  };

  test("Renderiza o componente", () => {
    renderComponent();
    expect(screen.getByTestId("stepOne")).toBeInTheDocument();
  });

  // testa se há um botão escrito "PRÓXIMO"
  test("Renderiza o botão", () => {
    renderComponent();
    expect(screen.getByText("Próximo")).toBeInTheDocument();
  })
});
