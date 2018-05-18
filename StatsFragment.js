import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'

export default  class StatsFragment extends Component{
    render(){
        return(
            <div>
                <div>{this.props.title}</div>
                <div>{this.props.val}</div>
            </div>
        )
    }

}
