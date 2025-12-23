from Model.UNetModel import UNet
from Segmentation.segmentation import Segmentation
from ChangeBackground.changeBackground import ChangeBackground
from Camera.camera import Camera
from PIL import Image, ImageOps
import torch
import numpy as np
import cv2


def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = UNet(in_channels=3, out_channels=1)
    model.load_state_dict(torch.load("Model/UNetModel.pth", map_location=device))
    model.to(device)

    PATH_BACKGROUND = "Backgrounds/summonersRift2.png"
    # Load background and convert to RGB immediately
    background_bgr = cv2.imread(PATH_BACKGROUND)
    if background_bgr is None:
        raise ValueError(f"Could not load background from {PATH_BACKGROUND}")
    background = cv2.cvtColor(background_bgr, cv2.COLOR_BGR2RGB)
    background_pil = Image.fromarray(background)

    cam = Camera()

    # Performance optimization:
    # 1. Determine target size (smaller = faster)
    # 2. Prepare background once
    TARGET_WIDTH = 320

    dummy_frame = cam.get_frame()
    h, w = dummy_frame.shape[:2]
    scale = TARGET_WIDTH / w
    new_h = int(h * scale)
    new_size = (TARGET_WIDTH, new_h)

    # Pre-process background to match target size
    background_prepared = ImageOps.fit(
        background_pil, new_size, method=Image.Resampling.LANCZOS
    )

    frame_count = 0
    last_result = None

    try:
        while True:
            frame = cam.get_frame()
            # Resize frame for performance
            frame = cv2.resize(frame, new_size)

            # Process only every 3rd frame to improve performance
            if frame_count % 3 == 0:
                frame_pil = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
                human, background_seg = Segmentation.segmentation(
                    frame_pil, model, device
                )

                # Use prepared background
                changed_background = ChangeBackground.change_background(
                    human, background_prepared
                )
                last_result = cv2.cvtColor(
                    np.array(changed_background), cv2.COLOR_RGB2BGR
                )

            frame_count += 1

            if last_result is not None:
                cv2.imshow("Changed Background Feed", last_result)

            if cv2.waitKey(1) & 0xFF == ord("q"):
                break
    finally:
        cam.release()
        cv2.destroyAllWindows()


if __name__ == "__main__":
    main()

