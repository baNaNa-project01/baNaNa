document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 1;
    const totalSteps = 6;

    function updateStep() {
        // 모든 스텝 비활성화
        document.querySelectorAll(".step-container").forEach((el) => el.classList.remove("active"));
        
        // 모든 스텝 숨기기
        for(let i = 1; i <= totalSteps; i++) {
            document.getElementById(`step${i}`).classList.add("hidden");
        }

        // 현재 스텝 보이기
        document.getElementById(`step${currentStep}`).classList.remove("hidden");

        // 프로그레스바 업데이트
        document.querySelectorAll(".step-item").forEach((el, index) => {
            const stepContainer = el.closest('.step-container');
            if (index < currentStep) {
                el.classList.add("active");
                stepContainer.classList.add("active");
            } else {
                el.classList.remove("active");
                stepContainer.classList.remove("active");
            }
        });

        // 각 스텝별 다음 버튼 상태 확인
        const nextButton = document.getElementById(`nextStep${currentStep}`);
        if (nextButton) {
            nextButton.disabled = true; // 기본적으로 비활성화

            // 각 스텝별 선택 상태에 따라 다음 버튼 활성화
            switch(currentStep) {
                case 1:
                    nextButton.disabled = !selectedLocation;
                    break;
                case 2:
                    nextButton.disabled = selectedCompanions.length === 0;
                    break;
                case 3:
                    nextButton.disabled = !selectedDuration;
                    break;
                case 4:
                    nextButton.disabled = selectedStyle.length === 0;
                    break;
                case 5:
                    nextButton.disabled = !selectedSchedule;
                    break;
            }
        }
    }

    // 버튼 클릭 이벤트 처리
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const stepNumber = this.closest('[id^="step"]').id.slice(4);
            checkStepCompletion(parseInt(stepNumber));
        });
    });

    // 스텝 완료 상태 체크
    function checkStepCompletion(stepNumber) {
        const nextButton = document.getElementById(`nextStep${stepNumber}`);
        if (!nextButton) return;

        switch(stepNumber) {
            case 1:
                nextButton.disabled = !selectedLocation;
                break;
            case 2:
                nextButton.disabled = selectedCompanions.length === 0;
                break;
            case 3:
                nextButton.disabled = !selectedDuration;
                break;
            case 4:
                nextButton.disabled = selectedStyle.length === 0;
                break;
            case 5:
                nextButton.disabled = !selectedSchedule;
                break;
        }
    }

    // 초기 스텝 설정
    updateStep();
});

