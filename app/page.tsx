import MovieRow from '@/components/MovieData/MovieRow';
import { requests } from '@/utils/api/api';

export default function Home() {
  return (
    <>
      {requests.map(({ title, fetchUrl }) => (
        <MovieRow key={title} title={title} fetchUrl={fetchUrl} />
      ))}
    </>
  );
}
