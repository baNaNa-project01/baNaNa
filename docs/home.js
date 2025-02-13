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
