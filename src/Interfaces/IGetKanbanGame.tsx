import IBoard from "./IBoard";
import ICard from "./ICard";
import IQueue from "./IQueue";

export default interface IGetKanbanGame{
  swiftKanbanData: {
    board: IBoard | undefined
    cards: ICard[],
    queue: IQueue[]
  }
}