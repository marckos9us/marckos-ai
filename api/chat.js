export default async function handler(req, res) {
    const { prompt } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "nousresearch/nous-capybara-7b:free",
            messages: [{ role: "user", content: prompt }]
        })
    });

    if (!response.ok) {
        const error = await response.text();
        return res.status(500).json({ ok: false, error });
    }

    const data = await response.json();
    res.status(200).json({ ok: true, response: data.choices[0].message.content });
}
