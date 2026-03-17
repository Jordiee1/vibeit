// ==========================================
// RENT HUB SYSTEM LOGIC
// ==========================================

// 1. Mock Database (จำลองไฟล์ JSON)
const rentDatabase = [
  // ---------------- กล้องและอุปกรณ์ (15 รายการ) ----------------
  {
    id: 1, type: "camera", name: "Sony Cyber-shot DSC-W830", shopName: "Vintage Cam BKK", price: 350, isAvailable: true,
    tags: ["Y2K", "Digital Camera", "Vintage"], image: "https://i.pinimg.com/736x/18/03/97/180397fd92f56d37a608e1d9ecb39cdd.jpg", pinterestKeyword: "Sony Cyber-shot aesthetic photography",
    searchKeywords: ["กล้อง", "กล้องดิจิตอล", "ดิจิแคม", "โซนี่", "วินเทจ", "ถ่ายรูป", "camera", "digital camera", "digicam", "sony", "y2k", "photo", "vibe"]
  },
  {
    id: 2, type: "camera", name: "Fujifilm X100V", shopName: "Pro Lens Hub Ladprao", price: 890, isAvailable: true,
    tags: ["Professional", "Film Look", "Minimal"], image: "https://i.pinimg.com/736x/21/6b/b9/216bb93ef0c8a2a7bf51bfc41bbaec2c.jpg", pinterestKeyword: "Fujifilm X100V lifestyle aesthetic",
    searchKeywords: ["กล้อง", "ฟูจิ", "ฟิล์ม", "กล้องโปร", "มินิมอล", "ถ่ายรูป", "คาเฟ่", "camera", "fuji", "fujifilm", "x100v", "film", "photography", "professional"]
  },
  {
    id: 3, type: "camera", name: "Instax Mini 11 + ฟิล์ม 10 แผ่น", shopName: "Snap & Go Siam", price: 400, isAvailable: false,
    tags: ["Polaroid", "Cafe", "Cute"], image: "https://i.pinimg.com/736x/e1/4c/04/e14c04b97146e0b7aabb97162f066343.jpg", pinterestKeyword: "Instax Mini 11 aesthetic polaroid",
    searchKeywords: ["กล้อง", "โพลารอยด์", "อินสแต็ก", "ฟิล์มโพลารอยด์", "น่ารัก", "ถ่ายรูป", "camera", "polaroid", "instax", "film", "cute", "cafe"]
  },
  {
    id: 4, type: "camera", name: "Canon G7X Mark III", shopName: "Vlog Gear BKK", price: 600, isAvailable: true,
    tags: ["Vlog", "Digital Camera", "Creator"], image: "https://i.pinimg.com/736x/e1/4c/04/e14c04b97146e0b7aabb97162f066343.jpg", pinterestKeyword: "Canon G7X Mark III vlogging aesthetic",
    searchKeywords: ["กล้อง", "แคนนอน", "กล้องดิจิตอล", "วีล็อก", "ถ่ายวิดีโอ", "ครีเอเตอร์", "camera", "canon", "vlog", "video", "youtube", "digital camera"]
  },
  {
    id: 5, type: "camera", name: "Olympus Mju II", shopName: "Siam Film Camera", price: 450, isAvailable: true,
    tags: ["Film Camera", "Vintage", "Point and Shoot"], image: "https://i.pinimg.com/736x/f6/8f/0a/f68f0aa66e14417eaff65f9ac6bdbaaf.jpg", pinterestKeyword: "Olympus Mju II film camera aesthetic",
    searchKeywords: ["กล้อง", "กล้องฟิล์ม", "โอลิมปัส", "มิวทู", "วินเทจ", "คลาสสิค", "camera", "film camera", "olympus", "mju ii", "vintage", "retro"]
  },
  {
    id: 6, type: "camera", name: "Contax T2", shopName: "Rare Film Ari", price: 1200, isAvailable: false,
    tags: ["Film Camera", "Luxury", "Professional"], image: "https://i.pinimg.com/1200x/2b/2e/6b/2b2e6b23a9eb1e65378ab37b32e68bfd.jpg", pinterestKeyword: "Contax T2 film photography",
    searchKeywords: ["กล้อง", "กล้องฟิล์ม", "คอนแทกซ์", "กล้องหรู", "หายาก", "ถ่ายรูป", "camera", "film camera", "contax", "luxury", "pro", "rare"]
  },
  {
    id: 7, type: "camera", name: "GoPro Hero 11 Black", shopName: "Action Cam Rent BKK", price: 500, isAvailable: true,
    tags: ["Action Cam", "Travel", "Adventure"], image: "https://i.pinimg.com/736x/78/19/11/7819119efe0abca1983c87af69dd48e5.jpg", pinterestKeyword: "GoPro Hero 11 travel aesthetic",
    searchKeywords: ["กล้อง", "โกโปร", "แอคชั่นแคม", "กล้องลุยน้ำ", "เที่ยวทะเล", "ดำน้ำ", "camera", "gopro", "action cam", "travel", "waterproof", "adventure"]
  },
  {
    id: 8, type: "camera", name: "DJI Osmo Pocket 3", shopName: "Vlog Gear BKK", price: 750, isAvailable: true,
    tags: ["Vlog", "Gimbal", "Travel"], image: "https://i.pinimg.com/736x/4e/2e/b4/4e2eb47d09946bc8fe7593632c7be673.jpg", pinterestKeyword: "DJI Osmo Pocket 3 aesthetic",
    searchKeywords: ["กล้อง", "ดีเจไอ", "ไม้กันสั่น", "กล้องจิ๋ว", "วีล็อก", "ถ่ายวิดีโอ", "camera", "dji", "osmo", "pocket", "vlog", "gimbal", "video"]
  },
  {
    id: 9, type: "camera", name: "Kodak Ektar H35 Half Frame", shopName: "Siam Film Camera", price: 200, isAvailable: true,
    tags: ["Film Camera", "Toy Camera", "Budget"], image: "https://i.pinimg.com/736x/90/fd/4e/90fd4e5fa6b86aa284268f04abab75d0.jpg", pinterestKeyword: "Kodak Ektar H35 aesthetic photos",
    searchKeywords: ["กล้อง", "กล้องฟิล์ม", "โกดัก", "กล้องทอย", "ฮาล์ฟเฟรม", "ประหยัด", "camera", "film camera", "kodak", "ektar", "toy camera", "half frame"]
  },
  {
    id: 10, type: "camera", name: "DJI Mini 3 Pro Drone", shopName: "Pro Lens Hub Ladprao", price: 1500, isAvailable: false,
    tags: ["Drone", "Cinematic", "Landscape"], image: "https://i.pinimg.com/736x/3f/32/49/3f324926d7a1cd25a75cfcf2cbbb3858.jpg", pinterestKeyword: "DJI Mini 3 Pro drone aesthetic",
    searchKeywords: ["กล้อง", "โดรน", "ดีเจไอ", "บินถ่ายภาพ", "มุมสูง", "วิดีโอ", "camera", "drone", "dji", "mini 3", "aerial", "video", "cinematic"]
  },
  {
    id: 11, type: "camera", name: "Sony A7IV + Lens 35mm f1.4", shopName: "Pro Lens Hub Ladprao", price: 1800, isAvailable: true,
    tags: ["Professional", "Mirrorless", "Portrait"], image: "https://i.pinimg.com/736x/a4/98/ea/a498ea3eda912fef912ede1b036e873f.jpg", pinterestKeyword: "Sony A7IV camera setup aesthetic",
    searchKeywords: ["กล้อง", "กล้องโปร", "โซนี่", "มิลเลอร์เลส", "เลนส์", "ถ่ายคน", "camera", "sony", "a7iv", "mirrorless", "lens", "portrait", "professional"]
  },
  {
    id: 12, type: "camera", name: "Polaroid Now+", shopName: "Snap & Go Siam", price: 350, isAvailable: true,
    tags: ["Polaroid", "Vintage", "Party"], image: "https://i.pinimg.com/1200x/4b/40/b3/4b40b381808ac3d453a0258b7967db43.jpg", pinterestKeyword: "Polaroid Now+ aesthetic vintage",
    searchKeywords: ["กล้อง", "โพลารอยด์", "ถ่ายด่วน", "วินเทจ", "ปาร์ตี้", "camera", "polaroid", "instant camera", "vintage", "party", "retro"]
  },
  {
    id: 13, type: "camera", name: "Ricoh GR III", shopName: "Street Snap BKK", price: 850, isAvailable: false,
    tags: ["Street Photography", "Minimal", "Digital Camera"], image: "https://i.pinimg.com/736x/87/3f/07/873f079a3d4153659861b180d36b06b9.jpg", pinterestKeyword: "Ricoh GR III street photography",
    searchKeywords: ["กล้อง", "ริโก้", "กล้องสตรีท", "กล้องคอมแพค", "ถ่ายรูป", "camera", "ricoh", "gr iii", "street", "compact", "digital"]
  },
  {
    id: 14, type: "camera", name: "Canon AE-1 Program", shopName: "Vintage Cam BKK", price: 400, isAvailable: true,
    tags: ["Film Camera", "Retro", "Classic"], image: "https://i.pinimg.com/736x/2f/ac/93/2fac938243caf5ecb8d6d06211c8b5d7.jpg", pinterestKeyword: "Canon AE-1 aesthetic girl",
    searchKeywords: ["กล้อง", "แคนนอน", "กล้องฟิล์ม", "วินเทจ", "คลาสสิค", "อาร์ต", "camera", "canon", "ae-1", "film camera", "vintage", "retro", "classic"]
  },
  {
    id: 15, type: "camera", name: "Nikon COOLPIX S6900", shopName: "Y2K Digicam Rent", price: 300, isAvailable: true,
    tags: ["Y2K", "Digital Camera", "Selfie"], image: "https://i.pinimg.com/1200x/8e/29/96/8e299686b56d7c666c53b5592299dab0.jpg", pinterestKeyword: "Nikon COOLPIX S6900 Y2K aesthetic",
    searchKeywords: ["กล้อง", "นิคอน", "ดิจิแคม", "กล้องดิจิตอลเก่า", "เซลฟี่", "พับจอ", "camera", "nikon", "coolpix", "y2k", "digicam", "selfie"]
  },

  // ---------------- เสื้อผ้าผู้หญิง (20 รายการ) ----------------
  {
    id: 16, type: "outfit", name: "Y2K Denim Set เสื้อครอป+กระโปรง", shopName: "Vibe Style Siam Square", price: 450, isAvailable: false,
    tags: ["Y2K", "Street", "Denim"], image: "https://i.pinimg.com/1200x/c4/1a/d2/c41ad2f1bc50273c1aa7733768147074.jpg", pinterestKeyword: "Y2K denim skirt set outfit aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "ยีนส์", "กระโปรง", "เสื้อครอป", "สตรีท", "outfit", "women", "y2k", "denim", "skirt", "crop top", "street"]
  },
  {
    id: 17, type: "outfit", name: "Fairy Core Flowy Dress", shopName: "Wanderlust Wardrobe Ari", price: 590, isAvailable: true,
    tags: ["Fairy", "Cafe", "Minimal"], image: "https://i.pinimg.com/736x/fc/ba/78/fcba789ad0bf4313d2a5a8873731e6b2.jpg", pinterestKeyword: "Fairycore white flowy dress aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "เดรส", "นางฟ้า", "กระโปรงพริ้ว", "มินิมอล", "คาเฟ่", "outfit", "women", "dress", "fairy", "minimal", "cafe", "white dress"]
  },
  {
    id: 18, type: "outfit", name: "Old Money Tweed Jacket Set", shopName: "Classy Closet Thonglor", price: 850, isAvailable: true,
    tags: ["Old Money", "Luxury", "Formal"], image: "https://i.pinimg.com/1200x/a6/2e/da/a62edacab96c4480db574ec7e81f0752.jpg", pinterestKeyword: "Old money tweed jacket outfit",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "ลูกคุณหนู", "แจ็คเก็ตทวีต", "หรูหรา", "ทางการ", "outfit", "women", "old money", "tweed", "jacket", "luxury", "formal"]
  },
  {
    id: 19, type: "outfit", name: "Korean Blazer Set คุมโทน", shopName: "Seoul Style BKK", price: 650, isAvailable: true,
    tags: ["Korean", "Minimal", "Cafe"], image: "https://i.pinimg.com/736x/81/06/a2/8106a20665257cd76b4c25b27706b5a9.jpg", pinterestKeyword: "Korean minimalist blazer set outfit",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "สูท", "เบลเซอร์", "เกาหลี", "คุมโทน", "มินิมอล", "outfit", "women", "blazer", "suit", "korean", "minimal", "cafe"]
  },
  {
    id: 20, type: "outfit", name: "Coquette Bow Top + Ruffle Skirt", shopName: "Vibe Style Siam Square", price: 400, isAvailable: true,
    tags: ["Coquette", "Girly", "Ribbon"], image: "https://i.pinimg.com/736x/f0/5d/d9/f05dd9b8b64fa79762c0147eff5704d3.jpg", pinterestKeyword: "Coquette aesthetic outfit pink bow",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "โบว์", "ระบาย", "หวานๆ", "น่ารัก", "outfit", "women", "coquette", "bow", "ribbon", "skirt", "girly", "pink"]
  },
  {
    id: 21, type: "outfit", name: "Vintage 90s Slip Dress", shopName: "Retro BKK Chatuchak", price: 350, isAvailable: false,
    tags: ["Vintage", "90s", "Night Out"], image: "https://i.pinimg.com/736x/50/fa/6a/50fa6a5040a8c09fedab85b1f3dae089.jpg", pinterestKeyword: "90s silk slip dress aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "เดรสผ้าไหม", "วินเทจ", "ปาร์ตี้", "สายเดี่ยว", "outfit", "women", "slip dress", "vintage", "90s", "night out", "silk"]
  },
  {
    id: 22, type: "outfit", name: "Cargo Pants + Baby Tee Street Look", shopName: "Streetwear Hub Siam", price: 380, isAvailable: true,
    tags: ["Street", "Y2K", "Casual"], image: "https://i.pinimg.com/736x/9b/ac/53/9bac53d830d2f9fc6eeb3ed53319cf5c.jpg", pinterestKeyword: "Y2K cargo pants baby tee outfit",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "กางเกงคาร์โก้", "เสื้อยืดตัวเล็ก", "สตรีท", "เท่ๆ", "outfit", "women", "cargo pants", "baby tee", "street", "y2k", "casual"]
  },
  {
    id: 23, type: "outfit", name: "Winter Trench Coat", shopName: "Winter Rent Phaya Thai", price: 900, isAvailable: true,
    tags: ["Winter", "Travel", "Classic"], image: "https://i.pinimg.com/736x/a6/72/90/a67290640acb400cd75ed67435d58050.jpg", pinterestKeyword: "Beige trench coat winter aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "เสื้อโค้ท", "กันหนาว", "เที่ยวต่างประเทศ", "คลาสสิค", "outfit", "women", "trench coat", "winter", "travel", "coat", "cold"]
  },
  {
    id: 24, type: "outfit", name: "Boho Chic Crochet Top + Maxi Skirt", shopName: "Wanderlust Wardrobe Ari", price: 450, isAvailable: true,
    tags: ["Bohemian", "Beach", "Summer"], image: "https://i.pinimg.com/736x/3f/ae/3c/3fae3cbb1858559b55a11366f76ed051.jpg", pinterestKeyword: "Boho crochet top maxi skirt beach outfit",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "โบฮีเมียน", "เสื้อถัก", "กระโปรงยาว", "ทะเล", "ซัมเมอร์", "outfit", "women", "boho", "crochet", "maxi skirt", "beach", "summer"]
  },
  {
    id: 25, type: "outfit", name: "Leather Biker Jacket + Mini Skirt", shopName: "Streetwear Hub Siam", price: 600, isAvailable: false,
    tags: ["Grunge", "Street", "Edgy"], image: "https://i.pinimg.com/1200x/51/2c/af/512caf8154f80bba14cd70455481d30c.jpg", pinterestKeyword: "Oversized leather biker jacket aesthetic outfit",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "เสื้อหนัง", "ไบค์เกอร์", "กระโปรงสั้น", "เท่ๆ", "ดาร์ก", "outfit", "women", "leather jacket", "biker", "mini skirt", "grunge", "street"]
  },
  {
    id: 26, type: "outfit", name: "Preppy Tennis Skirt Set", shopName: "Vibe Style Siam Square", price: 350, isAvailable: true,
    tags: ["Preppy", "Sporty", "Korean"], image: "https://i.pinimg.com/1200x/68/de/4c/68de4cc13bf7c9775d74f92bafb6fefc.jpg", pinterestKeyword: "Preppy tennis skirt outfit aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "กระโปรงเทนนิส", "แนวนักเรียน", "สปอร์ต", "เกาหลี", "outfit", "women", "tennis skirt", "preppy", "sporty", "korean", "cute"]
  },
  {
    id: 27, type: "outfit", name: "Satin Evening Gown", shopName: "Classy Closet Thonglor", price: 1200, isAvailable: true,
    tags: ["Formal", "Luxury", "Dinner"], image: "https://i.pinimg.com/736x/47/91/69/479169b2112459533f6216f07c3aab87.jpg", pinterestKeyword: "Satin evening gown silk dress aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "ชุดราตรี", "เดรสซาติน", "หรูหรา", "ออกงาน", "ดินเนอร์", "outfit", "women", "gown", "satin", "evening dress", "formal", "luxury", "dinner"]
  },
  {
    id: 28, type: "outfit", name: "Cottagecore Apron Dress", shopName: "Wanderlust Wardrobe Ari", price: 500, isAvailable: true,
    tags: ["Cottagecore", "Vintage", "Picnic"], image: "https://i.pinimg.com/736x/24/f0/3e/24f03e54d1ec4733a201a113058d7723.jpg", pinterestKeyword: "Cottagecore dress picnic aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "เดรสเอี๊ยม", "วินเทจ", "ปิกนิก", "ธรรมชาติ", "น่ารัก", "outfit", "women", "cottagecore", "apron dress", "vintage", "picnic", "cute"]
  },
  {
    id: 29, type: "outfit", name: "Gorpcore Windbreaker Set", shopName: "Streetwear Hub Siam", price: 550, isAvailable: false,
    tags: ["Gorpcore", "Outdoor", "Street"], image: "https://i.pinimg.com/736x/fe/bf/d1/febfd1ece84a026d4661b22d2eff9b18.jpg", pinterestKeyword: "Gorpcore outfit windbreaker arc'teryx aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "เสื้อกันลม", "กอร์ปคอร์", "แคมป์ปิ้ง", "สตรีท", "เท่ๆ", "outfit", "women", "gorpcore", "windbreaker", "outdoor", "street", "camping"]
  },
  {
    id: 30, type: "outfit", name: "ชุดไทยประยุกต์ร่วมสมัย", shopName: "Thai Style Studio Phra Nakhon", price: 800, isAvailable: true,
    tags: ["Thai Traditional", "Temple", "Culture"], image: "https://i.pinimg.com/736x/51/11/71/5111716f5b5fa3c4701c408c1a639a3b.jpg", pinterestKeyword: "Modern thai traditional dress photography",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "ชุดไทย", "ชุดไทยประยุกต์", "ทำบุญ", "วัดอรุณ", "เข้าวัด", "outfit", "women", "thai dress", "traditional", "temple", "culture"]
  },
  {
    id: 31, type: "outfit", name: "Modern Hanbok Set", shopName: "Seoul Style BKK", price: 700, isAvailable: true,
    tags: ["Hanbok", "Korean", "Cute"], image: "https://i.pinimg.com/736x/a8/57/c4/a857c40ed6f3bc5138a266e3eeb28acd.jpg", pinterestKeyword: "Modern hanbok casual aesthetic outfit",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "ฮันบก", "ฮันบกประยุกต์", "เกาหลี", "น่ารัก", "outfit", "women", "hanbok", "korean", "modern hanbok", "cute"]
  },
  {
    id: 32, type: "outfit", name: "Floral Maxi Dress", shopName: "Wanderlust Wardrobe Ari", price: 400, isAvailable: true,
    tags: ["Summer", "Cafe", "Floral"], image: "https://i.pinimg.com/736x/a4/63/6f/a4636f1c59e7d69c813ffe59491912cb.jpg", pinterestKeyword: "Floral maxi dress summer aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "เดรสลายดอก", "กระโปรงยาว", "ซัมเมอร์", "คาเฟ่", "ทะเล", "outfit", "women", "floral dress", "maxi dress", "summer", "cafe"]
  },
  {
    id: 33, type: "outfit", name: "Cyberpunk Techwear Set", shopName: "Streetwear Hub Siam", price: 850, isAvailable: false,
    tags: ["Techwear", "Cyberpunk", "Edgy"], image: "https://i.pinimg.com/736x/bb/dd/4c/bbdd4c067e00772d79c2896e25942b3d.jpg", pinterestKeyword: "Cyberpunk techwear dark aesthetic outfit",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "ไซเบอร์พังค์", "เทคแวร์", "ชุดดำ", "สตรีท", "ดาร์ก", "outfit", "women", "cyberpunk", "techwear", "edgy", "dark", "street"]
  },
  {
    id: 34, type: "outfit", name: "Minimalist Linen Suit", shopName: "Earth Tone Studio Ekkamai", price: 550, isAvailable: true,
    tags: ["Minimal", "Earth Tone", "Cafe"], image: "https://i.pinimg.com/736x/56/4c/c6/564cc622d282c07535224351a833d48e.jpg", pinterestKeyword: "Minimalist linen suit outfit aesthetic women",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "สูทผ้าลินิน", "มินิมอล", "เอิร์ธโทน", "คาเฟ่", "คุมโทน", "outfit", "women", "linen suit", "minimal", "earth tone", "cafe"]
  },
  {
    id: 35, type: "outfit", name: "School Girl Plaid Skirt Set", shopName: "Vibe Style Siam Square", price: 300, isAvailable: true,
    tags: ["School", "Y2K", "Cute"], image: "https://i.pinimg.com/1200x/e3/65/83/e3658380369073bd7f011856bb16384e.jpg", pinterestKeyword: "Japanese school girl uniform aesthetic outfit",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้หญิง", "ชุดนักเรียน", "กระโปรงลายสก๊อต", "ญี่ปุ่น", "น่ารัก", "outfit", "women", "school uniform", "plaid skirt", "y2k", "japanese", "cute"]
  },

  // ---------------- เสื้อผ้าผู้ชาย (10 รายการ) ----------------
  {
    id: 36, type: "outfit", name: "Oversized Korean Suit", shopName: "Seoul Style BKK", price: 650, isAvailable: true,
    tags: ["Korean", "Minimal", "Oppa"], image: "https://i.pinimg.com/736x/09/fe/83/09fe836408cbca1715bd26ec81018779.jpg", pinterestKeyword: "Korean oversized suit men aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้ชาย", "สูท", "โอเวอร์ไซส์", "เกาหลี", "โอปป้า", "คาเฟ่", "outfit", "men", "boy", "suit", "oversized", "korean", "minimal", "oppa"]
  },
  {
    id: 37, type: "outfit", name: "Old Money Polo + Trousers Set", shopName: "Classy Closet Thonglor", price: 750, isAvailable: true,
    tags: ["Old Money", "Classic", "Smart Casual"], image: "https://i.pinimg.com/736x/ae/6a/26/ae6a26311dab2799c3ca59d723093abc.jpg", pinterestKeyword: "Old money men outfit aesthetic polo",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้ชาย", "ลูกคุณหนู", "เสื้อโปโล", "กางเกงสแล็ค", "คลาสสิค", "outfit", "men", "boy", "old money", "polo", "trousers", "classic", "smart casual"]
  },
  {
    id: 38, type: "outfit", name: "Vintage Band Tee + Baggy Denim", shopName: "Retro BKK Chatuchak", price: 450, isAvailable: false,
    tags: ["Vintage", "Street", "90s"], image: "https://i.pinimg.com/736x/83/11/b5/8311b594e70a7c8651ec86b27b0118cc.jpg", pinterestKeyword: "Vintage band tee baggy jeans men outfit",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้ชาย", "เสื้อยืดวง", "กางเกงยีนส์", "ทรงหลวม", "วินเทจ", "สตรีท", "outfit", "men", "boy", "vintage", "band tee", "baggy jeans", "street", "90s"]
  },
  {
    id: 39, type: "outfit", name: "Techwear Cargo Pants + Vest", shopName: "Streetwear Hub Siam", price: 600, isAvailable: true,
    tags: ["Techwear", "Street", "Edgy"], image: "https://i.pinimg.com/736x/8e/98/5d/8e985d92f5fffa5035145d0eed20ebe3.jpg", pinterestKeyword: "Techwear cargo pants vest men aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้ชาย", "เทคแวร์", "กางเกงคาร์โก้", "เสื้อกั๊ก", "สตรีท", "ดาร์ก", "outfit", "men", "boy", "techwear", "cargo pants", "vest", "street", "edgy"]
  },
  {
    id: 40, type: "outfit", name: "Minimalist Earth Tone Set", shopName: "Earth Tone Studio Ekkamai", price: 500, isAvailable: true,
    tags: ["Minimal", "Cafe", "Earth Tone"], image: "https://i.pinimg.com/1200x/20/ab/d1/20abd1c29e5935c68b3d081e565b16bd.jpg", pinterestKeyword: "Minimalist earth tone outfit men cafe aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้ชาย", "เอิร์ธโทน", "มินิมอล", "คาเฟ่", "คุมโทน", "เรียบๆ", "outfit", "men", "boy", "earth tone", "minimal", "cafe", "clean"]
  },
  {
    id: 41, type: "outfit", name: "Winter Puffer Jacket", shopName: "Winter Rent Phaya Thai", price: 850, isAvailable: true,
    tags: ["Winter", "Travel", "Street"], image: "https://i.pinimg.com/736x/b2/46/db/b246dbea2aff3c09cee25be1fc52bd87.jpg", pinterestKeyword: "Black puffer jacket men winter aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้ชาย", "เสื้อกันหนาว", "เสื้อพัฟเฟอร์", "แจ็คเก็ตบอมเบอร์", "เที่ยวต่างประเทศ", "outfit", "men", "boy", "winter", "puffer jacket", "travel", "cold"]
  },
  {
    id: 42, type: "outfit", name: "Hawaiian Resort Shirt Set", shopName: "Summer Vibes BKK", price: 350, isAvailable: true,
    tags: ["Summer", "Beach", "Travel"], image: "https://i.pinimg.com/736x/c6/6f/6d/c66f6d664c8266bcecf37778e35954f3.jpg", pinterestKeyword: "Hawaiian shirt resort wear men aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้ชาย", "เสื้อฮาวาย", "ชุดไปทะเล", "ซัมเมอร์", "ชิลๆ", "outfit", "men", "boy", "hawaiian shirt", "beach", "summer", "resort", "travel"]
  },
  {
    id: 43, type: "outfit", name: "Streetwear Hoodie + Baggy Sweatpants", shopName: "Streetwear Hub Siam", price: 400, isAvailable: false,
    tags: ["Street", "Cozy", "Casual"], image: "https://i.pinimg.com/736x/f5/b3/fe/f5b3fedd4e840d6a4d6dfe878ee7cdfc.jpg", pinterestKeyword: "Oversized hoodie sweatpants men street aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้ชาย", "เสื้อฮู้ด", "กางเกงวอร์ม", "สตรีท", "สบายๆ", "outfit", "men", "boy", "hoodie", "sweatpants", "street", "cozy", "casual"]
  },
  {
    id: 44, type: "outfit", name: "Denim on Denim Look", shopName: "Retro BKK Chatuchak", price: 550, isAvailable: true,
    tags: ["Vintage", "Denim", "Classic"], image: "https://i.pinimg.com/736x/17/73/17/177317eed7bc1a352a001a7b2402240a.jpg", pinterestKeyword: "Denim on denim men outfit aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้ชาย", "ยีนส์", "แจ็คเก็ตยีนส์", "เท่ๆ", "วินเทจ", "คลาสสิค", "outfit", "men", "boy", "denim", "jacket", "vintage", "classic"]
  },
  {
    id: 45, type: "outfit", name: "Smart Casual Linen Blazer", shopName: "Earth Tone Studio Ekkamai", price: 600, isAvailable: true,
    tags: ["Smart Casual", "Minimal", "Cafe"], image: "https://i.pinimg.com/1200x/de/95/4d/de954dace31996a054fae1f4c3121882.jpg", pinterestKeyword: "Linen blazer men smart casual aesthetic",
    searchKeywords: ["ชุด", "เสื้อผ้า", "ผู้ชาย", "เบลเซอร์ผ้าลินิน", "สมาร์ทแคชชวล", "มินิมอล", "กึ่งทางการ", "คาเฟ่", "outfit", "men", "boy", "linen blazer", "smart casual", "minimal", "cafe"]
  },

  // ---------------- พร็อพและเครื่องประดับ (5 รายการ) ----------------
  {
    id: 46, type: "camera", name: "Vintage Headphones (Sony MDR Series)", shopName: "Y2K Digicam Rent", price: 150, isAvailable: true,
    tags: ["Y2K", "Prop", "Music"], image: "https://i.pinimg.com/736x/9a/d4/46/9ad446ce11efba245671b9f9d377b839.jpg", pinterestKeyword: "Sony vintage headphones Y2K aesthetic",
    searchKeywords: ["หูฟัง", "พร็อพ", "วินเทจ", "อุปกรณ์ตกแต่ง", "ฟังเพลง", "โซนี่", "headphones", "prop", "vintage", "y2k", "music", "sony", "accessories"]
  },
  {
    id: 47, type: "camera", name: "Gentle Monster Sunglasses", shopName: "Classy Closet Thonglor", price: 250, isAvailable: false,
    tags: ["Luxury", "Prop", "Fashion"], image: "https://i.pinimg.com/736x/fe/39/b4/fe39b4c4479a58914bcad7deaa2647b8.jpg", pinterestKeyword: "Gentle monster sunglasses aesthetic",
    searchKeywords: ["แว่นตา", "แว่นกันแดด", "พร็อพ", "เจนเทิลมอนสเตอร์", "แฟชั่น", "หรูหรา", "sunglasses", "prop", "gentle monster", "luxury", "fashion", "accessories"]
  },
  {
    id: 48, type: "camera", name: "Picnic Basket Set + ผ้าปู", shopName: "Wanderlust Wardrobe Ari", price: 300, isAvailable: true,
    tags: ["Cottagecore", "Picnic", "Prop"], image: "https://i.pinimg.com/736x/90/c1/ae/90c1ae2dc0efb2ce41373e67bb38e8c2.jpg", pinterestKeyword: "Picnic basket aesthetic park",
    searchKeywords: ["ตะกร้า", "ปิกนิก", "ผ้าปู", "พร็อพ", "สวนสาธารณะ", "ธรรมชาติ", "basket", "picnic", "prop", "cottagecore", "park", "nature"]
  },
  {
    id: 49, type: "camera", name: "Y2K Fluffy Hat + Shoulder Bag", shopName: "Vibe Style Siam Square", price: 200, isAvailable: true,
    tags: ["Y2K", "Prop", "Accessories"], image: "https://i.pinimg.com/1200x/1f/5d/c9/1f5dc9e1d4ac68987b8426a1a09311ad.jpg", pinterestKeyword: "Y2K fluffy hat shoulder bag aesthetic",
    searchKeywords: ["หมวก", "หมวกขน", "กระเป๋าสะพาย", "พร็อพ", "กระเป๋า", "ของตกแต่ง", "hat", "bag", "shoulder bag", "prop", "y2k", "accessories", "fluffy"]
  },
  {
    id: 50, type: "camera", name: "Retro Cassette Player (Walkman)", shopName: "Retro BKK Chatuchak", price: 200, isAvailable: true,
    tags: ["Vintage", "90s", "Prop"], image: "https://i.pinimg.com/736x/6e/2b/2b/6e2b2bba0e53fc76accc1ddcc80a5cc9.jpg", pinterestKeyword: "Retro cassette player walkman aesthetic",
    searchKeywords: ["เครื่องเล่นเทป", "วอล์คแมน", "คาสเซ็ท", "พร็อพ", "วินเทจ", "ยุค90", "cassette player", "walkman", "prop", "vintage", "90s", "retro", "music"]
  }
];


