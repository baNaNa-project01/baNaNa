/******************************************
 * map.js
 *
 * 백엔드(https://fate-star-gram.glitch.me)와 연동된 지도 및
 * 관광정보 관련 모든 기능(네이버/카카오 지도 API, 관광 데이터 마커,
 * 현재 위치, 키워드/카테고리 검색, 지역 기반 관광정보 조회, 상세정보 팝업 등)
 * 을 구현한 코드입니다.
 ******************************************/

// ---------------------- 전역 변수 선언 ----------------------
let map;
let markerData = [];
let searchMarkers = [];
let searchInfoWindows = [];
let regionTourMarkers = [];
let regionTourInfoWindows = [];
let currentLocationMarker;
let tourBoardData = [];
let tourBoardCurrentPage = 1;
const tourBoardItemsPerPage = 15;
const defaultImageURL = "./assets/defaultImg.png"; // 이미지 없을 경우 대체

// 선택된 지역/세부지역/관광타입 저장
let selectedAreaCode = null;
let selectedSigunguCode = null;
let selectedContentTypeId = null;

// ---------------------- 콘텐츠 타입별 상세 필드 매핑 ----------------------
const detailFields = {
  12: {
    accomcount: "수용인원",
    chkbabycarriage: "유모차대여정보",
    chkcreditcard: "신용카드가능정보",
    chkpet: "애완동물동반가능정보",
    expagerange: "체험가능연령",
    expguide: "체험안내",
    heritage1: "세계문화유산유무",
    heritage2: "세계자연유산유무",
    heritage3: "세계기록유산유무",
    infocenter: "문의및안내",
    opendate: "개장일",
    parking: "주차시설",
    restdate: "쉬는날",
    useseason: "이용시기",
    usetime: "이용시간",
  },
  14: {
    accomcountculture: "수용인원",
    chkbabycarriageculture: "유모차대여정보",
    chkcreditcardculture: "신용카드가능정보",
    chkpetculture: "애완동물동반가능정보",
    discountinfo: "할인정보",
    infocenterculture: "문의및안내",
    parkingculture: "주차시설",
    parkingfee: "주차요금",
    restdateculture: "쉬는날",
    usefee: "이용요금",
    usetimeculture: "이용시간",
    scale: "규모",
    spendtime: "관람소요시간",
  },
  15: {
    agelimit: "관람가능연령",
    bookingplace: "예매처",
    discountinfofestival: "할인정보",
    eventenddate: "행사종료일",
    eventhomepage: "행사홈페이지",
    eventplace: "행사장소",
    eventstartdate: "행사시작일",
    festivalgrade: "축제등급",
    placeinfo: "행사장위치안내",
    playtime: "공연시간",
    program: "행사프로그램",
    spendtimefestival: "관람소요시간",
    sponsor1: "주최자정보",
    sponsor1tel: "주최자연락처",
    sponsor2: "주관사정보",
    sponsor2tel: "주관사연락처",
    subevent: "부대행사",
    usetimefestival: "이용요금",
  },
  25: {
    distance: "코스총거리",
    infocentertourcourse: "문의및안내",
    schedule: "코스일정",
    taketime: "코스총소요시간",
    theme: "코스테마",
  },
  28: {
    accomcountleports: "수용인원",
    chkbabycarriageleports: "유모차대여정보",
    chkcreditcardleports: "신용카드가능정보",
    chkpetleports: "애완동물동반가능정보",
    expagerangeleports: "체험가능연령",
    infocenterleports: "문의및안내",
    openperiod: "개장기간",
    parkingfeeleports: "주차요금",
    parkingleports: "주차시설",
    reservation: "예약안내",
    restdateleports: "쉬는날",
    scaleleports: "규모",
    usefeeleports: "입장료",
    usetimeleports: "이용시간",
  },
  32: {
    accomcountlodging: "수용가능인원",
    benikia: "베니키아여부",
    checkintime: "입실시간",
    checkouttime: "퇴실시간",
    chkcooking: "객실내취사여부",
    foodplace: "식음료장",
    goodstay: "굿스테이여부",
    hanok: "한옥여부",
    infocenterlodging: "문의및안내",
    parkinglodging: "주차시설",
    pickup: "픽업서비스",
    roomcount: "객실수",
    reservationlodging: "예약안내",
    reservationurl: "예약안내홈페이지",
    roomtype: "객실유형",
    scalelodging: "규모",
    subfacility: "부대시설 (기타)",
    barbecue: "바비큐장여부",
    beauty: "뷰티시설정보",
    beverage: "식음료장여부",
    bicycle: "자전거대여여부",
    campfire: "캠프파이어여부",
    fitness: "휘트니스센터여부",
    karaoke: "노래방여부",
    publicbath: "공용샤워실여부",
    publicpc: "공용 PC실여부",
    sauna: "사우나실여부",
    seminar: "세미나실여부",
    sports: "스포츠시설여부",
    refundregulation: "환불규정",
  },
  38: {
    chkbabycarriageshopping: "유모차대여정보",
    chkcreditcardshopping: "신용카드가능정보",
    chkpetshopping: "애완동물동반가능정보",
    culturecenter: "문화센터바로가기",
    fairday: "장서는날",
    infocentershopping: "문의및안내",
    opendateshopping: "개장일",
    opentime: "영업시간",
    parkingshopping: "주차시설",
    restdateshopping: "쉬는날",
    restroom: "화장실설명",
    saleitem: "판매품목",
    saleitemcost: "판매품목별가격",
    scaleshopping: "규모",
    shopguide: "매장안내",
  },
  39: {
    chkcreditcardfood: "신용카드가능정보",
    discountinfofood: "할인정보",
    firstmenu: "대표메뉴",
    infocenterfood: "문의및안내",
    kidsfacility: "어린이놀이방여부",
    opendatefood: "개업일",
    opentimefood: "영업시간",
    packing: "포장가능",
    parkingfood: "주차시설",
    reservationfood: "예약안내",
    restdatefood: "쉬는날",
    scalefood: "규모",
    seat: "좌석수",
    smoking: "금연/흡연여부",
    treatmenu: "취급메뉴",
    lcnsno: "인허가번호",
  },
};

