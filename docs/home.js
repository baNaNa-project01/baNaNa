/***************************************************************
 *                   캐러셀 프로그레스 바 업데이트
 * ----------------------------------------------------------------
 * 이 코드는 캐러셀 슬라이드 전환 시,
 * 프로그레스 인디케이터의 위치를 업데이트합니다.
 ***************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  const carouselElement = document.getElementById("carouselImages");
  const progressIndicator = document.querySelector(".progress-indicator");

  // 각 슬라이드에 해당하는 프로그레스 인디케이터의 left 값 (계산된 퍼센트)
  const positions = ["22.2%", "45.8%", "69.3%"];

  carouselElement.addEventListener("slide.bs.carousel", function (event) {
    const index = event.to; // 넘어갈 슬라이드 인덱스 (0, 1, 2)
    progressIndicator.style.left = positions[index];
  });
});

/***************************************************************
 *                  인기 월드컵 이미지 선택 기능
 * ----------------------------------------------------------------
 * 이미지 클릭 시 활성화(선택) 효과를 적용합니다.
 ***************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".overlap-img");

  images.forEach((img) => {
    img.addEventListener("click", function () {
      // 모든 이미지에서 active 클래스 제거
      images.forEach((el) => el.classList.remove("active"));

      // 클릭한 이미지에 active 클래스 추가
      this.classList.add("active");
    });
  });
});

/***************************************************************
 *                    지역 선택 버튼 기능
 * ----------------------------------------------------------------
 * 사용자가 지역 태그 버튼을 클릭하면
 * 해당 버튼이 활성화(active)되도록 설정합니다.
 ***************************************************************/

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
