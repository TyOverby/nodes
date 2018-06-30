export function dragBox(element: Element, callback: (x: number, y: number) => void): () => void {
    let clickedX = -1;
    let clickedY = -1;
    let dragging = false;

    const onMove = (e: MouseEvent) => {
        if (dragging) {
            let deltaX = e.clientX - clickedX;
            let deltaY = e.clientY - clickedY;
            clickedX += deltaX;
            clickedY += deltaY;
            callback(deltaX, deltaY);

            e.preventDefault();
            e.stopPropagation();
        }
    };

    const onUp = (e: MouseEvent) => {
        dragging = false;
        e && e.preventDefault();
        e && e.stopPropagation();
        window.addEventListener("mousemove", onMove);
    };

    console.log("registering");
    element.addEventListener("mousedown", (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        console.log("down");
        clickedX = e.clientX;
        clickedY = e.clientY;
        dragging = true;

        window.addEventListener("mouseup", onUp);
        window.addEventListener("mousemove", onMove);
    });

    return () => {
        window.removeEventListener("mouseup", onUp);
        window.removeEventListener("mousemove", onMove);
    };
}
