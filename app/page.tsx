import Image from 'next/image';
import Header from './Header';
import Timeline from './Timeline';

export default async function Home() {
  // const data = await getData();

  // console.log(data);
  return (
    <main className="">
      <Timeline />
    </main>
  );
}