// ---------------------- DOMContentLoaded 시 초기화 ----------------------
document.addEventListener("DOMContentLoaded", () => {
  // 1. 네이버 지도 API 키 가져오기 및 지도 스크립트 동적 로드
  fetch("https://fate-star-gram.glitch.me/api/key")
    .then((res) => res.json())
    .then((data) => {
      if (!data.clientId) throw new Error("Naver API Key is missing");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${data.clientId}`;
      script.onload = initMap;
      document.head.appendChild(script);
    })
    .catch((error) => console.error("Error loading Naver API key:", error));

  // 2. 카카오 지도 API 키 가져오기 및 스크립트 동적 로드 (검색 서비스 초기화)
  fetch("https://fate-star-gram.glitch.me/api/kakao-key")
    .then((res) => res.json())
    .then((data) => {
      if (!data.kakaoApiKey) throw new Error("Kakao API Key is missing");
      const script = document.createElement("script");
      script.async = false;
      script.defer = false;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${data.kakaoApiKey}&libraries=services&autoload=false`;
      script.onload = function () {
        kakao.maps.load(function () {
          window.search_loc = new kakao.maps.services.Places();
          console.log("Kakao Places service initialized");
        });
      };
      document.head.appendChild(script);
    })
    .catch((error) => console.error("Error loading Kakao API key:", error));

  // 3. 관광 데이터(기본 마커용) 불러오기
  fetch("https://fate-star-gram.glitch.me/api/data")
    .then((res) => res.json())
    .then((data) => {
      markerData = data;
      if (map) {
        addMarkers();
      }
    })
    .catch((error) => console.error("Error fetching tourism data:", error));

  // 4. UI 이벤트 리스너 설정
  setupEventListeners();
});

// ---------------------- 지도 초기화 및 기본 마커 추가 ----------------------
function initMap() {
  const mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10,
  };
  map = new naver.maps.Map("map", mapOptions);
  console.log("Naver map initialized");

  if (markerData.length > 0) {
    addMarkers();
  }

  // 지도 클릭 시 검색/지역 기반 인포윈도우 닫기
  naver.maps.Event.addListener(map, "click", () => {
    closeAllSearchInfoWindows();
    closeAllRegionTourInfoWindows();
  });
}