// 2. State Management
let state = {
  searchQuery: "",
  activeTab: "all",
  showAvailableOnly: false
};

// 3. Elements
const rentGrid = document.getElementById('rentGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const categoryTabs = document.querySelectorAll('.f-tab');
const availableToggle = document.getElementById('availableToggle');
const resetBtn = document.getElementById('resetBtn');

// 4. Render Function
// เพิ่มพารามิเตอร์ skipAnimation (ค่าเริ่มต้นคือ false)
function renderRentCards(skipAnimation = false) {
  if (!rentGrid) return; 

  const filteredData = rentDatabase.filter(item => {
    const matchType = state.activeTab === "all" || item.type === state.activeTab;
    const query = state.searchQuery.toLowerCase();
    const matchSearch = item.name.toLowerCase().includes(query) || 
                        item.shopName.toLowerCase().includes(query) ||
                        item.tags.some(tag => tag.toLowerCase().includes(query)) ||
                        (item.searchKeywords && item.searchKeywords.some(keyword => keyword.toLowerCase().includes(query)));
    
    const matchStatus = state.showAvailableOnly ? item.isAvailable === true : true;

    return matchType && matchSearch && matchStatus;
  });

  rentGrid.innerHTML = '';

  if (filteredData.length === 0) {
    rentGrid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  rentGrid.style.display = 'grid';
  emptyState.style.display = 'none';

  filteredData.forEach((item, index) => {
    const statusClass = item.isAvailable ? 'status-available' : 'status-rented';
    const statusText = item.isAvailable ? '● ว่างพร้อมเช่า' : '✕ ถูกเช่าแล้ว';
    const btnText = item.isAvailable ? 'จองคิวเช่า' : 'คิวเต็ม';
    const btnDisabled = item.isAvailable ? '' : 'disabled';
    const tagsHTML = item.tags.map(tag => `<span class="rc-tag">#${tag}</span>`).join('');

    // เช็คว่าถ้าไม่ให้ข้ามแอนิเมชัน ถึงจะใส่ style เข้าไป
    let animStyle = "";
    if (!skipAnimation) {
      const animDelay = Math.min(index * 0.05, 0.5);
      animStyle = `style="animation: cardPop 0.5s ${animDelay}s cubic-bezier(0.34, 1.56, 0.64, 1) both;"`;
    }

    const cardHTML = `
      <div class="rent-card" ${animStyle}>
        <div class="rc-img-wrap">
          <span class="rc-status ${statusClass}">${statusText}</span>
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="rc-details">
          <div class="rc-shop">จาก ${item.shopName}</div>
          <h3 class="rc-title">${item.name}</h3>
          <div class="rc-tags">${tagsHTML}</div>
          
          <div class="rc-footer">
            <div class="rc-price">${item.price}฿ <span>/วัน</span></div>
            <button class="btn-rent-action" ${btnDisabled}>${btnText}</button>
          </div>
        </div>
      </div>
    `;
    rentGrid.innerHTML += cardHTML;
  });
}

// 5. Event Listeners
// 5. Event Listeners
if (searchInput) {
  // พิมพ์ค้นหา (Real-time) - ส่งค่า true เพื่อ "ปิด" แอนิเมชันตอนพิมพ์
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderRentCards(true); 
  });

  // เปลี่ยน Tab (ทั้งหมด, เสื้อผ้า, กล้อง) - ให้เด้งเหมือนเดิม
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      state.activeTab = e.target.getAttribute('data-type');
      renderRentCards(false);
    });
  });

  // เปิด-ปิด ปุ่ม "แสดงเฉพาะที่ว่าง" - ให้เด้งเหมือนเดิม
  availableToggle.addEventListener('change', (e) => {
    state.showAvailableOnly = e.target.checked;
    renderRentCards(false);
  });

  // ปุ่มล้างการค้นหา
  resetBtn.addEventListener('click', () => {
    state.searchQuery = "";
    state.activeTab = "all";
    state.showAvailableOnly = false;
    
    searchInput.value = "";
    availableToggle.checked = false;
    categoryTabs.forEach(t => t.classList.remove('active'));
    document.querySelector('.f-tab[data-type="all"]').classList.add('active');
    
    renderRentCards(false);
  });

  // โหลดหน้าครั้งแรก - ให้เด้ง
  renderRentCards(false);
}