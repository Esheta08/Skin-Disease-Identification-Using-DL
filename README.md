Skin Disease Classifier

A web application that identifies 5 types of skin diseases from uploaded images. This project uses **Deep Learning (AI)** for image analysis and features a clean, responsive web interface.


Supported Diseases
The AI model is configured to analyze skin images and classify them into **5 categories**:
1. **Acne:** Common skin condition occurring when hair follicles become clogged with oil and dead skin cells.
2. **Melanoma:** A serious type of skin cancer that develops in the cells that give skin its color.
3. **Psoriasis:** An autoimmune condition that causes skin cells to build up quickly, forming scales and itchy patches.
4. **Rosacea:** A chronic skin condition that causes redness and visible blood vessels, usually on the face.
5. **Vitiligo:** A condition that causes the skin to lose its pigment cells, resulting in discolored patches.

 How the Application Works

When a user interacts with the application, the system processes the request through a simple three-step cycle:

1. **The User Uploads an Image:** Through the web dashboard, the user selects a `.jpg` or `.png` photo of a skin condition. The frontend instantly shows a live preview of the image.
2. **Asynchronous Processing:** When the user clicks "Run Inference," the frontend uses jQuery AJAX to send the photo securely to the Flask backend server in the background. The web page does not reload or freeze; instead, a CSS loading spinner appears.
3. **AI Evaluation & Result Presentation:** The Flask backend resizes the image to a standardized `64x64` size, normalizes the pixel values, and passes it into a pre-trained **MobileNetV2** deep learning model. The model calculates probability scores for each disease and sends back a clean JSON response containing the top match and its confidence score, which displays smoothly on the screen.
