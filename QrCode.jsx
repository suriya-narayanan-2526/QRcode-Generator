import  { useState } from 'react';
export const QrCode = () => {
  const [img,setImg] = useState("image/download.png");
  const [loading,setLoading] =useState(false);
  const[qrdata,setqrData] =useState("");
  const [qrSize,setqrSize]= useState("150");
  async function generate()
  {
    setLoading(true);
    try
    {
      const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);
    }
    catch(error)
    {
      console.error("Error generating QR code",error);
    }
    finally
    {
      setLoading(false);
    }
  }
  function downloadQr()
  {
    fetch(img) .then((response) => response.blob()) 
    .then((blob) =>{
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      //blob is basically an numberic data when we create an object for that it convert the numeric data to image
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.boby.removeChild(link);
    })
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENERATER</h1>
      {loading && <p>Please Wait....</p>}
      {img && <img src={img} alt=""  className="qr-code-image"/>}
      <div>
      <label htmlFor="dataInput" className="input-label" >
        Data for QR code :
      </label>
      <input type="text" id="dataInput" placeholder="Enter data for QR code" onChange={(e) =>{setqrData(e.target.value)}}/>
      <label htmlFor="sizeInput" className="input-label">
        Image size (eg , 150) :
      </label>
      <input type="text" id="sizeInput" placeholder="Enter image size" onChange={(e) =>{setqrSize(e.target.value)}}/>
      <button className="generate-button" disabled={loading} onClick={generate}>Generate QR code</button>
      <button className="download-button"  onClick={downloadQr}>Download QR code</button>
      </div>
      <p className="fotter">Designed By <span>Suriya</span></p>
    </div>
  )
}
 