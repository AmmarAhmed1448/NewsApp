import { Component } from "react";
import './spinner.css'

export class Spinner extends Component{
    render(){
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner"></div>
            </div>
        );
    }
}