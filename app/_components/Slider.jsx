import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Slider({ sliderList }) {
  return (
    <Carousel className="w-full md:h-[600px] h-[200px] mt-5 rounded-2xl" loop>
      <CarouselContent>
        {sliderList?.map((slider, index) => (
          <CarouselItem key={index}>
            <Image
              width={1000}
              height={400}
              className="w-full h-[200] md:h-[600px] object-cover rounded-2xl"
              src={`http://localhost:1337${slider?.image[0]?.url}`}
              alt={
                slider?.name ||
                slider?.description ||
                `Slider image ${index + 1}`
              }
              unoptimized={true}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Slider;
