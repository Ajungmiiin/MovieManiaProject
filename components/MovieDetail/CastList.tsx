import { getCastList } from '@/utils/api/http';
import Image from 'next/image';
import React from 'react';

const CastList = async ({ id }: { id: string }) => {
  const castList = await getCastList(id);
  return (
    <ul className="flex gap-4 overflow-scroll scrollbar-hide">
      {castList.map((cast) => (
        <li key={cast!.id}>
          <div className="relative w-[110px] h-[150px]">
            <Image
              src={`https://image.tmdb.org/t/p/w154/${cast!.profile_path}`}
              alt={cast!.name}
              fill
              sizes="(max-width:360px) 40vw, (max-width : 640px) 80vw, 220px"
            />
          </div>
          <div className="pt-1">
            <h4 className="max-w-[110px] text-xl text-nowrap overflow-ellipsis overflow-hidden">
              {cast!.name}
            </h4>
            <p className="text-gray-300">
              {cast?.known_for_department === 'Directing' ? '감독' : '주연'}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CastList;