function addMarkers() {
  markerData.forEach((location) => {
    const latlng = new naver.maps.LatLng(location.lat, location.lng);
    const marker = new naver.maps.Marker({
      map: map,
      position: latlng,
      icon: {
        content: "<div class='marker'></div>",
        anchor: new naver.maps.Point(12, 12),
      },
    });
    const content = `
      <div class="infowindow_wrap">
        <div class="infowindow_title">${location.title}</div>
        <div class="infowindow_content">${location.content}</div>
        <div class="infowindow_createdTime">${location.createdTime}</div>
      </div>`;
    const infoWindow = new naver.maps.InfoWindow({
      content: content,
      backgroundColor: "rgba(255,255,255,0.9)",
      borderColor: "#ccc",
    });
    naver.maps.Event.addListener(marker, "click", () => {
      infoWindow.open(map, marker);
    });
  });
}

function closeAllSearchInfoWindows() {
  searchInfoWindows.forEach((iw) => iw.close());
}

function closeAllRegionTourInfoWindows() {
  regionTourInfoWindows.forEach((iw) => iw.close());
}

// ---------------------- 카테고리 검색 함수 추가 ----------------------
function searchByCategory(categoryCode) {
  if (!categoryCode) {
    alert("카테고리를 선택해주세요.");
    return;
  }
  console.log("Category search requested:", categoryCode);
  if (window.search_loc) {
    // 지도에서 현재 보이는 영역의 경계 구하기 (네이버)
    const naverBounds = map.getBounds();
    const sw = naverBounds.getSW();
    const ne = naverBounds.getNE();
    // 카카오 지도 LatLng 객체로 변환
    const kakaoSw = new kakao.maps.LatLng(sw.lat(), sw.lng());
    const kakaoNe = new kakao.maps.LatLng(ne.lat(), ne.lng());
    const kakaoBounds = new kakao.maps.LatLngBounds(kakaoSw, kakaoNe);
    // 카테고리 검색 실행
    window.search_loc.categorySearch(categoryCode, categorySearchCB, {
      bounds: kakaoBounds,
    });
  } else {
    console.error("Kakao search service is not initialized yet.");
  }
}

function categorySearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    clearSearchMarkers();
    const bounds = new naver.maps.LatLngBounds();
    data.forEach((place) => {
      const position = new naver.maps.LatLng(
        parseFloat(place.y),
        parseFloat(place.x)
      );
      const marker = new naver.maps.Marker({
        map: map,
        position: position,
        icon: {
          content: "<div class='search-marker'></div>",
          anchor: new naver.maps.Point(12, 12),
        },
      });
      searchMarkers.push(marker);
      const content = `
        <div class="infowindow_wrap">
          <div class="infowindow_title">${place.place_name}</div>
          <div class="infowindow_content">${place.address_name}</div>
          <div class="infowindow_phone">${
            place.phone ? place.phone : "No phone info"
          }</div>
        </div>`;
      const infoWindow = new naver.maps.InfoWindow({
        content: content,
        backgroundColor: "rgba(255,255,255,0.9)",
        borderColor: "#ccc",
      });
      searchInfoWindows.push(infoWindow);
      naver.maps.Event.addListener(marker, "click", () => {
        searchInfoWindows.forEach((iw) => iw.close());
        infoWindow.open(map, marker);
      });
      bounds.extend(position);
    });
    map.fitBounds(bounds);
    displayPagination(pagination);
    updateSearchResultsList(data, pagination);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 존재하지 않습니다.");
  } else {
    alert("검색 결과 중 오류가 발생했습니다.");
  }
}

// ---------------------- 키워드 검색 함수 ----------------------
function searchHandler() {
  const query = document.getElementById("search-input").value.trim();
  if (!query) {
    alert("검색어를 입력하세요.");
    return;
  }
  if (window.search_loc) {
    window.search_loc.keywordSearch(query, searchPlaceCallback, {
      useMapBounds: true,
    });
  } else {
    console.error("Kakao search service is not initialized.");
  }
}

