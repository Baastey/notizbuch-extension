let lastSelectedText = '';

document.addEventListener('mouseup', function(e) {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0 && selectedText !== lastSelectedText) {
        lastSelectedText = selectedText;
        chrome.runtime.sendMessage({ action: "saveText", text: selectedText });
    }
});
