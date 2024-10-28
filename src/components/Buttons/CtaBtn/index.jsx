export default function CtaBtn({ innerText, tailw, color, mainCta }) {
  if (mainCta) {
    return <button className={`${tailw} w-full p-2 px-20 flex justify-center font-semibold text-xl text-white uppercase hover:shadow-md hover:bg-primary-light`}>{innerText}</button>;
  } else {
    return <button className={`${tailw} w-full p-2 px-20 flex justify-center border border-solid border-${color} text-${color} uppercase hover:shadow-md`}>{innerText}</button>;
  }
}
