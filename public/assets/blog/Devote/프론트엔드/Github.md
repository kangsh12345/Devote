---
name: '강승헌'
title: 'Github'
date: '2024-04-13 18:24:32'
---
![image.png](https://firebasestorage.googleapis.com/v0/b/devote-2cce5.appspot.com/o/images%2Fa2c9e937-7df9-4793-b5d9-6866f240dca7.png?alt=media&token=915593ec-5ccd-409c-843d-1f9d075c53ce)

### 명령어

#### Branch이용
* PR 생성
```
// feat/[기능이름]으로 브랜치 설정 (b옵션 : 브랜치가 없을 경우 생성)
> git checkout -b feat/[기능이름]

// 만든 코드 추가
> git add .

// 코드 커밋
> git commit

// 코드 푸시
> git push origin feat/[기능이름]
```

<br>

* PR 중 코드 수정
```
> git add .
> git commit
> git push origin feat/[기능이름]
```

<br>

* 수정 완료 시

```
PR에 Squash and Merge 클릭

// main에 merge 이후 main으로 브랜치 변경하여 수정된 부분 pull로 코드 가져오기
> git checkout main
> git pull
```

<br>

* 수정 완료 그 이후

 완료한 브랜치는 삭제하고 다음 기능의 새 브랜치를 생성
 
```
> git checkout -b feat/[새 브랜치]
> git branch -d feat/[이전 브랜치]
> rm -rf .git/refs/feat/[이전 브랜치]
> yarn install
```

<br>

* 수정했던 feat/[브랜치]를 재수정
```
// 이전 브랜치를 다시 당겨와 코드 수정
> git pull origin feat/[브랜치]
```

<br>

#### git 기본 commit editor 변경
```
> git config --global core.editor "vim"
```

<br>

#### 잘못 올린 파일 삭제
```
> git rm --cached -r [파일 이름]
```

<br>

#### 삭제 파일 되돌리기
```
> git log -g
> git reset --hard [commit_id]
> git commit
```

<br>

#### 미러링
```
> git clone --mirror [git repo 주소]

// 특정 브랜치만 가져오고 싶을 때
> git clone -b [브랜치명] --single-branch --mirror [git repo 주소]
> cd [repo명.git]
> git remote set-url origin [새 repo 주소]
> git push --mirror
```

<br>

#### 지우고 싶은 파일을 전체 history에서 필터링해서 재작성
```
> git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch [파일]' --prune-empty --tag-name-filter cat -- --all

// 강제 푸시
> git push origin [브랜치] --force
```

<br>

#### 잘못올린 commit 삭제
```
> sudo git rm --cached [파일명]
> sudo git reset --hard "[commit id]"
> sudo git push origin [브랜치] --force
```

***

### Github 댓글 기능 이용
https://utteranc.es/

***

### Github + Figma(디자인 툴) 연동
https://velog.io/@seo__namu/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%97%90-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0



















