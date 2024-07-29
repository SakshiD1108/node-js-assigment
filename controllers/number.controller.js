const numberModel = require('../models/number.model');

async function processNumber(req, res) {
    try {
        const { number } = req.body;

        if (!number || typeof number !== 'number' || number < 1 || number > 25) {
            return res.status(400).send('Number must be an integer between 1 and 25.');
        }

        const multipliedNumber = number * 7;
        let targetFile = 'D';

        if (multipliedNumber > 140) {
            targetFile = 'A';
        } else if (multipliedNumber > 100) {
            targetFile = 'B';
        } else if (multipliedNumber > 60) {
            targetFile = 'C';
        }

        await numberModel.saveNumberToFile(targetFile, multipliedNumber);

        if (await numberModel.allFilesContainData()) {
            return res.send('Process complete. All files contain data.');
        } else {
            return res.send(`Number ${multipliedNumber} saved to file ${targetFile}.`);
        }
    } catch (error) {
        console.error('Error processing number:', error);
        return res.status(500).send('Internal server error.');
    }
}

async function displayNumbers(req, res) {
    try {
        const fileContents = await numberModel.readNumbersFromFiles();
        res.json(fileContents);
    } catch (error) {
        console.error('Error displaying numbers:', error);
        return res.status(500).send('Internal server error.');
    }
}

module.exports = {
    processNumber,
    displayNumbers
};
