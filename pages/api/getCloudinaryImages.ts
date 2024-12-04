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
import { v2 as cloudinary } from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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