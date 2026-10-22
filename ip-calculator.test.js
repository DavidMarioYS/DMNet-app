// ip-calculator.test.js
// Tes untuk fungsi murni di ip-calculator.js.
// Dijalankan dengan: npm test   (memakai test runner bawaan Node, tanpa dependensi tambahan)
//
// Konvensi:
// - test(...)                  : perilaku yang sudah benar, harus selalu hijau.
// - test(..., { todo: ... })   : bug yang sudah terbukti. Tes ditulis dengan hasil yang BENAR
//                                 dan sengaja merah dulu; CI tidak gagal karena ditandai todo.
//                                 Saat bug diperbaiki, hapus opsi todo supaya jadi penjaga permanen.

const test = require('node:test');
const assert = require('node:assert/strict');
const {
    getMaskFromPrefix, getWildcard, ipToInt, intToIp,
    expandIPv6, compressIPv6, getIPv6Type, calculateSubnet
} = require('./ip-calculator.js');

// ---------- IPv4 ----------

test('getMaskFromPrefix: prefix umum', () => {
    assert.equal(getMaskFromPrefix(8), '255.0.0.0');
    assert.equal(getMaskFromPrefix(16), '255.255.0.0');
    assert.equal(getMaskFromPrefix(24), '255.255.255.0');
    assert.equal(getMaskFromPrefix(30), '255.255.255.252');
});

test('getMaskFromPrefix: batas /0 dan /32, serta prefix yang memotong oktet', () => {
    assert.equal(getMaskFromPrefix(0), '0.0.0.0');
    assert.equal(getMaskFromPrefix(32), '255.255.255.255');
    assert.equal(getMaskFromPrefix(25), '255.255.255.128');
    assert.equal(getMaskFromPrefix('26'), '255.255.255.192'); // input dari form berupa string
});

test('getWildcard: kebalikan dari subnet mask', () => {
    assert.equal(getWildcard(24), '0.0.0.255');
    assert.equal(getWildcard(30), '0.0.0.3');
    assert.equal(getWildcard(0), '255.255.255.255');
});

test('ipToInt: hasil unsigned 32-bit', () => {
    assert.equal(ipToInt('0.0.0.0'), 0);
    assert.equal(ipToInt('192.168.1.10'), 3232235786);
    assert.equal(ipToInt('255.255.255.255'), 4294967295); // tidak boleh menjadi -1
});

test('intToIp: kebalikan dari ipToInt (round-trip)', () => {
    for (const ip of ['0.0.0.0', '10.20.30.40', '172.16.0.1', '192.168.255.254', '255.255.255.255']) {
        assert.equal(intToIp(ipToInt(ip)), ip);
    }
});

// ---------- IPv6 ----------

test('expandIPv6: bentuk singkat menjadi 8 grup 4 digit', () => {
    assert.equal(expandIPv6('2001:db8::1'), '2001:0db8:0000:0000:0000:0000:0000:0001');
    assert.equal(expandIPv6('::1'), '0000:0000:0000:0000:0000:0000:0000:0001');
    assert.equal(expandIPv6('::'), '0000:0000:0000:0000:0000:0000:0000:0000');
    assert.equal(expandIPv6('FE80::1'), 'fe80:0000:0000:0000:0000:0000:0000:0001'); // huruf besar dinormalkan
});

test('expandIPv6: menolak alamat dengan lebih dari satu "::"', () => {
    assert.equal(expandIPv6('1::2::3'), null);
});

test('getIPv6Type: klasifikasi tipe alamat', () => {
    const type = (ip) => getIPv6Type(expandIPv6(ip));
    assert.equal(type('::1'), 'Loopback');
    assert.equal(type('::'), 'Unspecified');
    assert.equal(type('2001:db8::1'), 'Global Unicast');
    assert.equal(type('fe80::1'), 'Link-Local');
    assert.equal(type('fc00::1'), 'Unique Local (ULA)');
    assert.equal(type('ff02::1'), 'Multicast');
});

test('compressIPv6: alamat tanpa deretan nol tidak berubah', () => {
    assert.equal(compressIPv6('2001:db8:1:2:3:4:5:6'), '2001:db8:1:2:3:4:5:6');
});

test('compressIPv6: deretan nol di akhir alamat', () => {
    assert.equal(compressIPv6('1:0:0:0:0:0:0:0'), '1::');
});

// ---------- Bug yang sudah terbukti (todo) ----------

