import { Component } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { dragBox } from "../dragbox";

export interface CanvasProps {
    width: number;
    height: number;
}

interface CanvasState {
    x: number;
    y: number;
}

export class Canvas extends Component<CanvasProps, CanvasState> {
    dragboxUnsubscribe: () => void = () => { };

    constructor(props: CanvasProps) {
        super(props);
        this.state = { x: 0, y: 0 };
    }

    componentDidMount() {
        const element = ReactDOM.findDOMNode(this) as Element;
        this.dragboxUnsubscribe = dragBox(element, (dx, dy) => {
            this.setState({
                x: this.state.x - dx,
                y: this.state.y - dy,
            });
        });
    }

    render() {
        const viewbox = `${this.state.x} ${this.state.y} 1000 1000`;
        return <svg viewBox={viewbox} width={this.props.width} height={this.props.height} style={{ backgroundColor: "#aaa" }}>
            {this.props.children}
        </svg>;
    }
}
