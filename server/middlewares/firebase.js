const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../config/firebase");

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }
    const storageFB = getStorage();
    const file = {
      type: req.file.mimetype,
      buffer: req.file.buffer,
    };
    await signInWithEmailAndPassword(
      auth,
      process.env.FIREBASE_USER,
      process.env.FIREBASE_AUTH
    );

    const dateTime = Date.now();
    const fileName = `quizzes/${dateTime}`;
    const storageRef = ref(storageFB, fileName);
    const metadata = {
      contentType: file.type,
    };

    await uploadBytesResumable(storageRef, file.buffer, metadata);

    const downloadURL = await getDownloadURL(ref(storageFB, fileName));
    let imageUrl = downloadURL;

    req.body.image = imageUrl;
    next();
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "updat" + err.message,
    });
  }
};

module.exports = {
  uploadImage,
};
