type ObjectValues<T> = T[keyof T]

export interface ICard {
  titulo: string;
  conteudo: string;
  lista: ObjectValues<typeof LIST_TYPE>;
  id: string;
}


export const LIST_TYPE = {
  TO_DO: "To do",
  DOING: "Doing",
  DONE: "Done",
} as const;

export interface IDefaultCardProps {
  titulo: string;
  conteudo: string;
  lista: ObjectValues<typeof LIST_TYPE>;
}
