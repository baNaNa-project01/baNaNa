document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  const totalSteps = 5;
  const nextBtn = document.getElementById("nextStepBtn");

  function updateStep() {
      // 모든 스텝 비활성화
      document.querySelectorAll(".step-container").forEach((el) => el.classList.remove("active"));
      document.querySelectorAll(".step-form").forEach((el) => el.classList.remove("active"));

      // 현재 스텝 활성화
      document.querySelector(`.step-container:nth-child(${(currentStep - 1) * 2 + 1})`).classList.add("active");
      document.querySelector(`.step-form[data-step="${currentStep}"]`).classList.add("active");

      // 현재 스텝 뱃지 색상 업데이트
      document.querySelectorAll(".step-item").forEach((el, index) => {
          el.classList.toggle("active", index === currentStep - 1);
      });

      // 마지막 스텝이면 버튼 변경
      nextBtn.innerText = currentStep === totalSteps ? "완료" : "다음으로";
      nextBtn.classList.add("disabled"); // 기본적으로 비활성화
  }

  // "다음으로" 버튼 클릭 시
  nextBtn.addEventListener("click", function () {
      if (!nextBtn.classList.contains("disabled") && currentStep < totalSteps) {
          currentStep++;
          updateStep();
      } else if (currentStep === totalSteps) {
          alert("모든 단계를 완료했습니다!");
      }
  });

  // 입력 필드에서 변화 감지 후 '다음으로' 버튼 활성화
  function checkInputCompletion() {
      const activeStepForm = document.querySelector(`.step-form[data-step="${currentStep}"]`);
      let isCompleted = false;

      if (activeStepForm) {
          const inputs = activeStepForm.querySelectorAll("input, select, .selection-btn.active");
          inputs.forEach((input) => {
              if ((input.tagName === "INPUT" && input.value.trim() !== "") ||
                  (input.tagName === "SELECT" && input.value !== "") ||
                  input.classList.contains("active")) {
                  isCompleted = true;
              }
          });
      }

      nextBtn.classList.toggle("disabled", !isCompleted);
  }

  // 버튼 클릭 시 선택 유지 + '다음으로' 활성화
  function handleButtonClick(event) {
      // 선택된 버튼이 속한 그룹 내의 다른 버튼 비활성화 (단일 선택)
      const buttonGroup = event.target.parentNode.querySelectorAll(".selection-btn");
      buttonGroup.forEach((btn) => btn.classList.remove("active"));

      event.target.classList.add("active");
      checkInputCompletion();
  }

  // 다중 선택 가능한 버튼 (예: 지역 선택)
  document.querySelectorAll(".selection-btn").forEach((button) => {
      button.addEventListener("click", function () {
          this.classList.toggle("active");
          checkInputCompletion();
      });
  });

  // 예산 입력: 숫자만 허용 + 유효성 검사 추가
  const budgetInput = document.querySelector(".budget-input");

  if (budgetInput) { // budgetInput 요소가 존재할 경우에만 실행
      budgetInput.addEventListener("input", function () {
          const value = this.value.replace(/[^0-9]/g, ""); // 숫자만 허용
          if (this.value !== value) {
              this.classList.add("is-invalid"); // 빨간 테두리
              this.nextElementSibling.nextElementSibling.style.display = "block"; // 경고 문구 보이기
          } else {
              this.classList.remove("is-invalid"); // 정상일 때 원래대로
              this.nextElementSibling.nextElementSibling.style.display = "none"; // 경고 문구 숨기기
          }
          this.value = value; // 숫자만 유지
          checkInputCompletion();
      });
  }

  // 입력 필드에서 변화 감지
  document.querySelectorAll(".step-form input, .step-form select").forEach((input) => {
      input.addEventListener("input", checkInputCompletion);
  });

  updateStep(); // 첫 번째 스텝 활성화
});
