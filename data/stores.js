/* ============================================================
   VIBIT – stores.js
   ข้อมูลร้านค้าจำลอง 20+ ร้าน
   ============================================================ */

const STORES_DATA = [

  /* ─── กรุงเทพฯ ─── */
  {
    id: 1,
    name: "Mute.Studio",
    category: "ร้านเช่าชุด",
    categoryKey: "outfit",
    province: "กรุงเทพฯ",
    area: "เอกมัย",
    rating: 4.9,
    reviewCount: 120,
    priceStart: 150,
    priceUnit: "ต่อวัน",
    tags: ["#เอิร์ธโทน", "#ชุดมินิมอล", "#คาเฟ่ฮอปปิง"],
    description: "ชุดเช็กอิน minimal และ earth tone สำหรับสายคาเฟ่ฮอปปิง คัดมาแล้วว่าถ่ายรูปสวย",
    vibes: ["Minimal", "Classic"],
    badge: "TOP RATED",
    badgeColor: "badge-pink",
    emoji: "👗",
    isNew: false,
    isTrending: true
  },
  {
    id: 2,
    name: "Sony Cyber-shot BKK",
    category: "ร้านเช่ากล้อง",
    categoryKey: "camera",
    province: "กรุงเทพฯ",
    area: "สยาม",
    rating: 5.0,
    reviewCount: 340,
    priceStart: 200,
    priceUnit: "ต่อวัน",
    tags: ["#กล้องดิจิตอล", "#เช่ากล้องวินเทจ"],
    description: "กล้องดิจิตอล Y2K สไตล์ Sony Cyber-shot รุ่นหายาก ฟีลเผลอเปิดแฟลช ถ่ายได้ทันที",
    vibes: ["Y2K", "Digital"],
    badge: "BESTSELLER",
    badgeColor: "badge-blue",
    emoji: "📷",
    isNew: false,
    isTrending: true
  },
  {
    id: 3,
    name: "LuxeLend.BKK",
    category: "ร้านเช่าชุด",
    categoryKey: "outfit",
    province: "กรุงเทพฯ",
    area: "ทองหล่อ",
    rating: 4.9,
    reviewCount: 85,
    priceStart: 300,
    priceUnit: "ต่อวัน",
    tags: ["#ดินเนอร์รูฟท็อป", "#ชุดคลาสสิก", "#Glam"],
    description: "ชุด evening wear และ cocktail dress สำหรับ fine dining และ rooftop ดีไซน์สุดพรีเมียม",
    vibes: ["Classic", "Glam"],
    badge: "PREMIUM",
    badgeColor: "badge-yellow",
    emoji: "✨",
    isNew: false,
    isTrending: false
  },
  {
    id: 4,
    name: "PropBox Bangkok",
    category: "ร้านเช่าพร็อบ",
    categoryKey: "prop",
    province: "กรุงเทพฯ",
    area: "อารีย์",
    rating: 4.7,
    reviewCount: 63,
    priceStart: 80,
    priceUnit: "ต่อวัน",
    tags: ["#พร็อบถ่ายรูป", "#บอลลูน", "#ดอกไม้"],
    description: "พร็อบสำหรับถ่ายรูป ตั้งแต่บอลลูน ดอกไม้ ป้ายข้อความ จนถึง set ครบสำหรับ content creator",
    vibes: ["Y2K", "Minimal"],
    badge: "NEW",
    badgeColor: "badge-green",
    emoji: "🎪",
    isNew: true,
    isTrending: false
  },
  {
    id: 5,
    name: "Frosty.Fit BKK",
    category: "ร้านเช่าชุด",
    categoryKey: "outfit",
    province: "กรุงเทพฯ",
    area: "จตุจักร",
    rating: 4.8,
    reviewCount: 215,
    priceStart: 250,
    priceUnit: "ต่อวัน",
    tags: ["#ชุดกันหนาว", "#ขึ้นดอย", "#แฟหน้าหนาว"],
    description: "ชุดกันหนาวสุดสวย สำหรับทริปขึ้นดอยหรือเที่ยวต่างประเทศ ไม่ต้องซื้อใหม่",
    vibes: ["Street", "Minimal"],
    badge: "POPULAR",
    badgeColor: "badge-pink",
    emoji: "🧥",
    isNew: false,
    isTrending: true
  },

  /* ─── เชียงใหม่ ─── */
  {
    id: 6,
    name: "Lanna Lens",
    category: "ร้านเช่ากล้อง",
    categoryKey: "camera",
    province: "เชียงใหม่",
    area: "นิมมานเหมินท์",
    rating: 4.9,
    reviewCount: 178,
    priceStart: 180,
    priceUnit: "ต่อวัน",
    tags: ["#Fujifilm", "#ฟิล์มวินเทจ", "#คาเฟ่เชียงใหม่"],
    description: "กล้อง Fujifilm X-series และกล้องฟิล์มวินเทจ เหมาะกับไวบ์เชียงใหม่ บรรยากาศสโลว์ไลฟ์",
    vibes: ["Minimal", "Film"],
    badge: "TOP RATED",
    badgeColor: "badge-blue",
    emoji: "🎞️",
    isNew: false,
    isTrending: true
  },
  {
    id: 7,
    name: "Chiang Closet",
    category: "ร้านเช่าชุด",
    categoryKey: "outfit",
    province: "เชียงใหม่",
    area: "เมือง",
    rating: 4.8,
    reviewCount: 94,
    priceStart: 120,
    priceUnit: "ต่อวัน",
    tags: ["#ชุดลานนา", "#ชุดไทยประยุกต์", "#วัดเชียงใหม่"],
    description: "ชุดไทยประยุกต์และลายลานนา เหมาะถ่ายรูปวัด ตลาดวโรรส และตลาดวันเสาร์",
    vibes: ["Classic", "Minimal"],
    badge: "LOCAL FAV",
    badgeColor: "badge-green",
    emoji: "👘",
    isNew: false,
    isTrending: false
  },
  {
    id: 8,
    name: "DoiProp Studio",
    category: "ร้านเช่าพร็อบ",
    categoryKey: "prop",
    province: "เชียงใหม่",
    area: "ดอยสุเทพ",
    rating: 4.6,
    reviewCount: 47,
    priceStart: 60,
    priceUnit: "ต่อวัน",
    tags: ["#ดอกไม้ดอย", "#พร็อบธรรมชาติ", "#เที่ยวดอย"],
    description: "พร็อบธีมธรรมชาติและดอย ดอกไม้ป่า ตะกร้า และของตกแต่งสไตล์ boho สำหรับ outdoor shoot",
    vibes: ["Minimal", "Lifestyle"],
    badge: "NEW",
    badgeColor: "badge-green",
    emoji: "🌸",
    isNew: true,
    isTrending: false
  },
  {
    id: 9,
    name: "NorthLight Cam",
    category: "ร้านเช่ากล้อง",
    categoryKey: "camera",
    province: "เชียงใหม่",
    area: "สันติธรรม",
    rating: 4.7,
    reviewCount: 112,
    priceStart: 220,
    priceUnit: "ต่อวัน",
    tags: ["#Ricoh", "#StreetPhoto", "#กล้องเล็กเบา"],
    description: "กล้อง Ricoh GR series สำหรับ street photography ในย่านเชียงใหม่ เล็กเบา ภาพคมกริบ",
    vibes: ["Street", "Film"],
    badge: "TRENDING",
    badgeColor: "badge-pink",
    emoji: "📸",
    isNew: false,
    isTrending: true
  },

  /* ─── ภูเก็ต ─── */
  {
    id: 10,
    name: "Phuket Drip",
    category: "ร้านเช่าชุด",
    categoryKey: "outfit",
    province: "ภูเก็ต",
    area: "ป่าตอง",
    rating: 4.8,
    reviewCount: 203,
    priceStart: 200,
    priceUnit: "ต่อวัน",
    tags: ["#ชุดชายหาด", "#บิกินี่เช่า", "#ทะเลภูเก็ต"],
    description: "ชุดชายหาดสไตล์ resort wear สีสันสดใส เหมาะกับทะเล และ beach club ภูเก็ต",
    vibes: ["Y2K", "Lifestyle"],
    badge: "BESTSELLER",
    badgeColor: "badge-blue",
    emoji: "🌊",
    isNew: false,
    isTrending: true
  },
  {
    id: 11,
    name: "Island Lens Phuket",
    category: "ร้านเช่ากล้อง",
    categoryKey: "camera",
    province: "ภูเก็ต",
    area: "กะตะ",
    rating: 4.9,
    reviewCount: 156,
    priceStart: 250,
    priceUnit: "ต่อวัน",
    tags: ["#กล้องกันน้ำ", "#Gopro", "#ถ่ายใต้น้ำ"],
    description: "กล้อง GoPro และกล้องกันน้ำ สำหรับกิจกรรมทางน้ำ ดำน้ำ เล่นเซิร์ฟ และ boat trip",
    vibes: ["Lifestyle", "Digital"],
    badge: "TOP RATED",
    badgeColor: "badge-yellow",
    emoji: "🤿",
    isNew: false,
    isTrending: false
  },
  {
    id: 12,
    name: "Pearlshine Accessory",
    category: "ร้านเช่าเครื่องประดับ",
    categoryKey: "accessory",
    province: "ภูเก็ต",
    area: "โอลด์ทาวน์",
    rating: 4.7,
    reviewCount: 68,
    priceStart: 100,
    priceUnit: "ต่อวัน",
    tags: ["#เครื่องประดับ", "#ชิโน-โปรตุเกส", "#ภูเก็ตเก่า"],
    description: "เครื่องประดับและ accessory สไตล์ชิโน-โปรตุเกส เหมาะถ่ายรูปในย่านภูเก็ตเก่า",
    vibes: ["Classic", "Minimal"],
    badge: "LOCAL FAV",
    badgeColor: "badge-green",
    emoji: "💎",
    isNew: false,
    isTrending: false
  },

  /* ─── เชียงราย ─── */
  {
    id: 13,
    name: "WhiteTemple Wardrobe",
    category: "ร้านเช่าชุด",
    categoryKey: "outfit",
    province: "เชียงราย",
    area: "เมือง",
    rating: 4.8,
    reviewCount: 132,
    priceStart: 100,
    priceUnit: "ต่อวัน",
    tags: ["#ชุดขาว", "#วัดร่องขุ่น", "#เชียงราย"],
    description: "ชุดสีขาวและโทนสว่างสำหรับถ่ายรูปที่วัดร่องขุ่น (วัดขาว) ผ้าดีไม่ยับ",
    vibes: ["Minimal", "Classic"],
    badge: "POPULAR",
    badgeColor: "badge-pink",
    emoji: "🕊️",
    isNew: false,
    isTrending: true
  },
  {
    id: 14,
    name: "Singha Park Shoots",
    category: "ร้านเช่าพร็อบ",
    categoryKey: "prop",
    province: "เชียงราย",
    area: "สิงห์ปาร์ค",
    rating: 4.6,
    reviewCount: 41,
    priceStart: 70,
    priceUnit: "ต่อวัน",
    tags: ["#ชาพร็อบ", "#ทุ่งดอกไม้", "#สิงห์ปาร์ค"],
    description: "พร็อบธีมสวนและ outdoor สำหรับถ่ายรูปในสิงห์ปาร์ค ทุ่งดอกไม้ และสวนชา",
    vibes: ["Lifestyle", "Minimal"],
    badge: "NEW",
    badgeColor: "badge-green",
    emoji: "🌿",
    isNew: true,
    isTrending: false
  },

  /* ─── พัทยา ─── */
  {
    id: 15,
    name: "Pattaya Glam Closet",
    category: "ร้านเช่าชุด",
    categoryKey: "outfit",
    province: "พัทยา",
    area: "พัทยาเหนือ",
    rating: 4.7,
    reviewCount: 89,
    priceStart: 180,
    priceUnit: "ต่อวัน",
    tags: ["#ชุดParty", "#clubbing", "#ผับพัทยา"],
    description: "ชุดสำหรับ nightlife และ beach party สีสันจัดจ้าน Y2K และ streetwear สุดเท่",
    vibes: ["Y2K", "Street"],
    badge: "TRENDING",
    badgeColor: "badge-pink",
    emoji: "🎉",
    isNew: false,
    isTrending: true
  },
  {
    id: 16,
    name: "SeaShot Camera",
    category: "ร้านเช่ากล้อง",
    categoryKey: "camera",
    province: "พัทยา",
    area: "หาดจอมเทียน",
    rating: 4.5,
    reviewCount: 73,
    priceStart: 160,
    priceUnit: "ต่อวัน",
    tags: ["#กล้องซันเซ็ต", "#ถ่ายทะเล", "#drone"],
    description: "กล้อง mirrorless และ drone สำหรับถ่าย sunset และ aerial view บริเวณหาดพัทยา",
    vibes: ["Lifestyle", "Digital"],
    badge: "",
    badgeColor: "",
    emoji: "🌅",
    isNew: false,
    isTrending: false
  },

  /* ─── กาญจนบุรี ─── */
  {
    id: 17,
    name: "River Kwai Rental",
    category: "ร้านเช่าชุด",
    categoryKey: "outfit",
    province: "กาญจนบุรี",
    area: "เมือง",
    rating: 4.6,
    reviewCount: 55,
    priceStart: 130,
    priceUnit: "ต่อวัน",
    tags: ["#ชุดธรรมชาติ", "#แคมป์ปิ้ง", "#แม่น้ำแคว"],
    description: "ชุด outdoor และธีมธรรมชาติสำหรับแคมป์ปิ้ง ล่องแพ และท่องเที่ยวเชิงนิเวศ",
    vibes: ["Minimal", "Lifestyle"],
    badge: "LOCAL FAV",
    badgeColor: "badge-green",
    emoji: "🏕️",
    isNew: false,
    isTrending: false
  },

  /* ─── ขอนแก่น ─── */
  {
    id: 18,
    name: "KKU Cosplay Rent",
    category: "ร้านเช่าชุด",
    categoryKey: "outfit",
    province: "ขอนแก่น",
    area: "เมือง",
    rating: 4.8,
    reviewCount: 167,
    priceStart: 90,
    priceUnit: "ต่อวัน",
    tags: ["#คอสเพลย์", "#ชุดญี่ปุ่น", "#ขอนแก่น"],
    description: "ชุดคอสเพลย์และชุดญี่ปุ่นหลากหลายสไตล์ Harajuku Lolita และ Yukata ราคาเป็นมิตร",
    vibes: ["Y2K", "Street"],
    badge: "POPULAR",
    badgeColor: "badge-blue",
    emoji: "🎌",
    isNew: false,
    isTrending: true
  },
  {
    id: 19,
    name: "Isan Lens House",
    category: "ร้านเช่ากล้อง",
    categoryKey: "camera",
    province: "ขอนแก่น",
    area: "เมือง",
    rating: 4.7,
    reviewCount: 84,
    priceStart: 150,
    priceUnit: "ต่อวัน",
    tags: ["#กล้องอีสาน", "#ถ่ายงาน", "#Nikon"],
    description: "กล้อง Nikon และ Canon สำหรับถ่ายงานบุญ งานประเพณี และการท่องเที่ยวอีสาน",
    vibes: ["Lifestyle", "Film"],
    badge: "",
    badgeColor: "",
    emoji: "📷",
    isNew: false,
    isTrending: false
  },

  /* ─── สุราษฎร์ธานี / เกาะสมุย ─── */
  {
    id: 20,
    name: "Samui Vibe Closet",
    category: "ร้านเช่าชุด",
    categoryKey: "outfit",
    province: "สุราษฎร์ธานี",
    area: "เกาะสมุย",
    rating: 4.9,
    reviewCount: 245,
    priceStart: 220,
    priceUnit: "ต่อวัน",
    tags: ["#ชุดเกาะ", "#BohoBeach", "#เกาะสมุย"],
    description: "ชุด boho beach และ resort สุดสวย เหมาะกับ infinity pool และหาดทรายขาวเกาะสมุย",
    vibes: ["Lifestyle", "Classic"],
    badge: "BESTSELLER",
    badgeColor: "badge-yellow",
    emoji: "🌴",
    isNew: false,
    isTrending: true
  },
  {
    id: 21,
    name: "TropicShot Samui",
    category: "ร้านเช่ากล้อง",
    categoryKey: "camera",
    province: "สุราษฎร์ธานี",
    area: "เกาะสมุย",
    rating: 4.8,
    reviewCount: 119,
    priceStart: 280,
    priceUnit: "ต่อวัน",
    tags: ["#กล้องทะเล", "#กันน้ำ", "#สมุย"],
    description: "กล้องกันน้ำและ housing สำหรับ underwater ถ่ายปลา ปะการัง และ sunset ริมทะเล",
    vibes: ["Lifestyle", "Digital"],
    badge: "POPULAR",
    badgeColor: "badge-blue",
    emoji: "🐠",
    isNew: false,
    isTrending: false
  },
  {
    id: 22,
    name: "Accessory Island",
    category: "ร้านเช่าเครื่องประดับ",
    categoryKey: "accessory",
    province: "สุราษฎร์ธานี",
    area: "เกาะสมุย",
    rating: 4.6,
    reviewCount: 52,
    priceStart: 80,
    priceUnit: "ต่อวัน",
    tags: ["#เครื่องประดับหาด", "#เปลือกหอย", "#Boho"],
    description: "เครื่องประดับสไตล์ boho ทะเล สร้อย กำไล และหมวกสาน เหมาะกับ beach content",
    vibes: ["Lifestyle", "Y2K"],
    badge: "NEW",
    badgeColor: "badge-green",
    emoji: "🐚",
    isNew: true,
    isTrending: false
  },

  /* ─── อยุธยา ─── */
  {
    id: 23,
    name: "Ayutthaya Heritage Dress",
    category: "ร้านเช่าชุด",
    categoryKey: "outfit",
    province: "อยุธยา",
    area: "เมือง",
    rating: 4.9,
    reviewCount: 310,
    priceStart: 150,
    priceUnit: "ต่อวัน",
    tags: ["#ชุดไทยโบราณ", "#อยุธยา", "#มรดกโลก"],
    description: "ชุดไทยโบราณและชุดราชสำนัก สำหรับถ่ายรูปในเขตพระนครศรีอยุธยา มาตรฐานสูง",
    vibes: ["Classic", "Minimal"],
    badge: "TOP RATED",
    badgeColor: "badge-yellow",
    emoji: "🏛️",
    isNew: false,
    isTrending: true
  }
];

