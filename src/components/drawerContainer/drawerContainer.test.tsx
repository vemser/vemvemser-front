import { render, screen } from "@testing-library/react";
import { DrawerContainer } from ".";
import { BrowserRouter as Router } from "react-router-dom";
import { ManagerProvider } from "../../context/ManagerContext";
import "@testing-library/jest-dom";

describe("Testa o DrawerContainer", () => {
  const renderComponent = () => {
    render(
      <Router>
        <ManagerProvider>
          <DrawerContainer>Teste</DrawerContainer>
        </ManagerProvider>
      </Router>
    );
  };

  test("Testa se existe um link com o texto Dashboard", () => {
    renderComponent();

    const linkDashboard = screen.getByRole("link", { name: /dashboard/i });
    expect(linkDashboard).toBeInTheDocument();
  });

  test("Testa se existe um link com o texto Inscrições", () => {
    renderComponent();

    const linkInscricoes = screen.getByRole("link", { name: /inscrições/i });
    expect(linkInscricoes).toBeInTheDocument();
  });
});
