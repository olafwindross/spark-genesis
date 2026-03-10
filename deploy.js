export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { html } = req.body;
    const response = await fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: { "index.html": { content: html } } }),
    });
    const data = await response.json();
    if (data.sandbox_id) {
      return res.status(200).json({ url: `https://${data.sandbox_id}.csb.app` });
    }
    return res.status(500).json({ error: "Deploy failed" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
