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

document.addEventListener("DOMContentLoaded", function () {
  //  백엔드에서 설정한 OAuth 로그인 URL (API GATEWAY 배포 URL 입력)
  const BACKEND_URL = "https://banana-flask-app.onrender.com";

  async function loginWithRetry(provider, maxAttempts = 5, delay = 2000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`🔄 로그인 시도 중 (시도 ${attempt})...`);

        // ✅ 서버 상태 확인
        const serverReady = await fetch(`${BACKEND_URL}/health`);
        if (serverReady.ok) {
          console.log("✅ 서버가 준비됨! 로그인 시작");
          window.location.href = `${BACKEND_URL}/login/${provider}`;
          return;
        }
      } catch (error) {
        console.warn(`❌ 로그인 실패 (시도 ${attempt})`, error);
        if (attempt < maxAttempts) {
          console.log(`⏳ ${delay / 1000}초 후 다시 시도...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          alert("서버 응답이 없습니다. 잠시 후 다시 시도해주세요.");
        }
      }
    }
  }

  //  카카오 로그인 버튼 클릭 시
  document.getElementById("kakao-login").addEventListener("click", function () {
    console.log("🟡 카카오 로그인 버튼 클릭!");
    loginWithRetry("kakao");
  });

  //  네이버 로그인 버튼 클릭 시
  document.getElementById("naver-login").addEventListener("click", function () {
    console.log("🟢 네이버 로그인 버튼 클릭!");
    loginWithRetry("naver");
  });

  //  구글 로그인 버튼 클릭 시
  document
    .getElementById("google-login")
    .addEventListener("click", function () {
      console.log("🔵 구글 로그인 버튼 클릭!");
      loginWithRetry("google");
    });

  async function fetchUserInfo() {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/me`, {
        method: "GET",
        credentials: "include", // ✅ 쿠키를 포함해서 요청
      });

      if (!response.ok) throw new Error("로그인 정보 없음");
      const userData = await response.json();
      console.log("✅ 로그인한 사용자:", userData);

      document.getElementById(
        "user-info"
      ).innerText = `안녕하세요, ${userData.name}!`;
      return userData;
    } catch (error) {
      console.warn("🚨 로그인 정보 없음:", error);
      return null;
    }
  }

  fetchUserInfo();
});
