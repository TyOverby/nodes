import { Component } from "react";
import * as React from "react";

export interface CanvasProps {
    width: number;
    height: number;
}

export class Canvas extends Component<CanvasProps, {}> {
    render() {
        return <svg width={this.props.width} height={this.props.height} style={{ backgroundColor: "#aaa" }}>
            {this.props.children}
        </svg>;
    }
}
