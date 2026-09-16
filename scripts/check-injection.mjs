import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// ANSI colors for terminal output
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

// Known malware/injection signatures
const SUSPICIOUS_PATTERNS = [
  {
    name: "Ethereum RPC / Crypto Miner Loader",
    regex: /(withRpcEndpoints|candidateBlocks|BLOCK_MULTIPLE|lastSenderTx|eth_blockNumber|eth_getTransactionCount|INDEXER_URL)/i,
  },
  {
    name: "Malicious Obfuscated Payload Variable / Header",
    regex: /(x-payload-b64|_0x[a-f0-9]{4,}|global\['_V'\]|global\['_H'\]|global\.i\s*=)/i,
  },
  {
    name: "Hidden Code Behind Massive Whitespace Padding",
    regex: /[\t ]{40,}[^\s]/,
  },
  {
    name: "Obfuscated XOR / Buffer Byte Decoder Loop",
    regex: /(\.charCodeAt\([a-zA-Z0-9%_]+\)\s*\^|\^=\s*[a-zA-Z0-9_]+\[[a-zA-Z0-9%_]+\])/,
  },
];

// Config files that should NEVER contain network or child process execution
const CONFIG_FILE_PATTERNS = [
  /postcss\.config\.(mjs|js|cjs|ts)$/,
  /next\.config\.(mjs|js|cjs|ts)$/,
  /tailwind\.config\.(mjs|js|cjs|ts)$/,
  /eslint\.config\.(mjs|js|cjs|ts)$/,
];

const FORBIDDEN_CONFIG_PATTERNS = [
  { name: "Child Process Spawn/Exec", regex: /(child_process|spawn\s*\(|exec\s*\(|execSync\s*\()/ },
  { name: "Dynamic Code Evaluation (eval/Function)", regex: /(eval\s*\(|new\s+Function\s*\()/ },
  { name: "HTTP Network Requests in Config", regex: /(require\s*\(\s*["']node:(http|https|net|dgram)["']\)|http\.request|https\.request)/ },
  { name: "Excessively Long Line (>1000 chars in config)", regex: /^.{1000,}$/m },
];

function getStagedFiles() {
  try {
    const output = execSync("git diff --cached --name-only --diff-filter=ACMR", {
      encoding: "utf8",
    });
    return output
      .split(/\r?\n/)
      .map((f) => f.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function getStagedContent(filePath) {
  try {
    return execSync(`git show :${JSON.stringify(filePath)}`, {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch {
    // Fallback to reading disk file if git show fails
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
    return "";
  }
}

function scanContent(filePath, content) {
  const issues = [];
  const lines = content.split(/\r?\n/);

  // 1. Check general suspicious patterns
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const pattern of SUSPICIOUS_PATTERNS) {
      if (pattern.regex.test(line)) {
        issues.push({
          line: i + 1,
          rule: pattern.name,
          preview: line.trim().slice(0, 120),
        });
      }
    }
  }

  // 2. Check strict config file rules
  const isConfigFile = CONFIG_FILE_PATTERNS.some((rgx) => rgx.test(filePath));
  if (isConfigFile) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const pattern of FORBIDDEN_CONFIG_PATTERNS) {
        if (pattern.regex.test(line)) {
          issues.push({
            line: i + 1,
            rule: `Config File Violation: ${pattern.name}`,
            preview: line.trim().slice(0, 120),
          });
        }
      }
    }

    // Specific check for postcss.config.mjs size/structure
    if (/postcss\.config\.(mjs|js|cjs|ts)$/.test(filePath)) {
      if (content.length > 500) {
        issues.push({
          line: 1,
          rule: "PostCSS config size exceeds safe limit (>500 bytes). Likely infected.",
          preview: `File size: ${content.length} bytes`,
        });
      }
    }
  }

  return issues;
}

function main() {
  console.log(`${BOLD}[Pre-Commit Security Hook]${RESET} Scanning staged files for malicious injections...`);

  const stagedFiles = getStagedFiles();
  if (stagedFiles.length === 0) {
    console.log(`${GREEN}✓${RESET} No staged files to check.`);
    process.exit(0);
  }

  let hasSecurityIssues = false;

  for (const file of stagedFiles) {
    // Skip scanner self-file, githooks, binary files, and vendor folders
    if (
      file === "scripts/check-injection.mjs" ||
      file.startsWith(".githooks/") ||
      file.startsWith("node_modules/") ||
      file.startsWith(".next/") ||
      file.endsWith(".png") ||
      file.endsWith(".jpg") ||
      file.endsWith(".ico") ||
      file.endsWith(".woff2")
    ) {
      continue;
    }

    const content = getStagedContent(file);
    if (!content) continue;

    const issues = scanContent(file, content);

    if (issues.length > 0) {
      hasSecurityIssues = true;
      console.error(`\n${RED}${BOLD}======================================================================${RESET}`);
      console.error(`${RED}${BOLD}[BLOCKED] MALICIOUS INJECTION DETECTED IN: ${file}${RESET}`);
      console.error(`${RED}${BOLD}======================================================================${RESET}`);

      for (const issue of issues) {
        console.error(`  ${YELLOW}Line ${issue.line}:${RESET} ${BOLD}${issue.rule}${RESET}`);
        console.error(`  ${RED}Snippet:${RESET} ${issue.preview}...`);
      }

      console.error(`\n${BOLD}Action required:${RESET}`);
      console.error(`  1. Open ${file} and remove the unauthorized injected code.`);
      console.error(`  2. If postcss.config.mjs was injected, restore it to:`);
      console.error(`     const config = { plugins: { "@tailwindcss/postcss": {} } }; export default config;`);
      console.error(`  3. Re-stage the cleaned file: git add ${file}`);
      console.error(`  4. Re-run your commit.\n`);
    }
  }

  if (hasSecurityIssues) {
    console.error(`${RED}${BOLD}Commit ABORTED to prevent committing malicious code.${RESET}\n`);
    process.exit(1);
  }

  console.log(`${GREEN}✓${RESET} Security scan passed: Zero injections detected.`);
  process.exit(0);
}

main();
