/* eslint-disable react/no-unescaped-entities */
import Products from "../../pages/Products"
import About from "./About"

const Home = () => {
  return (
    <div className="">
      

      <div className=" h-screen bg-cover bg-center bg-no-repeat bg-fixed
      bg-gray-900 bg-opacity-50
      "
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1608745128320-9291dfb0e12d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", }}
      >
        <div className="container  mx-auto p-8 text-center 
        flex flex-col justify-center items-center h-full 
        ">
          <div className="">
            <h1 className=" sm:text-6xl md:text-8xl lg:text-8xl font-extrabold text-white">Welcome to Glacial Glam</h1>
            <p className="text-white">Embrace the cold in style with our collection of jackets and coats. From timeless trench coats to trendy puffer jackets, our outerwear options offer the perfect blend of warmth and fashion-forward design. Layer up with our cozy knitwear and scarves to complete your cold-weather look.</p>
          </div>
        </div>
      </div>


      <div className=" container px-10 mx-auto py-10">
        <div className=" grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 ">
          <div className=" text-start">
            <h1 className=" text-4xl ">NEW ARRIVALS</h1>
          </div>
          <div className="text-end">
            <p className=" text-sm ">
              At FrostFootwear, we bring you the coolest collection of shoes, jackets, jeans, coats, and accessories to keep you stylishly warm in the chilliest of climates. Whether you're braving the snow-covered streets or cozying up by the fireplace, we've got you covered with our carefully curated selection of cold-weather essentials.
            </p>
          </div>
          <div className=" text-end">
            <button className=" bg-black text-white px-4 py-2 rounded-md">SHOP NOW</button>
          </div>

        </div>
      </div>
      <Products />



      <div className=" container px-10 mx-auto py-20">
        <div className="  grid grid-cols-1 text-center">
          <h1 className=" sm:text-2xl md:text-6xl lg:text-6xl uppercase">
            Success is not final, failure is not fatal: It is the courage to continue that counts.
          </h1>
          <p className="text-sm text-end">- Winston Churchill</p>
        </div>
      </div>

      <About/>

     

    </div>
  )
}

export default Home