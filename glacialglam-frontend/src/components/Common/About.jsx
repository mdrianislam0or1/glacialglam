
const About = () => {
  return (
    <div className="bg-cover bg-center bg-no-repeat 
    bg-red-900 bg-opacity-50"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", height: "70vh"}}
    >
        
        <div className="px-6 text-start grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 place-content-end h-96 ">
            <div className="">
            <h1 className=" sm:text-2xl md:text-2xl lg:text-4xl text-white uppercase">the store about us</h1>
            <p className="text-sm text-white">
            Rooted in our passion for style and warmth, we at FrostFootwear aim to redefine the cold-weather experience by offering a curated collection of shoes, jackets, jeans, and coats that blend fashion with functionality, ensuring you step out with confidence and comfort in every chilly adventure.
            </p>
            </div>
        </div>
    </div>
  )
}

export default About