import re

with open('components/AiChatHero.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import
content = content.replace(
    'import { useRef, useEffect, useState, KeyboardEvent } from "react";',
    'import { useRef, useEffect, useState, KeyboardEvent } from "react";\nimport { useLocale } from "next-intl";'
)

# 2. Add English intents just before INTENTS
en_intents = """
const SUGGESTIONS_ES = [
  "¿Qué servicios ofrecen?",
  "Me interesa una app móvil",
  "Ver el portafolio",
];

const SUGGESTIONS_EN = [
  "What services do you offer?",
  "I'm interested in a mobile app",
  "View portfolio",
];

const INTENTS_EN = [
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon"],
    responses: [
      "Hello! Great to meet you. I'm the official AI of Cómputo e IA del Sur. How can I help you today?",
      "Good day! I am the agency's virtual assistant. I'm programmed to answer any questions about our services or portfolio."
    ]
  },
  {
    id: "services_general",
    keywords: ["services", "do", "offer", "sell", "help", "company", "technology"],
    action: "servicios",
    responses: [
      "At Cómputo e IA del Sur, we specialize in 3 key areas: 1. Custom AI Models, 2. Native Mobile Apps, and 3. Advanced Web Systems. I'll take you there!",
      "We are a premium software development agency. We help modernize businesses. I'll show you our services right below:"
    ]
  },
  {
    id: "services_ai",
    keywords: ["ai", "artificial intelligence", "neural network", "bot", "chat", "model", "chatbot", "automate", "machine", "prediction"],
    responses: [
      "As AI specialists, we can develop algorithms to predict sales, smart customer service chatbots (like me!), and process automation for your company.",
      "AI is our specialty. We can integrate LLMs, computer vision, and predictive analysis directly into your business processes to save you time and money."
    ]
  },
  {
    id: "services_web",
    keywords: ["web", "page", "site", "system", "platform", "ecommerce", "store", "dashboard", "erp"],
    responses: [
      "We develop custom web systems using the latest technology (Next.js, React). This includes admin dashboards, ERPs, and highly secure online stores.",
      "Need a web system? We don't make 'basic' pages. We build complete platforms with databases, user management, and everything your business needs in the cloud."
    ]
  },
  {
    id: "services_mobile",
    keywords: ["app", "application", "mobile", "cell", "android", "ios", "iphone", "download"],
    responses: [
      "We build high-performance mobile applications for Android and iOS. We use technologies like React Native to guarantee your app is fast and ready for the App Store.",
      "If you have an idea for an app, we can develop it. We handle everything from screen design to uploading it to the app stores."
    ]
  },
  {
    id: "portfolio",
    keywords: ["portfolio", "projects", "examples", "done", "train", "work", "experience", "clients", "created"],
    action: "portafolio",
    responses: [
      "Sure! Our current flagship project is 'Mi Tren Ligero'. It's an official public transport app for Mexico City. Let me take you to the Portfolio section!",
      "We have real experience. For example, we developed the 'Mi Tren Ligero' app for Android and iOS. I'll redirect you to our Portfolio:"
    ]
  },
  {
    id: "location",
    keywords: ["where", "location", "located", "south", "mexico", "place", "city", "country", "headquarters"],
    responses: [
      "We are headquartered in Southern Mexico, but thanks to cloud technology, we work with clients and companies from anywhere in the world.",
      "We were born in Southern Mexico, providing world-class technological solutions nationally and internationally."
    ]
  },
  {
    id: "contact",
    keywords: ["contact", "talk", "hire", "quote", "price", "cost", "phone", "email", "schedule", "meeting", "how much"],
    action: "contacto",
    responses: [
      "Every project is unique, so prices vary. I'll take you straight to our contact form so we can schedule a free consultation.",
      "Let's talk about your project! I'll redirect you to the Contact section so you can send us a direct message."
    ]
  },
  {
    id: "about_agent",
    keywords: ["who are you", "are you", "your name", "what are you", "human", "robot"],
    responses: [
      "I am the exclusive NLP (Natural Language Processing) Engine of Cómputo e IA del Sur. I was programmed locally by our engineers to answer all your questions instantly.",
      "I am a text neural network integrated directly into this page. I don't depend on third parties, I was built by Cómputo e IA del Sur to demonstrate our technological capabilities."
    ]
  },
  {
    id: "tech_stack",
    keywords: ["technology", "program", "language", "react", "next", "node", "python", "stack"],
    responses: [
      "To ensure the best performance, we use modern technologies: Next.js and React for Web, React Native for Mobile Apps, and Python for our AI algorithms.",
      "Our Tech Stack is cutting-edge: Next.js, React Native, TailwindCSS for design, and custom Machine Learning models depending on the project."
    ]
  },
  {
    id: "compliment",
    keywords: ["pro", "incredible", "wow", "amazing", "great", "excellent", "perfect", "good", "impressive", "beautiful", "nice"],
    responses: [
      "Thank you very much! At Cómputo e IA del Sur, we take care of every pixel and every line of code. We want our work to always be Premium level.",
      "I appreciate the compliment! My code was designed with the highest standards. If you like what you see, imagine what we can do for your company!"
    ]
  }
];

const INTENTS_ES = [
"""
content = content.replace("const SUGGESTIONS = [", "const INTENTS_ES = [") # We'll replace SUGGESTIONS directly
content = content.replace(
    '  "Ver el portafolio",\n];\n\n// --- MOTOR NLP LOCAL ---',
    '// --- MOTOR NLP LOCAL ---'
)
content = content.replace("const INTENTS = [", en_intents)

# 3. Modify processTextLocally signature and logic
content = content.replace(
    "function processTextLocally(text: string): { text: string, action?: string } {",
    "function processTextLocally(text: string, locale: string): { text: string, action?: string } {"
)
content = content.replace("for (const intent of INTENTS) {", "const intentsToUse = locale === 'en' ? INTENTS_EN : INTENTS_ES;\n  for (const intent of intentsToUse) {")

# 4. Modify processTextLocally defaults
content = content.replace(
    'return { text: "¿Podrías darme un poco más de contexto? Estoy aquí para ayudarte con temas de Inteligencia Artificial, Apps Móviles o Páginas Web." };',
    'return { text: locale === "en" ? "Could you give me a little more context? I\'m here to help you with Artificial Intelligence, Mobile Apps, or Web pages." : "¿Podrías darme un poco más de contexto? Estoy aquí para ayudarte con temas de Inteligencia Artificial, Apps Móviles o Páginas Web." };'
)
content = content.replace(
    'return { text: "Esa es una observación muy interesante. Mi red neuronal está entrenada exclusivamente con información de Cómputo e IA del Sur. ¿Hay algún servicio tecnológico en el que te pueda orientar?" };',
    'return { text: locale === "en" ? "That\'s a very interesting observation. My neural network is trained exclusively with information from Cómputo e IA del Sur. Is there any technological service I can guide you on?" : "Esa es una observación muy interesante. Mi red neuronal está entrenada exclusivamente con información de Cómputo e IA del Sur. ¿Hay algún servicio tecnológico en el que te pueda orientar?" };'
)

# 5. Modify AiChatHero component
component_init = """export default function AiChatHero() {
  const locale = useLocale();
  const t = {
    greeting: locale === 'en' ? "Hello! I'm the Artificial Intelligence of Cómputo e IA del Sur. I'm connected to the agency's neural network. How can I help you today?" : "¡Hola! Soy la Inteligencia Artificial de Cómputo e IA del Sur. Estoy conectado a la red neuronal de la agencia. ¿En qué puedo ayudarte hoy?",
    aiAsst: locale === 'en' ? "AI Assistant" : "Asistente IA",
    processing: locale === 'en' ? "Processing neural response..." : "Procesando respuesta neuronal...",
    online: locale === 'en' ? "Online • Artificial Intelligence" : "Online • Inteligencia Artificial",
    placeholder: locale === 'en' ? "Ask the Artificial Intelligence..." : "Pregúntale a la Inteligencia Artificial..."
  };

  const [messages, setMessages] = useState<any[]>([
    {
      role: "model",
      parts: [{ text: t.greeting }]
    }
  ]);"""

content = re.sub(r'export default function AiChatHero\(\) \{[\s\S]*?\]\);', component_init, content)

# 6. Update processTextLocally call
content = content.replace('const response = processTextLocally(text);', 'const response = processTextLocally(text, locale);')

# 7. Update UI Strings
content = content.replace('Asistente IA', '{t.aiAsst}')
content = content.replace('Procesando respuesta neuronal..." : "Online • Inteligencia Artificial"', '{t.processing}" : t.online')
content = content.replace('Pregúntale a la Inteligencia Artificial...', '{t.placeholder}')

# 8. Update suggestions loop
content = content.replace('SUGGESTIONS.map((suggestion, i)', '(locale === "en" ? SUGGESTIONS_EN : SUGGESTIONS_ES).map((suggestion, i)')

with open('components/AiChatHero.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
