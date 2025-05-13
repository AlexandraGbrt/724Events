import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  it("a list of mandatories links and the logo are displayed", async () => {
    render(<Menu />);
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on contact button", () => {
    it("document location  href change", async () => {
      render(<Menu />);
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(window.document.location.hash).toEqual("#contact");
    });
  });

  describe("and links are clicked", () => {
    it("document location changes for 'Nos services'", async () => {
      render(<Menu />);
      fireEvent.click(await screen.findByText("Nos services"));
      expect(window.document.location.hash).toEqual("#nos-services");
    });

    it("document location changes for 'Nos réalisations'", async () => {
      render(<Menu />);
      fireEvent.click(await screen.findByText("Nos réalisations"));
      expect(window.document.location.hash).toEqual("#nos-realisations");
    });

    it("document location changes for 'Notre équipe'", async () => {
      render(<Menu />);
      fireEvent.click(await screen.findByText("Notre équipe"));
      expect(window.document.location.hash).toEqual("#notre-equipe");
    });
  });

});
