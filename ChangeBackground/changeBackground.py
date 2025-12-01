from PIL import Image, ImageFilter
import numpy as np

class ChangeBackground:
    @staticmethod
    def change_background(human, background):
        """Changes the background of the image to a solid color"""

        # Ensure human is a PIL Image
        if not isinstance(human, Image.Image):
            human = Image.fromarray(human)
        
        # Ensure background is a PIL Image
        if not isinstance(background, Image.Image):
            background = Image.fromarray(background)

        # 1. Calculate aspect ratios
        target_width, target_height = human.size
        bg_width, bg_height = background.size
        
        target_ratio = target_width / target_height
        bg_ratio = bg_width / bg_height

        # 2. Resize background maintaining aspect ratio to cover the target area
        if bg_ratio > target_ratio:
            # Background is wider than target -> resize by height
            new_height = target_height
            new_width = int(new_height * bg_ratio)
        else:
            # Background is taller than target -> resize by width
            new_width = target_width
            new_height = int(new_width / bg_ratio)
            
        background = background.resize((new_width, new_height), Image.Resampling.LANCZOS)

        # 3. Center crop the background to match target dimensions exactly
        left = (new_width - target_width) // 2
        top = (new_height - target_height) // 2
        right = left + target_width
        bottom = top + target_height
        
        background = background.crop((left, top, right, bottom))
        # 4. Composite
        # Create a binary mask from the grayscale human image using numpy to avoid
        # type-checker issues with lambda in Image.point.
        human_gray = human.convert("L")
        human_arr = np.array(human_gray)
        mask_arr = (human_arr > 0).astype('uint8') * 255
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