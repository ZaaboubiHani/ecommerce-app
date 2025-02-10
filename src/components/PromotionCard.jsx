const PromotionCard = ({ title }) => {
  return (
    <div className='w-full flex justify-center'>
      <div className='mb-4 p-16 w-full  text-black'>
        <h1 className='text-2xl text-center uppercase'>{title}</h1>
        <div className='border border-b-1 border-b-black mt-2' />
      </div>
    </div>
  )
}
export default PromotionCard
