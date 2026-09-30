import Link from "next/link";
import { TOOLS } from "./tools";

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 640 }}>
      <h1>My Tools</h1>
      <ul>
        {TOOLS.map((tool) => (
          <li key={tool.href} style={{ marginBottom: 8 }}>
            <Link href={tool.href}>{tool.name}</Link> — {tool.desc}
          </li>
        ))}
      </ul>
    </main>
  );
}
