document.addEventListener("DOMContentLoaded", function () {
  // 현재 페이지 URL 가져오기
  const currentPath = window.location.pathname; // 예: "/map-service.html"

  // 모든 내비게이션 링크 가져오기
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  // 각 링크를 확인하여 현재 페이지와 일치하는 경우 active 추가
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

/***************************************************************
 *                    소셜 로그인 API 연동
 * ----------------------------------------------------------------
 * 로그인 버튼을 클릭하면 백엔드 OAuth 로그인 API로 이동합니다.
 * API GATEWAY 배포 URL을 BACKEND_URL에 설정하세요.
 ***************************************************************/

/*
document.addEventListener("DOMContentLoaded", function () {
  //  백엔드에서 설정한 OAuth 로그인 URL (API GATEWAY 배포 URL 입력)
  const BACKEND_URL = "API GATEWAY 배포 URL";

  //  카카오 로그인 버튼 클릭 시
  document.getElementById("kakao-login").addEventListener("click", function () {
    window.location.href = `${BACKEND_URL}/kakao`;
  });

  //  네이버 로그인 버튼 클릭 시
  document.getElementById("naver-login").addEventListener("click", function () {
    window.location.href = `${BACKEND_URL}/naver`;
  });

  //  구글 로그인 버튼 클릭 시
  document.getElementById("google-login").addEventListener("click", function () {
    window.location.href = `${BACKEND_URL}/google`;
  });
});
*/
