export function formatId(id) {
    const formattedId = id.toString().padStart(3, '0');
    return `#${formattedId}`;
}