function searchPlaceCallback(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    clearSearchMarkers();
    const bounds = new naver.maps.LatLngBounds();
    data.forEach((place) => {
      const position = new naver.maps.LatLng(
        parseFloat(place.y),
        parseFloat(place.x)
      );
      const marker = new naver.maps.Marker({
        map: map,
        position: position,
        icon: {
          content: "<div class='search-marker'></div>",
          anchor: new naver.maps.Point(12, 12),
        },
      });
      searchMarkers.push(marker);
      const content = `
        <div class="infowindow_wrap">
          <div class="infowindow_title">${place.place_name}</div>
          <div class="infowindow_content">${place.address_name}</div>
          <div class="infowindow_phone">${
            place.phone ? place.phone : "No phone info"
          }</div>
        </div>`;
      const infoWindow = new naver.maps.InfoWindow({
        content: content,
        backgroundColor: "rgba(255,255,255,0.9)",
        borderColor: "#ccc",
      });
      searchInfoWindows.push(infoWindow);
      naver.maps.Event.addListener(marker, "click", () => {
        searchInfoWindows.forEach((iw) => iw.close());
        infoWindow.open(map, marker);
      });
      bounds.extend(position);
    });
    map.fitBounds(bounds);
    displayPagination(pagination);
    updateSearchResultsList(data, pagination);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert("검색 결과가 존재하지 않습니다.");
    clearSearchMarkers();
    updateSearchResultsList([], pagination);
  } else {
    alert("검색 중 오류가 발생했습니다.");
  }
}

function clearSearchMarkers() {
  searchInfoWindows.forEach((iw) => iw.close());
  if (searchMarkers.length) {
    searchMarkers.forEach((marker) => marker.setMap(null));
    searchMarkers = [];
    searchInfoWindows = [];
  }
}

function displayPagination(pagination) {
  console.log("Pagination info:", pagination);
}

// ---------------------- 검색 결과 목록 표시 함수 ----------------------
// 기존 document.body에 추가하던 대신, .map-section 내부 현재 위치 버튼 아래에 추가
function updateSearchResultsList(data, pagination) {
  let mapSection = document.querySelector(".map-section");
  let resultsContainer = document.getElementById("search-results");
  if (!resultsContainer) {
    resultsContainer = document.createElement("div");
    resultsContainer.id = "search-results";
    resultsContainer.style.position = "absolute";
    // 현재 위치 버튼 아래에 배치: 현재 버튼의 offsetTop+offsetHeight + 약간의 마진
    let currentBtn = document.getElementById("current-btn");
    let topOffset = currentBtn.offsetTop + currentBtn.offsetHeight + 5;
    resultsContainer.style.top = topOffset + "px";
    resultsContainer.style.left = currentBtn.offsetLeft + "px";
    resultsContainer.style.background = "rgba(255,255,255,0.9)";
    resultsContainer.style.padding = "10px";
    resultsContainer.style.maxHeight = "400px";
    resultsContainer.style.overflowY = "auto";
    resultsContainer.style.zIndex = "1000";
    mapSection.appendChild(resultsContainer);
  }
  resultsContainer.innerHTML = "";
  data.forEach((place, i) => {
    const item = document.createElement("div");
    item.className = "search-result-item";
    item.style.borderBottom = "1px solid #ccc";
    item.style.padding = "5px";
    item.innerHTML = `<strong>${place.place_name}</strong><br>${
      place.address_name
    }<br>${place.phone ? place.phone : ""}`;
    item.addEventListener("click", () => {
      const marker = searchMarkers[i];
      if (marker) {
        map.panTo(marker.getPosition());
        searchInfoWindows.forEach((iw) => iw.close());
        if (searchInfoWindows[i]) {
          searchInfoWindows[i].open(map, marker);
        }
      }
    });
    resultsContainer.appendChild(item);
  });
}

