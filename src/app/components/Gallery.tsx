// import { directus } from "../lib/directus";
// import { Painting } from "../types/painting";
import Image from "next/image";

// async function getPaintings(): Promise<Painting[]> {
//   try {
//     const res = await directus.items("paintings").readByQuery({
//       fields: ["id", "title", "image", "year", "medium"],
//       sort: ["-year"]
//     });
//     return res.data || [];
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// }

export default async function Gallery() {
    //   const paintings = await getPaintings();

    const paintings = [
        {
            id: '1',
            image: '/paintings/Willzn_1_3.jpg',
            title: 'Numero uno',
            year: '07/15/2025'
        },
        {
            id: '2',
            image: '/paintings/Willan_2.jpg',
            title: 'Numero dos',
            year: '08/15/2025'
        },
        {
            id: '3',
            image: '/paintings/Willan_1.jpg',
            title: 'Numero tres',
            year: '09/15/2025'
        },
        {
            id: '4',
            image: '/paintings/Weoli_zoom_1.jpg',
            title: 'Numero quatro',
            year: '10/15/2025'
        }
    ]

    return (
        <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paintings.map((painting) => (
                <div key={painting.id} className="relative group overflow-hidden rounded-lg shadow-md">
                    <Image
                        src={painting.image}
                        alt={painting.title}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-lg">{painting.title}</h3>
                        {painting.year && <p className="text-sm">{painting.year}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
}
