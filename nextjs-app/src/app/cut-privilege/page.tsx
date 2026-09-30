"use client";

import Link from "next/link";
import { useState } from "react";
import { PRIVILEGES, cutPrivileges } from "./privileges";

export default function CutPrivilegePage() {
  const [input, setInput] = useState("");
  const result = cutPrivileges(input);

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 640 }}>
      <Link href="/">← All tools</Link>
      <h1>Cut Privilege</h1>

      <h3>JSON หลัก</h3>
      <pre>{JSON.stringify(PRIVILEGES, null, 2)}</pre>

      <label>
        Code ที่ต้องการตัด (คั่นด้วย , เช่น A,B):{" "}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="A,B"
          style={{ padding: 4 }}
        />
      </label>

      <h3>ผลลัพธ์</h3>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
