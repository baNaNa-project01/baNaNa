document.addEventListener("DOMContentLoaded", function () {
  const BACKEND_URL = "https://banana-flask-app.onrender.com";

  const titleInput = document.getElementById("post-title-input");
  const contentInput = document.getElementById("post-create-content");
  const imageInput = document.getElementById("post-image");
  const imagePreviewContainer = document.getElementById(
    "image-preview-container"
  );
  const submitButton = document.querySelector(".submit-comment");

  // 🔹 이미지 미리보기 기능
  imageInput.addEventListener("change", function (event) {
    const files = event.target.files;
    imagePreviewContainer.innerHTML = "";

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.createElement("div");
        preview.className = "image-preview";
        preview.innerHTML = `
                    <img src="${e.target.result}" alt="이미지 미리보기">
                    <span class="delete-icon">🗑</span>
                `;
        imagePreviewContainer.appendChild(preview);

        // 삭제 버튼 클릭 시
        preview.querySelector(".delete-icon").addEventListener("click", () => {
          preview.remove();
        });
      };
      reader.readAsDataURL(file);
    });
  });
  // 🔹 게시글 업로드 이벤트
  submitButton.addEventListener("click", async function (event) {
    event.preventDefault();

    // ✅ 입력값 검증
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const imageFile = imageInput.files[0];
    const token = localStorage.getItem("access_token");

    if (!title || !content) {
      alert("제목과 내용을 입력하세요!");
      return;
    }

    // ✅ FormData 생성
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (!token) {
      alert("🚨 로그인 후 글을 작성할 수 있습니다!");
      return;
    }

    // ✅ 백엔드 API 요청
    try {
      const response = await fetch(`${BACKEND_URL}/post`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("게시글이 등록되었습니다!");
        window.location.href = "./posts-service.html"; // ✅ 게시판 목록으로 이동
      } else {
        alert(`게시글 등록 실패: ${result.error}`);
      }
    } catch (error) {
      console.error("게시글 업로드 실패:", error);
      alert("서버 오류가 발생했습니다.");
    }
  });
});
