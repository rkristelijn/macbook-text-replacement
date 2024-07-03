const fs = require('fs');
const path = require('path');
const bplist = require('bplist-parser');

const exportTextReplacements = (exportPath = "text_replacements.json") => {
    const plistPath = path.join(process.env.HOME, 'Library', 'Preferences', '.GlobalPreferences.plist');
    
    if (!fs.exists(plistPath)) {
        console.error(`File ${plistPath} not found!`);
        return;
    }

    bplist.parseFile(plistPath, (err, obj) => {
        if (err) {
            console.error(`Error parsing plist: ${err}`);
            return;
        }

        // Try different potential keys here
        const keysToCheck = ['NSTextReplacement', 'NSUserReplacementItems'];
        let textReplacements = [];

        for (let key of keysToCheck) {
            if (obj[0][key]) {
                textReplacements = obj[0][key];
                break;
            }
        }

        if (textReplacements.length === 0) {
            console.log("No text replacements found.");
        } else {
            fs.writeFileSync(exportPath, JSON.stringify(textReplacements, null, 4));
            console.log(`Text replacements exported to ${exportPath}`);
        }
    });
};

exportTextReplacements();

