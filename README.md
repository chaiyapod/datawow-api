
## Description

## Installation

```bash
yarn
```

## Running the app

```bash
# development
yarn dev

```

## Test

```bash
# unit tests
$ yarn test
```

## Application architecture

### APP
Application server จะอยู่ใน Folder app
โดยแบ่งเป็น module ต่างๆ ตาม responsibility ของแต่ละ module
Auth - ทำหน้าที่เกี่ยวกับ Authenticaiton ต่างๆ
Database - จัดการ Datasource
Post - Module ที่จัดการเกี่ยว business post
๊User - Module จัดการเกี่ยวกับ post

แต่ละ module จะประกอบไปด้วย
__mock__ - สำหรับสร้าง factory mock data
entities - เก็บ entities ของ domain นั้นๆ

controller - map req/res/transform
service - business logic
repository - ติดต่อกับ database
*.spec ไฟล์เทส (มีแค่ service เพราะเป็นแค่ unit test)

แต่ละ module จะทำหน้าที่แค่ตาม domain ของตัวเองเท่านั้น ถ้าต้องการเข้าถึง db ของ domain อื่นต้องเรียกผ่าน contact point หรือ service ข้าม domain


### Lib or dependency
folder constants เอาไว้เก็บ constant ต่างๆ
folder shared เก็บ function/lib/... ต่างๆที่ใช้ร่วมกัน ใช้ข้าม domain จะไม่มีของที่เป็น business อยู่ในนี้

## Feature dependency
- ทำ Event hook ร่วมกับ Cls เพื่อทำ audit log ใน db เปรียบเหมือนทำ context โดยไม่ต้องส่ง context ต่อกันเรื่อยๆ
- สร้าง base response interface มา เพื่อจัดการกับ response pattern ได้ง่าย เป็น centerilze
- สร้าง decorator user มาเพื่อดึง property user จาก req 

## Extra lib
- typeORM - ใช้เป็น orm ในการติดต่อกับ db
- class-validator ใช้ validate request
- class-transformer ใช้ omit data ออกจาก runtime ตอนจังหวะ response
- 