document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleExtension');
    const downloadButton = document.getElementById('downloadButton');
    const headingInput = document.getElementById('headingInput');
    const filenameInput = document.getElementById('filenameInput');

    chrome.storage.local.get({ enabled: true, filename: '' }, function(items) {
        updateButtonAppearance(items.enabled);
        if (items.filename) {
            filenameInput.value = items.filename;
        }
    });

    toggleButton.addEventListener('click', () => {
        chrome.storage.local.get({ enabled: true }, function(items) {
            const newStatus = !items.enabled;
            chrome.storage.local.set({ enabled: newStatus });
            updateButtonAppearance(newStatus);
        });
    });

    downloadButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({ action: "download" });
        headingInput.value = '';
        filenameInput.value = '';
        filenameInput.disabled = false;
        headingInput.disabled = false;
        filenameInput.classList.remove('fade-out');
        headingInput.classList.remove('fade-out');
    });

    filenameInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter' && filenameInput.value.trim() !== '') {
            chrome.storage.local.set({ filename: filenameInput.value.trim() });
            filenameInput.disabled = true;
            filenameInput.classList.add('fade-out');
        }
    });

    headingInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            chrome.runtime.sendMessage({ action: "saveHeading", heading: headingInput.value });
            headingInput.value = '';
            headingInput.disabled = true;
            headingInput.classList.add('fade-out');
        }
    });

    function updateButtonAppearance(enabled) {
        if (enabled) {
            toggleButton.classList.remove('inactive');
            toggleButton.classList.add('active');
        } else {
            toggleButton.classList.remove('active');
            toggleButton.classList.add('inactive');
        }
    }
});
