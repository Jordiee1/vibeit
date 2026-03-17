// ==========================================
// LOCAL HUB - Interactive Map & Profile Data
// ==========================================

const localBuddyData = [
  {
    id: 1,
    name: "กาย",
    rating: "4.9", reviews: 120, price: "500",
    bio: "เด็กเชียงใหม่แท้ๆ รู้จักมุมถ่ายรูปคาเฟ่ทุกซอกทุกมุม ถ่ายรูปด้วย Fuji X-T4 โทนอุ่นๆ ครับ พร้อมพารถส่วนตัวพาเที่ยวรอบเมือง",
    tags: ["สายสตรีท", "คาเฟ่ลับ", "กล้องฟิล์ม"],
    avatar: "https://i.pinimg.com/736x/14/6a/eb/146aeb84b0160d9d243bb323c902d1e3.jpg",
    mapX: 45, mapY: 45,
    portfolio: [
      "https://i.pinimg.com/736x/fa/da/e6/fadae6c896a59be804e7fcf2458934c0.jpg",
      "https://i.pinimg.com/736x/c8/d3/f8/c8d3f86eca8f16d8a40137e8ef9f9409.jpg",
      "https://i.pinimg.com/1200x/76/0d/23/760d23c99ffc752dd5cb81e988dee727.jpg"
    ]
  },
  {
    id: 2,
    name: "เจนนิเฟอร์",
    rating: "4.8", reviews: 85, price: "450",
    bio: "ตากล้องสาวสายคาเฟ่ ถ่ายรูปให้ออกมาฟีลเกาหลีเกาใจ มีพร็อพให้ยืมฟรีเพียบ รู้จักมุมแสงสวยๆ ตลอดวันค่ะ",
    tags: ["มินิมอล", "คาเฟ่ฮอปเปอร์", "เกาหลี"],
    avatar: "https://i.pinimg.com/736x/2c/46/08/2c46080836ef4f2fbb114cd37a8f20c9.jpg",
    mapX: 60, mapY: 35,
    portfolio: [
      "https://i.pinimg.com/736x/6e/1c/bd/6e1cbd29f751987e2e765b44e90f0519.jpg",
      "https://i.pinimg.com/1200x/23/d4/c3/23d4c38181a051e319427b95f8db6435.jpg",
      "https://i.pinimg.com/736x/43/44/08/434408564ef324df2c36f3acd819abb3.jpg"
    ]
  },
  {
    id: 3,
    name: "แม็กซ์",
    rating: "5.0", reviews: 210, price: "800",
    bio: "ช่างภาพมืออาชีพ ถ่ายได้ทั้งงาน Portrait และ Drone สายลุยป่าขึ้นเขาติดต่อมาได้เลยครับ รูปสวยจบหลังกล้อง",
    tags: ["สายลุย", "โดรน", "มือโปร"],
    avatar: "https://i.pinimg.com/736x/69/d5/0a/69d50a58460603566bf7a8c7dd26af56.jpg",
    mapX: 75, mapY: 60,
    portfolio: [
      "https://i.pinimg.com/736x/62/4c/91/624c91252dfea661df05c532e1492f0f.jpg",
      "https://i.pinimg.com/1200x/18/0e/ea/180eea4460dc8c386534e73f2279d5f2.jpg",
      "https://i.pinimg.com/1200x/18/b4/b4/18b4b47939d15bd569d87288066f113b.jpg"
    ]
  },
  {
    id: 4,
    name: "พลอย",
    rating: "4.7", reviews: 64, price: "400",
    bio: "เพื่อนเที่ยวเพื่อนกิน รับบทตากล้องส่วนตัวให้ได้ ถ่ายคลิปทำ Reel/TikTok เก่งมาก มุมกล้องปังแน่นอน",
    tags: ["วิดีโอ", "สายกิน", "TikToker"],
    avatar: "https://i.pinimg.com/736x/07/88/49/0788495328a0d6f9893244fdd5f20f27.jpg",
    mapX: 35, mapY: 65,
    portfolio: [
      "https://i.pinimg.com/736x/b3/b2/30/b3b2307008bcfe93faef49fa677613a3.jpg",
      "https://i.pinimg.com/736x/a0/f5/2c/a0f52c5e8060e7594b87bc2f475eab48.jpg",
      "https://i.pinimg.com/1200x/40/7c/da/407cda3d6f3043cd62000d466e28cdff.jpg"
    ]
  }
];

