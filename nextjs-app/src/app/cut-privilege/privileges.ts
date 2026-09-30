export type Privilege = { code: string; desc: string };

// JSON หลัก
export const PRIVILEGES: Privilege[] = [
  { code: "A", desc: "AA" },
  { code: "B", desc: "BB" },
];

// รับ input เช่น "A" หรือ "A,B" แล้วตัด code ที่ระบุออก
export function cutPrivileges(
  input: string,
  source: Privilege[] = PRIVILEGES,
): Privilege[] {
  const codes = new Set(
    input
      .split(",")
      .map((c) => c.trim().toUpperCase())
      .filter(Boolean),
  );
  return source.filter((p) => !codes.has(p.code.toUpperCase()));
}
