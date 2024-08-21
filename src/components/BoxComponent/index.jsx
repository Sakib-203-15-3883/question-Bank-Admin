"use client"
// import { useRouter } from "next/navigation";
const BoxComponent = ({ title, button_content, link }) => {

  // const router = useRouter();

  const handleButtonClick = () => {
    if (link) {
      // router.push(link);
      window.open(link, '_blank');
    }
  };



  return (

    <div className="bg-gray-300 p-6 rounded-md shadow-md">

      <p className=" grid place-content-center mt-10 mb-10 text-xl font-bold ">{title}  </p>
      <div className="ml-28 text-lg ">

        <button

          type="button"
          onClick={handleButtonClick} className="bg-blue-500 text-white p-2 rounded-md"  >

          {button_content}

        </button>


      </div>



    </div>
  )
}

export default BoxComponent;