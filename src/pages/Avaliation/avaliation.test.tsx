import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { AvaliationProvider } from "../../context/AvaliationContext";
import { Avaliation } from ".";

describe("Testa a página de avaliação", () => {
  const renderComponent = () => {
    render(
      <Router>
        <AvaliationProvider>
          <Avaliation />
        </AvaliationProvider>
      </Router>
    );
  };

  test("Renderiza o componente", () => {
    renderComponent();
    expect(screen.getByTestId("avaliation")).toBeInTheDocument();
  });
});
