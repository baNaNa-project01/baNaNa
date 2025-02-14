document.addEventListener("DOMContentLoaded", async function () {
  const postContainer = document.getElementById("post-container");
  const postTitle = document.getElementById("post-title");
  const postContent = document.getElementById("post-content");
  const postAuthor = document.getElementById("post-author");
  const postDate = document.getElementById("post-date");
  const postImage = document.getElementById("post-image");
  const commentsContainer = document.getElementById("comments-container");

  // ✅ 현재 페이지 URL에서 `id` 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  console.log(`현재 게시물 ID : ${postId}`);

  if (!postId) {
    postContainer.innerHTML = "<p>⚠ 게시물을 찾을 수 없습니다.</p>";
    console.log("게시물 ID 없음!");
    return;
  }

  const API_URL = `https://banana-flask-app.onrender.com/posts/${postId}`;
  const COMMENTS_API_URL = `https://banana-flask-app.onrender.com/posts/${postId}/comments`;

  try {
    // 🔹 게시물 데이터 불러오기
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP 오류: ${response.status}`);
    const post = await response.json();

    postTitle.textContent = post.title;
    postContent.textContent = post.content;
    postAuthor.textContent = post.author;

    // 🔹 날짜 포맷 변환 (YYYY.MM.DD)
    const dateObj = new Date(post.created_at);
    postDate.textContent = `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${dateObj.getDate().toString().padStart(2, "0")}`;

    if (post.image_url) {
      postImage.src = post.image_url;
      postImage.style.display = "block";
    }

    // 🔹 댓글 불러오기
    const commentsResponse = await fetch(COMMENTS_API_URL);
    if (!commentsResponse.ok)
      throw new Error(`HTTP 오류: ${commentsResponse.status}`);
    const comments = await commentsResponse.json();

    commentsContainer.innerHTML = "";
    comments.forEach((comment) => {
      const commentHTML = `
                <div class="comment">
                    <p><strong>${comment.author}</strong>: ${comment.content}</p>
                    <p class="comment-date">${comment.created_at}</p>
                </div>
            `;
      commentsContainer.innerHTML += commentHTML;
    });
  } catch (error) {
    console.error("데이터 로딩 실패:", error);
    postContainer.innerHTML = "<p>⚠ 데이터를 불러오는 데 실패했습니다.</p>";
  }
});
