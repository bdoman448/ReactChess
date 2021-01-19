import React, { Component } from 'react'
import '../css/board.css';

export default class Square extends Component {
    state = {
        position: [],
        piece: null,
    }

    getStyle = (colour) => {
        return {
            padding: '1em',
            background: colour,
            height: '100%', 
            width: '100%'
        }
    }

    componentWillMount() 
    {
        this.setState({ position: this.props.id, 
                        piece: this.props.piece},()=> {
          }); 
    }

    render() {
        return (
            <div className="ButtonWrapper">
                <button style={this.getStyle(this.props.colour)} 
                onClick={() => this.props.callback(this.props.id, this.props.piece)} 
                >
                <img src={this.props.piece?.state?.style}  style={{height: '7em', width: '7em', border: 0}}/>
                </button>
            </div>
        )
    }
}


