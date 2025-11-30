from PIL import Image
import numpy as np
import torch
from torchvision import transforms

import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

class Segmentation:
    @staticmethod
    def segmentation(image, model, device):
        """Segments the image"""
        model.eval()

        original_image = image.convert('RGB')
        original_size = original_image.size
        
        image = original_image.resize((256, 256))
        image_tensor = transforms.ToTensor()(image).unsqueeze(0)
        image_tensor = transforms.Normalize(mean=[0.485, 0.456, 0.406], 
                                        std=[0.229, 0.224, 0.225])(image_tensor)
        image_tensor = image_tensor.to(device)
        
        with torch.no_grad():
            mask = model(image_tensor)
            mask = mask.squeeze().cpu().numpy()
        
        mask = (mask > 0.5).astype(np.uint8)

        mask_pil = Image.fromarray(mask * 255).resize(original_size, Image.Resampling.NEAREST)
        mask_array = np.array(mask_pil) / 255.0
        
        original_array = np.array(original_image)
        
        mask_3d = np.stack([mask_array] * 3, axis=-1)

        human = (original_array * mask_3d).astype(np.uint8)
        background = (original_array * (1 - mask_3d)).astype(np.uint8)

        return human, background

if __name__ == "__main__":
    from Model.UNetModel import UNet
    import matplotlib.pyplot as plt

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = UNet(in_channels=3, out_channels=1)
    model.load_state_dict(torch.load("Model/UNetModel.pth", map_location=device))
    model.to(device)

    input_image = Image.open("Dataset/humanSegmentation/images/ds2_desk-office-workspace-coworking.png")
    human, background = Segmentation.segmentation(input_image, model, device)

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

