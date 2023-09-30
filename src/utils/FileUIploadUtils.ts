export const csvToJson = <T>(csvData: string): T[] => {
    const lines = csvData.split('\n');
    const result: T[] = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj: { [key: string]: string } = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            const header = headers[j].trim();
            obj[header] = currentLine[j].trim();
        }
        result.push(obj as unknown as T);
    }
    return result;
};

export const getJsonFromCsv = async <T extends object>(file: File): Promise<T[]> => {
    if (file) {
        const reader = new FileReader();
        const readFilePromise = new Promise<string>((resolve, reject) => {
            reader.onload = (event) => {
                if (event.target) {
                    const csvData = event.target.result as string;
                    resolve(csvData);
                } else {
                    reject(new Error('Failed to read the file'));
                }
            };
            reader.onerror = () => {
                reject(new Error('Failed to read the file'));
            };
            reader.readAsText(file);
        });

        try {
            const csvData = await readFilePromise;
            return csvToJson(csvData) as T[];
        } catch (error) {
            console.error(error);
        }
    }
    return [];
};
