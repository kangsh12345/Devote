import { format } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
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
  const inputDirName = dirName.substring(dirName.lastIndexOf('/') + 1);

  if (regex.test(inputDirName) || inputDirName.length > 24) {
    return 'valid false';
  }

  const isExists = fs.existsSync(
    `${rootDirectory}/${dirName}${type === 'file' && '.md'}`,
  );

  console.log(`isExist: ${isExists}`);

  if (!isExists) {
    if (type === 'file') {
      createPost({
        fullPath: dirName,
        name,
        title: inputDirName,
        md: '',
        date: format(new Date(), 'yyyy-MM-dd'),
      });
    } else {
      fs.mkdirSync(`${rootDirectory}/${dirName}`, { recursive: true });
    }

    return 'create success';
  }

  return 'exist';
};

export const findAllDirectory = (path: string) => {
  const stack: TreeProps[] = [];

  let tempStack: TreeProps;

  try {
    fs.readdirSync(path, { withFileTypes: true }).forEach(file => {
      const destPath = `${path}/${file.name}`;

      if (file.isDirectory()) {
        tempStack = {
          path: destPath.replace(`${rootDirectory}/`, ''),
          name: file.name,
          type: 'folder',
          children: findAllDirectory(destPath),
        };
      } else {
        tempStack = {
          path: destPath.replace(
            new RegExp(`${rootDirectory}/|\\.md`, 'g'),
            '',
          ),
          name: file.name.replace('.md', ''),
          type: 'file',
          children: [],
        };
      }
      stack.push(tempStack);
      stack.sort((a, b) => {
        return (a.type === 'file' ? 1 : -1) - (b.type === 'file' ? 1 : -1);
      });
    });
  } catch (error) {
    console.error(error);
  }

  return stack;
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

export const findDirectory = (
  fullPath: string,
  path: string,
  fileInfo: FileInfoProps[],
) => {
  const stack: DirectoryTreeProps[] = [];

  fs.readdirSync(fullPath, { withFileTypes: true }).forEach(file => {
    const destPath = `${fullPath}/${file.name}`;

    const info = extractInfoByPath(
      fileInfo,
      `${path}/${file.name}`.replaceAll('.md', ''),
    );

    const { thumbnail, subTitle, name, date } = info || {};

    console.log(`findDirectory: ${JSON.stringify(info)}`);

    stack.push({
      path: destPath.replace(`${rootDirectory}/`, ''),
      name: file.name,
      type: file.isDirectory() ? 'folder' : 'file',
      thumbnail,
      subTitle,
      userName: name,
      date,
    });

    const introIndex = stack.findIndex(
      item => item.name === '자기소개.md' && item.type === 'file',
    );

    if (introIndex > -1) {
      const introFile = stack.splice(introIndex, 1)[0];
      stack.unshift(introFile);
    }

    stack.sort((a, b) => {
      return (a.type === 'file' ? 1 : -1) - (b.type === 'file' ? 1 : -1);
    });
  });

  return stack;
};

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
  const lastSlashIndex = fullPath.lastIndexOf('/');
  const filePath = fullPath.substring(0, lastSlashIndex + 1);
  const fileName = fullPath.substring(lastSlashIndex);

  const data = `---\nname: '${name}'\ntitle: '${title}'\ndate: '${date}'\n---\n${md}`;

  if (fileName.replace('/', '') === title) {
    fs.writeFileSync(`${rootDirectory}/${fullPath}.md`, data);
    console.log(`${fileName} Post Create`);
  } else {
    fs.writeFileSync(`${rootDirectory}/${fullPath}.md`, data);
    fs.rename(
      `${rootDirectory}/${fullPath}.md`,
      `${rootDirectory}/${filePath + title}.md`,
      function (err) {
        if (err) throw err;
        console.log(`${fileName} => ${title} Post Renamed`);
      },
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

export async function existPost(fullPath: string) {
  const isExists = fs.existsSync(fullPath);

  console.log(fullPath);

  if (!isExists) {
    return 'not exist';
  } else {
    return 'exist';
  }
}
