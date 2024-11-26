import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlanets } from "../../redux/planet";
import { thunkFetchCards } from "../../redux/cards";

const useStaticDeck = () => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.session.user);
  const planets = useSelector((state) => state.planets.planets);
  const fetchedCards = useSelector((state) => state.cards.cards);

  const staticDeck = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllPlanets());
      await dispatch(thunkFetchCards());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!staticDeck.current && planets?.length && fetchedCards?.length) {
      const planetId = planets.find((planet) => planet.id === User.mission_deck)?.id ?? 1;
      staticDeck.current = fetchedCards.filter((card) => card.planet_id === planetId);
    }
  }, [planets, fetchedCards, User]);
  console.log("Static Deck",staticDeck)
  return staticDeck.current;
};

export default useStaticDeck;