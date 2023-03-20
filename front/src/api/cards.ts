import { ICard, IDefaultCardProps } from "../interface";
import Api from "./axios-instance";

export async function createCard(data: IDefaultCardProps) {
  return Api().POST<ICard>("cards", data);
}

export async function getCards() {
  return Api().GET<ICard[]>("cards");
}

export async function deleteCard(id: string) {
  return Api().DELETE<ICard[]>(`cards/${id}`);
}

export async function updateCard(data: ICard) {
  return Api().PUT<ICard>(`cards/${data?.id}`, data);
}
export async function LoginService() {
  return Api().POST("login", { login: "letscode", senha: "lets@123" });
}
