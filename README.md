# 🌟 HumAIne Content Generator

An AI-powered content generator built with **React + Vite + TailwindCSS + Netlify Functions + OpenAI GPT-4o-mini**.  

It allows users to generate content in multiple tones (professional, casual, witty, persuasive) across different formats (blog posts, LinkedIn posts, Twitter threads, ad copy).  
This project is built as part of my portfolio to showcase **frontend development, backend integration, and prompt engineering** skills.

👉 **Live Demo:** [humainecontentgenerator.netlify.app](https://humainecontentgenerator.netlify.app)

---

## ✨ Features
- 🎯 **Customizable Content** – Choose tone & content type  
- 📝 **Word Count Control** – User sets desired word count (cannot exceed max per content type)  
- ⚡ **AI-Powered** – Uses OpenAI GPT-4o-mini via secure Netlify serverless functions  
- ⏳ **Loading Spinner** – Full-screen overlay while generating  
- 📜 **History Panel** – Stores last 3 generations with one-click copy  
- 📋 **Copy with Feedback** – Copy button confirms with “Copied!” text  
- 📱 **Responsive Design** – Works on desktop & mobile  

---

## 🛠 Tech Stack
**Frontend:** React (Vite), TailwindCSS  
**Backend:** Netlify Functions (Serverless)  
**AI Model:** OpenAI GPT-4o-mini  
**Deployment:** Netlify  

---

## 📸 Screenshots
[Homepage Screenshot](https://github.com/brijeshpavith/ai-content-generator/blob/main/docs/screenshot-homepage.png)

[Generated Content with History Panel](https://github.com/brijeshpavith/ai-content-generator/blob/main/docs/screenshot-content-with-history.png)

---

## 🚀 Running Locally

You can run this project on your computer using **Node.js** and **Netlify CLI**.

### ✅ Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later)
* [Netlify CLI](https://docs.netlify.com/cli/get-started/)
  Install with:

  ```bash
  npm install -g netlify-cli
  ```
* An **OpenAI API key** (from [platform.openai.com](https://platform.openai.com/))

---

### 🔹 Step 1: Clone the Repo

```bash
git clone https://github.com/<your-username>/ai-content-generator.git
cd ai-content-generator
```

### 🔹 Step 2: Install Dependencies

```bash
npm install
```

### 🔹 Step 3: Add Your OpenAI Key

Create a `.env` file in the project root with:

```
OPENAI_API_KEY=sk-xxxxx...
```

*(Alternatively, export it in your shell: `export OPENAI_API_KEY=sk-xxxxx...`)*

### 🔹 Step 4: Run Locally

```bash
netlify dev
```

This will:

* Serve the app at [http://localhost:8888](http://localhost:8888)
* Run the backend function (`generate.js`) locally
* Pass your API key securely as an environment variable

### 🔹 Step 5: Test

* Open [http://localhost:8888](http://localhost:8888)
* Enter a topic, select tone/type, set word count
* Click **Generate Content** → AI-generated content appears

### 🔹 Step 6: Stop Server

Press `CTRL + C` in the terminal.

---

## 📦 Deployment

This app is deployed on **Netlify**.
Build settings:

* Build command: `npm run build`
* Publish directory: `dist`

---

## 📌 Future Enhancements

* ⬇️ Export content as `.txt` / `.docx`
* 🌙 Dark Mode toggle
* 🔐 User login & saved content library
* 📊 Analytics dashboard for generated content

---

## 👨‍💻 Author

Built with ❤️ by **Brijesh P. (HumAIne)**

* 🌐 [Live Demo](https://humainecontentgenerator.netlify.app)
* 💼 [LinkedIn](www.linkedin.com/in/brijesh-pavith-b011a67)
* 📧 [Email:](brijeshpavith@hotmail.com)

---
