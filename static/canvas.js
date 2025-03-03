async function prepareCanvasImageForPrediction() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Create a resized 28x28 canvas
    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = 28;
    resizedCanvas.height = 28;
    const resizedContext = resizedCanvas.getContext('2d');
    resizedContext.drawImage(canvas, 0, 0, 28, 28);

    // Extract image data
    const imageData = resizedContext.getImageData(0, 0, 28, 28).data;

    // Convert image to grayscale and normalize (0-1 range)
    const imageArray = [];
    for (let i = 0; i < imageData.length; i += 4) {
        imageArray.push(imageData[i] / 255.0); // Using red channel
    }

    // Reshape to 28x28 format
    const reshapedImage = [];
    for (let i = 0; i < 28; i++) {
        reshapedImage.push(imageArray.slice(i * 28, (i + 1) * 28));
    }

    // Define API Gateway endpoint
    const API_URL = "https://6vh643ybn6.execute-api.us-east-1.amazonaws.com/prod/predict"; 

    try {
        // Send the image to API Gateway (AWS Lambda)
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: reshapedImage })
        });

        const data = await response.json();

        if (data.error) {
            alert('Error: ' + data.error);
            return;
        }

        // Display prediction result
        document.getElementById('predictionResult').innerText = 'Predicted Digit: ' + data.prediction;

        // Display download links if available
        if (data.original_image_link && data.processed_image_link) {
            document.getElementById('downloadLinks').innerHTML = `
                <p><a href="${data.original_image_link}" download>Download Original Image</a></p>
                <p><a href="${data.processed_image_link}" download>Download Processed Image</a></p>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}
