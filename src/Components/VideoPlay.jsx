import { IoClose } from 'react-icons/io5'
const VideoPlay = ({detailsData, close}) => {
  return (
    
    <section className='fixed mt-5 bg-neutral-700 top-0 bottom-0 right-0 left-0 opacity-50 flex justify-center items-center'>
        <div className='relative bg-black w-full h-[80vh] max-w-screen-lg aspect-video rounded'>
            <button className='absolute right-0 text-3xl ' >
                <IoClose onClick={close}  />
            </button>
        </div>
    </section>
  )
}

export default VideoPlay