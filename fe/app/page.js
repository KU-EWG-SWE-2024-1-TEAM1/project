import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="p-4  bg-darkBg">
        #101322
        <div className="flex space-x-4">
          <div className="w-16 h-16 bg-primary">#163D68</div>
          <div className="w-16 h-16 bg-primary-light">#4263EB</div>
          <div className="w-16 h-16 bg-textActive">#d4d9e1</div>
          <div className="w-16 h-16 bg-textInactive">#586a85</div>
        </div>
      </main>
    </>
  );
}
