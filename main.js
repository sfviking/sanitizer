// Function to parse key-value pairs and return as an object
function parseKeyValuePairs(text) {
    const pairs = text.split(/\n/);
    const keyValuePairs = {};
    pairs.forEach(pair => {
        let [key, value] = pair.split(/[:\t]+/);
        keyValuePairs[key.trim()] = value.trim();
    });
    return keyValuePairs;
}

// Function to replace text based on key-value pairs
function replaceText() {
    const keyValuePairsText = document.getElementById('keyValuePairs').value;
    const keyValuePairs = parseKeyValuePairs(keyValuePairsText);
    let inputText = document.getElementById('inputText').value;

    Object.keys(keyValuePairs).forEach(key => {
        const regex = new RegExp(key, 'g');
        inputText = inputText.replace(regex, keyValuePairs[key]);
    });

    document.getElementById('inputText').value = inputText;
}

// Function to reverse and replace text based on reversed key-value pairs
function reverseReplaceText() {
    const keyValuePairsText = document.getElementById('keyValuePairs').value;
    const keyValuePairs = parseKeyValuePairs(keyValuePairsText);
    let inputText = document.getElementById('inputText').value;

    // Reverse key-value pairs
    const reversedKeyValuePairs = {};
    Object.keys(keyValuePairs).forEach(key => {
        const value = keyValuePairs[key];
        // Here we assume values are unique and can be used as keys
        reversedKeyValuePairs[value] = key;
    });

    // Apply reversed replacements
    Object.keys(reversedKeyValuePairs).forEach(value => {
        const regex = new RegExp(value, 'g'); // Consider escaping special regex characters in 'value'
        inputText = inputText.replace(regex, reversedKeyValuePairs[value]);
    });

    document.getElementById('inputText').value = inputText;
}

// Function to remove specific markdown tags
function removeMarkdownTags() {
    let inputText = document.getElementById('inputText').value;
    inputText = inputText.replace(/(###|##|\*\*)/g, '');
    document.getElementById('inputText').value = inputText;
}

function loadKeyValuePairsFromServer() {
    const filePath = 'keyValuePairs.txt'; // Adjust the path as necessary
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            document.getElementById('keyValuePairs').value = text;
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}

function stripURLs() {
    let inputText = document.getElementById('inputText').value;
    // Regular expression to match URLs
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    // Replace URLs with an empty string
    inputText = inputText.replace(urlRegex, '');
    document.getElementById('inputText').value = inputText;
}

function replaceNamesWithPlaceholdersNLP(text, placeholder = "[NAME]") {
    const doc = nlp(text);
    doc.people().forEach(person => {
        text = text.replace(person.text(), placeholder);
    });
    return text;
}

function handleReplaceNames() {
    const inputTextArea = document.getElementById('inputText'); // Assuming your input textarea has the ID 'inputText'
    const processedText = replaceNamesWithPlaceholdersNLP(inputTextArea.value);
    inputTextArea.value = processedText; // Update the textarea with the name-replaced text
}

function uploadFromFile() {
    // Create a file input element dynamically
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt'; // Specify that only .txt files are acceptable, if applicable

    // Handle file selection
    fileInput.onchange = e => {
        const file = e.target.files[0];
        if (!file) {
            return; // Exit if no file is selected
        }

        // Read the file content
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            const content = readerEvent.target.result; // This is the content of the file
            document.getElementById('keyValuePairs').value = content; // Assuming your textarea for key-value pairs has the ID 'keyValuePairs'
        };
        reader.onerror = error => console.error('Error reading file:', error);
    };

    fileInput.click(); // Simulate a click to open the file dialog
}

// Leaving empty for public consumption

const keyValuePairs = {

};

function repopulateKeyValuePairs() {
    const keyValuePairsTextarea = document.getElementById('keyValuePairs');
    const keyValuePairsString = Object.entries(keyValuePairs).map(([key, value]) => `${key}: ${value}`).join('\n');
    keyValuePairsTextarea.value = keyValuePairsString;
}

// Assuming keyValuePairs and repopulateKeyValuePairs() are defined above
repopulateKeyValuePairs(); // This calls the function as soon as the script loads

function removeChineseCharacters() {
    const inputTextArea = document.getElementById('inputText'); // Assuming your input textarea has an ID 'inputText'
    let text = inputTextArea.value;
    // Regular expression to match Chinese characters
    const regex = /[\u4e00-\u9fff]/g;
    text = text.replace(regex, '');
    inputTextArea.value = text; // Update the textarea with the modified text
}


function saveKeyValuePairs() {
    // Implement file saving logic here
    alert('Save function is not implemented.');
}

// Utility functions to clear forms
function clearKeyValuePairs() {
    document.getElementById('keyValuePairs').value = '';
}

function clearInputText() {
    document.getElementById('inputText').value = '';
}

function clearResultText() {
    document.getElementById('inputText').value = '';
}

function copyResultText() {
    const inputText = document.getElementById('inputText');
    inputText.select();
    document.execCommand('copy');
    // alert('Result text copied to clipboard.');
}
