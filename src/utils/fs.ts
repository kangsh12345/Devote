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

export const createDirectoryCheck = async ({
  dirName,
  type,
}: {
  dirName: string;
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
  if (fs.existsSync(fullPath)) return 'already exists';

  return 'success';
};

export const createDirectory = async ({
  dirName,
  name,
  type,
}: {
  dirName: string;
  name: string;
  type: string;
}) => {
  try {
    const inputDirName = path.basename(dirName);

    const fullPath = path.join(
      rootDirectory,
      dirName + (type === 'file' ? '.md' : ''),
    );

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
  } catch (error) {
    throw new Error('파일 생성 도중 에러가 발생했습니다.');
  }
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

function sortTreeEntries(entries: TreeProps[]): void {
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

function sortDirectoryEntries(entries: DirectoryTreeProps[]): void {
  entries.sort((a, b) => {
    // 폴더 우선 정렬
    if (a.type !== b.type) {
      return a.type === 'folder' ? -1 : 1;
    }

    // '자기소개.md' 파일 우선 처리
    if (a.name === '자기소개.md' && a.type === 'file') return -1;
    if (b.name === '자기소개.md' && b.type === 'file') return 1;

    // 나머지 파일들은 생성 시간 기준 정렬
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    return bDate.getTime() - aDate.getTime();
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

    sortTreeEntries(stack);
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

    console.log(`findDirectory ${dirent.name}: ${JSON.stringify(obj)}`);

    return obj;
  });

  const stack = await Promise.all(promsies);

  sortDirectoryEntries(stack);

  return stack;
}

export const findFile = async (filePath: string) => {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);

  // TODO: 추후 SSG로 변경할때 아래 remark 이용
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  return {
    contentHtml: processedContent.toString(),
    content: matterResult.content,
    date: matterResult.data.date,
    title: matterResult.data.title,
  };
};

export const rootDirectoryCheck = async (dirName: string) => {
  const fullPath = path.join(rootDirectory, dirName);

  try {
    await fsP.access(fullPath);
    return true;
  } catch (error) {
    return false;
  }
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
  try {
    await fsP.stat(fullPath);
  } catch (error) {
    console.error('File or directory does not exist:', error);
    throw new Error('파일이 존재하지 않아 에러가 발생했습니다.');
  }

  try {
    if (type === 'file') {
      await fsP.unlink(fullPath);
    } else if (type === 'folder') {
      await fsP.rm(fullPath, { recursive: true, force: true });
    }
    console.log(`${fullPath} has been deleted.`);
    return;
  } catch (error) {
    console.error(`Error deleting ${type}`, error);
    throw new Error('파일 삭제 도중 에러가 발생했습니다.');
  }
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
    console.log(`${fullPath} has been renamed to ${fullNewPath}`);
    return true;
  } catch (error) {
    if (error) {
      console.error('이름 변경 중 오류 발생:', error);
      return false;
    }
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

export async function getMetadataPaths(
  dir: string,
  prefix = '',
): Promise<string[]> {
  const paths: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const relPath = prefix + entry.name;
      paths.push(relPath);
      const subPaths = await getMetadataPaths(fullPath, relPath + '/');
      paths.push(...subPaths);
    }
  }

  return paths;
}
