const Gallery = () => {
    const galleryItems = [
        {
            image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80",
            title: "Road Cleaning"
        },
        {
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
            title: "Tree Planting"
        },
        {
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
            title: "Free Food Delivery"
        },
        {
            image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80",
            title: "Distributing Water"
        },
        {
            image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
            title: "Helping Poor People During Medical Need"
        },
        {
            image: "https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=800&q=80",
            title: "Blood Donation Arrange / Connect"
        },
        {
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
            title: "Helping Street Children"
        },
        {
            image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
            title: "Helping Street Animals"
        }
    ];

    return (
        <div className=" max-w-[1280px] mx-auto px-4 w-full py-12 md:py-20 ">
            <h1 className="text-3xl md:text-4xl font-semibold text-center mx-auto">Here are some of our work in Gallery</h1>
            <p className="text-base md:text-xl text-gray-500 text-center mt-4 md:mt-6 max-w-lg mx-auto px-4">
                A visual collection of our most recent works - each event has been done with intention, emotion, and positive mind.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 md:mt-12 max-w-7xl mx-auto">
                {galleryItems.map((item, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-64 md:h-72 object-cover object-center" 
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <h1 className="text-lg md:text-xl font-medium">{item.title}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;