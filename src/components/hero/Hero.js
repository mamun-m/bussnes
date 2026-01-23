'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from 'next/link';
import { slides } from '../../assets/asset';
import Image from 'next/image';
import './Hero.css';

export default function HeroCarousel() {
  return (
    <section className="hero-carousel">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide">
              <Image src={slide.images} alt={slide.images} fill priority className="slide-image" />
              <div className="overlay">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <Link href={slide.cta} className="btn-cta">
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
