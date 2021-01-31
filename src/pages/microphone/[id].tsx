import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { Microphone } from "../../../model/Microphone";
import { openDB } from "../../openDB";
import { useRouter } from "next/router";
export type MicrophoneDetailsProps = Microphone;
const prefix = "/microphone-store";

const MicrophoneDetails = ({
  id,
  brand,
  price,
  model,
  imageUrl,
}: MicrophoneDetailsProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h2>Details</h2>
      <div>{id}</div>
      <div>{brand}</div>
      <div>{model}</div>
      <div>{price}</div>
      <div>
        <img src={prefix + imageUrl} alt="" width="200px" height="200px" />
      </div>
    </div>
  );
};

export default MicrophoneDetails;
export const getStaticProps: GetStaticProps<MicrophoneDetailsProps> = async (
  ctx
) => {
  const id = ctx.params?.id as string;
  const db = await openDB();
  const microphone = await db.get("SELECT * FROM Microphone where id = ?", +id);

  return {
    props: microphone,
  };
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const db = await openDB();
  const microphones = await db.all("SELECT * FROM Microphone");
  const paths = microphones.map((mic) => {
    return {
      params: { id: mic.id.toString() },
    };
  });
  return {
    fallback: false,
    paths,
  };
};
