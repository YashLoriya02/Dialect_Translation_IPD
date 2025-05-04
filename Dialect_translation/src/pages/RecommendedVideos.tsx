
// {
//     "total": 9,
//     "videos": [
//       {
//         "creator": "Niswoman",
//         "link": "https://www.youtube.com/watch?v=L3GY1qaeraY",
//         "title": "Do you know marathi? \ud83d\ude02\u2b07\ufe0f #shorts #marathi #marathijokes #girls"
//       },
//       {
//         "creator": "Goanvarta",
//         "link": "https://www.youtube.com/watch?v=ixkLD7LDgcE",
//         "title": "CM | KONKANI | \u0915\u094b\u0915\u0923\u0940 \u0939\u0940 \u092e\u0930\u093e\u0920\u0940\u091a\u0940 \u092c\u094b\u0932\u0940\u092d\u093e\u0937\u093e \u0928\u093e\u0939\u0940!  #Goa #Marathi #News"
//       },
//       {
//         "creator": "channel B",
//         "link": "https://www.youtube.com/watch?v=HLS3G1JkjUo",
//         "title": "\u091c\u093e\u0917\u0924\u093f\u0915 \u092e\u093e\u0924\u0943\u092d\u093e\u0937\u093e \u0926\u093f\u0928\u093e\u091a\u094d\u092f\u093e \u0928\u093f\u092e\u093f\u0924\u094d\u0924\u093e\u0928\u0902 \u0905\u0938\u094d\u0938\u0932 \u0930\u093e\u0902\u0917\u0921\u092f\u093e \u0915\u094b\u0932\u094d\u0939\u093e\u092a\u0941\u0930\u0940 \u092c\u094b\u0932\u0940\u092c\u0926\u094d\u0926\u0932\u091a\u0902 \u0935\u093f\u0936\u0947\u0937 \u0935\u0943\u0924\u094d\u0924..."
//       },
//       {
//         "creator": "KRANTI PATIL",
//         "link": "https://www.youtube.com/watch?v=vg7ra1leukA",
//         "title": "#marathicomedy #khandeshi #ahirani #aai"
//       },
//       {
//         "creator": "Education channel",
//         "link": "https://www.youtube.com/watch?v=9m7MW0pirQY",
//         "title": "\u092e\u0930\u093e\u0920\u0940  \u0935\u0931\u094d\u0939\u093e\u0921\u0940 \u092d\u093e\u0937\u093e || Marathi varhadi bolibhasha #youtube #ssc #cbse"
//       },
//       {
//         "creator": "Study2Win Education",
//         "link": "https://www.youtube.com/watch?v=E2YcRThT2Mk",
//         "title": "101 Short Daily use sentences | Learn to speak marathi in hindi | Hindi to marathi translation"
//       },
//       {
//         "creator": "Avi Deokar",
//         "link": "https://www.youtube.com/watch?v=-lvUbVpqkGk",
//         "title": "English to Marathi Translation App || Marathi To English Translation ( \u0907\u0902\u0917\u094d\u0930\u091c\u0940\u091a\u0947 \u092e\u0930\u093e\u0920\u0940 \u092d\u093e\u0937\u093e\u0902\u0924\u0930 )"
//       },
//       {
//         "creator": "Amruta Panth Pandya",
//         "link": "https://www.youtube.com/watch?v=BysH5hGHAzc",
//         "title": "Tanjavur Marathi | Gujarati | This vs That"
//       },
//       {
//         "creator": "Learn Marathi Easily",
//         "link": "https://www.youtube.com/watch?v=3SFLGpszjPU",
//         "title": "Learn Marathi Pronouns | Learn Marathi Easily | With Shruti"
//       }
//     ]
//   }


import { useEffect, useState } from 'react';

interface Video {
    title: string;
    creator: string;
    link: string;
    thumbnail: string;
}

