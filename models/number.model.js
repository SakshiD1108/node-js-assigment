const fs = require('fs').promises;
const path = require('path');

const filesDir = path.join(__dirname, '../files');
const filePaths = {
    A: path.join(filesDir, 'A.txt'),
    B: path.join(filesDir, 'B.txt'),
    C: path.join(filesDir, 'C.txt'),
    D: path.join(filesDir, 'D.txt')
};

// Ensure the files directory exists and initialize files
async function initializeFiles() {
    try {
        await fs.mkdir(filesDir, { recursive: true });
        // Create empty files if they don't exist
        await Promise.all(Object.values(filePaths).map(async filePath => {
            try {
                await fs.access(filePath); // Check if file exists
            } catch {
                // File does not exist, create it
                await fs.writeFile(filePath, '');
            }
        }));
    } catch (error) {
        console.error('Error initializing files:', error);
    }
}

// Function to check if all files contain data
async function allFilesContainData() {
    try {
        const checks = await Promise.all(Object.values(filePaths).map(async filePath => {
            try {
                const data = await fs.readFile(filePath, 'utf-8');
                return data.trim().length > 0;
            } catch (error) {
                console.error(`Error reading file ${filePath}:`, error);
                return false;
            }
        }));
        return checks.every(check => check);
    } catch (error) {
        console.error('Error checking files:', error);
        return false;
    }
}

// Function to save a number to a file
async function saveNumberToFile(file, number) {
    try {
        // Validate file name
        if (!filePaths[file]) {
            throw new Error(`Invalid file key: ${file}`);
        }
        // Append number to the file
        await fs.appendFile(filePaths[file], `${number}\n`);
    } catch (error) {
        console.error(`Error saving number to file ${file}:`, error);
    }
}

// Function to read numbers from all files
async function readNumbersFromFiles() {
    try {
        const fileContents = await Promise.all(Object.entries(filePaths).map(async ([key, filePath]) => {
            try {
                const data = (await fs.readFile(filePath, 'utf-8')).trim().split('\n');
                return [key, data];
            } catch (error) {
                console.error(`Error reading file ${filePath}:`, error);
                return [key, []]; // Return empty array on error
            }
        }));
        return Object.fromEntries(fileContents);
    } catch (error) {
        console.error('Error reading files:', error);
        return {};
    }
}

module.exports = {
    initializeFiles,
    allFilesContainData,
    saveNumberToFile,
    readNumbersFromFiles
};
