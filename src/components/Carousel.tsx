import Image from 'next/image';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Carousel = ({
  images,
}: {
  images: { filename: string; alt: string }[];
}) => {
  return (
    <div className='flex w-screen flex-row items-center px-5'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => swiper.autoplay.resume()}
        rewind
        autoplay={{ delay: 5000 }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.filename}>
            <Image
              src={`/assets/${image.filename}.png`}
              alt={image.alt}
              width={820}
              height={1260}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
