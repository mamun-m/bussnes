'use client';
import Popular from '../components/popularProduct/Popular';
import './global.css';
import dynamic from 'next/dynamic';

const HeroCarousel = dynamic(() => import('../components/hero/Hero'), {
  ssr: false,
  loading: () => <p>Loading carousel...</p>,
});
export default function Page() {
  return (
    <>
      <div className="container">
        <HeroCarousel />
      </div>
      <div className="container">
        <Popular />
      </div>
    </>
  );
}
