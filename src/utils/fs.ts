import { format } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import * as fsP from 'node:fs/promises';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { promisify } from 'util';

export interface PostData {
  fullPath: string;
  title: string;
  name: string;
  date: string;
  md: string;
}

export interface TreeProps {
  path: string;
  name: string;
  type: 'file' | 'folder';
  createdAt: Date;
  children: TreeProps[];
}

export interface DirectoryTreeProps {
  path: string;
  name: string;
  type: 'file' | 'folder';
  thumbnail: string;
  userName: string;
  subTitle: string;
  date: string;
}

interface ExtractedInfo {
  name: string;
  thumbnail: string;
  subTitle: string;
  date: string;
}

export interface FileInfoProps {
  id: number;
  name: string;
  userId: string;
  path: string;
  thumbnail: string;
  title: string;
  subTitle: string;
  date: string;
}

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

export const createDirectory = ({
  dirName,
  name,
  type,
}: {
  dirName: string;
  name: string;
  type: string;
}) => {
  const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]|\s\s+/gi;
  const inputDirName = path.basename(dirName);

  if (regex.test(inputDirName) || inputDirName.length > 24) {
    return 'valid false';
  }

  const fullPath = path.join(
    rootDirectory,
    dirName + (type === 'file' ? '.md' : ''),
  );
  const exists = fs.existsSync(fullPath);

  if (!exists) {
    if (type === 'file') {
      createPost({
        fullPath,
        name,
        title: inputDirName,
        md: '',
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      });
    } else {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    return 'create success';
  }

  return 'already exists';
};

function extractInfoByPath(
  array: FileInfoProps[],
  pathToMatch: string,
): ExtractedInfo {
  const item = array.find(item => item.path === pathToMatch);
  return item
    ? {
        name: item.name ?? '',
        thumbnail: item.thumbnail ?? '',
        subTitle: item.subTitle ?? '',
        date: item.date ?? '',
      }
    : { name: '', thumbnail: '', subTitle: '', date: '' };
}

async function processEntry(
  dirPath: string,
  dirent: fs.Dirent,
): Promise<TreeProps> {
  const fullPath = path.join(dirPath, dirent.name);
  const stats = await fsP.stat(fullPath);
  return {
    path: fullPath.replace(`${rootDirectory}/`, '').replace(/\.md$/, ''),
    name: dirent.name.replace('.md', ''),
    type: dirent.isDirectory() ? 'folder' : 'file',
    createdAt: stats.birthtime,
    children: dirent.isDirectory() ? await findAllDirectory(fullPath) : [],
  };
}

function sortDirectoryEntries(entries: TreeProps[]): void {
  entries.sort((a, b) => {
    // 폴더 우선 정렬
    if (a.type !== b.type) {
      return a.type === 'folder' ? -1 : 1;
    }

    // '자기소개.md' 파일 우선 처리
    if (a.name === '자기소개' && a.type === 'file') return -1;
    if (b.name === '자기소개' && b.type === 'file') return 1;

    // 나머지 파일들은 생성 시간 기준 정렬
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

export async function findAllDirectory(dirPath: string): Promise<TreeProps[]> {
  const stack: TreeProps[] = [];
  try {
    const dirEntries = await fsP.readdir(dirPath, { withFileTypes: true });
    for (const dirent of dirEntries) {
      const item = await processEntry(dirPath, dirent);
      stack.push(item);
    }

    sortDirectoryEntries(stack);
  } catch (error) {
    console.error(error);
  }

  return stack;
}

export async function findDirectory(
  fullPath: string,
  relativePath: string,
  fileInfo: FileInfoProps[],
): Promise<DirectoryTreeProps[]> {
  const dirEntries = await fs.promises.readdir(fullPath, {
    withFileTypes: true,
  });

  const promsies = dirEntries.map(async dirent => {
    const destPath = `${fullPath}/${dirent.name}`;
    const relPath = destPath.replace(`${rootDirectory}/`, '');

    const info = extractInfoByPath(
      fileInfo,
      `${relativePath}/${dirent.name}`.replaceAll('.md', ''),
    );

    const { thumbnail, name, subTitle, date } = info || {};

    let ddate = '';
    if (dirent.isDirectory()) {
      const stats = await fs.promises.stat(destPath);
      ddate = stats.birthtime.toISOString();
    }

    const obj: DirectoryTreeProps = {
      path: relPath,
      name: dirent.name,
      type: dirent.isDirectory() ? 'folder' : 'file',
      thumbnail: thumbnail,
      userName: name,
      subTitle: subTitle,
      date: dirent.isDirectory() ? ddate : date,
    };

    return obj;
  });

  const stack = await Promise.all(promsies);

  stack.sort((a, b) => (a.date > b.date ? -1 : 1));

  const introIndex = stack.findIndex(
    item => item.name === '자기소개.md' && item.type === 'file',
  );

  if (introIndex > -1) {
    const introFile = stack.splice(introIndex, 1)[0];
    stack.unshift(introFile);
  }

  return stack.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    return a.date.localeCompare(b.date);
  });
}

export const findFile = async (path: string) => {
  const fileContents = fs.readFileSync(path, 'utf8');

  const matterResult = matter(fileContents);

  const { data, content } = matterResult;

  // TODO: 추후 SSG로 변경할때 아래 remark 이용
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    content,
    ...(data as {
      date: string;
      title: string;
    }),
  };
};

