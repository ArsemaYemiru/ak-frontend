import Image from "next/image";

const STRAPI_URL = "http://localhost:1337";
const isDev = process.env.NODE_ENV === "development";

async function getJewelry() {
  const res = await fetch(`${STRAPI_URL}/api/jewelries?populate=*`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data from Strapi");
  }

  return res.json();
}

export default async function Home() {
  const jewelry = await getJewelry();

  return (
    <main className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {jewelry.data.map((item: any) => {
        const image = item.images?.[0];

        if (!image?.url) {
          return null;
        }

        return (
          <div key={item.id} className="border rounded p-4 flex flex-col gap-2">
            <Image
              src={`${STRAPI_URL}${image.url}`}
              alt={item.description ?? "Jewelry image"}
              width={300}
              height={300}
              unoptimized={isDev}
              priority
            />

            <p className="font-medium">{item.description}</p>
            <p className="text-sm text-gray-600">{item.price}</p>
          </div>
        );
      })}
    </main>
  );
}
