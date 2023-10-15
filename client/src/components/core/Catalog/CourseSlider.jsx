
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Course_Card from './Course_Card';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

     
// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

function CourseSlider({ courses, Height }) {
  return (
    <div className=''>
      {
        courses?.length > 0 &&
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            1024: { slidesPerView: 3 }
          }}
        >
          {
            courses.map((course, index) => (
              <SwiperSlide key={index}>
                <Course_Card course={course} Height={"h-[250px]"} />
              </SwiperSlide>

            ))
          }
        </Swiper>
      }
      {
        courses?.length === 0 &&
        <div>no course found </div>
      }

    </div>
  );
}
export default CourseSlider

