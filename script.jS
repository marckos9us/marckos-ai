const apiKey = "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";

async function sendPrompt() {
    const prompt = document.getElementById("prompt").value;
    const responseDiv = document.getElementById("response");
    responseDiv.innerText = "جارٍ المعالجة...";

    try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "mistralai/mistral-7b-instruct",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await res.json();
        responseDiv.innerText = data.choices?.[0]?.message?.content || "❌ حدث خطأ، تأكد من صيغة السؤال أو من الاتصال.";
    } catch (error) {
        responseDiv.innerText = "❌ حدث خطأ في الاتصال بالخادم.";
    }
}
