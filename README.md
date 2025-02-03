# **{Project Name}**

<a href="{배너링크}" target="_blank">
<img src="{배너 이미지 링크}" alt="배너" width="100%"/>
</a>

<br/>

---

## **0. Getting Started (시작하기)**  
프로젝트를 실행하기 위한 기본 명령어입니다.

```bash
$ npm start
```

[서비스 링크](https://example.com)  

---

## **1. Project Overview (프로젝트 개요)**  
- **프로젝트 이름:** {프로젝트 이름}  
- **프로젝트 설명:** {프로젝트에 대한 설명}

---

## **2. Team Members (팀원 및 팀 소개)**  
| 이름         | 역할         | GitHub 링크                                  |
|--------------|--------------|---------------------------------------------|
| 여채현       | 팀장 (PL)    | [GitHub](https://github.com/{githubID1})    |
| 송창욱       | 프론트엔드   | [GitHub](https://github.com/{githubID2})    |
| 은나현       | 프론트엔드   | [GitHub](https://github.com/{githubID3})    |
| 이태훈       | 백엔드       | [GitHub](https://github.com/{githubID4})    |
| 장정명       | 프론트엔드   | [GitHub](https://github.com/{githubID5})    |

---

## **3. Key Features (주요 기능)**  
- **{기능1}**: {기능 설명}
- **{기능2}**: {기능 설명}
- **{기능3}**: {기능 설명}

---

## **4. Tasks & Responsibilities (작업 및 역할 분담)**  
| 팀원        | 역할                    | 담당 작업                          |
|-------------|--------------------------|-------------------------------------|
| 여채현      | 팀장 (PL)                | <ul><li>{프로젝트 계획 및 관리}</li><li>{커뮤니케이션}</li></ul> |
| 송창욱      | 프론트엔드               | <ul><li>{메인 페이지 개발}</li><li>{동아리 페이지 개발}</li></ul> |
| 은나현      | 프론트엔드               | <ul><li>{홈 페이지 개발}</li><li>{로그인 기능 개발}</li></ul> |
| 이태훈      | 백엔드                   | <ul><li>{서버 API 개발}</li><li>{DB 설계}</li></ul> |
| 장정명      | 프론트엔드               | <ul><li>{회원가입 페이지 개발}</li><li>{프로필 페이지 개발}</li></ul> |

---

## **5. Technology Stack (기술 스택)**  
### **5.1 Language**  
| 이름           | 아이콘                          |
|----------------|----------------------------------|
| HTML5          | <img src="{이미지 링크}" width="100"> |  
| CSS3           | <img src="{이미지 링크}" width="100"> |  
| Javascript     | <img src="{이미지 링크}" width="100"> |  

### **5.2 Frontend**  
| 기술명           | 버전           |
|----------------|----------------|
| React          | {버전}          |
| StyledComponents | {버전}        |
| MaterialUI     | {버전}          |

### **5.3 Backend**  
| 기술명           | 버전           |
|----------------|----------------|
| Firebase       | {버전}          |

### **5.4 Cooperation (협업 도구)**  
| 이름           | 아이콘                          |
|----------------|----------------------------------|
| Git            | <img src="{이미지 링크}" width="100"> |  
| Git Kraken     | <img src="{이미지 링크}" width="100"> |  
| Notion         | <img src="{이미지 링크}" width="100"> |

---

## **6. Project Structure (프로젝트 구조)**  
```plaintext
project/
├── public/
│   ├── index.html           # HTML 템플릿 파일
│   └── favicon.ico          # 아이콘 파일
├── src/
│   ├── assets/              # 이미지, 폰트 등 정적 파일
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── hooks/               # 커스텀 훅 모음
│   ├── pages/               # 각 페이지별 컴포넌트
│   ├── App.js               # 메인 애플리케이션 컴포넌트
│   └── index.js             # 엔트리 포인트 파일
├── .gitignore               # Git 무시 파일 목록
└── README.md                # 프로젝트 개요 및 사용법
```

---

## **7. Development Workflow (개발 워크플로우)**  
### **브랜치 전략 (Branch Strategy)**  
Git Flow를 기반으로 다음과 같은 브랜치를 사용합니다.
- **Main Branch:** 배포 가능한 상태의 코드를 유지합니다.  
- **Feature Branch:** 기능 개발을 위한 각 팀원의 브랜치입니다.

---

## **8. Coding Convention (코딩 컨벤션)**  
### **문장 종료**  
```
// 세미콜론(;)
console.log("Hello World!");
```

### **명명 규칙**  
- **상수:** 영문 대문자 + 스네이크 케이스  
  ```javascript
  const MAX_VALUE;
  ```
- **변수 및 함수:** 카멜 케이스  
  ```javascript
  const isLoading = false;
  const onClick = () => {};
  ```

### **블록 구문**  
```javascript
// 한 줄짜리 블록일 경우라도 {}를 생략하지 않는다.
if (true) {
  return 'hello';
}
```

### **함수**  
```javascript
// 함수 표현식 사용
const fnName = () => {};
```

### **태그 네이밍**  
```jsx
<Container>
  <ContentArea>
    <Content>...</Content>
  </ContentArea>
</Container>
```

### **폴더 및 파일 네이밍**  
- 폴더: 카멜 케이스, 컴포넌트 폴더는 파스칼 케이스 사용  
- 파일: 컴포넌트는 `.jsx`, 그 외 `.js`  

---

## **9. Commit Convention (커밋 컨벤션)**  
### **기본 구조**  
```
type: subject

body
```

### **Type 종류**  
- **feat:** 새로운 기능 추가  
- **fix:** 버그 수정  
- **docs:** 문서 수정  
- **style:** 코드 포맷팅  

### **커밋 이모지 예시**  
- 📝 코드 작성  
- 🔥 코드 제거  
- 📰 새 파일 생성  

---

## **10. Convention Execution Results (컨벤션 수행 결과)**  
<img width="100%" alt="코드 컨벤션" src="{컨벤션 결과 이미지 링크}">
<img width="100%" alt="깃플로우" src="{깃플로우 결과 이미지 링크}">  
