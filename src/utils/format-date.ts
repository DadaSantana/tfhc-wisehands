export function formatDateString(dateString: string) {
    // Extract year, month, and day using substring method
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    // Combine into desired format
    return `${day}/${month}/${year}`;
}