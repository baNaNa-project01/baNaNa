document.addEventListener("DOMContentLoaded", async function () {
  const postListContainer = document.querySelector(".post-list");

  if (!postListContainer) {
    console.error("게시글 리스트를 찾을 수 없습니다.");
    return;
  }

  try {
    // API 요청
    const response = await fetch("https://banana-flask-app.onrender.com/posts");
    if (!response.ok) {
      throw new Error("네트워크 응답에 문제가 있습니다.");
    }

    // JSON 데이터 변환
    const posts = await response.json();

    // 게시글을 동적으로 추가
    posts.forEach((post) => {
      const postCard = document.createElement("div");
      postCard.classList.add("post-card");

      postCard.innerHTML = `
          <div class="post-text">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-description">${post.content}</p>
            <div class="post-footer">
              <div class="post-author">
                <img src="https://placehold.co/20x20" alt="프로필 이미지" class="author-img" />
                <span class="author-name">${post.author}</span>
              </div>
              <span class="post-date">${post.created_at}</span>
            </div>
          </div>
          <img src="${post.image_url}" alt="게시글 이미지" class="post-image" />
        `;

      postListContainer.appendChild(postCard);
    });
  } catch (error) {
    console.error("게시글을 불러오는 중 오류 발생:", error);
  }
});
