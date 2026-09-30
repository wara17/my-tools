"use client";

import Link from "next/link";
import { useState } from "react";
import {
  DEFAULT_KEY,
  SAMPLE_PRIVILEGES,
  cutPrivileges,
  parsePrivileges,
} from "./privileges";

const boxStyle = {
  width: "100%",
  fontFamily: "monospace",
  fontSize: 14,
  padding: 8,
  boxSizing: "border-box",
} as const;

export default function CutPrivilegePage() {
  const [jsonText, setJsonText] = useState(
    JSON.stringify(SAMPLE_PRIVILEGES, null, 2),
  );
  const [codes, setCodes] = useState("");
  const [key, setKey] = useState(DEFAULT_KEY);
  const [copied, setCopied] = useState(false);

  const parsed = parsePrivileges(jsonText);
  const output = parsed.ok
    ? JSON.stringify(cutPrivileges(parsed.data, codes, key), null, 2)
    : "";

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 720 }}>
      <Link href="/">← All tools</Link>
      <h1>Cut Privilege</h1>

      <h3>1. JSON ต้นฉบับ</h3>
      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        rows={10}
        style={boxStyle}
      />
      {!parsed.ok && <p style={{ color: "crimson" }}>{parsed.error}</p>}
      <label style={{ display: "block", marginTop: 8 }}>
        Field ที่ใช้เทียบ:{" "}
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ padding: 4, width: 120 }}
        />
      </label>

      <h3>2. Privilege ที่ต้องการตัดออก (คั่นด้วย , )</h3>
      <input
        value={codes}
        onChange={(e) => setCodes(e.target.value)}
        placeholder="A,B"
        style={boxStyle}
      />

      <h3>3. ผลลัพธ์</h3>
      <textarea value={output} readOnly rows={10} style={boxStyle} />
      <button
        onClick={copy}
        disabled={!parsed.ok}
        style={{ marginTop: 8, padding: "6px 16px" }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </main>
  );
}
