// รายชื่อ tools ทั้งหมด — เพิ่ม tool ใหม่ให้เพิ่มรายการที่นี่ด้วย
export type Tool = { href: string; name: string; desc: string };

export const TOOLS: Tool[] = [
  {
    href: "/cut-privilege",
    name: "Cut Privilege",
    desc: "ตัด code ที่ระบุ (เช่น A,B) ออกจากรายการ privilege",
  },
];
