---
name: '강승헌'
title: '디자인 토큰 Transformer'
date: '2024-05-05 20:49:42'
---
![image.png](https://firebasestorage.googleapis.com/v0/b/devote-2cce5.appspot.com/o/images%2Ffe835916-f8af-49f6-a7f1-e4645c933f48.png?alt=media&token=5099d7d9-c2a8-41fc-800b-79740167788d)

"GPT민수야 고맙다"
***
## Figma Token Transform to vanilla-extract
> vanilla-extract의 createTheme에 token 값을 넣어 테마 설정하려하는데
```javascript
// figma token
{
  color: {
    brand: {
      "value": "pink",
      "type": "color"
    }
  },
  font: {
    body: {
      "value": "comic sans ms",
      "type": "typography"
    }
  } 
}
```
```javascript
// vanilla-extract token
{
  color: {
    brand: 'pink'
  },
  font: {
    body: 'comic sans ms'
  }
}
```
위의 figma token을 vanilla-extract에 넣을 token으로 transform하려고 했으나 그에 맞는 라이브러리를 찾지 못함

그래서 figma token의 값에 type 속성은 생략시키고 value 속성은 평면화된 객체를 생성하는 라이브러리를 만들기로 했음
<br>

### vanilla-extract 토큰화 Javascript 라이브러리 생성
#### 1. GPT 부려먹기

>
GPT> 
figma의 token은 type, value 속성으로 json 파일 형태로 있는데 나는 이런 token을 input하고 type 속성은 생략하고 value 속성 값으로만된 평면화된 객체를 json 파일로 output해주는 코드를 javascript로 짜줘.

- 변환 파일 생성 성공
```javascript
#!/usr/bin/env node

const fs = require('fs');

const flattenValue = (data) => {
  if (typeof data === 'object' && data !== null) {
    if ('value' in data) {
      data = data.value;
    }
    for (const key in data) {
      data[key] = flattenValue(data[key]);
    }
  }
  return data;
};

const removeTypeFromArray = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => removeTypeFromArray(item));
  } else if (typeof data === 'object' && data !== null) {
    delete data.type;
    for (const key in data) {
      data[key] = removeTypeFromArray(data[key]);
    }
  }
  return data;
};

if (process.argv.length !== 4) {
  console.error('Usage: npx figma-token-format-vanilla-extract input.json output.json');
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading the input file: ${err.message}`);
    process.exit(1);
  }

  try {
    const tokens_data = JSON.parse(data);
    const flattened_data = flattenValue(tokens_data);
    const transformed_data = removeTypeFromArray(flattened_data);
    const formatted_data = JSON.stringify(transformed_data, null, 2);

    fs.writeFile(outputFile, formatted_data, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing the output file: ${err.message}`);
        process.exit(1);
      }

      console.log("Transformation completed. The data has been saved in", outputFile);
    });
  } catch (err) {
    console.error(`Error parsing the input JSON: ${err.message}`);
    process.exit(1);
  }
});
```

<br>

#### 2. npm에 package publish
[figma-token-format-vanilla-extract](https://www.npmjs.com/package/figma-token-format-vanilla-extract)


>
**다운로드**
yarn add -D figma-token-format-vanilla-extract

>
**사용**
npx figma-token-format-vanilla-extract input.json output.json

<br>

#### 3. github action을 통한 자동화
tokens.json이 root 디렉토리에 있으면 vanilla-extract-tokens.json으로 변경되어 자동 commit 되도록 설정
```javascript
name: Create PR from design to main

# design 브랜치의 tokens.json 파일에 대한 push 감지
on:
  push:
    branches:
      - design
    paths:
      - 'tokens.json'
      
jobs:
  createPullRequest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      # 디자인 파일 변환 후 생성된 파일도 push해서 main 브랜치로 병합하는 PR을 생성
      - name: Run Token Transformer
        run: |
            npx figma-token-format-vanilla-extract tokens.json vanilla-extract-tokens.json
            
            git config --global user.name "github 계정 이름" 
            git config --global user.email "github 계정 이메일"
            git add .
            git commit -m '피그마 디자인 파일 변환'
            git push
        env: 
            GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
      - name: Create Pull Request
        run: gh pr create -B main -H design --title '💄 디자인 토큰 업데이트' --body '디자인 토큰이 업데이트 후 변환작업을 수행했습니다.'
        env:
            GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
```

<br>

***

## 참고 링크
https://vanilla-extract.style/documentation/api/create-theme/








