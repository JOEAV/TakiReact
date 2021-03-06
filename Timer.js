import React from 'react';
import {Component} from 'react'
import './css/topBar.css'
import StatsFragment from './StatsFragment'
import {registerTimerCompRef} from "./js/Controllers/controller";

export default class TimerStatsFragment extends Component{

    constructor(props){
        super(props);
        this.state={
            timeElapsed:"00:00"
        }
    }
    componentWillMount(){
        registerTimerCompRef(this);
    }
    render(){
        let val=this.props.replayMode? this.props.timeElapsed:this.state.timeElapsed;
        return(
            <StatsFragment style='topBarItemFirstRow' title="Time Elapsed" val={val} />
        )

    }

}