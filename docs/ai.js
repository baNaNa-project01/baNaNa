let selectedLocation = ""; //지역선택
let selectedCompanions = []; //동반자
let selectedDuration = ""; //기간
let selectedStyle = []; //여행 스타일
let selectedSchedule = ""; //여행 일정 정도
//일 자별로 마커 찍기
let dayMarkers = {}; // 각 날짜별 마커 저장
let geocoder;
let map; // Google Map 객체를 저장할 변수
// 전역 변수 선언
let dayPlaces = {}; // {} 빈 객체로 초기화

// 프로그레스바 업데이트 함수
function updateProgressBar(step) {
  // 모든 step-container의 active 클래스 제거
  document.querySelectorAll(".step-container").forEach((container) => {
    container.classList.remove("active");
  });

  // 모든 step-item의 active 클래스 제거
  document.querySelectorAll(".step-item").forEach((item) => {
    item.classList.remove("active");
  });

  // 현재 스텝까지의 모든 step-container와 step-item에 active 클래스 추가
  for (let i = 1; i <= step; i++) {
    const stepContainer = document.querySelector(
      `.step-container:nth-child(${2 * i - 1})`
    );
    const stepItem = stepContainer.querySelector(".step-item");
    stepContainer.classList.add("active");
    stepItem.classList.add("active");
  }
}

//1단계 여행지 선택 변수 저장
function selectLocation(location) {
  selectedLocation = location;
  document
    .querySelectorAll("#step1 .ai-btn")
    .forEach((btn) => btn.classList.remove("selected"));
  event.target.classList.add("selected");
  document.getElementById("nextStep1").disabled = false;
  updateProgressBar(1); // 여기에 추가
}

//2단계로 가기 - 동반자 선택
function goToStep2() {
  if (selectedLocation) {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.remove("hidden");
    updateProgressBar(2); // 여기에 추가
  }
}

//1단계로 돌아가기 - 여행지 선택
function goToStep1() {
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");
  updateProgressBar(1); // 여기에 추가
}

//2단계 - 동반자 변수를 배열로 중복 저장
function selectedCompanion(companion) {
  const index = selectedCompanions.indexOf(companion);
  if (index > -1) {
    selectedCompanions.splice(index, 1);
    event.target.classList.remove("selected");
  } else {
    selectedCompanions.push(companion);
    event.target.classList.add("selected");
  }
  document.getElementById("nextStep2").disabled =
    selectedCompanions.length === 0;
}

//3단계로 이동가기
function goToStep3() {
  if (selectedCompanions.length > 0) {
    document.getElementById("step2").classList.add("hidden");
    document.getElementById("step3").classList.remove("hidden");
    updateProgressBar(3); // 프로그레스바
  }
}

//2단계로 돌아가기
function goToStep2FromStep3() {
  document.getElementById("step3").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
  updateProgressBar(2); // 프로그레스바
}

//3단계 - 기간을 정하기
function selectDuration(duration) {
  selectedDuration = duration;
  document
    .querySelectorAll("#step3 .ai-btn")
    .forEach((btn) => btn.classList.remove("selected"));
  event.target.classList.add("selected");
  document.getElementById("nextStep3").disabled = false;
}

//4단계로 이동
function goToStep4() {
  if (selectedDuration) {
    document.getElementById("step3").classList.add("hidden");
    document.getElementById("step4").classList.remove("hidden");
    updateProgressBar(4); // 프로그레스바
  }
}

//3단계로 돌아오기
function goToStep3FromStep4() {
  document.getElementById("step4").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");
  updateProgressBar(3); // 프로그레스바
}

// 4단계 - 여행 스타일 선택 함수 (다중 선택 가능)
function selectStyle(style) {
  const index = selectedStyle.indexOf(style);
  if (index > -1) {
    selectedStyle.splice(index, 1);
    event.target.classList.remove("selected");
  } else {
    selectedStyle.push(style);
    event.target.classList.add("selected");
  }
  // 여행 스타일 선택 여부에 따라 다음 버튼 활성화
  document.getElementById("nextStep4").disabled = selectedStyle.length === 0;
}

// 5단계로 이동
function goToStep5() {
  if (selectedStyle.length > 0) {
    document.getElementById("step4").classList.add("hidden");
    document.getElementById("step5").classList.remove("hidden");
    updateProgressBar(5); // 프로그레스바
  }
}

// 4단계로 이동
function goToStep4FromStep5() {
  document.getElementById("step5").classList.add("hidden");
  document.getElementById("step4").classList.remove("hidden");
  updateProgressBar(4); // 프로그레스바
}

