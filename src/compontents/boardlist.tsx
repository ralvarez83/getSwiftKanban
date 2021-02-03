import { Component } from 'react';
import IBoard from '../Interfaces/IBoard';
import Board from './board';

interface IProps {
  boards: IBoard[]
}

export default class BoardList extends Component<IProps>{


//     render(){
//         console.log(this.props.boards);
//         return( 
//             <CardColumns>   
//                 {this.props.boards.map((board) => {
//                     return (
//                         <Board key={board.boardId} board={board}></Board>
//                     )
//                 })}
//             </CardColumns>
//         );
//     }
}