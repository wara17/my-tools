export type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json };

export const DEFAULT_FIELD = "code";

// ตัวอย่าง JSON เริ่มต้น
export const SAMPLE_JSON: Json = [
  { code: "A", desc: "AA" },
  { code: "B", desc: "BB" },
];

// แยก input เช่น "A, b" เป็น Set ของ code (ไม่สนตัวพิมพ์เล็ก/ใหญ่)
export function parseCodes(input: string): Set<string> {
  return new Set(
    input
      .split(",")
      .map((c) => c.trim().toUpperCase())
      .filter(Boolean),
  );
}

function isObject(v: Json): v is { [key: string]: Json } {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

// อ่านค่าตาม path แบบจุด เช่น "info.code"
function getByPath(obj: { [key: string]: Json }, path: string): Json | undefined {
  let cur: Json | undefined = obj;
  for (const part of path.split(".")) {
    if (cur === undefined || !isObject(cur)) return undefined;
    cur = cur[part];
  }
  return cur;
}

function matches(item: Json, codes: Set<string>, field: string): boolean {
  // array ของ string/number เช่น ["A","B"]
  if (typeof item === "string" || typeof item === "number") {
    return codes.has(String(item).toUpperCase());
  }
  if (isObject(item)) {
    const value = getByPath(item, field);
    return (
      (typeof value === "string" || typeof value === "number") &&
      codes.has(String(value).toUpperCase())
    );
  }
  return false;
}

// ไล่ทุกชั้นของ JSON: ในทุก array ตัด item ที่ `field` ตรงกับ code ออก
// โครงสร้างและ field อื่นทั้งหมดคงไว้ตามเดิม
export function cutPrivileges(json: Json, input: string, field = DEFAULT_FIELD): Json {
  const codes = parseCodes(input);
  const path = field.trim() || DEFAULT_FIELD;

  const walk = (node: Json): Json => {
    if (Array.isArray(node)) {
      return node.filter((item) => !matches(item, codes, path)).map(walk);
    }
    if (isObject(node)) {
      return Object.fromEntries(
        Object.entries(node).map(([k, v]) => [k, walk(v)]),
      );
    }
    return node;
  };

  return codes.size === 0 ? json : walk(json);
}

export function parseJson(
  text: string,
): { ok: true; data: Json } | { ok: false; error: string } {
  try {
    return { ok: true, data: JSON.parse(text) as Json };
  } catch (e) {
    return { ok: false, error: `JSON ไม่ถูกต้อง: ${(e as Error).message}` };
  }
}
