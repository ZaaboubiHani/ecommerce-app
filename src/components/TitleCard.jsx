const TitleCard = ({title})=>{
    return  <div className="w-full flex justify-center ">
    <div className=" m-6 p-8 w-[400px] shadow-md bg-white">
      <h1 className="text-2xl text-center uppercase">
        {title}
      </h1>
      <div
        className="border border-b-1 border-b-black mt-2"
      />
    </div>
  </div>
}
export default TitleCard;