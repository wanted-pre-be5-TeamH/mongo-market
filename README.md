# Mongo Market

<div align=center>

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=plastic&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=plastic&logo=mysql&logoColor=white)

[![Test Status](https://github.com/wanted-pre-be5-TeamH/mongo-market/actions/workflows/push_cov_report.yml/badge.svg)](https://github.com/wanted-pre-be5-TeamH/mongo-market/actions/workflows/push_cov_report.yml)
[![Test Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/rojiwon0325/e9d685dac7c70dfad1305ce9d8174a29/raw/coverage_mongo_market.json)](https://wanted-pre-be5-TeamH.github.io/mongo-market)

</div>

## π© μκ΅¬μ¬ν­ λΆμ

- νμκ°μ/λ‘κ·ΈμΈ κΈ°λ₯μ μ κ³΅νλ€.
- νλ§€μ μ μ²­, μμ±νκ³ μ νλ κ°κ² μ λ³΄ ν¬ν¨νλ€.
- νλ§€μλ κ°κ²μ μνμ μΆκ°/μμ /μ­μ ν  μ μλ€.
- μνμ μ‘°ν/κ²μ λ  μ μλ€.
  - store κΈ°μ€ μν λͺ©λ‘ κ²μ
  - μνλͺ κΈ°μ€ μν λͺ©λ‘ κ²μ
  - μΉ΄νκ³ λ¦¬ / κ΅­κ° λ±μ λΆλ₯ κΈ°μ€μ λ°λ₯Έ κ²μ
  - μ΅μ μ / μ£Όλ¬Έ λ§κ°μΌ μμΌλ‘ μ λ ¬
  - μν id κΈ°μ€ μμΈ μ‘°ν

## π© μ€κ³λ

<details>
<summary>κ°κ²(store)</summary>

- νλ§€μλ μμ μ μ²­ν  μ μμ

![store](https://user-images.githubusercontent.com/68629004/200233945-973416a6-6067-49e2-abb6-1f9fff50e259.png)

</details>
<details>
<summary>μν(product)</summary>

![product](https://user-images.githubusercontent.com/68629004/200234561-9eed0803-bd3f-46c9-8442-45c7d28b55c7.png)

</details>

## API λ¬Έμ

- [View in the `Swagger Editor`](https://editor.swagger.io/?url=https://raw.githubusercontent.com/wanted-pre-be5-TeamH/mongo-market/main/doc/swagger.json)

## π μ§νμν©

<details>
<summary>νμ</summary>

- [x] νμκ°μ/νν΄
- [x] λ‘κ·ΈμΈ/λ‘κ·Έμμ
- [x] λ΄μ λ³΄ μ‘°ν

</details>
<details>
<summary>κ°κ²</summary>

- [x] κ°κ² μμ 
- [x] λ΄ κ°κ² μ‘°ν

</details>
<details>
<summary>μν</summary>

- [x] μν CUD
- [x] μν μμΈ μ‘°ν
- [x] μν κ²μ

</details>

## κ°μ ν  μ 

- μν μ­μ μ μ€μ  λ°μ΄ν° μ μ§ -> μ­μ  νλκ·Έ μμ±
- μ£Όλ¬Έ κ°λ₯ μν, νμ¬ μλ λ±μ λ©ν λ°μ΄ν° μΆκ°
- μΉ΄νκ³ λ¦¬ κ΅­κ° λ±μ λ³λμ μ»¬λμμΌλ‘ κ΅¬ν
  - μΉ΄νκ³ λ¦¬ documentλ§λ€ ν΄λΉνλ μν μ λ³΄λ€μ μ μ₯
- λ°μ΄ν° λκΈ°ν λ°©λ² κ³ λ €
  - cqrs/event-busλ₯Ό ν΅ν λ°μ΄ν° λκΈ°ν λ°©μ μ μ©
- test code μΆκ°
