// ip-calculator.js
// Fungsi murni (tanpa DOM) untuk kalkulasi IPv4/IPv6, dipindah apa adanya dari index.html.
//
// Keputusan desain (untuk dijelaskan saat interview):
// 1. Satu file datar di root, bukan src/tests, karena repo ini kecil dan tanpa bundler.
// 2. Pola "dual export": di browser fungsi menjadi global (index.html tetap memanggil
//    getMaskFromPrefix(...) seperti sebelumnya), di Node diekspor lewat module.exports
//    supaya bisa dites. Dengan begitu tidak perlu build step dan Vercel tetap menyajikan
//    file statis seperti biasa.
// 3. Langkah ini murni pemindahan (refactor tanpa perubahan perilaku). Bug yang ditemukan
//    sengaja TIDAK diperbaiki di sini, tetapi dicatat sebagai tes todo.

(function (root) {
        // --- IPV4 HELPER FUNCTIONS ---
        function getMaskFromPrefix(prefix) {
            let mask = []; let p = parseInt(prefix);
            for (let i = 0; i < 4; i++) {
                let bits = Math.min(p, 8);
                mask.push(256 - Math.pow(2, 8 - bits));
                p -= bits;
            }
            return mask.join('.');
        }
        function getWildcard(prefix) { return getMaskFromPrefix(prefix).split('.').map(octet => 255 - parseInt(octet)).join('.'); }
        function ipToInt(ip) { return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0; }
        function intToIp(int) { return [ (int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255 ].join('.'); }

        // --- IPV6 HELPER FUNCTIONS ---
        function expandIPv6(ip) {
            ip = ip.toLowerCase().trim();
            if (ip === '::') return '0000:0000:0000:0000:0000:0000:0000:0000';
            let parts = ip.split('::');
            if (parts.length > 2) return null; 
            let left = parts[0] ? parts[0].split(':') : [];
            let right = parts.length === 2 && parts[1] ? parts[1].split(':') : [];
            let missing = 8 - (left.length + right.length);
            if(missing < 0) return null;
            let middle = Array(missing).fill('0000');
            let full = [...left, ...middle, ...right];
            return full.map(p => p.padStart(4, '0')).join(':');
        }
        function compressIPv6(ip) {
            let expanded = expandIPv6(ip);
            if (!expanded) return ip;
            let parts = expanded.split(':').map(p => parseInt(p, 16).toString(16));
            return parts.join(':').replace(/(^|:)0(:0)+(?=:|$)/, '::');
        }
        function getIPv6Type(expandedIp) {
            if(expandedIp === "0000:0000:0000:0000:0000:0000:0000:0001") return "Loopback";
            if(expandedIp === "0000:0000:0000:0000:0000:0000:0000:0000") return "Unspecified";
            let firstSegment = parseInt(expandedIp.substring(0, 4), 16);
            if(firstSegment >= 0x2000 && firstSegment <= 0x3FFF) return "Global Unicast";
            if(firstSegment >= 0xFE80 && firstSegment <= 0xFEBF) return "Link-Local";
            if(firstSegment >= 0xFC00 && firstSegment <= 0xFDFF) return "Unique Local (ULA)";
            if(firstSegment >= 0xFF00 && firstSegment <= 0xFFFF) return "Multicast";
            return "Reserved / Other";
        }


        // --- KALKULASI SUBNET IPv4 (dipindah apa adanya dari runBasicCalc di index.html) ---
        // Input sudah divalidasi pemanggil (format IPv4 dan prefix 0-32).
        function calculateSubnet(ip, prefix) {
            const totalAddresses = Math.pow(2, 32 - prefix);
            const usableHosts = (totalAddresses - 2 > 0) ? totalAddresses - 2 : 0;

            let baseIpInt = ipToInt(ip);
            let maskInt = ~((1 << (32 - prefix)) - 1);
            let networkId = intToIp((baseIpInt & maskInt) >>> 0);
            let broadcast = intToIp(((baseIpInt & maskInt) >>> 0) + totalAddresses - 1);
            let firstHost = usableHosts > 0 ? intToIp(((baseIpInt & maskInt) >>> 0) + 1) : '-';
            let lastHost = usableHosts > 0 ? intToIp(((baseIpInt & maskInt) >>> 0) + totalAddresses - 2) : '-';
            let subnetMask = getMaskFromPrefix(prefix);

            return { totalAddresses, usableHosts, networkId, broadcast, firstHost, lastHost, subnetMask };
        }

        const api = {
            getMaskFromPrefix, getWildcard, ipToInt, intToIp,
            expandIPv6, compressIPv6, getIPv6Type,
            calculateSubnet
        };
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = api;          // Node (node --test, CI)
        } else {
            Object.assign(root, api);      // Browser (global, sama seperti sebelumnya)
        }
})(typeof window !== 'undefined' ? window : globalThis);