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

  async function waitForServer(url, maxAttempts = 5, delay = 2000) {
    return new Promise((resolve) => {
      let attempt = 1;

      function checkServer() {
        if (attempt > maxAttempts) {
          console.error("최대 시도 횟수 초과, 서버가 응답하지 않음");
          alert("서버 응답이 없습니다. 잠시 후 다시 시도해주세요.");
          resolve(false);
          return;
        }

        console.log(`서버 응답 확인 중 (시도 : ${attempt})...`);

        // ✅ 존재하는 API 엔드포인트(`/posts`)로 요청 보내기
        fetch(`${url}/posts`, { method: "GET", mode: "no-cors" })
          .then(() => {
            console.log(`✅ 서버 응답 확인 완료 (시도 : ${attempt})`);
            resolve(true);
          })
          .catch(() => {
            console.warn(`❌ 서버 응답 실패 (시도 : ${attempt})`);
            attempt++;
            setTimeout(checkServer, delay);
          });
      }

      checkServer();
    });
  }

  async function loginWithRetry(provider) {
    const loginUrl = `${BACKEND_URL}/login/${provider}`;

    console.log("🔄 서버 응답 대기 중...");
    const isServerReady = await waitForServer(loginUrl);

    if (isServerReady) {
      console.log("✅ 서버 응답 완료, 로그인 진행");
      window.location.href = loginUrl;
    } else {
      alert("서버 응답이 없습니다. 잠시 후 다시 시도해주세요.");
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
});
