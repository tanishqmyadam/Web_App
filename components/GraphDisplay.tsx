import { useEffect, useState } from 'react';

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  created_at: string;
  url: string;
  asset_id: string;
  format: string;
  width: number;
  height: number;
}

export default function GraphDisplay() {
  const [graphUrls, setGraphUrls] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCloudinaryImages = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/getCloudinaryImages', {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setGraphUrls(Array.isArray(data) ? data : [data]);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch images');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCloudinaryImages();
    // Poll every 5 minutes (adjust as needed)
    const interval = setInterval(fetchCloudinaryImages, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading graphs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {graphUrls.map((image) => (
        <div key={image.public_id} className="border rounded-lg p-4">
          <img 
            src={image.secure_url} 
            alt={`Graph ${image.public_id}`}
            className="w-full h-auto"
          />
          <p className="text-sm text-gray-500 mt-2">
            Updated: {new Date(image.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
} 