const TitleCard = ({ title }) => {
  return (
    <div className='w-full flex justify-center '>
      <div className='mb-4 p-16 w-full shadow-md  text-main '>
        <h1 className='text-2xl text-center font-bold uppercase'>{title}</h1>
        <div className='border border-b-2 border-b-[#714920] mt-2' />
      </div>
    </div>
  )
}
export default TitleCard
