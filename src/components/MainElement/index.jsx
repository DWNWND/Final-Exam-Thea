export default function MainElement({ children, tailw, homePage = false }) {
  return <main className={`${!homePage && "pt-20 p-4 pb-12"} min-h-svh ${tailw}`}>{children}</main>;
}
