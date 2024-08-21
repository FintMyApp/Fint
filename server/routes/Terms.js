import express from "express";

const router = express.Router();

router.get("/terms", (req, res) => {
  res.json({
    content: `
      **Terms and Conditions**

      Welcome to OurApp! These terms and conditions outline the rules and regulations for the use of OurApp's Website, located at www.ourapp.com.

      By accessing this website we assume you accept these terms and conditions. Do not continue to use OurApp if you do not agree to take all of the terms and conditions stated on this page.

      **Cookies**

      We employ the use of cookies. By accessing OurApp, you agreed to use cookies in agreement with the OurApp's Privacy Policy.

      **License**

      Unless otherwise stated, OurApp and/or its licensors own the intellectual property rights for all material on OurApp. All intellectual property rights are reserved. You may access this from OurApp for your own personal use subjected to restrictions set in these terms and conditions.

      **You must not:**

      - Republish material from OurApp
      - Sell, rent, or sub-license material from OurApp
      - Reproduce, duplicate, or copy material from OurApp
      - Redistribute content from OurApp

      **Disclaimer**

      All the information on this website is published in good faith and for general information purpose only. OurApp does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website (OurApp), is strictly at your own risk.

      **Limitation of Liability**

      In no event shall OurApp, nor any of its officers, directors, employees, or agents, be liable for any indirect, consequential, or incidental damages or losses, including but not limited to damages for loss of profits, data, or other intangible losses, arising out of or in connection with the use of or inability to use our services.

      **Governing Law**

      These terms and conditions are governed by and construed in accordance with the laws of [Your Country/State] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.

      **Contact Us**

      If you have any questions about these Terms, please contact us at support@ourapp.com.
    `,
  });
});

export default router;
