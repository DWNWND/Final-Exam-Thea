import { IoIosClose } from "react-icons/io";

interface ImageModalProps {
  image: string;
  alt: string;
  toggle: () => void;
}

export function ImageModal({ image, alt, toggle }: ImageModalProps): JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="relative rounded-lg p-4 md:p-6 lg:p-8 max-w-4xl w-full mx-auto flex flex-col items-center z-[100]">
        <button className="absolute top-4 right-4 text-white text-3xl hover:text-red-400" onClick={toggle}>
          <IoIosClose />
        </button>
        <div className="w-full flex justify-center">
          <img src={image} alt={alt} className="rounded-lg max-w-full max-h-[75vh] object-contain" />
        </div>
        {alt && <p className="text-white text-center mt-4">{alt}</p>}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={toggle} aria-hidden="true"></div>
    </div>
  );
}
