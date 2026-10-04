// ===============================
// 1. Gallery 圖片資料
// HTML 不重複寫圖片，統一由陣列管理。
// ===============================
const galleryTopAry = [
  "./yhx.img/gar/1-1.jpg",
  "./yhx.img/gar/1-2.jpg",
  "./yhx.img/gar/1-3.jpg",
  "./yhx.img/gar/1-4.jpg",
  "./yhx.img/gar/1-5.jpg",
  "./yhx.img/gar/1-6.jpg",
  "./yhx.img/gar/1-7.jpg",
  "./yhx.img/gar/1-8.jpg",
  "./yhx.img/gar/1-9.jpg",
  "./yhx.img/gar/1-10.jpg",
];

const galleryBottomAry = [
  "./yhx.img/gar/2-1.jpg",
  "./yhx.img/gar/2-2.jpg",
  "./yhx.img/gar/2-3.jpg",
  "./yhx.img/gar/2-4.jpg",
  "./yhx.img/gar/2-5.jpg",
  "./yhx.img/gar/2-6.jpg",
  "./yhx.img/gar/2-7.jpg",
  "./yhx.img/gar/2-8.jpg",
  "./yhx.img/gar/2-9.jpeg",
  "./yhx.img/gar/2-10.png",
];

const trackTop = document.querySelector(".track-top");
const trackBottom = document.querySelector(".track-bottom");

function createGallery(track, imgAry, startNumber) {
  // 無限輪播需要兩組相同圖片，所以建立兩次。
  for (let copy = 0; copy < 2; copy++) {
    imgAry.forEach(function (url, i) {
      const card = document.createElement("div");
      const img = document.createElement("img");

      img.src = url;
      img.className = "w-100 h-100 object-fit-cover";
      card.classList.add("gallery-item", "overflow-hidden");

      if (copy === 0) {
        img.alt = "Yan Haoxiang Photo " + (startNumber + i);
      } else {
        img.alt = "";
        card.setAttribute("aria-hidden", "true");
      }

      card.append(img);
      track.append(card);
    });
  }
}

createGallery(trackTop, galleryTopAry, 1);
createGallery(trackBottom, galleryBottomAry, 11);

// ===============================
// 2. Bootstrap 手機選單
// navbar-expand-md：768px 以上直接顯示，767px 以下才收合。
// ===============================
const nav = document.querySelector("#mainNav");
const navLinks = document.querySelectorAll('.header .nav-link[href^="#"]');

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (window.innerWidth < 768 && nav.classList.contains("show")) {
      const menu = bootstrap.Collapse.getOrCreateInstance(nav);
      menu.hide();
    }
  });
});

// ===============================
// 3. 捲動時更新 Header Active
// ===============================
const header = document.querySelector(".header");
const sections = document.querySelectorAll(
  "#oliver, #milestones, #anecdotes, #discography, #gallery"
);