export const rootDirectoryCheck = (dirName: string) => {
  const isExists = fs.existsSync(`${rootDirectory}/${dirName}`);

  if (isExists) {
    return false;
  }
  return true;
};

export async function createPost({
  fullPath,
  name,
  title,
  md,
  date,
}: PostData) {
  const data = `---\nname: '${name}'\ntitle: '${title}'\ndate: '${date}'\n---\n${md}`;

  try {
    fs.writeFileSync(fullPath, data);
    console.log(`${title} Post Created`);

    const fileName = path.basename(fullPath);
    if (fileName.replace('.md', '') !== title) {
      const newPath = path.join(path.dirname(fullPath), `${title}.md`);
      fs.renameSync(fullPath, newPath);
      console.log(`${fileName} renamed to ${title}.md`);
    }
  } catch (error) {
    console.error(
      `Failed to create or rename post: ${(error as unknown as Error).message}`,
    );
  }
}

export async function removeFile(fullPath: string, type: string) {
  const isExists = fs.existsSync(fullPath);

  if (!isExists) {
    return false;
  }

  if (type === 'file') {
    fs.unlink(fullPath, error => {
      if (error) {
        console.error('파일 삭제 중 오류 발생:', error);
        return;
      }
      console.log(`${fullPath} 파일이 삭제되었습니다.`);
    });
  }

  if (type === 'folder') {
    fs.rm(fullPath, { recursive: true, force: true }, error => {
      if (error) {
        console.error('폴더 삭제 중 오류 발생:', error);
        return;
      }
      console.log(`${fullPath} 파일이 삭제되었습니다.`);
    });
  }

  return true;
}

const rename = promisify(fs.rename);

export async function renameFile(fullPath: string, fullNewPath: string) {
  const isExists = fs.existsSync(fullNewPath);
  const title = fullNewPath.split('/').at(-1);

  if (isExists) {
    return false;
  }

  try {
    await rename(fullPath, fullNewPath);
  } catch (error) {
    if (error) {
      console.error('이름 변경 중 오류 발생:', error);
      return;
    }
    console.log(`${fullPath} => ${fullNewPath} 이름으로 변경되었습니다`);
  }

  if (fullPath.indexOf('.md') !== -1)
    fs.readFile(fullNewPath, 'utf-8', (err, data) => {
      if (err) {
        console.error('파일을 읽는 도중 오류가 발생 했습니다: ', err);
        return;
      }

      const updatedContent = data.replace(/(title: ')(.*?)(')/, `$1${title}$3`);

      fs.writeFile(fullNewPath, updatedContent, 'utf-8', err => {
        if (err) {
          console.error('파일을 쓰는 도중 오류가 발생했습니다:', err);
          return;
        }
        console.log('파일 제목이 성공적으로 업데이트 되었습니다.');
      });
    });

  return true;
}

export async function existPost(fullPath: string): Promise<string> {
  try {
    await fsP.access(fullPath);
    return 'exist';
  } catch (error) {
    return 'not exist';
  }
}
