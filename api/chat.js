export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const body = await req.json();
    const userMessage = body.prompt;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "nous-capybara-7b:free",
        messages: [
          { role: "system", content: "أنت مساعد ذكي يرد باللغة العربية دون قيود." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await res.json();
    return new Response(JSON.stringify({ message: data.choices[0].message.content }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ message: "حدث خطأ، تأكد من صيغة السؤال أو من الاتصال." }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
