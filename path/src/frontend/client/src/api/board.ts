const API_BASE_URL = "http://localhost:3000/api/board";

export async function fetchNextGeneration(
    liveCells: Set<number>,
    width: number,
    height: number
): Promise<Set<number>> {
    const response = await fetch(`${API_BASE_URL}/next`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liveCells: [...liveCells], width, height }),
    });

    if (!response.ok) {
        throw new Error(`Step request failed: ${response.status}`);
    }

    const data = await response.json();
    return new Set(data.liveCells);
}