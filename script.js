
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');


function formatGeminiText(text) {
    // Convert * to list items and **bold**
    // Replace **text** with <strong>text</strong>
    let html = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Replace lines starting with * with <li>
    html = html.replace(/^\s*\*\s*(.+)$/gm, '<li>$1</li>');
    // If there are <li>, wrap them in <ul>
    if (html.includes('<li>')) {
        html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    }
    // Replace newlines with <br> (outside of lists)
    html = html.replace(/([^>])\n/g, '$1<br>');
    return html;
}

function appendMessage(msg, sender) {
    const div = document.createElement('div');
    div.className = sender === 'user' ? 'user-msg' : 'bot-msg';
    if (sender === 'bot') {
        div.innerHTML = formatGeminiText(msg);
    } else {
        div.textContent = msg;
    }
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function getGeminiReply(question) {
    try {
    const response = await fetch('http://localhost:5001/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: question })
        });
        const data = await response.json();
        if (data.reply) return data.reply;
        return data.error || 'Sorry, no response from Gemini AI.';
    } catch (err) {
        return 'Error: ' + err.message;
    }
}

chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const question = userInput.value.trim();
    if (!question) return;
    appendMessage(question, 'user');
    userInput.value = '';
    appendMessage('Thinking...', 'bot');
    const answer = await getGeminiReply(question);
    // Remove the 'Thinking...' message
    const botMsgs = chatWindow.getElementsByClassName('bot-msg');
    if (botMsgs.length > 0) {
        botMsgs[botMsgs.length - 1].remove();
    }
    appendMessage(answer, 'bot');
});

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in environment");
}
const ai = new GoogleGenAI({ apiKey });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: textContent,
  });
  console.log(response.text);
}

main();
