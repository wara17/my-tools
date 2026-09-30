export type Privilege = Record<string, unknown>;

export const DEFAULT_KEY = "code";

// ตัวอย่าง JSON เริ่มต้น
export const SAMPLE_PRIVILEGES: Privilege[] = [
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

// ตัด item ที่ค่าใน field `key` ตรงกับ codes ออก — field อื่นใน object เก็บไว้ตามเดิม
export function cutPrivileges(
  source: Privilege[],
  input: string,
  key: string = DEFAULT_KEY,
): Privilege[] {
  const codes = parseCodes(input);
  return source.filter(
    (p) => !codes.has(String(p[key] ?? "").toUpperCase()),
  );
}

// แปลงข้อความ JSON เป็น array ของ object พร้อมข้อความ error ที่อ่านง่าย
export function parsePrivileges(
  text: string,
): { ok: true; data: Privilege[] } | { ok: false; error: string } {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (e) {
    return { ok: false, error: `JSON ไม่ถูกต้อง: ${(e as Error).message}` };
  }
  if (
    !Array.isArray(data) ||
    !data.every((p) => p !== null && typeof p === "object" && !Array.isArray(p))
  ) {
    return {
      ok: false,
      error: 'JSON ต้องเป็น array ของ object เช่น [{"code":"A"}]',
    };
  }
  return { ok: true, data: data as Privilege[] };
}
