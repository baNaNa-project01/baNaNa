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

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".overlap-img");

  images.forEach((img) => {
    img.addEventListener("click", function () {
      // 모든 이미지에 기본 상태 적용 (Dark Overlay & 크기 원상 복귀)
      images.forEach((el) => el.classList.remove("active"));

      // 클릭한 이미지만 효과 적용
      this.classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const regionButtons = document.querySelectorAll(".btn-region");

  regionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 모든 버튼에서 active 클래스 제거
      regionButtons.forEach((btn) => btn.classList.remove("active"));

      // 클릭한 버튼에 active 클래스 추가
      this.classList.add("active");
    });
  });
});
