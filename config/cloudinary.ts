// Image upload
import { Cloudinary } from "@cloudinary/url-gen";

export const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo'
    },
    url: {
      secureDistribution: 'www.example.com', 
      secure: true 
    }
});