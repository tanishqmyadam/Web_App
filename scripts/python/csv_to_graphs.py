import os
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

# Load environment variables
load_dotenv('../../.env.local')

# Test if variables are loaded
print("Environment variables loaded:")
print(f"Cloud name: {os.getenv('CLOUDINARY_CLOUD_NAME') is not None}")
print(f"API key: {os.getenv('CLOUDINARY_API_KEY') is not None}")
print(f"API secret: {os.getenv('CLOUDINARY_API_SECRET') is not None}")

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

def plot_csv_files(input_folder, output_folder):
    # Initialize image_files list
    image_files = []
    
    # List all CSV files in the input folder
    csv_files = [f for f in os.listdir(input_folder) if f.endswith('.csv')]

    if not csv_files:
        print("No CSV files found in the input folder.")
        return image_files

    for csv_file in csv_files:
        file_path = os.path.join(input_folder, csv_file)

        try:
            data = pd.read_csv(file_path)

            # Generate a plot for each column
            plt.figure(figsize=(10, 6))
            for column in data.columns[1:]:
                plt.plot(data[data.columns[0]], data[column], label=column)

            plt.title(f"Graphs for {csv_file}")
            plt.xlabel(data.columns[0])
            plt.ylabel("Values")
            plt.legend()
            plt.grid(True)

            # Save temporarily
            temp_file = f"temp_{os.path.splitext(csv_file)[0]}.png"
            plt.savefig(temp_file)
            plt.close()

            # Upload to Cloudinary
            upload_result = cloudinary.uploader.upload(temp_file,
                folder="graphs",
                public_id=f"graph_{os.path.splitext(csv_file)[0]}")
            
            # Add the Cloudinary URL to our list
            image_files.append(upload_result['secure_url'])
            
            # Clean up temporary file
            os.remove(temp_file)
            print(f"Graph for {csv_file} uploaded to Cloudinary")

        except Exception as e:
            print(f"Error processing {csv_file}: {e}")

    return image_files

def generate_heatmap(matrix_size, output_name):
    """
    Generates a heatmap matrix and uploads to Cloudinary
    """
    # Create a matrix with measurement locations
    heatmap = np.arange(1, matrix_size[0] * matrix_size[1] + 1).reshape(matrix_size)

    # Visualize the heatmap
    plt.figure(figsize=(8, 6))
    plt.imshow(heatmap, cmap="viridis", aspect="auto")
    plt.colorbar(label="Measurement Location Index")
    plt.title("Heatmap of Measurement Locations")
    plt.xlabel("Columns")
    plt.ylabel("Rows")
    
    # Save temporarily
    temp_file = f"temp_heatmap.png"
    plt.savefig(temp_file)
    plt.close()

    # Upload to Cloudinary
    upload_result = cloudinary.uploader.upload(temp_file,
        folder="graphs",
        public_id=f"heatmap_{output_name}")
    
    # Clean up temporary file
    os.remove(temp_file)
    
    print(f"Heatmap uploaded to Cloudinary")
    return upload_result['secure_url']

if __name__ == "__main__":
    input_folder = "../../csv_files"
    output_folder = "../../graph_files"  # Not used for storage anymore, but kept for compatibility
    
    # Generate graphs from CSVs
    image_urls = plot_csv_files(input_folder, output_folder)
    
    # Generate heatmap
    matrix_size = (10, 10)
    heatmap_url = generate_heatmap(matrix_size, "measurements")
    
    # Add heatmap to image list
    image_urls.append(heatmap_url)
    
    # Print all URLs (you might want to save these somewhere)
    print("\nGenerated image URLs:")
    for url in image_urls:
        print(url)
    