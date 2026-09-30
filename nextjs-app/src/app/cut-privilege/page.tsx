"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";
import {
  DEFAULT_FIELD,
  SAMPLE_JSON,
  cutPrivileges,
  parseJson,
} from "./privileges";

export default function CutPrivilegePage() {
  const [jsonText, setJsonText] = useState(
    JSON.stringify(SAMPLE_JSON, null, 2),
  );
  const [codes, setCodes] = useState("");
  const [field, setField] = useState(DEFAULT_FIELD);
  const [copied, setCopied] = useState(false);

  const parsed = parseJson(jsonText);
  const output = parsed.ok
    ? JSON.stringify(cutPrivileges(parsed.data, codes, field), null, 2)
    : "";

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <main className={styles.page}>
      <div>
        <Link href="/">← All tools</Link>
        <h1 style={{ margin: "4px 0 0" }}>Cut Privilege</h1>
      </div>

      <div className={styles.grid}>
        <section className={`${styles.panel} ${styles.source}`}>
          <h3>JSON ต้นฉบับ</h3>
          <textarea
            className={styles.box}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false}
          />
          {!parsed.ok && <p className={styles.error}>{parsed.error}</p>}
        </section>

        <section className={`${styles.panel} ${styles.remove}`}>
          <h3>
            Privilege ที่ต้องการตัดออก
            <span className={styles.hint}>
              เทียบกับ field{" "}
              <input
                value={field}
                onChange={(e) => setField(e.target.value)}
                style={{ width: 80, padding: 2 }}
              />
            </span>
          </h3>
          <textarea
            className={styles.input}
            rows={5}
            value={codes}
            onChange={(e) => setCodes(e.target.value)}
            placeholder={"A,B\nหรือ 1 บรรทัดต่อ 1 ตัว"}
            spellCheck={false}
          />
        </section>

        <section className={`${styles.panel} ${styles.result}`}>
          <h3>
            ผลลัพธ์
            <button
              onClick={copy}
              disabled={!parsed.ok}
              style={{ padding: "4px 16px" }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </h3>
          <textarea className={styles.box} value={output} readOnly />
        </section>
      </div>
    </main>
  );
}
