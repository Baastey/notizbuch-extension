chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "saveText") {
        // Speichert den ausgewählten Text
        chrome.storage.local.get({ savedTexts: '', currentHeading: '' }, function(items) {
            let updatedTexts = items.savedTexts + (items.currentHeading ? items.currentHeading + '\n\n' : '') + request.text + '\n';
            chrome.storage.local.set({ savedTexts: updatedTexts });
            // Löschen der aktuellen Überschrift, da sie jetzt gespeichert ist
            chrome.storage.local.set({ currentHeading: '' });
        });
    } else if (request.action === "saveHeading") {
        // Speichert die aktuelle Überschrift
        chrome.storage.local.set({ currentHeading: request.heading });
    } else if (request.action === "download") {
        // Löst den Download der gespeicherten Texte aus
        chrome.storage.local.get({ savedTexts: '', filename: 'gespeicherter_text.txt' }, function(items) {
            if (items.savedTexts.length > 0) {
                chrome.downloads.download({
                    url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(items.savedTexts),
                    filename: items.filename + '.txt',
                    saveAs: false
                });
                // Löschen der gespeicherten Texte nach dem Download
                chrome.storage.local.set({ savedTexts: '' });
            }
        });
    }
});
