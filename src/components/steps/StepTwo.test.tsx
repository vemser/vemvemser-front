import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CandidatesProvider } from "../../context/CandidatesContext";
import "@testing-library/jest-dom";
import { StepTwo } from "./StepTwo";

describe("Testa os primeiro passo do registro", () => {
  const renderComponent = () => {
    render(
      <Router>
        <CandidatesProvider>
          <StepTwo />
        </CandidatesProvider>
      </Router>
    );
  };

  test("Renderiza o componente", () => {
    renderComponent();
    expect(screen.getByTestId("stepTwo")).toBeInTheDocument();
  });

  // testa se há um botão escrito "PRÓXIMO"
  test("Renderiza o botão", () => {
    renderComponent();
    expect(screen.getByText("Próximo")).toBeInTheDocument();
  })
});