const RecommendedVideos = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const cached = sessionStorage.getItem("recommendedVideos");

        // if (cached) {
        //     setVideos(JSON.parse(cached));
        //     setLoading(false);
        // }
        // else {
        //     fetch("http://localhost:5000/search")
        //         .then((res) => res.json())
        //         .then((data) => {
        //             const enhanced = data.videos.map((video: any) => {
        //                 const videoId = video.link.split("v=")[1];
        //                 return {
        //                     ...video,
        //                     thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        //                 };
        //             });
        //             setVideos(enhanced);
        //             sessionStorage.setItem("recommendedVideos", JSON.stringify(enhanced));
        //             setLoading(false);
        //         })
        //         .catch((err) => {
        //             console.error("Failed to fetch videos:", err);
        //             setLoading(false);
        //         });
        // }

        const videos = [
            {
                "creator": "Niswoman",
                "link": "https://www.youtube.com/watch?v=L3GY1qaeraY",
                "title": "Do you know marathi? \ud83d\ude02\u2b07\ufe0f #shorts #marathi #marathijokes #girls"
            },
            {
                "creator": "Goanvarta",
                "link": "https://www.youtube.com/watch?v=ixkLD7LDgcE",
                "title": "CM | KONKANI | \u0915\u094b\u0915\u0923\u0940 \u0939\u0940 \u092e\u0930\u093e\u0920\u0940\u091a\u0940 \u092c\u094b\u0932\u0940\u092d\u093e\u0937\u093e \u0928\u093e\u0939\u0940!  #Goa #Marathi #News"
            },
            {
                "creator": "channel B",
                "link": "https://www.youtube.com/watch?v=HLS3G1JkjUo",
                "title": "\u091c\u093e\u0917\u0924\u093f\u0915 \u092e\u093e\u0924\u0943\u092d\u093e\u0937\u093e \u0926\u093f\u0928\u093e\u091a\u094d\u092f\u093e \u0928\u093f\u092e\u093f\u0924\u094d\u0924\u093e\u0928\u0902 \u0905\u0938\u094d\u0938\u0932 \u0930\u093e\u0902\u0917\u0921\u092f\u093e \u0915\u094b\u0932\u094d\u0939\u093e\u092a\u0941\u0930\u0940 \u092c\u094b\u0932\u0940\u092c\u0926\u094d\u0926\u0932\u091a\u0902 \u0935\u093f\u0936\u0947\u0937 \u0935\u0943\u0924\u094d\u0924..."
            },
            {
                "creator": "KRANTI PATIL",
                "link": "https://www.youtube.com/watch?v=vg7ra1leukA",
                "title": "#marathicomedy #khandeshi #ahirani #aai"
            },
            {
                "creator": "Education channel",
                "link": "https://www.youtube.com/watch?v=9m7MW0pirQY",
                "title": "\u092e\u0930\u093e\u0920\u0940  \u0935\u0931\u094d\u0939\u093e\u0921\u0940 \u092d\u093e\u0937\u093e || Marathi varhadi bolibhasha #youtube #ssc #cbse"
            },
            {
                "creator": "Study2Win Education",
                "link": "https://www.youtube.com/watch?v=E2YcRThT2Mk",
                "title": "101 Short Daily use sentences | Learn to speak marathi in hindi | Hindi to marathi translation"
            },
            {
                "creator": "Avi Deokar",
                "link": "https://www.youtube.com/watch?v=-lvUbVpqkGk",
                "title": "English to Marathi Translation App || Marathi To English Translation ( \u0907\u0902\u0917\u094d\u0930\u091c\u0940\u091a\u0947 \u092e\u0930\u093e\u0920\u0940 \u092d\u093e\u0937\u093e\u0902\u0924\u0930 )"
            },
            {
                "creator": "Amruta Panth Pandya",
                "link": "https://www.youtube.com/watch?v=BysH5hGHAzc",
                "title": "Tanjavur Marathi | Gujarati | This vs That"
            },
            {
                "creator": "Learn Marathi Easily",
                "link": "https://www.youtube.com/watch?v=3SFLGpszjPU",
                "title": "Learn Marathi Pronouns | Learn Marathi Easily | With Shruti"
            }
        ]
        const enhanced = videos.map((video: any) => {
            const videoId = video.link.split("v=")[1];
            return {
                ...video,
                thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            };
        });
        setVideos(enhanced);
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }, []);

    if (loading) {
        return <div className='mt-[30vh]'>
            <div className="flex justify-center items-center space-x-2 mt-4">
                <div className="dot delay-0"></div>
                <div className="dot delay-1"></div>
                <div className="dot delay-2"></div>
                <div className="dot delay-3"></div>
            </div>

            <p className="text-center text-2xl mt-8">Loading videos, Please wait...</p>
        </div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 p-4">
            {videos.map((video, idx) => (
                <a
                    key={idx}
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-[1.03] bg-transparent rounded-lg shadow-sm hover:shadow-lg transition duration-300 p-3 bxsd-class overflow-hidden flex flex-col"
                >
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full rounded-xl h-48 object-cover"
                    />
                    <div className="p-3">
                        <h3 className="text-sm font-semibold mb-1 line-clamp-2">{video.title}</h3>
                        <p className="text-xs text-gray-500">By {video.creator}</p>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default RecommendedVideos;