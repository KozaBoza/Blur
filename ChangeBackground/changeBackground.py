from PIL import Image
import numpy as np
import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from Segmentation import segmentation

class ChangeBackground:
    @staticmethod
    def change_background(image, model, device, new_background):
        """Changes the background of the image to a solid color"""
        human, background = segmentation.Segmentation.segmentation(image, model, device)

        new_background = Image.new("RGB", image.size, new_background)
        new_background_array = np.array(new_background)

        combined_image_array = human + new_background_array * (1 - (human > 0).astype(np.uint8))

        combined_image = Image.fromarray(combined_image_array.astype('uint8'))

        return combined_image