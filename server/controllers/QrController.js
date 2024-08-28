import QRCode from "qrcode";

export const QrGen = async (req, res) => {
  const { amount, mobileNumber } = req.body;
  const name = process.env.NAME;
  const note = process.env.NOTE || "Payment";

  const expirationTime = Date.now() + 30 * 1000;

  try {
    const paymentAddress = mobileNumber
      ? `${mobileNumber}@upi`
      : process.env.UPI_ID;
    const upiUrl = `upi://pay?pa=${paymentAddress}&pn=${name}&am=${amount}&tn=${note}&expires=${expirationTime}`;

    const qrCodeData = await QRCode.toDataURL(upiUrl);

    res.json({ qrCodeData, expirationTime });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate QR code", error });
  }
};
