/* =====================================================
   ✏️  CHỈNH SỬA NỘI DUNG Ở ĐÂY — không cần đụng file khác
   ===================================================== */
window.CONFIG = {
  // Tên người yêu & tên của bạn
  herName: "Bánh Bao",
  fromName: "Anh Hiroshi",

  // Ngày bắt đầu yêu nhau — dùng cho bộ đếm
  loveStartDate: "2022-08-18T00:00:00",

  // Nhạc
  music: {
    background: "assets/music/hanh-trinh-cua-la.mp3", // nền cho Lời chúc / Kỷ niệm / Album (lặp lại)
    birthday: "assets/music/happy-birthday.mp3",      // khi vào tab Bánh kem (lặp lại)
    journeyIntro: "assets/music/khoailangthang.mp3",  // phát 1 lần khi lần đầu mở tab Kỷ niệm, xong quay lại nhạc nền
  },

  // Số nến trên bánh
  candles: 5,

  // Các câu chúc chạy chữ ở trang đầu (chạy lần lượt rồi lặp lại)
  wishes: [
    "Chúc mừng sinh nhật cô gái anh iu nhất 🎂",
    "Chúc em tuổi mới thật khoẻ, thật xinh iu, và luôn vui tươi 🌸",
    "Tuổi mới, mình vẫn nắm tay nhau thật chặt nhé 🤞",
  ],

  // Hành trình (tab Kỷ niệm): mỗi cụm = 1 sự kiện, ảnh nằm trong assets/photos/
  // Ngày của cụm tự lấy từ tên file ảnh (YYYYMMDD_...). Cụm không có ảnh thì ghi date.
  // Album = những ảnh nổi bật.
  chapters: [
    { icon: "🌱", title: "Những ngày đầu tiên", text: "Buổi đi chơi cùng với tụi nhóc, những bữa nướng, những giải đấu… rồi 18/08/2022 trở thành ngày của hai đứa mình.",
      photos: ["20220811_2314_IMG_6423.jpg", "20220815_1546_IMG_6501.jpg", "20221019_1551_IMG_7023.jpg", "20221106_1850_IMG_7134.jpg"] },
    { icon: "🧧", title: "Mùa xuân đầu tiên", text: "Tết 2023 — chuyến đi chơi Đồng Tháp vào nhà Thầy, rồi sang An Giang, từ An Giang về Rạch Giá. Hoàng hôn trên biển, những cung đường, vườn hoa ngày xuân. Lần đầu đón Tết có nhau.",
      photos: ["20230123_2056_IMG_7943.jpg", "20230126_1343_IMG_7961.jpg", "20230127_0821_IMG_7983.jpg", "20230127_1231_IMG_8046.jpg", "20230127_1232_IMG_8047.jpg", "20230127_1232_IMG_8050.jpg", "20230127_1530_IMG_8074.jpg", "20230304_1754_IMG_8257.jpg"] },
    { icon: "🌊", title: "Chuyến biển Vũng Tàu", text: "Ngồi xe giường nằm, ăn hủ tiếu, ngắm hoàng hôn, in bóng hình trái tim trên cát. Ba ngày đẹp như mơ. Dù em hơi đuối ở lượt đi kaka.",
      photos: ["20230504_0509_IMG_8831.jpg", "20230504_1230_IMG_8838.jpg", "20230504_1528_IMG_8891.jpg", "20230504_1603_IMG_8911.jpg", "20230504_1614_IMG_8933.jpg", "20230504_1618_IMG_8985.jpg", "20230504_1929_IMG_9039.jpg", "20230504_1936_IMG_9054.jpg", "20230505_1601_IMG_9103.jpg", "20230505_1602_IMG_9106.jpg", "20230506_0729_IMG_9136.jpg", "20230506_0735_IMG_9176.jpg", "20230506_0750_IMG_9180.jpg", "20230506_0811_IMG_9200.jpg"] },
    { icon: "🍜", title: "Những ngày bình thường", text: "Không cần đi đâu xa, chỉ cần có nhau là ngày nào cũng vui.",
      photos: ["20230514_0522_IMG_9248.jpg", "20230704_1502_IMG_9439.jpg", "20230708_2227_IMG_9477.jpg"] },
    { icon: "💞", title: "Tròn 1 năm", text: "18/08/2023 — 365 ngày đầu tiên của chúng mình. Em quá xinh xắn trong hôm nay.",
      photos: ["20230818_1742_IMG_9882.jpg", "20230818_1742_IMG_9884.jpg"] },
    { icon: "🍲", title: "Mùa thu 2023", text: "Những bữa lẩu, bữa phở, những buổi tối ngồi cạnh nhau. Cả hôm anh dẫn em đi khám bệnh — vậy mà em vẫn tươi tắn.",
      photos: ["20230928_1841_IMG_0071.jpg", "20231019_0932_IMG_0193.jpg", "20231102_1745_IMG_0228.jpg", "20231110_1906_IMG_0243.jpg", "20231119_1557_IMG_0283.jpg"] },
    { icon: "🎄", title: "Giáng sinh 2023", text: "Đêm Noel lung linh, có em là đủ ấm.",
      photos: ["20231224_1155_IMG_0501.jpg", "20231224_1720_IMG_0588.jpg"] },
    { icon: "🎤", title: "Mic Vàng", text: "Em mặc áo dài bước lên sân khấu — anh ở dưới tự hào muốn khoe với cả thế giới.",
      photos: ["20240107_0543_IMG_0714.jpg", "20240107_1009_IMG_0734.jpg", "20240121_1501_IMG_0944.jpg"] },
    { icon: "🏜️", title: "Valentine & Tết 2024", text: "Chuyến đi Phan Thiết đầy phiêu lưu — phải lên Hồ Chí Minh bằng xe máy, đen hết cả mắt vì bụi. Nắm tay nhau đi trên đồi cát, để lại hai hàng dấu chân song song.",
      photos: ["20240214_0932_IMG_1212.jpg", "20240214_2040_IMG_1290.jpg", "20240215_0808_IMG_1310.jpg", "20240215_1354_IMG_1404.jpg", "20240215_1357_IMG_1413.jpg", "20240216_0710_IMG_1502.jpg", "20240220_1607_IMG_1628.jpg"] },
    { icon: "🏅", title: "Huy chương", text: "Ngày hai đứa cùng tham gia thi đấu và cùng đeo huy chương kaka. Dù anh là thi đấu chui nhưng rất vui.",
      photos: ["20240421_1146_IMG_2009.jpg", "20240421_1540_IMG_2011.jpg"] },
    { icon: "🌸", title: "Thành phố ngàn hoa", text: "Hồ nước, đồi hoa, chiếc xe đạp và em — gần tròn 2 năm. Chuyến đi Đà Lạt chỉ toàn ngủ hehe.",
      photos: ["20240802_0526_IMG_2533.jpg", "20240803_1303_IMG_2590.jpg", "20240803_1316_IMG_2608.jpg", "20240803_1328_IMG_2628.jpg", "20240803_1350_IMG_2656.jpg", "20240803_1359_IMG_2665.jpg"] },
    { icon: "🍂", title: "Mùa thu 2024", text: "Rước bạn vịt mini cute về, anh thi đấu cờ vua, chuyến đi học thực tập bất đắc dĩ, rồi đến lượt em thi đấu cờ vua. Và những buổi tối dạo phố.",
      photos: ["20240903_1644_IMG_2955.jpg", "20240927_1320_IMG_3145.jpg", "20241011_1657_IMG_3317.jpg", "20241013_1828_IMG_3358.jpg"] },
    { icon: "💋", title: "20/10/2024", text: "Ngày của em — và những cái thơm má.",
      photos: ["20241019_1415_IMG_3435.jpg", "20241019_1416_IMG_3439.jpg"] },
    { icon: "📜", title: "Thành tích của em", text: "Cô gái giỏi giang của anh.",
      photos: ["20250105_1306_IMG_4070.jpg", "20250105_1306_IMG_4072.jpg"] },
    { icon: "🌼", title: "Tết Ất Tỵ 2025", text: "Đi Đồng Tháp chơi vườn hoa — hoa mai vàng, hoa đỏ rực, và những ngày Tết bình yên bên nhau.",
      photos: ["20250128_1955_IMG_4335.jpg", "20250129_1454_IMG_4353.jpg", "20250129_1509_IMG_4398.jpg", "20250129_1510_IMG_4399.jpg", "20250129_1556_IMG_4441.jpg", "20250201_0513_IMG_4463.jpg", "20250201_1228_IMG_4474.jpg", "20250208_1521_IMG_4508.jpg", "20250208_1726_IMG_4512.jpg"] },
    { icon: "💐", title: "Valentine 2025", text: "",
      photos: ["20250214_1925_IMG_4553.jpg"] },
    { icon: "♟️", title: "Kỳ thủ của anh", text: "Nữ kỳ thủ xuất sắc nhất, những lớp cờ, những đứa nhóc em và anh dạy. Và 2 đứa cùng nhận bằng huấn luyện viên Cờ quốc gia.",
      photos: ["20250309_1619_IMG_4683.jpg", "20250406_1822_IMG_4790.jpg", "20250406_1824_IMG_4795.jpg", "20250528_0915_IMG_4967.jpg", "20250601_0911_IMG_4976.jpg"] },
    { icon: "🎓", title: "Mùa tốt nghiệp", text: "Ngày anh bảo vệ luận văn, và em cũng làm lễ tốt nghiệp trong thời gian này. Áo cử nhân, bó hoa, và một chặng đường mới.",
      photos: ["20250830_0716_IMG_5283.jpg", "20250902_1616_IMG_5323.jpg", "20250906_0702_IMG_5362.jpg", "20251006_0545_IMG_5497.jpg", "20251006_0953_IMG_5555.jpg", "20251026_2047_IMG_5701.jpg"] },
    { icon: "🎂", title: "Sinh nhật năm ngoái", text: "Sinh nhật muộn cho bé — chiếc bánh trái cây và một điều ước. Bé lớn 22 tuổi ời.",
      photos: ["20251103_1722_IMG_5752.jpg"] },
    { icon: "🎶", title: "Hát hò", text: "Những buổi hát karaoke, những trò nghịch ngợm — để lưu giữ kỷ niệm trước khi anh đi Hàn Quốc. Hôm nay 2 đứa xoã quá đã.",
      photos: ["20251112_1335_IMG_5822.jpg", "20251113_1009_IMG_5824.jpg", "20251113_1009_IMG_5825.jpg"] },
    { icon: "🎄", title: "Giáng sinh 2025", text: "Áo dài đỏ và cây thông đèn lấp lánh. Cô MC siêu xinh đẹp và giỏi của anh.",
      photos: ["20251218_0804_IMG_6104.jpg", "20251218_0804_IMG_6105.jpg", "20251222_1659_IMG_6132.jpg", "20251222_1700_IMG_6137.jpg"] },
    { icon: "📚", title: "Đầu năm 2026", text: "Đầu năm 2026 tại Hồ Chí Minh làm giấy tờ cho anh đi Hàn. Anh nhớ em quá phải gọi em lên theo. 2 đứa nằm giữa công viên ăn bánh mì kaka.",
      photos: ["20260108_1057_IMG_6304.jpg", "20260210_1129_IMG_6612.jpg"] },
    { icon: "🌅", title: "Hoàng hôn Tết 2026", text: "Biển, gió, nắng chiều — và nụ hôn lúc hoàng hôn tại Rạch Giá. Chuyến đi cuối cùng trước khi anh đi.",
      photos: ["20260220_1342_IMG_6730.jpg", "20260220_1513_IMG_6789.jpg", "20260220_1550_IMG_6865.jpg", "20260220_1607_IMG_7002.jpg", "20260220_1607_IMG_7007.jpg", "20260220_1607_IMG_7009.jpg"] },
    { icon: "🫂", title: "Trước ngày xa nhau", text: "Ngày sinh nhật của anh — có em ở bên, trước khi mình tạm xa nhau.",
      photos: ["20260227_1906_IMG_7130.jpg"] },
    { icon: "🌏", date: "2026-03-01", title: "Xa nhau", text: "Lần này thì xa nhau rồi, nhưng anh và em vẫn luôn nhớ nhau. Cùng nhau cố gắng vượt qua thách thức địa lý nhé.", photos: [] },
    { icon: "🎂", date: "2026-11-02", title: "Hôm nay — sinh nhật em", text: "Và đây là chương đẹp nhất — vì có em.", photos: [], final: true },
  ],
  album: ["20260220_1607_IMG_7002.jpg", "20260220_1607_IMG_7009.jpg", "20240215_1354_IMG_1404.jpg", "20230504_1936_IMG_9054.jpg", "20230504_1614_IMG_8933.jpg", "20240802_0526_IMG_2533.jpg", "20241019_1415_IMG_3435.jpg", "20251026_2047_IMG_5701.jpg", "20231224_1155_IMG_0501.jpg", "20230818_1742_IMG_9882.jpg", "20260220_1513_IMG_6789.jpg", "20250129_1509_IMG_4398.jpg"],

  // Lời nhắn hiện ra ngay sau khi thổi tắt nến
  finalMessage: "Điều ước của em chắc chắn sẽ thành sự thật — vì anh sẽ cùng em biến nó thành sự thật 💖",

  // Bức thư tay — mở ra sau khi thổi nến (xuống dòng thoải mái)
  letter: `
Gửi Bánh Bao của anh,

Hôm nay là ngày 2 tháng 11 — ngày mà thế giới được nhận một món quà tuyệt vời nhất: là em.

Từ ngày 18 tháng 8 năm 2022 đến giờ, mình đã đi cùng nhau hơn 1500 ngày. Có những hôm vui vẻ cùng nhau, cũng có những hôm giận nhau. Nhưng sau tất cả, em vẫn ở đó, vẫn nắm tay anh — và anh với em vẫn ở bên nhau.

Cảm ơn em vì đã luôn tin tưởng anh, và luôn ở bên cạnh anh, kể cả những lúc anh chưa làm tốt.

Anh không hứa sẽ cho em mọi thứ trên đời, nhưng anh hứa sẽ luôn ở bên cạnh em — trong những ngày nắng đẹp lẫn những ngày mưa giông.

Tuổi mới, chúc em thật nhiều sức khoẻ, làm gì cũng thuận lợi, và mãi là cô gái hạnh phúc nhất. Còn những điều em ước hôm nay, mình cùng nhau biến chúng thành sự thật nhé.

Chúng mình sẽ sớm đoàn tụ với nhau thôi, hehe 🥰

Yêu em nhiều.
`,
};
