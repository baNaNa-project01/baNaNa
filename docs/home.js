/***************************************************************
 *                   CAROUSEL PROGRESS BAR CODE
 * ----------------------------------------------------------------
 * 이 코드는 캐러셀 슬라이드 전환 시,
 * 프로그레스 인디케이터의 위치를 업데이트합니다.
 ***************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  const carouselElement = document.getElementById("carouselImages");
  const progressIndicator = document.querySelector(".progress-indicator");
  // 각 슬라이드에 해당하는 프로그레스 인디케이터의 left 값 (계산된 percentage)
  const positions = ["22.2%", "45.8%", "69.3%"];

  carouselElement.addEventListener("slide.bs.carousel", function (event) {
    const index = event.to; // 넘어갈 슬라이드 인덱스 (0, 1, 2)
    progressIndicator.style.left = positions[index];
  });
});

document.querySelectorAll(".card-image").forEach((img) => {
  // 이미지의 부모 요소에 바로 래퍼를 생성하여 감싸기
  const wrapper = document.createElement("div");
  wrapper.classList.add("card-image-wrapper");

  // 이미지 요소를 감싸도록 DOM에서 위치 변경
  img.parentNode.insertBefore(wrapper, img);
  wrapper.appendChild(img);

  // 마우스 엔터 시 오버레이 생성
  wrapper.addEventListener("mouseenter", () => {
    if (!wrapper.querySelector(".dark-overlay")) {
      const overlay = document.createElement("div");
      overlay.classList.add("dark-overlay");
      wrapper.appendChild(overlay);
    }
  });

  // 마우스 리브 시 오버레이 제거
  wrapper.addEventListener("mouseleave", () => {
    const overlay = wrapper.querySelector(".dark-overlay");
    if (overlay) {
      overlay.remove();
    }
  });
});
