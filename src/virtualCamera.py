import pyvirtualcam
import blurredCamera


class VirtualCamera:
    def __init__(self, width=640, height=480, fps=30):
        self.width = width
        self.height = height
        self.fps = fps
        self.cam = blurredCamera.blur_background()

    def start(self):
        print(
            f"Virtual camera started with resolution {self.width}x{self.height} at {self.fps} FPS."
        )

    def send_frame(self, frame):
        self.cam.send(frame)
        self.cam.sleep_until_next_frame()

    def stop(self):
        self.cam.close()
        print("Virtual camera stopped.")
