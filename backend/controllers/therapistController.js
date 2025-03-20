import Therapist from "../models/Therapist.js";

// Fetch all therapists
export const getTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find({});
    res.json(therapists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching therapists" });
  }
};

// Register a therapist
export const registerTherapist = async (req, res) => {
  const { name, email, password, specialization, availability, photo } = req.body;

  try {
    // Check if therapist already exists
    const existingTherapist = await Therapist.findOne({ email });
    if (existingTherapist) {
      return res.status(400).json({ message: "Therapist already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new therapist
    const newTherapist = new Therapist({
      name,
      email,
      password: hashedPassword,
      specialization,
      availability,
      photo,
    });

    // Save the therapist to the database
    await newTherapist.save();

    res.status(201).json({ message: "Therapist registered successfully!", therapist: newTherapist });
  } catch (error) {
    res.status(500).json({ message: "Error registering therapist", error: error.message });
  }
};