
const barang = [
    {nama:"TWS", harga:250000, kategori:"elektronik", gambar:"TWS.JPG"},
    {nama:"Jam Tangan Digital", harga:450000, kategori:"elektronik", gambar:"JAM TANGAN.webp"},
    {nama:"Sepatu Sneakers", harga:400000, kategori:"fashion", gambar:"sepatu.webp"},
    {nama:"Hoodie Zipper", harga:250000, kategori:"fashion", gambar:"zipper.webp"},
    {nama:"Kacamata Renang", harga:200000, kategori:"aksesoris", gambar:"kacamata renang.jpg"},
    {nama:"Kalung Berlian", harga:3000000, kategori:"aksesoris", gambar:"KALUNG.jpg"}
];

let keranjang = [];

function tampilkan(data) {
    document.getElementById("produk").innerHTML = data.map(b => `
        <div class="card">
            <img src="${b.gambar}">
            <h3>${b.nama}</h3>
            <p class="harga">Rp ${b.harga.toLocaleString("id-ID")}</p>
            <button onclick="tambah('${b.nama}')">+ Keranjang</button>
        </div>
    `).join("");
}

function tambah(nama) {
    let item = keranjang.find(b => b.nama === nama);
    if (item) item.jumlah++;
    else keranjang.push({...barang.find(b => b.nama === nama), jumlah:1});
    updateCart();
}

function updateCart() {
    document.getElementById("cart").innerText =
        keranjang.reduce((a,b) => a + b.jumlah, 0);
}

function openKeranjang() {
    document.getElementById("modal").style.display = "flex";
    renderKeranjang();
}

function closeKeranjang() {
    document.getElementById("modal").style.display = "none";
}

function ubahJumlah(nama, angka) {
    let item = keranjang.find(b => b.nama === nama);
    item.jumlah += angka;
    if (item.jumlah <= 0)
        keranjang = keranjang.filter(b => b.nama !== nama);
    updateCart();
    renderKeranjang();
}

function renderKeranjang() {
    let daftar = document.getElementById("daftar");
    daftar.innerHTML = keranjang.length ? keranjang.map(b => `
        <div class="item">
            <span>${b.nama}<br>Rp ${b.harga.toLocaleString("id-ID")}</span>
            <div>
                <button onclick="ubahJumlah('${b.nama}',-1)">-</button>
                ${b.jumlah}
                <button onclick="ubahJumlah('${b.nama}',1)">+</button>
            </div>
        </div>
    `).join("") : "<p>Keranjang masih kosong.</p>";

    let total = keranjang.reduce((a,b) => a + b.harga * b.jumlah, 0);
    document.getElementById("total").innerText =
        "Total: Rp " + total.toLocaleString("id-ID");
}

function checkout() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    const nomorWA = "6282331764447";

    if (nomorWA.includes("x")) {
        alert("Masukkan nomor WhatsApp toko di script.js terlebih dahulu!");
        return;
    }

    let pesan = "HALO, SAYA MAU ORDER:\n\n";
    keranjang.forEach(b => {
        pesan += `${b.nama} x${b.jumlah} = Rp ${(b.harga*b.jumlah).toLocaleString("id-ID")}\n`;
    });

    let total = keranjang.reduce((a,b) => a + b.harga*b.jumlah, 0);
    pesan += `\nTOTAL: Rp ${total.toLocaleString("id-ID")}`;

    window.open("https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(pesan), "_blank");
}

function filter(kategori) {
    tampilkan(kategori === "all" ? barang : barang.filter(b => b.kategori === kategori));
}

document.getElementById("search").addEventListener("input", function() {
    tampilkan(barang.filter(b => b.nama.toLowerCase().includes(this.value.toLowerCase())));
});

tampilkan(barang);