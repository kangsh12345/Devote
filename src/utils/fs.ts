import { format } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export interface PostData {
  fullPath: string;
  title: string;
  date: string;
  md: string;
}

export interface TreeProps {
  path: string;
  name: string;
  type: 'file' | 'folder';
  children: TreeProps[];
}

const rootDirectory = path.join(process.cwd(), 'public/assets/blog');

export const createDirectory = ({
  dirName,
  type,
}: {
  dirName: string;
  type: string;
}) => {
  const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]|\s\s+/gi;
  const inputDirName = dirName.substring(dirName.lastIndexOf('/') + 1);

  if (regex.test(inputDirName) || inputDirName.length > 24) {
    return 'valid false';
  }

  const isExists = fs.existsSync(`${rootDirectory}/${dirName}`);

  if (!isExists) {
    if (type === 'file') {
      createPost({
        fullPath: dirName,
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
        path: destPath.replace(`${rootDirectory}/`, ''),
        name: file.name,
        type: 'file',
        children: [],
      };
    }
    stack.push(tempStack);
    stack.sort((a, b) => {
      return (a.type === 'file' ? 1 : -1) - (b.type === 'file' ? 1 : -1);
    });
  });
  return stack;
};

export const findDirectory = (path: string) => {
  const stack: TreeProps[] = [];

  fs.readdirSync(path, { withFileTypes: true }).forEach(file => {
    const destPath = `${path}/${file.name}`;

    stack.push({
      path: destPath.replace(`${rootDirectory}/`, ''),
      name: file.name,
      type: file.isDirectory() ? 'folder' : 'file',
      children: [],
    });
    stack.sort((a, b) => {
      return (a.type === 'file' ? 1 : -1) - (b.type === 'file' ? 1 : -1);
    });
  });

  return stack;
};

export const findFile = async (path: string) => {
  const fileContents = fs.readFileSync(path, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    path,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
};

export const rootDirectoryCheck = (dirName: string) => {
  const isExists = fs.existsSync(`${rootDirectory}/${dirName}`);

  if (isExists) {
    return false;
  }
  return true;
};

export async function createPost({ fullPath, title, md, date }: PostData) {
  // const fullPath = path.join(rootDirectory, `${title}.md`);
  // TODO: 여기 생성이 안됨
  const lastSlashIndex = fullPath.lastIndexOf('/');
  const filePath = fullPath.substring(0, lastSlashIndex + 1);
  const fileName = fullPath.substring(lastSlashIndex);

  const data = `---\ntitle: '${title}'\ndate: '${date}'\n---\n${md}`;

  if (fileName.replace('/', '') === title) {
    fs.writeFileSync(`${rootDirectory}/${fullPath}.md`, data);
    console.log(`${fileName} Post Create`);
  } else {
    fs.writeFileSync(`${rootDirectory}/${fullPath}.md`, data);
    fs.rename(fullPath, filePath + title, function (err) {
      if (err) throw err;
      console.log(`${fileName} => ${title} Post Renamed`);
    });
  }
}

export async function removeFile(fullPath: string) {
  const isExists = fs.existsSync(fullPath);

  if (!isExists) {
    return false;
  }

  fs.unlink(fullPath, error => {
    if (error) {
      console.error('파일 삭제 중 오류 발생:', error);
      return;
    }
    console.log(`${fullPath} 파일이 삭제되었습니다.`);
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
