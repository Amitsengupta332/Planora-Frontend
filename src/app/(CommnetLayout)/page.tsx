import HeroSection from "@/components/modules/home/hero";

export default async function Home() {
//   const { data } = await getAllService();

  return (
    <div>
      <HeroSection/>
      {/* <HeroCarousel />
      <div className="grid grid-cols-4 gap-5">
        {data?.slice(0, 4).map((s: any) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div> */}
    </div>
  );
}