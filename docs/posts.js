document.addEventListener("DOMContentLoaded", async function () {
  const postList = document.querySelector(".post-list");

  try {
    const response = await fetch("https://banana-flask-app.onrender.com/posts");
    const posts = await response.json();

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post-card");

      // 이미지가 있는 경우만 <img> 태그 추가
      const imageTag =
        post.image_url && post.image_url.trim() !== ""
          ? `<img src="${post.image_url}" alt="게시글 이미지" class="post-image" />`
          : "";

      // 날짜 변환 (GMT 포맷 → YYYY.MM.DD)
      const formattedDate = new Date(post.created_at)
        .toISOString()
        .split("T")[0]
        .replace(/-/g, ".");

      postElement.innerHTML = `
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
                ${imageTag} <!-- 이미지가 없는 경우, 이 부분이 아예 렌더링되지 않음 -->
            `;

      postList.appendChild(postElement);
    });
  } catch (error) {
    console.error("게시물을 불러오는 중 오류 발생:", error);
  }
});
