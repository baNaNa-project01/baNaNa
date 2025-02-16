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

  // 기본 선택 지역을 "전체"로 설정합니다.
  let selectedRegion = "전체";

  // 각 버튼에 대해 이벤트 리스너를 추가하고,
  // 기본으로 "전체" 버튼에 active 클래스를 추가합니다.
  regionButtons.forEach((button) => {
    if (button.textContent.trim() === "전체") {
      button.classList.add("active");
    }
    button.addEventListener("click", function () {
      // 모든 버튼에서 active 클래스를 제거
      regionButtons.forEach((btn) => btn.classList.remove("active"));

      // 클릭한 버튼에 active 클래스를 추가
      this.classList.add("active");

      // 선택한 지역명을 업데이트합니다.
      selectedRegion = this.textContent.trim();
    });
  });

  // "월드컵 바로가기" 버튼(여기서는 class가 btn btn-world인 이미지 요소)을 선택합니다. <<<<<<<<<<<<<<
  // => class 속성에 공백이 있을 경우 `.` 으로 이어줘야 합니다!!!!!!!!!
  const goButton = document.querySelector(".btn.btn-worldcup"); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  if (goButton) {
    goButton.addEventListener("click", function () {
      // 선택한 지역이 없을 경우를 체크할 필요 없이, 기본값 "전체"가 있으므로 바로 이동합니다.
      window.location.href =
        "./world-cup-game.html?region=" + encodeURIComponent(selectedRegion);
    });
  }
});
