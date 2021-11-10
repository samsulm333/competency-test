let A = 4550;
let B = 5330;
let C = 8653;

function hitungBarang(quality, qty) {
  let priceWoDisc = 0;
  let disc = 0;
  let finalPrice = 0;
  if (quality == A && qty > 13) {
    priceWoDisc = quality * qty;
    disc = 231 * qty;
    finalPrice = priceWoDisc - disc;
  } else if (quality == B && qty > 7) {
    priceWoDisc = quality * qty;
    disc = (priceWoDisc * 23) / 100;
    finalPrice = priceWoDisc - disc;
  } else if (quality == C) {
    priceWoDisc = quality * qty;
    finalPrice = priceWoDisc;
  } else {
    return console.log("Please input Quality and Quantity");
  }
  console.log(
    `Total Harga Barang : ${priceWoDisc} \nPotongan : ${disc} \nTotal yang harus dibayar : ${finalPrice}`
  );
}

hitungBarang(A, 14);
