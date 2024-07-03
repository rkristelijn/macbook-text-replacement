const fs = require('fs');
const { parseString } = require('xml2js');

// Load XML file
const xmlFile = 'text-replacement.plist';

// Read and parse XML
fs.readFile(xmlFile, 'utf-8', (err, data) => {
    if (err) {
        console.error(`Error reading file ${xmlFile}:`, err);
        return;
    }

    parseString(data, (parseErr, result) => {
        if (parseErr) {
            console.error('Error parsing XML:', parseErr);
            return;
        }

        // Extract data from parsed XML
        const replacements = result.plist.array[0].dict.map(item => ({
            replace: truncateText(item.string[0], 10), // Cap 'replace' value to 10 characters
            with: truncateText(item.string[1], 100) // Truncate 'with' value to 100 characters
        }));

        // Print as table
        console.log('Replace\tWith');
        replacements.forEach(item => {
            console.log(`${padRight(item.replace, 10)}\t${item.with}`);
        });
    });
});

// Function to truncate text and append '...' if necessary
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text;
    }
}

// Function to pad right with spaces to ensure fixed column width
function padRight(str, width) {
    const len = str.length;
    if (len < width) {
        return str + ' '.repeat(width - len);
    } else {
        return str;
    }
}

