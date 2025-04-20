import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});

// describe("and a click is triggered on the submit button", () => {
//   it("displays a confirmation message on successful submission", async () => {
//     const onSuccess = jest.fn();
//     const onError = jest.fn();
//     render(<Form onSuccess={onSuccess} onError={onError} />);

//     // Simulez le remplissage du formulaire
//     fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: "Doe" } });
//     fireEvent.change(screen.getByLabelText(/Prénom/i), { target: { value: "John" } });
//     fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });

//     // Simulez le clic sur le bouton
//     fireEvent.click(await screen.findByTestId("button-test-id"));

//     // Attendez que le texte "En cours" soit affiché (optionnel)
//     await screen.findByText("En cours");

//     // Vérifiez que la fonction onSuccess a bien été appelée
//     expect(onSuccess).toHaveBeenCalled();

//     // Ajoutez une vérification pour le message de confirmation
//     const confirmationMessage = await screen.findByText(/Votre message a été envoyé avec succès!/i); // Ajustez le texte selon ce que vous avez défini
//     expect(confirmationMessage).toBeInTheDocument();
//   });
// });