// ---------------------- UI 이벤트 리스너 설정 ----------------------
function setupEventListeners() {
  // 현재 위치 버튼
  document.getElementById("current-btn").addEventListener("click", () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const latlng = new naver.maps.LatLng(lat, lng);
          if (currentLocationMarker) {
            currentLocationMarker.setMap(null);
          }
          currentLocationMarker = new naver.maps.Marker({
            position: latlng,
            map: map,
            icon: {
              // .myloc 클래스에 pulse 애니메이션이 적용되어야 함 (CSS 확인)
              content: '<img class="myloc" src="./assets/mylocation.png">',
              anchor: new naver.maps.Point(11, 11),
            },
          });
          map.setZoom(14, false);
          map.panTo(latlng);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("위치를 가져올 수 없습니다. 권한을 확인하세요.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation을 지원하지 않는 브라우저입니다.");
    }
  });

  // 검색 박스 (키워드) – 엔터 또는 버튼 클릭
  document
    .getElementById("search-btn")
    .addEventListener("click", searchHandler);
  document.getElementById("search-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchHandler();
  });

  // 우측 컨트롤의 카테고리 버튼 (대형마트부터 약국까지)
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const catCode = this.dataset.cat;
      searchByCategory(catCode);
    });
  });

  // 지도 유형 변경 버튼 (오른쪽 컨트롤 내 map-type-btn)
  document.querySelectorAll(".map-type-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".map-type-btn")
        .forEach((b) => b.classList.remove("control-on"));
      this.classList.add("control-on");
      const type = this.dataset.type; // NORMAL, TERRAIN, SATELLITE, HYBRID
      map.setMapTypeId(naver.maps.MapTypeId[type]);
    });
  });

  // 사이드패널 – 지역 선택 버튼
  document
    .querySelectorAll(".side-panel .region-selection-panel .badge")
    .forEach((btn) => {
      btn.addEventListener("click", function () {
        document
          .querySelectorAll(".side-panel .region-selection-panel .badge")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        selectedAreaCode = this.dataset.code;
        populateDetailRegions(selectedAreaCode);
      });
    });

  // 사이드패널 – 관광타입 버튼
  document.querySelectorAll(".tour-type .badge").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".tour-type .badge")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      selectedContentTypeId = this.dataset.type;
    });
  });

  // 관광정보 조회하기 버튼 (지역 기반)
  document.querySelector(".info-query-btn").addEventListener("click", () => {
    if (!selectedAreaCode) {
      alert("지역을 선택해주세요.");
      return;
    }
    if (!selectedSigunguCode) {
      alert("세부지역을 선택해주세요.");
      return;
    }
    if (!selectedContentTypeId) {
      alert("관광타입을 선택해주세요.");
      return;
    }
    const url = `https://fate-star-gram.glitch.me/api/region-tour-info?contentTypeId=${selectedContentTypeId}&areaCode=${selectedAreaCode}&sigunguCode=${selectedSigunguCode}`;
    fetch(url)
      .then((res) => res.json())
      .then((myJson) => {
        clearRegionTourMarkers();
        let items = myJson.response.body.items.item;
        if (!items) {
          alert("조회된 정보가 없습니다.");
          return;
        }
        if (!Array.isArray(items)) {
          items = [items];
        }
        items.forEach((item) => {
          const position = new naver.maps.LatLng(
            parseFloat(item.mapy),
            parseFloat(item.mapx)
          );
          const marker = new naver.maps.Marker({
            map: map,
            position: position,
            icon: {
              content: "<div class='regionTourMarker'></div>",
              anchor: new naver.maps.Point(12, 12),
            },
          });
          regionTourMarkers.push(marker);
          const content = `
              <div class="infowindow_wrap">
                <div class="infowindow_title">${item.title}</div>
                <div class="infowindow_content">
                  주소: ${item.addr1 ? item.addr1 : ""} ${
            item.addr2 ? item.addr2 : ""
          }
                  <br>타입: ${item.contenttypeid}
                  <br>생성일: ${item.createdtime}
                  <br>수정일: ${item.modifiedtime}
                  ${
                    item.firstimage
                      ? `<img src="${item.firstimage}" alt="${item.title}" style="width:100%;">`
                      : ""
                  }
                </div>
              </div>`;
          const infoWindow = new naver.maps.InfoWindow({
            content: content,
            backgroundColor: "rgba(255,255,255,0.9)",
            borderColor: "#ccc",
          });
          regionTourInfoWindows.push(infoWindow);
          naver.maps.Event.addListener(marker, "click", () => {
            regionTourInfoWindows.forEach((iw) => iw.close());
            infoWindow.open(map, marker);
          });
        });
        if (regionTourMarkers.length > 0) {
          let bounds = new naver.maps.LatLngBounds();
          regionTourMarkers.forEach((marker) =>
            bounds.extend(marker.getPosition())
          );
          map.fitBounds(bounds);
        }
        tourBoardData = items;
        tourBoardCurrentPage = 1;
        renderTourBoardPage(1);
      })
      .catch((error) =>
        console.error("Error fetching region tour information:", error)
      );
  });

  // 사이드패널 – 키워드 관광정보 검색
  document
    .getElementById("keywordSearchButton")
    .addEventListener("click", () => {
      const keyword = document.getElementById("keywordInput").value.trim();
      if (!keyword) {
        alert("검색어를 입력하세요.");
        return;
      }
      const url = `https://fate-star-gram.glitch.me/api/search-keyword?keyword=${encodeURIComponent(
        keyword
      )}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          let items =
            data.response &&
            data.response.body &&
            data.response.body.items &&
            data.response.body.items.item;
          if (!items) {
            alert("조회된 관광정보가 없습니다.");
            return;
          }
          if (!Array.isArray(items)) {
            items = [items];
          }
          tourBoardData = items;
          tourBoardCurrentPage = 1;
          renderTourBoardPage(1);
        })
        .catch((error) => {
          console.error("Keyword search error:", error);
          alert("키워드 검색 중 오류가 발생했습니다.");
        });
    });

  // (선택 사항) 위치 기반 관광정보 조회 UI가 있을 경우
  const locBtn = document.getElementById("locationTourSearchButton");
  if (locBtn) {
    locBtn.addEventListener("click", () => {
      const lat = document.getElementById("latitude").value;
      const lng = document.getElementById("longitude").value;
      const radius = document.getElementById("radius").value;
      if (!lat || !lng || !radius) {
        alert("위도, 경도, 반경을 입력해주세요.");
        return;
      }
      const url = `https://fate-star-gram.glitch.me/api/location-tour-info?mapX=${lng}&mapY=${lat}&radius=${radius}`;
      fetch(url)
        .then((res) => res.text())
        .then((data) => {
          try {
            const jsonData = JSON.parse(data);
            console.log("Location-based tour info:", jsonData);
          } catch (e) {
            console.error("Error parsing location tour info:", e);
          }
        })
        .catch((error) =>
          console.error("Error fetching location-based tour info:", error)
        );
    });
  }
}

