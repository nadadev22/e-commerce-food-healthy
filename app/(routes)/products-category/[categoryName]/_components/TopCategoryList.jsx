import React from "react";
import Link from "next/link";
import Image from "next/image";

function TopCategoryList({ categoryList, selectedCategory }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 justify-items-center items-center mt-5">
      {categoryList.map((category) => (
        <Link
          href={`/products-category/${category.name}`}
          key={category.id}
          className={`w-30 h-35 mt-3 p-3 flex flex-col items-center text-center group ${
            selectedCategory === category.name ? "bg-[#ffcc00] text-white" : ""
          }`}
        >
          <Image
            src={
              category?.icon?.[0]?.url
                ? `http://localhost:1337${category?.icon?.[0]?.url}`
                : "/fallback-image.png"
            }
            width={80}
            height={80}
            alt={category?.name || `Category ${category.id}`}
            unoptimized={true}
            className="group-hover:scale-125 transition-all cursor-pointer"
          />
          <small
            className={`text-amber-500 font-bold capitalize ${
              selectedCategory === category.name ? "text-white" : ""
            }`}
          >
            {category.name}
          </small>
        </Link>
      ))}
    </div>
  );
}

export default TopCategoryList;
