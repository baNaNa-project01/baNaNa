# **{Project Name}**

<img src="https://img.freepik.com/free-psd/horizontal-banner-template-with-banana_23-2148815074.jpg" alt="배너" width="100%"/>

---
<br>

## **0. Getting Started (시작하기)**  
프로젝트를 실행하기 위한 기본 명령어입니다.

```bash
$ npm start
```

[서비스 링크](https://example.com)  

---
<br>

## **1. Project Overview (프로젝트 개요)**  
- **프로젝트 이름:** {프로젝트 이름}  
- **프로젝트 설명:** {프로젝트에 대한 설명}  
- **개발 기간:** {개발 기간}

---
<br>

## **2. Deployment Links (배포 주소)**  
- **개발 버전:** [개발 주소](http://example.com)  
- **프론트엔드 서버:** [프론트엔드 주소](http://example.com:33307)  
- **백엔드 서버:** [백엔드 주소](http://example.com:2223)  

---
<br>

## **3. Team Members (팀원 및 팀 소개)**  
| 이름         | 역할         | GitHub 링크                                  |
|--------------|--------------|---------------------------------------------|
| 여채현       | 팀장 (PL)    | [GitHub](https://github.com/1000hyehyang)    |
| 송창욱       | 프론트엔드   | [GitHub](https://github.com/songcw8)         |
| 은나현       | 프론트엔드   | [GitHub](https://github.com/nan0silver)      |
| 이태훈       | 프론트엔드   | [GitHub](https://github.com/TaeHoon96)       |
| 장정명       | 프론트엔드   | [GitHub](https://github.com/jungmyung16)     |

---
<br>

## **4. Key Features (주요 기능)**  
- **강좌 선택 및 강의 영상 시청:** Scratch와 Python 강좌를 제공하며, 각 강좌마다 약 10개의 강의 영상이 있음.  
- **강의 관련 자유로운 댓글 작성:** 강의에 대한 질문이나 피드백을 자유롭게 남길 수 있음 (Disqus 사용).  
- **이어 학습하기 기능:** 쿠키(Cookie)를 활용하여 이전에 학습했던 내용을 이어서 학습 가능.  

---
<br>

## **5. Technology Stack**  

### **5.1 Language**
| **Language**     | **Icon**                         |
|------------------|-----------------------------------|
| HTML5            | <p align="center"><img src="https://github.com/user-attachments/assets/2e122e74-a28b-4ce7-aff6-382959216d31" alt="HTML5" width="50"></p> |  
| CSS3             | <p align="center"><img src="https://github.com/user-attachments/assets/c531b03d-55a3-40bf-9195-9ff8c4688f13" alt="CSS3" width="45"></p> |  
| Javascript       | <p align="center"><img src="https://github.com/user-attachments/assets/4a7d7074-8c71-48b4-8652-7431477669d1" alt="Javascript" width="50"></p> |  

<br>

### **5.2 Frontend**
| **Technology**      | **Icon**                          | **Version**  |
|---------------------|------------------------------------|--------------|
| React               | <p align="center"><img src="https://github.com/user-attachments/assets/e3b49dbb-981b-4804-acf9-012c854a2fd2" alt="React" width="50"></p> | 18.3.1       |
| StyledComponents    | <p align="center"><img src="https://github.com/user-attachments/assets/c9b26078-5d79-40cc-b120-69d9b3882786" alt="StyledComponents" width="50"></p> | 6.1.12       |
| MaterialUI          | <p align="center"><img src="https://github.com/user-attachments/assets/75a46fa7-ebc0-4a9d-b648-c589f87c4b55" alt="MUI" width="50"></p> | 5.0.0        |
| DayJs               | <p align="center"><img src="https://github.com/user-attachments/assets/3632d7d6-8d43-4dd5-ba7a-501a2bc3a3e4" alt="DayJs" width="50"></p> | 1.11.12      |

<br>

### **5.3 Backend**
| **Technology**      | **Icon**                          | **Version**  |
|---------------------|------------------------------------|--------------|
| Firebase            | <p align="center"><img src="https://github.com/user-attachments/assets/1694e458-9bb0-4a0b-8fe6-8efc6e675fa1" alt="Firebase" width="50"></p> | 10.12.5      |

<br>

### **5.4 Cooperation**
| **Tool**      | **Icon**                          |
|---------------|------------------------------------|
| Git           | <p align="center"><img src="https://github.com/user-attachments/assets/483abc38-ed4d-487c-b43a-3963b33430e6" alt="git" width="40"></p> |
| Slack         | <p align="center"><img src="https://marketplace.topdesk.com/wp-content/uploads/2020/09/Slack_Mark_Web-416x416.png" alt="slack" width="70"></p> |
| Notion        | <p align="center"><img src="https://github.com/user-attachments/assets/34141eb9-deca-416a-a83f-ff9543cc2f9a" alt="Notion" width="50"></p> |

---
<br>

## **6. Project Structure (프로젝트 구조)**  
```plaintext
project/
├── strapi-backend : 백엔드 디렉토리
│   ├── api : DB 모델 및 API 폴더
│   ├── config : 서버 및 데이터베이스 설정
│   └── public : 강의 이미지 업로드 폴더
└── voluntain-app : 프론트엔드 디렉토리
    ├── components : 주요 UI 컴포넌트 폴더
    ├── pages : 라우트 및 페이지별 컴포넌트 폴더
    └── styles : CSS 모듈 폴더
```

---
<br>

## **7. Development Workflow (개발 워크플로우)**  
### **브랜치 전략 (Branch Strategy)**  
- **Main Branch:** 배포 가능한 코드 유지.  
- **Feature Branch:** 기능 개발용 브랜치.

---
<br>

## **8. Commit Convention (커밋 컨벤션)**  
| **커밋 유형**      | **설명**                        |
|-------------------|-----------------------------------|
| `Feat`            | 새로운 기능 추가                  |
| `Fix`             | 버그 수정                         |
| `Docs`            | 문서 수정                         |
| `Style`           | 코드 포맷팅, 스타일 변경          |
| `Refactor`        | 코드 리팩토링                     |
| `Test`            | 테스트 코드 추가                  |
| `Chore`           | 기타 작업                         |

---
<br>

## **9. Coding Convention (코딩 컨벤션)**  
- **문자열**: 쌍따옴표 사용. 동적 값이 포함되거나 여러 줄 문자열은 백틱(``` ` ```) 사용.  
- **문장 종료**: 세미콜론 필수.  
- **명명 규칙**:  
  - 변수 및 함수명은 카멜케이스.  
  - 컴포넌트 파일명은 파스칼케이스.  
  - 상수는 대문자 + 스네이크 케이스.  
- **가독성**: 한 줄에 하나의 문장 작성.  
- **주석**: 설명하려는 구문에 맞춰 들여쓰기. 필요 시 JSDoc 스타일 사용.  
- **연산자 및 콤마**: 연산자와 콤마 뒤에 공백 추가.

```javascript
const MAX_VALUE = 100;
const getUserInfo = () => {};
console.log("Hello World!");
```
