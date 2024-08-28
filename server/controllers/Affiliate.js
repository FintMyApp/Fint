import { AffiliateLink } from "../models/AffiliateModel.js";

const predefinedLinks = [
  {
    image:
      "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png",
    link: "https://fktr.in/yJP2T7k",
    description: "Grab Upto 85% Off Across Categories - Shop Now!",
  },
  {
    image:
      "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png",
    link: "https://fktr.in/yJP2T7k",
    description: "Grab Upto 85% Off Across Categories - Shop Now!",
  },
  {
    image:
      "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png",
    link: "https://fktr.in/yJP2T7k",
    description: "Grab Upto 85% Off Across Categories - Shop Now!",
  },
  {
    image:
      "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png",
    link: "https://fktr.in/yJP2T7k",
    description: "Grab Upto 85% Off Across Categories - Shop Now!",
  },
  {
    image:
      "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png",
    link: "https://fktr.in/yJP2T7k",
    description: "Grab Upto 85% Off Across Categories - Shop Now!",
  },
];

const storeLinks = async () => {
  try {
    // Delete all existing links
    await AffiliateLink.deleteMany({});
    console.log("Old records deleted.");

    // Save each predefined link
    for (const link of predefinedLinks) {
      const newLink = new AffiliateLink(link);
      await newLink.save();
    }

    console.log("Predefined links stored.");
  } catch (error) {
    console.error("Error storing predefined links:", error);
  }
};

storeLinks().catch(console.error);

export const Affiliate = async (req, res) => {
  try {
    const links = await AffiliateLink.find();
    res.json(links);
    console.log(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
