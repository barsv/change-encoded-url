'use strict';

var go = document.getElementById('go');

go.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var url = document.getElementById('url').value;
        chrome.tabs.update(
            tabs[0].id,
            { url: url });
        window.close();
    });
};

document.getElementById('copy').onclick = function () {
    var url = document.getElementById('url').value;
    sendToClipboard(url);
};

document.getElementById('url').onkeypress = function () {
    var key = window.event.keyCode;
    // If the user has pressed enter
    if (key === 13) {
        go.click();
    }
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var decodedUrl = decodeURI(tabs[0].url)
    document.getElementById('url').value = decodedUrl;
    console.log(15 * (decodedUrl.length / 94) + 15);
    document.getElementById('url').style.height = (15 * (decodedUrl.length / 94) + 15) + 'px';
});

function sendToClipboard(myString) {
    var input = document.createElement('textarea');
    document.body.appendChild(input);

    input.value = myString;
    input.focus();
    input.select();

    document.execCommand('Copy');
    input.remove();
}