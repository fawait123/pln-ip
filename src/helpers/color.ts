export function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}


export function getRandomColorFromSpecific(): string {
    const colors = ['#654520', '#F9DBBA', '#DD5746', '#070F2B'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}