import Loader from "../../components/loader";

export default function Loading() {
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <Loader isLoading={true} className=" max-w-screen-lg text-black">
        <p>...Loading</p>
      </Loader>
    </div>
  );
}