// ---------------------- 세부지역(시군구) 동적 생성 ----------------------
// 전역에 AbortController 변수 추가
let currentDetailRegionsAbortController = null;

function populateDetailRegions(areaCode) {
  const container = document.getElementById("detail-region-container");
  // 로딩 애니메이션(또는 텍스트) 표시
  container.innerHTML = '<div class="loading">로딩중...</div>';

  // 이전 요청이 있다면 중단
  if (currentDetailRegionsAbortController) {
    currentDetailRegionsAbortController.abort();
  }
  currentDetailRegionsAbortController = new AbortController();

  fetch(
    `https://fate-star-gram.glitch.me/api/detail-region?areaCode=${areaCode}`,
    {
      signal: currentDetailRegionsAbortController.signal,
    }
  )
    .then((res) => res.json())
    .then((myJson) => {
      container.innerHTML = ""; // 로딩 애니메이션 제거
      let items = myJson.response.body.items.item;
      if (!items) {
        container.innerHTML = "해당 지역에 세부지역 정보가 없습니다.";
        return;
      }
      if (!Array.isArray(items)) items = [items];
      items.forEach((item) => {
        const btn = document.createElement("button");
        btn.className = "badge detail-region-btn";
        btn.innerText = item.name;
        btn.dataset.code = item.code;
        btn.addEventListener("click", function () {
          document
            .querySelectorAll("#detail-region-container .detail-region-btn")
            .forEach((b) => b.classList.remove("active"));
          this.classList.add("active");
          selectedSigunguCode = this.dataset.code;
        });
        container.appendChild(btn);
      });
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("이전 세부지역 요청이 취소되었습니다.");
      } else {
        console.error("Error fetching detailed region info:", error);
      }
    });
}