test('compressIPv6: deretan nol di tengah menghasilkan "::" tunggal', { todo: 'bug: keluar "2001:db8:::1" (tiga titik dua)' }, () => {
    assert.equal(compressIPv6('2001:db8::1'), '2001:db8::1');
});

test('compressIPv6: loopback menjadi "::1"', { todo: 'bug: keluar ":::1" (tiga titik dua)' }, () => {
    assert.equal(compressIPv6('::1'), '::1');
});

test('compressIPv6: memilih deretan nol TERPANJANG (RFC 5952)', { todo: 'bug: memilih deretan nol pertama' }, () => {
    assert.equal(compressIPv6('2001:0:0:1:0:0:0:1'), '2001:0:0:1::1');
});

test('expandIPv6: menolak alamat 7 grup tanpa "::"', { todo: 'bug: diterima dan dilengkapi "0000"' }, () => {
    assert.equal(expandIPv6('1:2:3:4:5:6:7'), null);
});

test('expandIPv6: menolak karakter non-heksadesimal', { todo: 'bug: "zzzz::1" diterima' }, () => {
    assert.equal(expandIPv6('zzzz::1'), null);
});

// ---------- calculateSubnet (kalkulasi subnet IPv4) ----------

test('calculateSubnet: 192.168.1.10/24', () => {
    assert.deepEqual(calculateSubnet('192.168.1.10', 24), {
        totalAddresses: 256, usableHosts: 254,
        networkId: '192.168.1.0', broadcast: '192.168.1.255',
        firstHost: '192.168.1.1', lastHost: '192.168.1.254',
        subnetMask: '255.255.255.0'
    });
});

test('calculateSubnet: blok kecil /30 (2 host usable)', () => {
    assert.deepEqual(calculateSubnet('10.20.30.40', 30), {
        totalAddresses: 4, usableHosts: 2,
        networkId: '10.20.30.40', broadcast: '10.20.30.43',
        firstHost: '10.20.30.41', lastHost: '10.20.30.42',
        subnetMask: '255.255.255.252'
    });
});

test('calculateSubnet: IP di tengah blok dibulatkan ke Network ID yang benar', () => {
    const r = calculateSubnet('192.168.1.130', 25);
    assert.equal(r.networkId, '192.168.1.128');
    assert.equal(r.broadcast, '192.168.1.255');
    assert.equal(r.usableHosts, 126);
});

test('calculateSubnet: blok besar /16 dan /8', () => {
    const b = calculateSubnet('172.16.5.9', 16);
    assert.equal(b.networkId, '172.16.0.0');
    assert.equal(b.broadcast, '172.16.255.255');
    assert.equal(b.usableHosts, 65534);

    const a = calculateSubnet('10.1.2.3', 8);
    assert.equal(a.networkId, '10.0.0.0');
    assert.equal(a.broadcast, '10.255.255.255');
    assert.equal(a.usableHosts, 16777214);
});

// Karakterisasi perilaku saat ini: /31 dan /32 dilaporkan tanpa host usable (tanda "-").
// Catatan: RFC 3021 membolehkan /31 untuk link point-to-point dengan 2 alamat terpakai.
// Itu keputusan desain, bukan bug, jadi tes ini hanya mengunci perilaku yang ada.
test('calculateSubnet: /31 dan /32 tidak punya host usable', () => {
    const p31 = calculateSubnet('192.168.1.77', 31);
    assert.equal(p31.usableHosts, 0);
    assert.equal(p31.firstHost, '-');
    assert.equal(p31.lastHost, '-');

    const p32 = calculateSubnet('192.168.1.77', 32);
    assert.equal(p32.totalAddresses, 1);
    assert.equal(p32.networkId, '192.168.1.77');
    assert.equal(p32.broadcast, '192.168.1.77');
    assert.equal(p32.usableHosts, 0);
});

// ---------- Bug yang sudah terbukti pada calculateSubnet (todo) ----------

test('calculateSubnet: prefix /0 menghasilkan jaringan 0.0.0.0 - 255.255.255.255', { todo: 'bug: operator shift JS (1 << 32) bernilai 1, mask jadi semua-1' }, () => {
    const r = calculateSubnet('10.20.30.40', 0);
    assert.equal(r.networkId, '0.0.0.0');
    assert.equal(r.broadcast, '255.255.255.255');
    assert.equal(r.firstHost, '0.0.0.1');
    assert.equal(r.lastHost, '255.255.255.254');
});