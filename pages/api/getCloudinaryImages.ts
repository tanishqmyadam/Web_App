// import type { NextApiRequest, NextApiResponse } from 'next';
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // Get all images from the 'graphs' folder
//     const result = await cloudinary.api.resources({
//       type: 'upload',
//       prefix: 'graphs/', // folder name in Cloudinary
//       max_results: 500,
//     });

//     // Sort by creation date (newest first)
//     const sortedImages = result.resources.sort((a, b) => 
//       new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//     );

//     res.status(200).json(sortedImages);
//   } catch (error) {
//     console.error('Cloudinary fetch error:', error);
//     res.status(500).json({ error: 'Failed to fetch images' });
//   }
// } 

//Kinda works..... it works locally but not on the server

// import { v2 as cloudinary } from 'cloudinary';
// import type { NextApiRequest, NextApiResponse } from 'next';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const result = await cloudinary.search
//       .expression('folder:graphs')
//       .sort_by('created_at', 'desc')
//       .execute();
    
//     res.status(200).json(result.resources);
//   } catch (error) {
//     console.error('Error fetching images:', error);
//     res.status(500).json({ error: 'Failed to fetch images' });
//   }
// }

// rover-motion-plan/pages/api/getCloudinaryImages.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://web-kiii4k7ms-tanishqmyadams-projects.vercel.app/'); // Replace with your Vercel domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Preflight request
    res.status(200).end();
    return;
  }

  try {
    const result = await cloudinary.search
      .expression('folder:graphs')
      .sort_by('created_at', 'desc')
      .execute();

    res.status(200).json(result.resources);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}