// ---------------------- 지역기반 관광정보 관련 ----------------------
function clearRegionTourMarkers() {
  if (regionTourMarkers.length) {
    regionTourMarkers.forEach((marker) => marker.setMap(null));
    regionTourMarkers = [];
  }
  if (regionTourInfoWindows.length) {
    regionTourInfoWindows.forEach((iw) => iw.close());
    regionTourInfoWindows = [];
  }
}

// ---------------------- 관광정보 게시판 렌더링 ----------------------
function renderTourBoardPage(page) {
  const start = (page - 1) * tourBoardItemsPerPage;
  const end = start + tourBoardItemsPerPage;
  const pageItems = tourBoardData.slice(start, end);
  const boardContainer = document.getElementById("tourBoardItems");
  boardContainer.innerHTML = "";
  pageItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "tour-board-item";
    const firstImg =
      item.firstimage && item.firstimage.trim() !== ""
        ? item.firstimage
        : defaultImageURL;
    const secondImg =
      item.firstimage2 && item.firstimage2.trim() !== ""
        ? item.firstimage2
        : "";
    div.setAttribute("data-contentid", item.contentid);
    div.setAttribute("data-contenttypeid", item.contenttypeid);
    div.setAttribute("data-firstimage", firstImg);
    div.setAttribute("data-firstimage2", secondImg);
    div.innerHTML = `
      <div class="board-item-title">${item.title}</div>
      <div class="board-item-image"><img src="${firstImg}" alt="${
      item.title
    }"></div>
      <div class="board-item-address">${item.addr1 ? item.addr1 : ""} ${
      item.addr2 ? item.addr2 : ""
    }</div>
      <div class="board-item-details">
        관광타입: ${item.contenttypeid}<br>
        생성일: ${item.createdtime}
      </div>`;
    div.addEventListener("click", () => {
      const contentId = div.getAttribute("data-contentid");
      const contentTypeId = div.getAttribute("data-contenttypeid");
      const firstImage = div.getAttribute("data-firstimage");
      const secondImage = div.getAttribute("data-firstimage2");
      showDetailPopup(contentId, contentTypeId, firstImage, secondImage);
    });
    boardContainer.appendChild(div);
  });
  renderTourBoardPagination();
}

function renderTourBoardPagination() {
  const paginationContainer = document.getElementById("tourBoardPagination");
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(tourBoardData.length / tourBoardItemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.innerText = i;
    if (i === tourBoardCurrentPage) {
      pageLink.className = "active";
    }
    pageLink.addEventListener("click", (e) => {
      e.preventDefault();
      tourBoardCurrentPage = i;
      renderTourBoardPage(i);
    });
    paginationContainer.appendChild(pageLink);
  }
}