// 5단계 - 여행 일정 선택 함수
function selectSchedule(schedule) {
  selectedSchedule = schedule;
  document
    .querySelectorAll("#step5 .ai-btn")
    .forEach((btn) => btn.classList.remove("selected"));
  event.target.classList.add("selected");
  document.getElementById("nextStep5").disabled = !selectedSchedule;
}

// 6단계에서 1단계로 돌아가기
function goToStep1FromStep6() {
  document.getElementById("step6").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");
  document.getElementById("progress-container").classList.remove("hidden");
  updateProgressBar(1); // 프로그레스바
}

async function callGeminiAPI() {
  const response = await fetch(
    "https://torch-highfalutin-alamosaurus.glitch.me/ai-service",
    {
      method: "POST",
      body: JSON.stringify({
        text: `너는 여행 계획 전문가야. 나는 지금 여행을 가고 싶은데, 다음과 같은 조건들이 있어:
                    1. 여행지는 ${selectedLocation}로 정했어.
                    2. 동반자는 ${selectedCompanions.join(", ")} 함께 갈 거야.
                    3. 여행 기간은 ${selectedDuration}로 계획하고 있어.
                    4. 내가 선호하는 여행 스타일은 ${selectedStyle.join(
                      ", "
                    )}이야.
                    5. 여행 일정은 ${selectedSchedule} 을 선호해.
                    `,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();
  return json.reply;
}

//결과화면에 Day버튼 활성화 함수
function setActiveButton(clickedButton) {
  const buttons = document.querySelectorAll(".day-buttons-container button");
  buttons.forEach((button) => button.classList.remove("selected")); // 기존 선택 해제
  clickedButton.classList.add("selected"); // 선택된 버튼에 클래스 추가
}

//위도, 경도 받아오는 API
function getLatLngFromAddress(address) {
  return new Promise((resolve, reject) => {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        resolve({ lat: lat, lng: lng });
      } else {
        reject(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  });
}

//프롬프트 결과 중 Day로 시작하는 행에서 ,를 기준으로 여행지 추출 함수
function extractDayPlaces(plan) {
  const regex = /Day\s*\d+\s*:\s*([^\n]+)/g;
  const result = [];
  let match;

  while ((match = regex.exec(plan)) !== null) {
    const places = match[1].split(",").map((place) => place.trim());
    result.push(places);
  }

  return result;
}

function showDayButtons() {
  const dayButtonsContainer = document.getElementById("dayFilterButtons");
  const allButtons = dayButtonsContainer.getElementsByTagName("button");

  // dayPlaces 배열의 길이에 맞게 버튼을 보이게 함
  for (let i = 0; i < allButtons.length - 1; i++) {
    // 마지막 버튼(모두 보기)은 항상 보이게
    const button = allButtons[i];
    const dayIndex = parseInt(button.innerText.replace("Day ", ""));

    if (dayIndex <= dayPlaces.length) {
      button.style.display = "inline-block"; // 버튼 보이기
    } else {
      button.style.display = "none"; // 버튼 숨기기
    }
  }
  // '모두 보기' 버튼은 항상 보이게
  allButtons[allButtons.length - 1].style.display = "inline-block";
}

//******기존 구글 마커에 색상 배열을 색상별로 가져오는 함수******
// function getMarkerIcon(dayIndex) {
//   const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
//   return `http://maps.google.com/mapfiles/ms/icons/${
//     colors[dayIndex % colors.length]
//   }-dot.png`;
// }

function getMarkerIcon(dayIndex) {
  const icons = [
    "./assets/ai-recommend-service/빨간 배나낭 마커.svg",
    "./assets/ai-recommend-service/주황 배나낭 마커.svg",
    "./assets/ai-recommend-service/노란 배나낭 마커.svg",
    "./assets/ai-recommend-service/녹색 배나낭 마커.svg",
    "./assets/ai-recommend-service/파란 배나낭 마커.svg",
    "./assets/ai-recommend-service/보라 배나낭 마커.svg",
  ];
  return icons[dayIndex % icons.length];
}

function showMarkersForDay(dayKey) {
  // 모든 마커 숨기기
  Object.values(dayMarkers).forEach((markers) =>
    markers.forEach((marker) => marker.setMap(null))
  );

  // 모든 마커를 다시 보여주는 기능
  if (dayKey === "All") {
    // "모두 보기" 클릭 시 지도 중심을 첫 번째 마커로 이동하고, 지도를 축소
    let bounds = new google.maps.LatLngBounds();
    Object.values(dayMarkers).forEach((markers) => {
      markers.forEach((marker) => {
        marker.setMap(map);
        bounds.extend(marker.getPosition());
      });
    });
    map.fitBounds(bounds); // 모든 마커가 보일 수 있도록 지도 축소
  } else {
    // 선택한 날짜의 마커만 보이기
    if (dayMarkers[dayKey]) {
      let bounds = new google.maps.LatLngBounds();
      dayMarkers[dayKey].forEach((marker, index) => {
        marker.setMap(map);
        bounds.extend(marker.getPosition());
      });
      map.fitBounds(bounds); // 선택된 Day의 마커들을 모두 포함할 수 있도록 지도 확대
    }
  }
}

function initMap() {
  if (!dayPlaces || dayPlaces.length === 0) {
    console.error("dayPlaces가 비어 있음!");
    return;
  }

  // 기존 마커 초기화
  Object.values(dayMarkers).forEach((markers) =>
    markers.forEach((marker) => marker.setMap(null))
  );
  dayMarkers = {}; // 기존 마커 데이터를 완전히 초기화

  // 지도 초기화 부분
  const firstPlace = dayPlaces[0][0]; // 첫 번째 장소
  geocoder = new google.maps.Geocoder();

  getLatLngFromAddress(firstPlace).then((latLng) => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: latLng,
    });

    let bounds = new google.maps.LatLngBounds(); // 마커들을 포함할 범위 객체 생성

    // Day별로 마커 그룹화
    dayPlaces.forEach((places, index) => {
      const dayKey = `Day${index + 1}`;
      dayMarkers[dayKey] = [];

      places.forEach((place) => {
        getLatLngFromAddress(place)
          .then((latLng) => {
            // let marker = new google.maps.Marker({
            let marker = new google.maps.Marker({
              position: latLng,
              map: map,
              title: place,
              icon: getMarkerIcon(index), // 색상 아이콘 적용
            });

            dayMarkers[dayKey].push(marker);
            bounds.extend(latLng); // 마커 위치를 bounds에 추가

            // 모든 마커가 추가된 후 지도 확대/축소 및 중앙 조정
            map.fitBounds(bounds);
          })
          .catch((error) => {
            console.error(`Error geocoding ${place}:`, error);
          });
      });
    });
  });
}

// 5단계에서 결과 보기
function showSelection() {
  document.getElementById("loadingOverlay").classList.remove("hidden");

  callGeminiAPI().then((reply) => {
    console.log("API 응답:", reply);
    document.getElementById("loadingOverlay").classList.add("hidden");

    const resultText = document.getElementById("resultText");
    resultText.innerHTML = "";

    const lines = reply.split("\n");
    let currentDayText = "";
    let isFirstDay = true;

    lines.forEach((line, index) => {
      if (line.trim() === "") return;

      if (line.startsWith("Day")) {
        if (currentDayText && !isFirstDay) {
          appendChatBubble(resultText, currentDayText, false);
        }

        appendChatBubble(resultText, `<span class="day-text">${line}</span>`, true);
        currentDayText = "";
        isFirstDay = false;
      } else {
        currentDayText += line + "<br>";
      }

      if (index === lines.length - 1 && currentDayText) {
        appendChatBubble(resultText, currentDayText, false);
      }
    });

    dayPlaces = extractDayPlaces(reply);
    console.log("추출된 dayPlaces:", dayPlaces);

    if (!dayPlaces || Object.keys(dayPlaces).length === 0) {
      console.error("dayPlaces가 비어 있음!");
      return;
    }

    document.getElementById("mapContainer").classList.remove("hidden");
    document.getElementById("step5").classList.add("hidden");
    document.getElementById("step6").classList.remove("hidden");
    updateProgressBar(6);

    initMap();
    showDayButtons();
  });
}

/* 채팅 말풍선 추가 함수 */
function appendChatBubble(container, text, isDay) {
  // 채팅 행(row) 생성
  const chatRow = document.createElement("div");
  chatRow.className = "chat-row";

  // 배나낭 캐릭터 추가
  const avatar = document.createElement("img");
  avatar.src = "./assets/ai-recommend-service/배나낭 채팅.svg"; // 배나낭 캐릭터 이미지 경로
  avatar.alt = "배나낭 캐릭터";
  avatar.className = "character-avatar";

  // 채팅 버블 생성
  const chatBubble = document.createElement("div");
  chatBubble.className = isDay ? "chat-bubble day-bubble" : "chat-bubble";
  chatBubble.innerHTML = text;

  // 요소 정렬
  chatRow.appendChild(avatar);
  chatRow.appendChild(chatBubble);

  // 결과 컨테이너에 추가
  container.appendChild(chatRow);
}
