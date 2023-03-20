import { useQuery, useMutation } from "react-query";
import { createCard, deleteCard, getCards, updateCard } from "../api/cards";
import { ICard } from "../interface";

export function useCards(card: ICard) {
  return useQuery(
    ["cards", { card }],
    () => getCards().then((response) => response?.data),
  );
}

export function useCreateCards() {
  return useMutation(createCard);
}

export function useDeleteCard() {
  return useMutation(deleteCard);
}

export function useUpdateCard(data: ICard) {
  return useMutation(() => updateCard(data));
}
