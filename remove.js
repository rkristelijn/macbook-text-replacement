const fs = require('fs');
const { parseString, Builder } = require('xml2js');

// Load XML file
const xmlFile = 'text-replacement.plist';

// Read the entry to be removed from command line arguments
const entryToRemove = process.argv[2];

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

        // Find and remove the specified entry
        let found = false;
        result.plist.array[0].dict = result.plist.array[0].dict.filter(item => {
            if (item.string && item.string[0] === entryToRemove) {
                found = true;
                return false; // Exclude this entry
            }
            return true; // Keep other entries
        });

        if (!found) {
            console.log(`Entry '${entryToRemove}' not found.`);
            return;
        }

        // Convert JSON back to XML
        const builder = new Builder();
        const xml = builder.buildObject(result);

        // Write updated XML back to file
        fs.writeFile(xmlFile, xml, 'utf-8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing updated XML:', writeErr);
                return;
            }
            console.log(`Entry '${entryToRemove}' removed successfully.`);
        });
    });
});

