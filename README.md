# my-tools

รวม tools เล็กๆ — ทุก tool อยู่ใน Next.js app เดียวที่ `nextjs-app/` โดยแต่ละ tool คือ 1 route

## Run

```bash
cd nextjs-app
npm install
npm run dev   # http://localhost:3000
```

## Tools

| Tool | Path | Description |
|---|---|---|
| Cut Privilege | `/cut-privilege` | ตัด code ที่ระบุ (เช่น `A,B`) ออกจากรายการ privilege |

## เพิ่ม tool ใหม่

1. สร้าง dir `nextjs-app/src/app/<tool-name>/` แล้วใส่ `page.tsx` (และ logic แยกไฟล์ในนั้น)
2. เพิ่มรายการใน `nextjs-app/src/app/tools.ts` เพื่อให้แสดงในหน้าแรก
3. เพิ่มแถวในตาราง Tools ด้านบน
