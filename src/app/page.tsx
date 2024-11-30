"use client"

// // import FieldForm from '../../components/FieldForm'
// // import './globals.css'
// // export default function Home() {
// //   return (
// //     <div>
// //       <FieldForm />
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import FieldForm from '../../components/FieldForm';
// import './globals.css';

// export default function Home() {
//   // State to hold the flag indicating if images are available
//   const [imagesAvailable, setImagesAvailable] = useState(false);

//   // Function to check for images in the specified directory
//   const checkForImages = async () => {
//     try {
//       // Replace 'your-image-directory-path' with the actual path where images are stored
//       const response = await fetch('/api/check-images?path=/Users/tanishqmyadam/Documents/React_WebApp/rover-motion-plan/src/app/Graphs');
//       const data = await response.json();
      
//       // Assuming the API returns a boolean indicating if images exist
//       setImagesAvailable(data.imagesExist);
//     } catch (error) {
//       console.error('Error checking for images:', error);
//     }
//   };

//   // Use useEffect to check for images when the component mounts
//   useEffect(() => {
//     checkForImages();
//   }, []);

//   return (
//     <div>
//       <FieldForm />
//       {imagesAvailable ? (
//         <div>
//           {/* Render your images here */}
//           <p>Images are available and will be rendered here.</p>
//         </div>
//       ) : (
//         <p>No images available.</p>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import FieldForm from '../../components/FieldForm';
import './globals.css';

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      const response = await fetch('/Graphs/image_list.json');
      if (!response.ok) {
        throw new Error('Failed to fetch image list');
      }
      const imageList = await response.json();
      setImages(imageList);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to load images. Please try again later.');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <FieldForm />
      {error ? (
        <p className="error-message">{error}</p>
      ) : images.length > 0 ? (
        <div className="image-gallery">
          {images.map((imageName, index) => (
            <Image 
              key={index} 
              src={`/Graphs/${imageName}`} 
              alt={`Graph ${index + 1}`} 
              width={300} 
              height={200} 
            />
          ))}
        </div>
      ) : (
        <p>No images available.</p>
      )}
    </div>
  );
}


