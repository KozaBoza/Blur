from PIL import Image, ImageFilter

from Segmentation import segmentation

class ChangeBackground:
    @staticmethod
    def change_background(human, background):
        """Changes the background of the image to a solid color"""
        return Image.composite(human, background, human)

    @staticmethod
    def gaussianBlur(human, background):
        """
        Changes the background of the image to a blurred version of itself via Gaussian Blur.
        """
        blurred_background = background.filter(ImageFilter.GaussianBlur(radius=15))
        combined_image = Image.composite(human, blurred_background, human)
        
        return combined_image

if __name__ == "__main__":
    import numpy as np
    import os
    import sys

    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

    from Segmentation import segmentation
    import torch
    from Model.UNetModel import UNet
    import matplotlib.pyplot as plt
    import random

    PATH_IMG = "Dataset/humanSegmentation/images"

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = UNet(in_channels=3, out_channels=1)
    model.load_state_dict(torch.load("Model/UNetModel.pth", map_location=device))
    model.to(device)

    random_image = lambda path: random.choice(os.listdir(path))
    input_image = Image.open(os.path.join(PATH_IMG, random_image(PATH_IMG)))
    human, background = segmentation(input_image, model, device)

    plt.figure(figsize=(10, 5))
    plt.subplot(1, 3, 1)
    plt.title("Original Image")
    plt.imshow(input_image)
    plt.axis('off')

    plt.subplot(1, 3, 2)
    plt.title("Human")
    plt.imshow(human)
    plt.axis('off')

    plt.subplot(1, 3, 3)
    plt.title("Background")
    plt.imshow(background)
    plt.axis('off')

    plt.show()