#!/usr/bin/env node
import { getStagedDiff, commitWithMessage } from "./git";
import { generateCommitMessage } from "./ai";

const args = process.argv.slice(2);
const useEmoji = args.includes("--emoji");
const dryRun = args.includes("--dry-run");

async function main() {
  console.log("🔍 Staged changes check kar raha hoon...");

  const diff = getStagedDiff();

  if (!diff) {
    console.log("❌ Koi staged changes nahi hain. Pehle: git add .");
    process.exit(1);
  }

  console.log("🤖 AI commit message bana raha hai...");
  const message = await generateCommitMessage(diff, useEmoji);

  console.log(`\n✅ Generated Message:\n\n  ${message}\n`);

  if (dryRun) {
    console.log("🔎 Dry run mode — commit nahi hua.");
    process.exit(0);
  }

  commitWithMessage(message);
  console.log("🎉 Commit ho gaya!");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});