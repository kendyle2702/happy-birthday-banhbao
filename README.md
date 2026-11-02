# 💖 Happy Birthday Website

Trang web chúc mừng sinh nhật tĩnh (HTML/CSS/JS thuần), host được thẳng trên GitHub Pages.

## Tuỳ chỉnh
Mọi nội dung nằm trong **`js/config.js`**: tên, ngày yêu nhau, lời chúc, timeline, album, thư, lý do, số nến.

- **Ảnh**: bỏ vào `assets/photos/` (vd `1.jpg`, `2.jpg`…) và khai báo trong `photos` / `timeline`. Nên nén ảnh < 500KB mỗi tấm (dùng squoosh.app).
- **Nhạc**: bỏ file mp3 vào `assets/music/song.mp3` (hoặc sửa đường dẫn `music`).

## Chạy thử trên máy
```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

## Đẩy lên GitHub Pages
```bash
git init && git add . && git commit -m "Happy birthday 💖"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```
Vào repo → **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`** → Save.
Sau ~1 phút trang có tại `https://<user>.github.io/<repo>/`.

> ⚠️ Repo public thì ảnh/nhạc cũng public. Tên file phân biệt hoa/thường trên GitHub (`1.JPG` ≠ `1.jpg`).

## Nhạc
"Dreamer" và "Heartwarming" — Kevin MacLeod (incompetech.com), giấy phép CC BY 4.0.
