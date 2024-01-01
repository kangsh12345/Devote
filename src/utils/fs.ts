import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';

export interface PostData {
  id: string;
  contentHtml?: string;
  title: string;
  date: string;
  mdxSource?: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
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
      fs.writeFileSync(`${rootDirectory}/${dirName}`, '');
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

export const rootDirectoryCheck = (dirName: string) => {
  const isExists = fs.existsSync(`${rootDirectory}/${dirName}`);

  if (isExists) {
    return false;
  }
  return true;
};

export async function createPost({ id, contentHtml, title, date }: PostData) {
  const fullPath = path.join(rootDirectory, `${id}.md`);

  const data = `---
  title: '${title}'
  date: '${date}'
  ---
  ${contentHtml}
  `;

  fs.writeFileSync(fullPath, data);
}

export async function removeFile(fullPath: string) {
  const isExists = fs.existsSync(`${fullPath}`);

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
