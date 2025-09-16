// middleware/validateDrug.js
module.exports = function validateDrug(req, res, next) {
  const { name, dosage, card, pack, perDay } = req.body;

  // a. Name > 5 ký tự
  if (!name || name.length <= 5) {
    return res.status(400).json({ message: "Name must be longer than 5 characters." });
  }

  // b. Dosage format: XX-morning,XX-afternoon,XX-night
  const dosageRegex = /^\d+-morning,\d+-afternoon,\d+-night$/;
  if (!dosageRegex.test(dosage)) {
    return res.status(400).json({ message: "Dosage must follow format: XX-morning,XX-afternoon,XX-night" });
  }

  // c. Card > 1000
  if (isNaN(card) || card <= 1000) {
    return res.status(400).json({ message: "Card must be more than 1000." });
  }

  // d. Pack > 0
  if (isNaN(pack) || pack <= 0) {
    return res.status(400).json({ message: "Pack must be more than 0." });
  }

  // e. PerDay > 0 và < 90
  if (isNaN(perDay) || perDay <= 0 || perDay >= 90) {
    return res.status(400).json({ message: "PerDay must be greater than 0 and less than 90." });
  }

  next(); // nếu hợp lệ thì qua controller
};
