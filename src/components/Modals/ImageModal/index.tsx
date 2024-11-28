import { IoIosClose } from "react-icons/io";

interface ImageModalProps {
  image: string;
  alt: string;
  toggle: () => void;
}

export function ImageModal({ image, alt, toggle }: ImageModalProps): JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="relative md:mx-6 z-[100] max-w-screen-lg mx-auto p-4 md:p-10">
        <button className="absolute top-4 right-4 md:top-10 md:right-10 text-white text-3xl" onClick={toggle}>
          <IoIosClose />
        </button>
        <img src={image} alt={alt} className="rounded-lg object-contain" />
        {alt && <p className="text-white text-center">Description: {alt}</p>}
      </div>
      <div className="absolute h-full w-full bg-black bg-opacity-75 z-[0]" onClick={toggle}></div>
    </div>
  );
}
