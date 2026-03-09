import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

function FaceAuth() {

  const videoRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {

    loadModels();
    startVideo();

  }, []);


  const loadModels = async () => {

    const MODEL_URL = "/models";

    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

    setLoading(false);

  };


  const startVideo = () => {

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

      })
      .catch((err) => {
        console.error(err);
      });

  };


  const handleFaceLogin = async () => {

    const detection = await faceapi.detectSingleFace(
      videoRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );

    if (detection) {

      setMessage("Face detected. Login successful!");

      console.log("Face detected", detection);

    } else {

      setMessage("No face detected. Try again.");

    }

  };


  return (

    <div className="flex flex-col items-center p-6">

      <h2 className="text-2xl font-bold mb-4">
        Face Authentication
      </h2>


      {loading ? (
        <p>Loading models...</p>
      ) : (

        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            width="320"
            height="240"
            className="border"
          />

          <button
            onClick={handleFaceLogin}
            className="bg-black text-white px-4 py-2 mt-4 rounded"
          >
            Scan Face
          </button>

          {message && (
            <p className="mt-4 text-green-600">
              {message}
            </p>
          )}

        </>

      )}

    </div>

  );

}

export default FaceAuth;