import IBoard from "./i-board";
import ICard from "./i-card";
import IQueue from "./i-queue";

export default interface IGetKanbanGame{
  swiftKanbanData: {
    board: IBoard | undefined
    cards: ICard[],
    queue: IQueue[]
  }
}