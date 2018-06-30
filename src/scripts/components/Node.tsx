import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import { dragBox } from "../dragbox";

export interface NodeProps {
    title: string;
}

interface NodeState {
    x: number;
    y: number;
    width: number;
    height: number;
}

function foo({ x, y }: { x: number, y: string }): { a: number, b: string } {
    return {
        a: x,
        b: y,
    }
}

export class Node extends Component<NodeProps, NodeState> {
    dragboxUnsubscribe: () => void = () => { };

    constructor(props: NodeProps) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
        };
    }

    componentDidMount() {
        const element = ReactDOM.findDOMNode(this) as Element;
        const resize = element.querySelector(".resize")!;
        dragBox(resize, (dx, dy) => {
            this.setState({
                width: this.state.width + dx,
                height: this.state.height + dy,
            });
        });

        this.dragboxUnsubscribe = dragBox(element, (dx, dy) => {
            this.setState({
                x: this.state.x + dx,
                y: this.state.y + dy,
            });
        });
    }
    componentWillUnmount() {
        this.dragboxUnsubscribe();
    }

    render() {
        return <svg x={this.state.x} y={this.state.y}>
            <rect width={this.state.width} height={this.state.height} fill={"white"} stroke={"black"}></rect>
            <rect className="resize" x={this.state.width - 10} y={this.state.height - 10} width={10} height={10} fill={"red"} stroke={"black"}></rect>
            <text dominantBaseline={"hanging"}> {this.props.title} </text>
        </svg>
    }
}
