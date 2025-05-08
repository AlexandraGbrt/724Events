import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // verifier que data existe
  const byDateDesc = data?.focus
    ? [...data.focus].sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? 1 : -1 // du plus ancien au plus récent
    )
    : [];

  // Effet pour faire défiler les slides toutes les 5 secondes avec nettoyage du setTimeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000); // Délai de 5 secondes

    return () => clearTimeout(timeout); // Nettoyage du timeout à chaque changement
  }, [byDateDesc]);


  return (
    <div className="SlideCardList">

      {byDateDesc?.map((event, idx) => (

        <div key={event.id}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Les dots en dehors de la carte */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, i) => (
            <input
              key={`radio-${event.id}`}
              type="radio"
              name="radio-button"
              checked={index === i}
              readOnly
            />
          ))}

        </div>
      </div>
    </div>
  );



};

export default Slider;
