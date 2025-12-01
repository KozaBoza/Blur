from PIL import Image, ImageFilter, ImageOps
import numpy as np

class ChangeBackground:
    @staticmethod
    def change_background(human, background):
        """Changes the background of the image, resizing and cropping to fit."""

        if not isinstance(human, Image.Image): human = Image.fromarray(human)
        if not isinstance(background, Image.Image): background = Image.fromarray(background)

        if background.size != human.size:
            background = ImageOps.fit(background, human.size, method=Image.Resampling.LANCZOS)

        human_gray = human.convert("L")
        mask_arr = np.array(human_gray)
        mask_arr = (mask_arr > 0).astype('uint8') * 255
        mask = Image.fromarray(mask_arr, mode='L')

        return Image.composite(human, background, mask)

    @staticmethod
    def gaussianBlur(human, background):
        """
        Changes the background of the image to a blurred version of itself via Gaussian Blur.
        """
        background = Image.fromarray(background)
        blurred_background = background.filter(ImageFilter.GaussianBlur(radius=15))

        human = Image.fromarray(human)

        combined_image = Image.composite(human, blurred_background, human.convert("L"))
        
        return combined_image

if __name__ == "__main__":
    import os
    import sys

    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

    from Segmentation.segmentation import Segmentation
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
    human, background_seg = Segmentation.segmentation(input_image, model, device)

    gauss_blur = ChangeBackground.gaussianBlur(human, background_seg)

    background = Image.open("Backgrounds/summonersRift2.png").convert("RGB")

    change_background = ChangeBackground.change_background(human, background)

    plt.figure(figsize=(10, 5))
    plt.subplot(1, 5, 1)
    plt.title("Original Image")
    plt.imshow(input_image)
    plt.axis('off')

    plt.subplot(1, 5, 2)
    plt.title("Human")
    plt.imshow(human)
    plt.axis('off')

    plt.subplot(1, 5, 3)
    plt.title("Background")
    plt.imshow(background)
    plt.axis('off')

    plt.subplot(1, 5, 4)
    plt.title("Blurred Background")
    plt.imshow(gauss_blur)
    plt.axis('off')

    plt.subplot(1, 5, 5)
    plt.title("Changed Background")
    plt.imshow(change_background)
    plt.axis('off')

    plt.show()