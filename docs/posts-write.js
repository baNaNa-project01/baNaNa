document.addEventListener("DOMContentLoaded", function () {
  const imageInput = document.getElementById("post-image");
  const imagePreviewContainer = document.getElementById(
    "image-preview-container"
  );

  // 이미지 미리보기
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
});
