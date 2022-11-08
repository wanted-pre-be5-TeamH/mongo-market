# Mongo Market

<div align=center>

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=plastic&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=plastic&logo=mysql&logoColor=white)

[![Test Status](https://github.com/wanted-pre-be5-TeamH/mongo-market/actions/workflows/push_cov_report.yml/badge.svg)](https://github.com/wanted-pre-be5-TeamH/mongo-market/actions/workflows/push_cov_report.yml)
[![Test Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/rojiwon0325/e9d685dac7c70dfad1305ce9d8174a29/raw/coverage_mongo_market.json)](https://wanted-pre-be5-TeamH.github.io/mongo-market)

</div>

## 🚩 요구사항 분석

- 회원가입/로그인 기능을 제공한다.
- 판매자 신청, 생성하고자 하는 가게 정보 포함한다.
- 판매자는 가게에 상품을 추가/수정/삭제할 수 있다.
- 상품은 조회/검색 될 수 있다.
  - store 기준 상품 목록 검색
  - 상품명 기준 상품 목록 검색
  - 카테고리 / 국가 등의 분류 기준에 따른 검색
  - 최신순 / 주문 마감일 순으로 정렬
  - 상품 id 기준 상세 조회

## 🚩 설계도

<details>
<summary>가게(store)</summary>

- 판매자는 입점신청할 수 없음

![store](https://user-images.githubusercontent.com/68629004/200233945-973416a6-6067-49e2-abb6-1f9fff50e259.png)

</details>
<details>
<summary>상품(product)</summary>

![product](https://user-images.githubusercontent.com/68629004/200234561-9eed0803-bd3f-46c9-8442-45c7d28b55c7.png)

</details>

## API 문서

- [View in the `Swagger Editor`](https://editor.swagger.io/?url=https://raw.githubusercontent.com/wanted-pre-be5-TeamH/mongo-market/main/doc/swagger.json)

## 📌 진행상황

<details>
<summary>회원</summary>

- [x] 회원가입/탈퇴
- [x] 로그인/로그아웃
- [x] 내정보 조회

</details>
<details>
<summary>가게</summary>

- [x] 가게 입점
- [x] 내 가게 조회

</details>
<details>
<summary>상품</summary>

- [ ] 상품 CUD
- [ ] 상품 상세 조회
- [ ] 상품 검색

</details>
