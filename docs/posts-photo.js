document.addEventListener("DOMContentLoaded", function () {
  const photoPostContainer = document.querySelector(".card-set");
  const photoLoadingSpinner = document.getElementById("photo-loading-spinner");

  photoPostContainer.insertAdjacentElement("beforebegin", photoLoadingSpinner);

  const API_URL = "https://banana-flask-app.onrender.com/posts";
  let retryCount = 0;
  const MAX_RETRIES = 5; // 최대 5번 재시도

  async function fetchPhotoPosts() {
    try {
      // 로딩바 표시
      photoLoadingSpinner.style.display = "block";
      photoPostContainer.innerHTML = ""; // 기존 리스트 초기화

      const response = await fetch(API_URL);

      if (!response.ok) {
        if (response.status === 500 && retryCount < MAX_RETRIES) {
          console.warn(
            `서버 오류 발생! ${3}초 후 재시도 (${
              retryCount + 1
            }/${MAX_RETRIES})`
          );
          retryCount++;
          setTimeout(fetchPhotoPosts, 3000); // 3초 후 재시도
          return;
        } else {
          throw new Error(`HTTP 오류: ${response.status}`);
        }
      }

      const posts = await response.json();
      retryCount = 0; // 성공 시 재시도 카운트 초기화

      const photoPosts = posts.filter((post) => post.image_url); // 이미지 있는 게시글만 필터링

      if (photoPosts.length === 0) {
        photoPostContainer.innerHTML =
          "<p>이미지가 있는 게시물이 없습니다.</p>";
      } else {
        photoPosts.forEach((post) => {
          const dateObj = new Date(post.created_at);
          const formattedDate = `${dateObj.getFullYear()}.${(
            dateObj.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}.${dateObj
            .getDate()
            .toString()
            .padStart(2, "0")}`;

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

          photoPostContainer.innerHTML += postHTML;
        });
      }
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    } finally {
      // 로딩바 숨기기
      photoLoadingSpinner.style.display = "none";
    }
  }

  // 페이지 로드 시 실행
  fetchPhotoPosts();
});