// ---------------------- 상세정보 팝업 및 이미지 슬라이더 ----------------------
function showDetailPopup(contentId, contentTypeId, firstImage, secondImage) {
  renderImageSlider(firstImage, secondImage);
  fetch(
    `https://fate-star-gram.glitch.me/api/detail-intro?contentId=${contentId}&contentTypeId=${contentTypeId}`
  )
    .then((res) => res.text())
    .then((xmlText) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");
      const item = xmlDoc.getElementsByTagName("item")[0];
      if (!item) {
        alert("상세 정보를 불러오지 못했습니다.");
        return;
      }
      let detailObj = {};
      for (let i = 0; i < item.children.length; i++) {
        const child = item.children[i];
        detailObj[child.tagName] = child.textContent;
      }
      const fields = detailFields[contentTypeId];
      let detailsHtml = "<ul>";
      if (fields) {
        for (const key in fields) {
          if (detailObj[key] && detailObj[key].trim() !== "") {
            detailsHtml += `<li><strong>${fields[key]}</strong>: ${detailObj[key]}</li>`;
          }
        }
      } else {
        for (const key in detailObj) {
          if (detailObj[key] && detailObj[key].trim() !== "") {
            detailsHtml += `<li><strong>${key}</strong>: ${detailObj[key]}</li>`;
          }
        }
      }
      detailsHtml += "</ul>";

      // 반려동물 관광정보 조회
      fetch(
        `https://fate-star-gram.glitch.me/api/detail-pet-tour?contentId=${contentId}`
      )
        .then((res) => res.json())
        .then((petData) => {
          let petInfoHtml = "";
          try {
            let petItem = petData.response.body.items.item;
            if (Array.isArray(petItem)) {
              petItem = petItem[0];
            }
            if (
              !petItem ||
              !petItem.acmpyTypeCd ||
              petItem.acmpyTypeCd.trim() === ""
            ) {
              petInfoHtml = "<p>반려동물 동반 정보 없음.</p>";
            } else {
              const petTourFields = {
                relaAcdntRiskMtr: "반려견 보호자 서약",
                acmpyTypeCd: "동반 가능 구역",
                etcAcmpyInfo: "기타 동반 안내사항",
                acmpyPsblCpam: "동반 가능 견종",
                acmpyNeedMtr: "필수 준비물",
              };
              petInfoHtml = "<ul>";
              for (const key in petTourFields) {
                const label = petTourFields[key];
                const value =
                  petItem[key] && petItem[key].trim() !== ""
                    ? petItem[key]
                    : "정보 없음";
                petInfoHtml += `<li><strong>${label}</strong>: ${value}</li>`;
              }
              petInfoHtml += "</ul>";
            }
          } catch (e) {
            petInfoHtml = "<p>반려동물 동반 정보 없음.</p>";
          }
          detailsHtml += "<h3>반려동물 동반 정보</h3>" + petInfoHtml;
          document.getElementById("modalDetails").innerHTML = detailsHtml;
          document.getElementById("detailModal").style.display = "block";
        })
        .catch((error) => {
          console.error("반려동물 정보 호출 오류:", error);
          detailsHtml +=
            "<h3>반려동물 동반 정보</h3><p>반려동물 동반 정보 없음.</p>";
          document.getElementById("modalDetails").innerHTML = detailsHtml;
          document.getElementById("detailModal").style.display = "block";
        });
    })
    .catch((error) => {
      console.error("Error fetching detailed intro:", error);
      alert("상세 정보를 불러오는 중 오류가 발생했습니다.");
    });
}

function renderImageSlider(firstImage, secondImage) {
  const modalLeft = document.querySelector(".modal-left");
  modalLeft.innerHTML = "";
  const img1 =
    firstImage && firstImage.trim() !== "" ? firstImage : defaultImageURL;
  if (img1 && secondImage && secondImage.trim() !== "") {
    const slider = document.createElement("div");
    slider.className = "image-slider";
    const image1 = document.createElement("img");
    image1.src = img1;
    image1.className = "slide";
    const image2 = document.createElement("img");
    image2.src = secondImage;
    image2.className = "slide";
    image2.style.display = "none";
    slider.appendChild(image1);
    slider.appendChild(image2);
    const prevBtn = document.createElement("button");
    prevBtn.className = "slider-prev";
    prevBtn.innerText = "<";
    const nextBtn = document.createElement("button");
    nextBtn.className = "slider-next";
    nextBtn.innerText = ">";
    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);
    let currentSlide = 0;
    prevBtn.addEventListener("click", () => {
      const slides = slider.getElementsByClassName("slide");
      slides[currentSlide].style.display = "none";
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      slides[currentSlide].style.display = "block";
    });
    nextBtn.addEventListener("click", () => {
      const slides = slider.getElementsByClassName("slide");
      slides[currentSlide].style.display = "none";
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].style.display = "block";
    });
    modalLeft.appendChild(slider);
  } else {
    const img = document.createElement("img");
    img.src = img1;
    modalLeft.appendChild(img);
  }
}

// ---------------------- 모달 닫기 이벤트 ----------------------
document.querySelector("#detailModal .close").addEventListener("click", () => {
  document.getElementById("detailModal").style.display = "none";
});
window.addEventListener("click", (event) => {
  const modal = document.getElementById("detailModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
