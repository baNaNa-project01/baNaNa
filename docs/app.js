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
  const BACKEND_URL = "https://banana-flask-app.onrender.com";

  // ✅ 로그인 요청 (콜드 스타트 대응)
  async function loginWithRetry(provider, maxAttempts = 5, delay = 2000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`🔄 로그인 시도 중 (시도 ${attempt})...`);

        // ✅ 서버 상태 확인
        const serverReady = await fetch(`${BACKEND_URL}/health`);
        if (serverReady.ok) {
          console.log("✅ 서버가 준비됨! 로그인 시작");
          window.location.href = `${BACKEND_URL}/login/${provider}`;

          // 🚀 1️⃣ 리디렉트 후에도 `storeTokenFromURL()` 실행 보장
          setTimeout(() => {
            console.log("🔥 로그인 후 storeTokenFromURL() 실행 시도!");
            storeTokenFromURL();
            fetchUserInfo();
          }, 2000); // 🔹 로그인 후 2초 후 실행

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

  // ✅ 로그인 버튼 이벤트 리스너
  document.getElementById("kakao-login").addEventListener("click", function () {
    console.log("🟡 카카오 로그인 버튼 클릭!");
    loginWithRetry("kakao");
  });

  document.getElementById("naver-login").addEventListener("click", function () {
    console.log("🟢 네이버 로그인 버튼 클릭!");
    loginWithRetry("naver");
  });

  document
    .getElementById("google-login")
    .addEventListener("click", function () {
      console.log("🔵 구글 로그인 버튼 클릭!");
      loginWithRetry("google");
    });

  console.log("🔥 페이지 로드 완료, storeTokenFromURL() 실행 대기...");

  // ✅ 1️⃣ JWT 저장하기 (로그인 완료 후 실행)
  function storeTokenFromURL() {
    console.log("✅ storeTokenFromURL() 실행 시작!");

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    console.log("🔍 현재 URL:", window.location.href);
    console.log("🔍 URL에서 추출한 토큰:", token);

    if (token) {
      console.log("✅ JWT 저장 완료! 토큰:", token);
      localStorage.setItem("access_token", token);

      // ✅ 로그인 후 불필요한 `token` 파라미터 제거
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.warn("🚨 URL에 토큰이 없음! 로그인 실패 가능성 높음");
    }
  }

  // ✅ 2️⃣ 로그인한 사용자 정보 가져오기
  async function fetchUserInfo() {
    try {
      const token = localStorage.getItem("access_token");
      console.log("🔍 localStorage에서 가져온 JWT:", token);

      if (!token) throw new Error("로그인된 사용자가 없음");

      const response = await fetch(`${BACKEND_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  // ✅ **페이지가 로드될 때 storeTokenFromURL() 실행 보장**
  setTimeout(() => {
    console.log("🔥 storeTokenFromURL() 강제 실행 시도!");
    storeTokenFromURL();
    fetchUserInfo();
  }, 3000);
});
