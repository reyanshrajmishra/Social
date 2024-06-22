const shapeTypes = ['circle', 'rectangle', 'rocket'];
const shapeCount = 1000;
const minDistance = 50;
const shapes = [];

function isOverlapping(x, y, size) {
    for (let shape of shapes) {
        const dx = shape.x - x;
        const dy = shape.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
            return true;
        }
    }
    return false;
}

for (let i = 0; i < shapeCount; i++) {
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    let x, y, size;
    let tries = 0;

    do {
        size = Math.random() * 20 + 10;
        x = Math.random() * (window.innerWidth - size);
        y = Math.random() * (window.innerHeight - size);
        tries++;
        if (tries > 1000) break;
    } while (isOverlapping(x, y, size));

    if (tries > 1000) continue;

    shapes.push({x, y, size});
    const shape = document.createElement('div');
    shape.classList.add('shape', shapeType);
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.top = `${y}px`;
    shape.style.left = `${x}px`;

    if (shapeType === 'rocket') {
        shape.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <path fill="none" stroke="#000" stroke-width="2" d="M32 2s13.4 6.6 20.7 16.4c6.3 8.4 10.3 20 11.3 28.2l-7 7-8.2-2.1L29.9 54 27.4 61l-7-7c-8.2 1-19.8 5-28.2 11.3C4.4 50.6 11 37.2 11 37.2c0-8.6 3.4-17 7-23.6L2 2l2-2 20 8C32 6.6 32 2 32 2zM24 40c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
            </svg>
        `;
        shape.style.width = '30px';
        shape.style.height = '30px';
    }

    document.body.appendChild(shape);
}
