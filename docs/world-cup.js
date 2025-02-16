document.addEventListener("DOMContentLoaded", function () {
  // .worldcup-btn 내의 모든 버튼을 선택합니다.
  const regionButtons = document.querySelectorAll(".worldcup-btn");
  let selectedRegion = null;

  // for...of 루프를 이용해 각 버튼에 이벤트 핸들러를 할당합니다.
  for (const button of regionButtons) {
    // 버튼의 텍스트(예: "서울", "부산" 등)를 지역명으로 사용합니다.
    const region = button.textContent.trim();

    // 각 지역의 button이 assets 폴더의 img 파일로 지정되었으므로, textContent를 읽어올 수 없기 때문에
    // img 태그의 alt 속성값을 지역명으로 읽어오는 방법입니다.
    button.addEventListener("click", function () {
      selectedRegion = this.querySelector("img").getAttribute("alt");
      console.log("선택된 지역: ", selectedRegion);

      if (selectedRegion) {
        // 버튼 클릭 시 game.html?region=지역명 으로 이동합니다.
        window.location.href =
          "./world-cup-game.html?region=" + encodeURIComponent(selectedRegion);
      } else {
        alert("지역을 선택해주세요!");
      }
    });
  }
});
