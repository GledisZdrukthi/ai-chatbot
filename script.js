async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() !== '') {
        const chatBox = document.getElementById('chatBox');
        
        // Display user's message in the chat box
        chatBox.innerHTML += `<div class="user-message">${userInput}</div>`;
        document.getElementById('userInput').value = '';  // Clear the input field

        // Send the message to the API
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer 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' // Your API key
                },
                body: JSON.stringify({
                    model: "google/gemini-2.0-flash-lite-preview-02-05:free",
                    messages: [{"role": "user", "content": userInput}]
                })
            });

            const data = await response.json();
            const aiMessage = data.choices[0].message.content; // Assuming the response structure is correct

            // Display AI's response in the chat box
            chatBox.innerHTML += `<div class="ai-message">${aiMessage}</div>`;
        } catch (error) {
            console.error('Error:', error);
            const chatBox = document.getElementById('chatBox');
            chatBox.innerHTML += `<div class="ai-message">Sorry, something went wrong. Please try again later.</div>`;
        }
    }
}
