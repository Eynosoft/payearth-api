var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
    invoiceNo: { type: String, unique: true, required: false, index: true, default: function() { return getRandomString(17); } },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false, index: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'Seller', required: false, index: true },
    amountPaid: { type: Number, required: true },
    paymentMode: { type: String, enum: ['usd', 'btc'], required: false, default: 'usd' },
    paymentAccount: { type: String, enum: ['Paypal', 'Stripe', '2CheckOut'], required: false, default: 'Paypal' },
    invoiceUrl: { type: String, required: false, default: null },
    isActive: { type: Boolean, required: false, default: true },
}, {
    timestamps: true,
});

schema.set("toJSON", { virtuals: true, versionKey: false });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model("Payment", schema);


function getRandomString(length) {
    var randomChars = '0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    result = 'INV' + result;
    return result;
}