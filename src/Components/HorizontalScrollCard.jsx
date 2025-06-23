import { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
const HorizontalScrollCard = ({ data = [], heading, trending }) => {
  const containerRef = useRef();
  const handleNext = ()=>{
    containerRef.current.scrollLeft += 350
  }
   const handlePrev = ()=>{
    containerRef.current.scrollLeft -= 350
  }
  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl font-bold mb-2 lg:text-2xl text-white">
        {heading}
      </h2>
      <div className="relative">
        <div ref={containerRef} className="scroll-smooth transition-all grid grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-6 grid-flow-col overflow-x-scroll noScrollBar">
          {data.map((data, index) => {
            return (
              <Card
                key={data.id + "heading" + index}
                data={data}
                index={index + 1}
                trending={trending}
              />
            );
          })}
        </div>

        <div className="absolute hidden lg:flex top-0 h-full justify-between items-center w-full">
        <button className="z-10 bg-white p-1 text-black rounded-full -ml-1 ">
            <FaAngleLeft onClick={handlePrev}/>
        </button>
  <button className="z-10 bg-white p-1 text-black rounded-full -ml-1 ">
            <FaAngleRight onClick={handleNext}/>
        </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
