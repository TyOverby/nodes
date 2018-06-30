import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import { dragBox } from "../dragbox";
import { Port } from "./Graph";

export interface PortRowProps {
    port: Port,
    width: number,
    offset: number,
    left: boolean,
    onDrag: (x: number, y: number) => void;
}

export class PortRow extends Component<PortRowProps> {
    dragboxUnsubscribe: () => void = () => { };

    componentDidMount() {
        const element = ReactDOM.findDOMNode(this) as Element;
        const circle = element.querySelector("circle")!;
        this.dragboxUnsubscribe = dragBox(circle, (dx, dy) => {
            this.props.onDrag(dx, dy);
        });
    }
    componentWillUnmount() {
        this.dragboxUnsubscribe();
    }

    render() {
        const common: React.SVGProps<SVGTextElement> = {
            dominantBaseline: "hanging",
            width: this.props.width,
        };
        const x_circle_pos = this.props.left ? 0 : this.props.width;
        const x_text_offset = this.props.left ? "5px" : "-5px";
        const anchor = this.props.left ? "start" : "end";

        return <g>
            <text textAnchor={anchor} dx={x_text_offset} dy={`${this.props.offset + 1}em`} x={x_circle_pos} {...common}>
                {this.props.port.name}
            </text>
            <circle r={"5px"} cx={x_circle_pos} cy={`${this.props.offset + 1.5}em`} fill={"blue"} />
        </g>
    }
}
