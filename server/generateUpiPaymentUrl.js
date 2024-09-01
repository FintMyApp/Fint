export const generateUpiPaymentUrl = async (req, res) => {
  const generateTransactionId = () => {
    return `txn_${Date.now()}`;
  };

  try {
    const { amount, upiId, note } = req.body;
    const transactionId = generateTransactionId();
    const upiUrl = `upi://pay?pa=${upiId}&pn=Freelancer&am=${amount}&tn=${note}&cu=INR&tr=${transactionId}`;

    res.json({ upiUrl });
  } catch (error) {
    console.error("Error generating UPI payment URL:", error);
    res.status(500).json({ message: "Server error" });
  }
};
