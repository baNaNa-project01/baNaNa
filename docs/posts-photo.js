document.addEventListener("DOMContentLoaded", async function () {
  const API_URL = "https://banana-flask-app.onrender.com/posts"; // API URL
  const photoPostContainer = document.querySelector(".card-set"); // 사진 후기 리스트

  try {
    // 🟡 데이터 불러오기
    const response = await fetch(API_URL);
    if (!response.ok)
      throw new Error("서버 오류로 데이터를 불러올 수 없습니다.");

    const posts = await response.json(); // JSON 변환

    // 🟢 이미지가 있는 게시물만 필터링
    const photoPosts = posts.filter(
      (post) => post.image_url && post.image_url.trim() !== ""
    );

    // 🟠 리스트 초기화 후 동적 추가
    photoPostContainer.innerHTML = "";

    photoPosts.forEach((post) => {
      const dateObj = new Date(post.created_at);
      const formattedDate = `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${dateObj.getDate().toString().padStart(2, "0")}`;

      const postHTML = `
          <div class="hot-card">
            <img src="${post.image_url}" alt="포토 후기 이미지" class="card-image" />
            <div class="card-desc d-flex flex-column gap-0_75rem">
              <div class="card-title">${post.title}</div>
              <div class="profile-desc d-flex justify-content-between align-items-center">
                <div class="profile d-flex align-items-end gap-0_625rem">
                  <img src="./assets/home/mini-profile.svg" alt="프로필" class="profile-img" />
                  <div class="nickname">${post.author}</div>
                </div>
                <div class="date">${formattedDate}</div>
              </div>
            </div>
          </div>
        `;

      photoPostContainer.innerHTML += postHTML; // HTML에 추가
    });
  } catch (error) {
    console.error("📌 오류 발생:", error);
    photoPostContainer.innerHTML = `<p class="error-message">데이터를 불러올 수 없습니다.</p>`;
  }
});
