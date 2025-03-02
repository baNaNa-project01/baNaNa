document.addEventListener("DOMContentLoaded", async function () {
  const loadingContainer = document.getElementById("loading-container");
  const postContainer = document.getElementById("post-detail-container");
  const token = localStorage.getItem("access_token"); // 저장된 JWT 토큰 가져오기

  const postTitle = document.getElementById("post-detail-title");
  const postContent = document.getElementById("post-detail-content");
  const postAuthor = document.getElementById("post-detail-author");
  const postDate = document.getElementById("post-detail-date");
  const postImage = document.getElementById("post-detail-image");

  const commentInput = document.getElementById("comment-detail-input");
  const submitCommentBtn = document.getElementById("submit-detail-comment");

  const commentsContainer = document.getElementById(
    "comments-detail-container"
  );
  const postTitleBreadcrumb = document.getElementById(
    "post-detail-title-breadcrumb"
  );

  // ✅ 현재 페이지 URL에서 id 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    loadingContainer.innerHTML = "<p>⚠ 게시물을 찾을 수 없습니다.</p>";
    console.log("게시물 ID 없음!");
    return;
  }

  const API_URL = `https://banana-flask-app.onrender.com/post/${postId}`;
  const COMMENTS_API_URL = `https://banana-flask-app.onrender.com/post/${postId}/comments`;
  const CREATE_COMMENT_URL = `https://banana-flask-app.onrender.com/post/${postId}/comment`;

  let retryCount = 0;
  const MAX_RETRIES = 5; // 최대 5번 재시도

  async function fetchDetailPost() {
    try {
      console.log(
        `📌 게시물 데이터 요청 시도: ${retryCount + 1}/${MAX_RETRIES}`
      );

      const response = await fetch(API_URL);

      if (!response.ok) {
        if (response.status === 500 && retryCount < MAX_RETRIES) {
          console.warn(
            `서버 오류 발생! ${3}초 후 재시도 (${
              retryCount + 1
            }/${MAX_RETRIES})`
          );
          retryCount++;
          setTimeout(fetchDetailPost, 3000);
          return;
        } else {
          throw new Error(`HTTP 오류: ${response.status}`);
        }
      }

      const post = await response.json();
      retryCount = 0; // 성공 시 재시도 카운트 초기화
      console.log("✅ 받아온 게시물 데이터:", post);

      // ✅ 게시물 데이터 삽입
      postTitleBreadcrumb.textContent = post.title; // Breadcrumb에도 제목 표시

      postTitle.textContent = post.title;
      postContent.textContent = post.content;
      postAuthor.textContent = `${post.author}`;

      // ✅ 날짜 포맷 변환 (YYYY.MM.DD)
      const dateObj = new Date(post.created_at);
      postDate.textContent = `${dateObj.getFullYear()}.${(
        dateObj.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}.${dateObj.getDate().toString().padStart(2, "0")}`;

      // ✅ 이미지가 있는 경우만 표시
      if (post.image_url) {
        postImage.src = post.image_url;
        postImage.style.display = "block";
      } else {
        postImage.style.display = "none";
      }

      // ✅ 데이터가 정상적으로 들어왔다면, 로딩 메시지를 숨기고 상세 정보 표시
      loadingContainer.style.display = "none";
      postContainer.style.display = "block";

      // 🔹 댓글 불러오기 (게시물 로딩 완료 후 실행)
      fetchComments();
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      loadingContainer.innerHTML =
        "<p>⚠ 데이터를 불러오는 데 실패했습니다.</p>";
    }
  }

  async function fetchComments() {
    try {
      console.log(`📌 댓글 데이터 요청 시도: ${retryCount + 1}/${MAX_RETRIES}`);

      const response = await fetch(COMMENTS_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
      }

      const comments = await response.json();
      console.log("✅ 받아온 댓글 데이터:", comments);

      // ✅ 댓글 컨테이너 초기화
      commentsContainer.innerHTML = "";

      if (comments.length === 0) {
        commentsContainer.innerHTML =
          "<p>아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>";
      } else {
        comments.forEach((comment) => {
          console.log("💬 댓글 추가 중:", comment);
          const commentElement = document.createElement("div");
          commentElement.classList.add("comment");
          commentElement.innerHTML = `
            <img src="./assets/posts/기본 프로필 2x 1.svg" alt="댓글 작성자" class="detail-comment-profile-img" />
          <div class="comment-content">
            <p class="comment-author">${comment.author}</p>
            <p>${comment.content}</p>
            <p class="comment-date">${comment.created_at}</p>
          </div>
          `;
          commentsContainer.appendChild(commentElement);
        });
      }

      console.log("✅ 모든 댓글 추가 완료!");
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
      commentsContainer.innerHTML = "<p>⚠ 댓글을 불러오는 데 실패했습니다.</p>";
    }
  }

  // ✅ 댓글 작성 기능 추가
  submitCommentBtn.addEventListener("click", async function () {
    if (!token) {
      alert("🚨 로그인 후 댓글을 작성할 수 있습니다!");
      return;
    }

    const content = commentInput.value.trim();
    if (!content) {
      alert("🚨 댓글을 입력하세요!");
      return;
    }

    try {
      const response = await fetch(CREATE_COMMENT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("댓글 작성 실패!");

      commentInput.value = "";
      fetchComments();
    } catch (error) {
      console.error("🚨 댓글 작성 오류:", error);
      alert("댓글 작성에 실패했습니다!");
    }
  });

  // ✅ 게시물 데이터 가져오기 실행
  fetchDetailPost();
});
