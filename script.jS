async function sendPrompt() {
  const prompt = document.getElementById("prompt").value;
  const responseDiv = document.getElementById("response");
  responseDiv.innerText = "جارٍ المعالجة...";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (data.ok) responseDiv.innerText = data.response;
    else responseDiv.innerText = "❌ خطأ: " + data.error;
  } catch (e) {
    responseDiv.innerText = "❌ خطأ في الاتصال";
  }
}
