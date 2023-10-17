'use client';

import { useSearchParams } from 'next/navigation';
import { Box } from '@/src/components/atoms/Box';

interface PageParams {
  id: string;
  slug: string[];
}

export default function PostPage({ params }: { params: PageParams }) {
  const query = useSearchParams();

  // TODO: params.slug === undefined일경우 root dictory 표시
  // 만약 query가 ?title=파일 이름으로 되어있으면 file post페이지 보여주고 아니면 folder list 페이지 보여주기
  return <Box onClick={() => console.log(query.get('id'))}>{params.slug}</Box>;
}
