# Personal Portfolio Website

## Project Structure

```
Portofolia Web/
├── .gitignore
├── README.md
├── package.json
├── vercel.json
├── public/
│   ├── index.html
│   ├── main.css
│   ├── main.js
│   └── assets/
│       └── WhatsApp.svg.webp
└── gemini/
    ├── .env
    ├── app.py
    ├── geminiApi.html
    ├── package.json
    ├── package-lock.json
    ├── script.js
    └── style.css
```

## How to Run

### Frontend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the frontend locally:
   ```bash
   npm start
   ```
   This uses `live-server` to serve your static files from the `public` directory.

### Backend (Gemini Chatbot)
1. Install Python dependencies:
   ```bash
   pip install flask flask-cors python-dotenv requests
   ```
2. Start the backend:
   ```bash
   cd gemini
   npm start
   ```
   This uses Flask's built-in server.

## Deployment
- Vercel is configured to use the `public` directory as the output directory.
- Update API URLs in your frontend if deploying to different domains.
- Keep your `.env` file secret and never commit it.

## Notes
- For production, consider using a static file host for the frontend (e.g., Netlify, Vercel) and a Python host for the backend (e.g., Heroku, Render).