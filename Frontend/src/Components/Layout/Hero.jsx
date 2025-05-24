
import heroImg from "../../assets/rabbit-hero.webp";
import StButton from "../Buttons/StoreButton";
const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="hero image"
        className="w-full h-[400px] md:h-[750px] object-cover"
      />
      <div className="absolute inset-0  flex items-center justify-center ">
        <div className="text-center text-white p-6">
            <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                Vacation <br /> Ready
            </h1>
            <p className="text-sm tracking-tighter md:text-lg mb-6">
                Explore our vaction ready outfits with fast worldwide shipping
            </p>
            <StButton />
        </div>
      </div>
    </section>
  );
};

export default Hero;
