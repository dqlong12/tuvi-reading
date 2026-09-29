# Minh Kính

Website luận giải cá nhân kết hợp Tử Vi, chiêm tinh và Tarot. V1 gồm quy trình nhập thông tin sinh, bối cảnh, câu hỏi, API tạo Reading và trang kết quả có đường dẫn riêng.

## Phát triển cục bộ

1. Sao chép `.env.example` thành `.env` và điền `DATABASE_URL` PostgreSQL.
2. Chạy `npm install`.
3. Chạy `npx prisma migrate dev`.
4. Chạy `npm run dev`.

## Triển khai

Dự án có sẵn `railway.json`, Prisma migration và Next.js standalone output để triển khai trên Railway cùng một PostgreSQL service.
