"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommitMessage = generateCommitMessage;
async function generateCommitMessage(diff, emoji = false) {
    const emojiInstruction = emoji
        ? "Start the commit message with a relevant emoji (e.g. ✨ for features, 🐛 for fixes, 📝 for docs)."
        : "";
    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ANTHROPIC_API_KEY || "",
            "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 200,
            messages: [
                {
                    role: "user",
                    content: `You are a git commit message expert. Based on this git diff, write a clear and concise commit message in conventional commits format (e.g. feat:, fix:, chore:). ${emojiInstruction} Only return the commit message, nothing else.\n\nDiff:\n${diff}`,
                },
            ],
        }),
    });
    const data = await response.json();
    return data.content[0].text.trim();
}
