YHX Optimized v4

整理原則：保留原本視覺，只整理程式碼與 RWD。

1. Header：保留原本 10% 白底、blur(10px)、陰影與手機 80% 白底 blur(15px)。
2. Oliver：保留 400x600 圖片、15px 黑框、原字級與 hover；Bootstrap row/col 只負責 RWD。
3. Milestones：保留深色紋理、中央時間軸與玻璃 hover。
4. Anecdotes：保留原卡片尺寸、線條動畫、hover 與字級。
5. Discography：用 Bootstrap Tabs / Grid 取代 radio，但保留原 tab 紅底線、272px 外框、240px 封面。
6. Gallery：圖片改由 JS 陣列 + forEach + createElement 產生，保留原尺寸、gap 與 35 秒雙向無限輪播。
7. JS：只保留 Gallery、手機選單收合、Navbar active；移除額外 reveal 動畫，避免改變原設計。

請把原本 yhx.img 資料夾放在 index.html 同一層。
