---
name: '강승헌'
title: 'Prisma와 Planet Scale'
date: '2024-04-13 18:34:05'
---
![image.png](https://firebasestorage.googleapis.com/v0/b/devote-2cce5.appspot.com/o/images%2F035e3674-204b-4188-9444-a87477c73d7e.png?alt=media&token=c4991714-4bef-43e5-80e7-763df584eb58)

Prisma: Typescript 기반 ORM(Object Relational Mapping) (DB에 직접 접근해서 소통하게 해줌)

Planet Scale: DataBase, MySQL 활용한 서버리스 데이터베이스 플랫폼

> Prisma & Planet Scale Getting Start : https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-planetscale

***

### 초기 세팅
#### 1. Prisma 설치
```
vscode) prisma extension 설치
```
```
> yarn add -D prisma
> yarn add @prisma/client
```

#### 2. Planet Scale DB Connect
```
Main branch 이동
-> connect 클릭
-> Connect with 옵션: Prisma로 설정
-> .env에 넣을 DATABASE_URL 값을 가져옴 (이후 prisma의 url에 연결)
```

#### 3. Prisma 삽입
```
> yarn prisma init
```
> schema.prisma 파일 값 변경
```
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}
>
generator client {
  provider = "prisma-client-js"
}
```

```
// @prisma/client 라이브러리에 스키마 관련 파일 생성
// PrismaClient 코드에 접근가능
> yarn prisma generate
```

<br>

***
### + 그 외
***


### Planet Scale) Production Branches Console 접근 블락
production branches(배포 브랜치)의 schema 변동은 바로 이용자에게 영향이 가기 때문에 production branches에는 console로 접근이 블락되어있음

<br>

* 접근 허용
> Settings > allow web console access to production branches 체크
![](https://velog.velcdn.com/images/kangsh12345/post/ca8d0145-84fb-4783-9567-d9dc7cb7f64e/image.png)


production branches에 schema 변동을 주기 보다는 새 Branch를 만들어줘서 테스트하고 Merge하는 형식으로 만들어주는게 좋음

```
* 다른 Branch로 테스트

  새 Branch 생성
  → schema.prisma 파일의 DATABASE_URL에 해당 Branch의 Connection strings로 변경
  → 테이블에 column 추가
```
```
* schema 바뀐 것을 production branches에 적용

  해당 branch에 create deploy request 클릭
  → PR 생성됨
  → 변경점 확인하고 Deploy Change
  → Main에 Merge됨
```

<br>

***

### Prisma로 테이블에 목업 아이템 추가
#### 설치
```
yarn add -D ts-node @types/node
```

#### 아이템 적용 코드
* 상품 카테고리 & 상품 정보 추가
```typescript
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sneakers = [
  {
    // prisma의 상품 schema에 맞게 전달해줄 정보 기입
    name: [이름],
    contents: [콘텐츠],
    category_id: 1,
    image_url: [이미지],
    price: [가격],
  },
  ...
];

const tShirt = [
  {
    // prisma의 상품 schema에 맞게 전달해줄 정보 기입
    name: [이름],
    contents: [콘텐츠],
    category_id: 1,
    image_url: [이미지],
    price: [가격],
  ...
];

const productData: Prisma.productsCreateInput[] = [
  ...sneakers,
  ...tShirt,
];

async function main() {
  const CATEGORIES = ['SNEAKERS', 'T-SHIRT'];
  CATEGORIES.forEach(async (c, i) => {
    // prisma의 카테고리 아이템 upsert
    // upsert: where의 정보와 부합하는 정보가 있으면 name을 c로 업데이트 / 없으면 name: c로 생성
    const product = await prisma.categories.upsert({
      where: {
        id: i + 1,
      },
      update: {
        name: c,
      },
      create: {
        name: c,
      },
    });
  });

  // prisma 상품 아이템 전체 Clear
  await prisma.products.deleteMany({});

  // prisma 상품 아이템에 data 추가
  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

```

#### planetscale에 아이템 적용
```
yarn prisma generate
yarn ts-node [파일]
```

<br>

***

### SQL문
#### A 테이블 조회하며 productId를 통해 products도 조회
```
SELECT * FROM A as a JOIN products as p WHERE a.prodcutId=p.id
```

#### 필요한 정보만 따로 SELECT
```
* ex. 한 유저의 카트에 담긴 상품을 가져오는 sql문
SELECT a.id, userId, quantity, amount, price, name, image_url FROM A as a JOIN products as p WHERE a.productId=p.id AND c.userId={찾을 유저 아이디};

  → prisma를 이용한 sql문
  await prisma.$queryRaw`SELECT a.id, quantity, amount, price, name, image_url, productId FROM A as a JOIN products as p ON a.prodcutId=p.id WHERE a.id=${변수};`
  
  (   prisma를 이용한 sql문은 배열 안의 오브젝트 값으로 들어온다 [{...}]   )
```


***
> Prisma: https://www.prisma.io/
>
> Prisma 명령어: https://www.prisma.io/docs/reference/api-reference/command-reference
>
> Prisma  with NextJS 예시: https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes 
>
> Planet Scale DB 제작 튜토리얼: https://planetscale.com/docs/tutorials/planetscale-quick-start-guide


***

⚠️ 현재기준(2024.04.13) planetscale Free plan가 2024 April 8 기준 중단되었습니다.
때문에 planetscale대신 supabase를 사용하고있습니다 😭