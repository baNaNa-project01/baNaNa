function toggleBadge(element) {
  // 현재 클릭된 배지가 속한 컨테이너 찾기
  const container = element.parentNode;

  // 기존의 활성화된 배지를 찾아서 제거
  container.querySelectorAll(".badge").forEach((badge) => {
    badge.classList.remove("active");
  });

  // 클릭한 배지만 활성화
  element.classList.add("active");
}
