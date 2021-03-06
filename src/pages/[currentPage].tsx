import { GetStaticPaths } from "next";
import { openDB } from "../openDB";
import Index, { getStaticProps } from "./index";

export default Index;
export { getStaticProps };

export const getStaticPaths: GetStaticPaths<{
  currentPage: string;
}> = async () => {
  const db = await openDB();
  const { total } = await db.get("SELECT count(*) as total FROM Microphone");
  const numberOfPages = Math.ceil(total / 5.0);

  const paths = Array(numberOfPages - 1)
    .fill("")
    .map((_, index) => {
      return {
        params: { currentPage: (index + 1).toString() },
      };
    });
  return {
    fallback: false,
    paths, //:[{ params: { currentPage: "1" } }],
  };
};
