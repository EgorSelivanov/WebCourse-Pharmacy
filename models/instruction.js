var mongoose = require("mongoose"),
	InstructionSchema,
    ObjectId = mongoose.Schema.Types.ObjectId;

InstructionSchema = mongoose.Schema({
    manufacturer: String,
    compound: String,
    testimony: String,
    pregnancy: String,
    contraindications: String,
    side_effects: String,
    interaction: String,
    admission_course: String,
    shelf_life: String,
    dosage_form: String,
    owner_product: { type: ObjectId, ref: "Product" }
});

var Instruction = mongoose.model("Instruction", InstructionSchema);

module.exports = Instruction;