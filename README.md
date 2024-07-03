# Macbook Text Replacement Util

This project works on a mac to manage the text replacements. For now it only supports exports.

## Background

Your text-replacements will sync across all your devices, iPhone, iPad, other macs, so managing from macbook makes sense. In future I will split emojis from kaomojis and quotes so you can selectively import what you want. Importing should be just dragging over the plist to your text-replacement settings in control panel. I hope to enrich the plist so that it can contain categories as well so you can batch delete and such.

## Export all your keys

`plutil -extract NSUserDictionaryReplacementItems xml1 -o - ~/Library/Preferences/.GlobalPreferences.plist > text-replacement.plist`

## List the values

`node list.js`

## remove one value

`node remove.js value`

## Import text-replacements

@see [macOS User Guide](https://support.apple.com/en-gb/guide/mac-help/mchl2a7bd795/mac#:~:text=Import%20text%20replacements)
