// 배나낭에서 소통해요 //

const API_URL = "https://banana-flask-app.onrender.com/posts";
const loadingSpinner = document.getElementById("loading-spinner");
const postList = document.querySelector(".post-list");

async function fetchPosts(retryCount = 0) {
  try {
    // 🌀 로딩바 표시
    loadingSpinner.style.display = "flex";
    postList.style.display = "none"; // 게시글 숨기기

    const response = await fetch(API_URL);

    if (!response.ok) {
      if (response.status === 500 && retryCount < 5) {
        console.warn(
          `서버 오류 발생 (500). ${retryCount + 1}번째 재시도 중...`
        );
        setTimeout(() => fetchPosts(retryCount + 1), 5000); // 5초 후 재시도
        return;
      } else {
        throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
      }
    }

    const posts = await response.json();
    renderPosts(posts);
  } catch (error) {
    console.error("게시글을 불러오는 중 오류 발생:", error);
  } finally {
    // ✅ 데이터가 로드되면 로딩바 숨기기
    loadingSpinner.style.display = "none";
    postList.style.display = "block";
  }
}

function renderPosts(posts) {
  postList.innerHTML = ""; // 기존 게시글 초기화

  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");

    // 날짜 포맷 변경 (YYYY.MM.DD)
    const formattedDate = new Date(post.created_at)
      .toISOString()
      .split("T")[0]
      .replace(/-/g, ".");

    postCard.innerHTML = `
      <div class="post-text">
        <h3 class="post-title">${post.title}</h3>
        <p class="post-description">${post.content}</p>
        <div class="post-footer">
          <div class="post-author">
            <img src="./assets/posts/기본 프로필 2x 1.svg" alt="프로필 이미지" class="author-img" />
            <span class="author-name">${post.author}</span>
          </div>
          <span class="post-date">${formattedDate}</span>
        </div>
      </div>
      ${
        post.image_url
          ? `<img src="${post.image_url}" alt="게시글 이미지" class="post-image" />`
          : ""
      }
    `;

    // ✅ 게시물 클릭 시 상세 페이지 이동
    postCard.addEventListener("click", function () {
      console.log(`게시물 클릭됨: ${post.id}`);
      window.location.href = `posts-detail.html?id=${post.id}`;
    });

    postList.appendChild(postCard);
  });
}

// 페이지 로드 시 게시글 불러오기
document.addEventListener("DOMContentLoaded", () => fetchPosts());
