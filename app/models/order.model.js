var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
    orderCode: { type: String, unique: true, required: false, index: true, default: function() { return getRandomString(14); } },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    sellerId: { type: Schema.Types.ObjectId, ref: 'Seller', required: false },
    amount: { type: Number, required: true },
    product_sku: {
        quantity: { type: Number, required: false, default: 0 },
        color: { type: String, required: false, default: "" },
        size: { type: String, required: false, default: "" },
    },
    orderStatus: { type: mongoose.Schema.Types.ObjectId, ref: "OrderTrackingTimeline", required: true },
    isActive: { type: Boolean, required: false, default: true },
    isService: { type: Boolean, required: false, default: false }
}, {
    timestamps: true,
});

schema.set("toJSON", { virtuals: true, versionKey: false });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model("Order", schema);


function getRandomString(length) {
    var randomChars = '0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    result = 'OD' + result;
    return result;
}