# Mongo Market

<div align=center>

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=plastic&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=plastic&logo=mysql&logoColor=white)

[![Test Status](https://github.com/wanted-pre-be5-TeamH/mongo-market/actions/workflows/push_cov_report.yml/badge.svg)](https://github.com/wanted-pre-be5-TeamH/mongo-market/actions/workflows/push_cov_report.yml)
[![Test Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/rojiwon0325/e9d685dac7c70dfad1305ce9d8174a29/raw/coverage_mongo_market.json)](https://wanted-pre-be5-TeamH.github.io/mongo-market)

</div>

## 요구사항 분석

- 회원가입/로그인 기능을 제공한다.
- 판매자 신청, 생성하고자 하는 가게 정보 포함한다.
- 판매자는 가게에 상품을 추가/수정/삭제할 수 있다.
- 상품은 조회/검색 될 수 있다.
  - store 기준 상품 목록 검색
  - 상품명 기준 상품 목록 검색
  - 카테고리 / 국가 등의 분류 기준에 따른 검색
  - 최신순 / 주문 마감일 순으로 정렬
  - 상품 id 기준 상세 조회

## 설계도

- 회원:user
  - 사용자 권한은 계층형이 구조 x
- 가게: store
  - 일반 사용자: Normal

![store](https://user-images.githubusercontent.com/68629004/200233945-973416a6-6067-49e2-abb6-1f9fff50e259.png)

- 상품: product

![product](https://user-images.githubusercontent.com/68629004/200234561-9eed0803-bd3f-46c9-8442-45c7d28b55c7.png)

## API 문서

- [View in the `Swagger Editor`](https://editor.swagger.io/?url=https://raw.githubusercontent.com/wanted-pre-be5-TeamH/mongo-market/main/doc/swagger.json)

## 진행상황