function setActiveLink() {
  const offset = header.offsetHeight + 80;
  let currentId = "oliver";

  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - offset) {
      currentId = section.id;
    }
  });

  navLinks.forEach(function (link) {
    if (link.getAttribute("href") === "#" + currentId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Milestones 是深色背景，所以使用白字。
  if (currentId === "milestones") {
    header.classList.add("header-light-text");
  } else {
    header.classList.remove("header-light-text");
  }

  // 還在 Hero 時，改用目前這張輪播圖自己的設定。
  if (window.scrollY < sections[0].offsetTop - offset) {
    setHeroHeaderTheme();
  }
}

// Hero 每張圖片可以自己決定 Header 要白字或黑字。
const heroCarousel = document.querySelector("#heroCarousel");
const heroScroll = document.querySelector(".hero-scroll");

function setHeroHeaderTheme() {
  const activeSlide = heroCarousel.querySelector(".carousel-item.active");
  const theme = activeSlide.getAttribute("data-header-theme");

  if (theme === "light") {
    header.classList.add("header-light-text");
    heroScroll.classList.remove("hero-scroll-dark");
  } else {
    header.classList.remove("header-light-text");
    heroScroll.classList.add("hero-scroll-dark");
  }
}

window.addEventListener("scroll", setActiveLink);

heroCarousel.addEventListener("slid.bs.carousel", function () {
  const offset = header.offsetHeight + 80;

  if (window.scrollY < sections[0].offsetTop - offset) {
    setHeroHeaderTheme();
  }
});

setActiveLink();

// ===============================
// 4. Discography 封面翻面
// 點封面看歌曲簡介，再點一次翻回。
// ===============================
const songIntroAry = [
  "一首帶著少年感的作品，用直接的情緒留下最初的音樂印象。",
  "以成長與青春為主題，記錄十六歲階段的心情與自我表達。",
  "從生活中的數字出發，把記憶與個人情緒收進歌曲裡。",
  "簡潔而有態度的作品名稱，呈現更鮮明的個人音樂風格。",
  "關於選擇方向與堅持自我的歌曲，帶著向前走的力量感。",
  "以字母作為符號，留下俐落、神秘又具有個人標記的作品。",
  "把不抱怨、繼續前進的態度放進歌曲，整體更有自信感。",
  "作為 Gaze 的開場，引導聽者進入整個作品的情緒與世界觀。",
  "帶有電影感與緊張氛圍的作品，呈現較強烈的畫面想像。",
  "情緒更直接的一首歌，描寫明知道不容易卻仍被吸引的感覺。",
  "圍繞尋找與被理解的情緒，在音樂中留下與自己對話的空間。",
  "以野獸作為意象，表現內在力量、衝突與不受限制的一面。",
  "從亢奮的情緒出發，呈現高張力、快速升溫的情感狀態。",
  "關於錯過與未完成的遺憾，把『如果當時』的情緒留在歌裡。",
  "像進入冬眠般收起情緒，描寫安靜、內省與沉入思緒的狀態。",
  "描寫關係中的動搖與拉扯，在靠近與退後之間尋找答案。",
  "像一段說給自己聽的獨白，談放下、整理情緒與繼續向前。",
  "節奏感鮮明的作品，用更直接的能量傳達自由與舞台感。",
  "以飛翔作為意象，表達突破限制、向上與追逐目標的心情。",
  "圍繞想要有人陪伴與理解的情感，呈現柔軟的一面。",
  "Moon Version 以 Cold Blooded 為核心，營造較冷冽、夜色感的版本氛圍。",
  "Star Version 延伸 Cold Blooded 的概念，以星光意象呈現另一種情緒層次。",
  "早期作品之一，以夢想為題，留下少年對未來的想像與期待。",
  "作品以『瑜』為核心符號，呈現具有個人特色的音樂表達。",
  "將想念比喻成飛行，描寫距離之中仍持續靠近某個人的情緒。",
  "以『孤獨怪物』描述孤單被放大的狀態，帶有強烈的內心畫面。",
  "描寫感情裡不得不承認失敗與放手的時刻，情緒較為克制。",
  "以新的階段與新的自己為概念，帶出向前更新、重新出發的感覺。",
  "從不被看好的人出發，表現逆勢前進、證明自己的企圖與力量。",
  "強調按照自己的方式前進，把選擇、態度與自我掌握放在中心。"
];

const albumCards = document.querySelectorAll(".album-card");

albumCards.forEach(function (card, i) {
  const cover = card.querySelector(".cover-wrapper");
  const title = card.querySelector(".song-title");

  const flipCard = document.createElement("div");
  const flipInner = document.createElement("div");
  const albumBack = document.createElement("div");
  const viewInfo = document.createElement("span");
  const backTitle = document.createElement("h4");
  const intro = document.createElement("p");
  const hint = document.createElement("span");

  flipCard.classList.add("flip-card");
  flipInner.classList.add("flip-card-inner");
  albumBack.classList.add("album-back");
  viewInfo.classList.add("cover-view-info");
  hint.classList.add("flip-hint");

  flipCard.setAttribute("tabindex", "0");
  flipCard.setAttribute("role", "button");
  flipCard.setAttribute("aria-label", "查看 " + title.textContent.trim() + " 歌曲介紹");
  flipCard.setAttribute("aria-pressed", "false");

  viewInfo.textContent = "VIEW INFO";
  backTitle.textContent = title.textContent.trim();
  intro.textContent = songIntroAry[i];
  hint.textContent = "CLICK TO BACK";

  cover.append(viewInfo);
  albumBack.append(backTitle, intro, hint);
  cover.before(flipCard);
  flipInner.append(cover, albumBack);
  flipCard.append(flipInner);

  function flipAlbum() {
    flipCard.classList.toggle("is-flipped");

    if (flipCard.classList.contains("is-flipped")) {
      flipCard.setAttribute("aria-pressed", "true");
    } else {
      flipCard.setAttribute("aria-pressed", "false");
    }
  }

  flipCard.addEventListener("click", flipAlbum);

  flipCard.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flipAlbum();
    }
  });
});
