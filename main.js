import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Button from 'muicss/lib/react/button';
class Square extends Component
{
	constructor(props) {
    super(props);
    this.state = {
      value: "2",
    };
  }
	// constructor(props)
	// {

	// }
   render()
   {
      return(<Button variant="raised" onClick={this.props.onClick} size="lg">{this.props.value}</Button>);
   }
}
class Board extends Component
{
	constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext:true,
    };
  }
checkforgameend(squares)
{
    const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
renderSquare(i)
{
	
	return <Square value={this.state.squares[i]} onClick={()=>{
		const squares = this.state.squares.slice();
		const winner=this.checkforgameend(this.state.squares);
		if(squares[i] || winner)
			return null;
		squares[i]=this.state.xIsNext?"X":"O";
		
		this.setState({squares:squares,xIsNext:!this.state.xIsNext,});
		
	}}/>;
}
   render()
   {
   	const winner=this.checkforgameend(this.state.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

      return(<div style={{ position: "absolute",top:"35%",left:"35%"}}>
      	<div>{status}</div>
         <div class="row">
         {this.renderSquare(0)} {this.renderSquare(1)}{this.renderSquare(2)}
         </div>
         <div class="row">
          {this.renderSquare(3)} {this.renderSquare(4)}{this.renderSquare(5)}
         </div>
         <div class="row">
          {this.renderSquare(6)} {this.renderSquare(7)}{this.renderSquare(8)}
         </div>
         </div>);
   }
}


ReactDOM.render(
      <Board />,
      document.getElementById('root')
      );