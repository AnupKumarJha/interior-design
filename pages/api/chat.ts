import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })

  try {
    const { message, history = [] } = req.body || {}
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' })
    }

    const systemPrompt = `You are an intelligent interior design assistant for NamasteDesignStudios. Your role is to:
1) Help potential clients with interior design questions
2) Qualify leads by understanding their needs, budget, location, and timeline
3) Provide helpful info about our services (Residential focus, plus Commercial & E‑Design)
4) Guide interested clients to contact us via WhatsApp (9972555787), phone, or the contact form
Keep responses concise (2–3 sentences) and friendly.`

    const groqApiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY
    if (!groqApiKey) {
      // Fallback simple echo if key isn't configured (prevents client errors)
      return res.status(200).json({ reply: "Thanks! Could you share your city, budget range, and timeline? I’ll suggest the best approach and next steps." })
    }

    const payload = {
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: message },
      ],
      max_tokens: 150,
      temperature: 0.7,
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error('Groq API error', await response.text())
      return res.status(200).json({ reply: "I’m having trouble connecting right now. Could you share a few details and we’ll follow up on WhatsApp?" })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || "How can I help with your space?";
    return res.status(200).json({ reply })
  } catch (err) {
    console.error('Chat API exception', err)
    return res.status(200).json({ reply: "Sorry, something went wrong. Please try again or message us on WhatsApp (9972555787)." })
  }
}

