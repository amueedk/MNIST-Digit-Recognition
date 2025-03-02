function prepareCanvasImageForPrediction() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Create a resized canvas (28x28)
    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = 28;
    resizedCanvas.height = 28;
    const resizedContext = resizedCanvas.getContext('2d');
    resizedContext.drawImage(canvas, 0, 0, 28, 28);

    // Extract image data
    const imageData = resizedContext.getImageData(0, 0, 28, 28).data;

    // Convert to grayscale and normalize
    const imageArray = [];
    for (let i = 0; i < imageData.length; i += 4) {
        imageArray.push(imageData[i] / 255.0); // Use the red channel
    }

    // Reshape into 28x28
    const reshapedImage = [];
    for (let i = 0; i < 28; i++) {
        reshapedImage.push(imageArray.slice(i * 28, (i + 1) * 28));
    }

    // Send the data to the Flask server
    fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: reshapedImage })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                document.getElementById('predictionResult').innerText = 'Predicted Digit: ' + data.prediction;
                const downloadLinks = `
                    <p><a href="${data.original_image_link}" download>Download Original Image</a></p>
                    <p><a href="${data.processed_image_link}" download>Download Processed Image</a></p>
                `;
                document.getElementById('downloadLinks').innerHTML = downloadLinks;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred.');
        });
}