/* ─────────────────────────────────────────
   Helper functions สำหรับ filter ข้อมูล
   ───────────────────────────────────────── */

const StoreUtils = {

  /* ดึง province ทั้งหมด (unique) */
  getProvinces() {
    return ['ทั้งหมด', ...new Set(STORES_DATA.map(s => s.province))];
  },

  /* ดึง category ทั้งหมด (unique) */
  getCategories() {
    return [
      { key: 'all',       label: 'ทั้งหมด',              emoji: '🌟' },
      { key: 'outfit',    label: 'ร้านเช่าชุด',           emoji: '👗' },
      { key: 'camera',    label: 'ร้านเช่ากล้อง',         emoji: '📷' },
      { key: 'prop',      label: 'ร้านเช่าพร็อบ',         emoji: '🎪' },
      { key: 'accessory', label: 'ร้านเช่าเครื่องประดับ', emoji: '💎' }
    ];
  },

  /* filter ตาม province + category + search */
  filter({ province = 'ทั้งหมด', category = 'all', search = '', sort = 'default' } = {}) {
    let result = [...STORES_DATA];

    if (province !== 'ทั้งหมด') {
      result = result.filter(s => s.province === province);
    }
    if (category !== 'all') {
      result = result.filter(s => s.categoryKey === category);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.province.toLowerCase().includes(q) ||
        s.area.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q)) ||
        s.category.toLowerCase().includes(q)
      );
    }

    if (sort === 'rating')     result.sort((a, b) => b.rating - a.rating);
    if (sort === 'price_asc')  result.sort((a, b) => a.priceStart - b.priceStart);
    if (sort === 'price_desc') result.sort((a, b) => b.priceStart - a.priceStart);
    if (sort === 'reviews')    result.sort((a, b) => b.reviewCount - a.reviewCount);

    return result;
  },

  /* ดึงเฉพาะ trending */
  getTrending() {
    return STORES_DATA.filter(s => s.isTrending).slice(0, 6);
  },

  /* ดึงเฉพาะ new */
  getNew() {
    return STORES_DATA.filter(s => s.isNew);
  },

  /* group by province */
  groupByProvince() {
    return STORES_DATA.reduce((acc, store) => {
      if (!acc[store.province]) acc[store.province] = [];
      acc[store.province].push(store);
      return acc;
    }, {});
  }
};