let activeLocalBuddyId = 1; 

function initLocalHubSystem() {
  const mapContainer = document.getElementById('mapContainer');
  const markersLayer = document.getElementById('markersLayer');
  const buddyCount = document.getElementById('buddyCount');
  
  // เช็คว่าอยู่หน้า Local Hub หรือเปล่า ถ้าไม่อยู่ให้ข้ามไปเลย
  if (!mapContainer || !markersLayer) return;

  // 1. อัปเดตตัวเลขคน
  if(buddyCount) buddyCount.innerText = localBuddyData.length;

  // ล้างค่าเก่าก่อน
  markersLayer.innerHTML = '';

  // 2. สร้างหมุดลงบน Layer ของแผนที่
  localBuddyData.forEach(buddy => {
    const marker = document.createElement('div');
    marker.className = `map-marker ${buddy.id === activeLocalBuddyId ? 'active-marker' : ''}`;
    marker.style.left = `${buddy.mapX}%`;
    marker.style.top = `${buddy.mapY}%`;
    marker.setAttribute('data-id', buddy.id);

    marker.innerHTML = `
      <div class="marker-avatar"><img src="${buddy.avatar}" alt="${buddy.name}"></div>
      <div class="marker-info">
        <span class="m-name">${buddy.name}</span>
        <span class="m-rate">${buddy.rating}★</span>
      </div>
    `;

    // 3. ผูก Event คลิกที่หมุด
    marker.addEventListener('click', (e) => {
      // e.stopPropagation() ป้องกันการคลิกทะลุ
      e.stopPropagation();
      activeLocalBuddyId = buddy.id;
      updateLocalMapMarkers();
      renderLocalSidebarProfile(buddy.id);
    });

    markersLayer.appendChild(marker);
  });

  // 4. โชว์โปรไฟล์คนแรกใน Sidebar
  renderLocalSidebarProfile(activeLocalBuddyId);
}

function updateLocalMapMarkers() {
  const markers = document.querySelectorAll('.map-marker');
  markers.forEach(marker => {
    if (parseInt(marker.getAttribute('data-id')) === activeLocalBuddyId) {
      marker.classList.add('active-marker');
    } else {
      marker.classList.remove('active-marker');
    }
  });
}

function renderLocalSidebarProfile(id) {
  const container = document.getElementById('activeBuddyContainer');
  if (!container) return;

  const buddy = localBuddyData.find(b => b.id === id);
  if (!buddy) return;

  const tagsHTML = buddy.tags.map(tag => `<span>#${tag}</span>`).join('');
  const portHTML = buddy.portfolio.map(img => `
    <div class="b-port-img">
      <img src="${img}" style="width:100%; height:100%; object-fit:cover;">
    </div>
  `).join('');

  container.innerHTML = `
    <div class="b-card">
      <div class="b-header">
        <div class="b-profile">
          <div class="b-avatar"><img src="${buddy.avatar}" alt="${buddy.name}"></div>
          <div>
            <div class="b-name">${buddy.name}</div>
            <div class="b-rate">${buddy.rating}★ (${buddy.reviews} รีวิว)</div>
          </div>
        </div>
        <div class="b-price">฿${buddy.price} <span>/ ชม.</span></div>
      </div>

      <div class="b-bio">${buddy.bio}</div>
      <div class="b-tags">${tagsHTML}</div>

      <div class="b-tabs">
        <div class="b-tab active">ผลงาน</div>
        <div class="b-tab">รีวิว</div>
      </div>
      
      <div class="b-portfolio">
        ${portHTML}
      </div>

      <button class="btn-contact">ติดต่อผ่านไลน์</button>
      <div class="b-trust">ปลอดภัย 100% เงินจะถูกโฮลด์ไว้จนกว่างานจะจบ</div>
    </div>
  `;
}

// โหลดระบบอัตโนมัติเมื่อเปิดหน้า
document.addEventListener("DOMContentLoaded", () => {
  // สั่งรันฟังก์ชันของหน้า Local Hub
  initLocalHubSystem();
});