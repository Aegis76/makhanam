/**
 * MAKHANAM - B2B Website Engine & Grade Interactive Script
 */

// 1. Data Store for 6 Makhana Grades
const MAKHANA_GRADES = [
    {
        id: 7,
        gradeTag: "GRADE 7+ SUPER JUMBO",
        title: "Handpicked Super Jumbo Makhana",
        subtitle: "22mm - 25mm Caliper Diameter",
        badge: "7+ (22mm+)",
        count: "75 - 85 pieces",
        moisture: "< 7.5%",
        yield: "98% Fully Opened",
        density: "65 - 70 g/L",
        renderSize: 110, // px visual diameter
        usage: "Ultra-luxury retail packaging, high-end gourmet roasting, international gift hampers, and premium boutique snack brands."
    },
    {
        id: 6,
        gradeTag: "GRADE 6+ JUMBO",
        title: "Jumbo Export Grade Makhana",
        subtitle: "19mm - 21mm Caliper Diameter",
        badge: "6+ (19mm+)",
        count: "90 - 105 pieces",
        moisture: "< 8.0%",
        yield: "96% Fully Opened",
        density: "70 - 75 g/L",
        renderSize: 92,
        usage: "Standard international supermarket retail packs, flavored foxnut processing, high-volume snack distribution."
    },
    {
        id: 5,
        gradeTag: "GRADE 5+ PREMIUM SELECT",
        title: "Premium Select Whole Foxnut",
        subtitle: "16mm - 18mm Caliper Diameter",
        badge: "5+ (16mm+)",
        count: "115 - 130 pieces",
        moisture: "< 8.0%",
        yield: "94% Fully Opened",
        density: "78 - 82 g/L",
        renderSize: 76,
        usage: "Budget retail pouches, spiced snack blends, food service catering, bulk trail mix ingredient supply."
    },
    {
        id: 4,
        gradeTag: "GRADE 4+ STANDARD",
        title: "Standard Commercial Grade",
        subtitle: "13mm - 15mm Caliper Diameter",
        badge: "4+ (13mm+)",
        count: "140 - 165 pieces",
        moisture: "< 8.5%",
        yield: "90% Fully Opened",
        density: "85 - 90 g/L",
        renderSize: 62,
        usage: "Commercial food processing, breakfast cereal formulations, confectionery coatings, bulk institutional sales."
    },
    {
        id: 3,
        gradeTag: "MEDIUM GRADE",
        title: "Medium Processing Grade",
        subtitle: "10mm - 12mm Caliper Diameter",
        badge: "Medium (10mm+)",
        count: "180 - 210 pieces",
        moisture: "< 8.5%",
        yield: "85% Opened",
        density: "95 - 100 g/L",
        renderSize: 50,
        usage: "Grinding into Makhana flour (Kuttu/Makhana powder), bakery thickeners, dietary supplements, baby food formula."
    },
    {
        id: 2,
        gradeTag: "SMALL / PROCESSING",
        title: "Small Industrial Foxnut Bits",
        subtitle: "< 10mm Caliper Diameter",
        badge: "Small (<10mm)",
        count: "220+ pieces",
        moisture: "< 9.0%",
        yield: "Mixed / Partially Popped",
        density: "110+ g/L",
        renderSize: 38,
        usage: "Ayurvedic pharmaceutical extractions, animal feed protein supplement, industrial starch extraction."
    }
];

let selectedGradeId = 7;
let compareMode = false;

// Initialize Web Application
document.addEventListener('DOMContentLoaded', () => {
    renderMakhanaGrid();
    updateGradeDetail(7);
    populateCompareDropdowns();
    calculateFreight();
});

// Render the 6 Single Makhana Cards
function renderMakhanaGrid() {
    const gridContainer = document.getElementById('makhana-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = MAKHANA_GRADES.map(item => `
        <div class="makhana-card ${item.id === selectedGradeId ? 'active' : ''}" 
             onclick="selectGrade(${item.id})">
            <span class="makhana-badge">${item.badge}</span>
            <div class="makhana-card-visual">
                <div class="single-makhana-shape" style="width: ${item.renderSize * 0.7}px; height: ${item.renderSize * 0.7}px;"></div>
            </div>
            <div class="makhana-size-title">${item.title.split(' ')[0]} ${item.title.split(' ')[1] || ''}</div>
            <div class="makhana-mm">${item.subtitle.split(' ')[0]}</div>
        </div>
    `).join('');
}

// Select a Grade and Update Visual Display
function selectGrade(id) {
    selectedGradeId = id;
    renderMakhanaGrid();
    updateGradeDetail(id);
}

// Update Detail Display Dashboard
function updateGradeDetail(id) {
    const data = MAKHANA_GRADES.find(g => g.id === id);
    if (!data) return;

    document.getElementById('detail-grade-tag').innerText = data.gradeTag;
    document.getElementById('detail-name').innerText = data.title;
    document.getElementById('detail-subtitle').innerText = `MM Size: ${data.subtitle}`;
    document.getElementById('detail-count').innerText = data.count;
    document.getElementById('detail-moisture').innerText = data.moisture;
    document.getElementById('detail-yield').innerText = data.yield;
    document.getElementById('detail-density').innerText = data.density;
    document.getElementById('detail-usage').innerText = data.usage;
    document.getElementById('detail-diameter-label').innerText = data.subtitle.split(' ')[0];
    document.getElementById('rfq-grade-name').innerText = data.gradeTag;

    // Scale Sphere Visual
    const sphere = document.getElementById('detail-sphere');
    sphere.style.width = `${data.renderSize}px`;
    sphere.style.height = `${data.renderSize}px`;
}

// Side-by-Side Comparison Feature
function populateCompareDropdowns() {
    const sel1 = document.getElementById('compare-select-1');
    const sel2 = document.getElementById('compare-select-2');
    if (!sel1 || !sel2) return;

    const options = MAKHANA_GRADES.map(g => `<option value="${g.id}">${g.gradeTag} (${g.subtitle.split(' ')[0]})</option>`).join('');
    sel1.innerHTML = options;
    sel2.innerHTML = options;

    sel1.value = 7;
    sel2.value = 5;
}

function toggleCompareMode() {
    const drawer = document.getElementById('comparison-drawer');
    compareMode = !compareMode;
    if (compareMode) {
        drawer.classList.remove('hidden');
        updateComparison();
    } else {
        drawer.classList.add('hidden');
    }
}

function updateComparison() {
    const id1 = parseInt(document.getElementById('compare-select-1').value);
    const id2 = parseInt(document.getElementById('compare-select-2').value);

    const g1 = MAKHANA_GRADES.find(g => g.id === id1);
    const g2 = MAKHANA_GRADES.find(g => g.id === id2);

    const compGrid = document.getElementById('comparison-grid');
    compGrid.innerHTML = `
        <div class="compare-card">
            <h4>${g1.gradeTag}</h4>
            <p><strong>Diameter:</strong> ${g1.subtitle}</p>
            <p><strong>Count/100g:</strong> ${g1.count}</p>
            <p><strong>Moisture:</strong> ${g1.moisture}</p>
            <p><strong>Density:</strong> ${g1.density}</p>
        </div>
        <div class="compare-card">
            <h4>${g2.gradeTag}</h4>
            <p><strong>Diameter:</strong> ${g2.subtitle}</p>
            <p><strong>Count/100g:</strong> ${g2.count}</p>
            <p><strong>Moisture:</strong> ${g2.moisture}</p>
            <p><strong>Density:</strong> ${g2.density}</p>
        </div>
    `;
}

// B2B Container Freight Calculator Logic
function calculateFreight() {
    const container = document.getElementById('calc-container-type').value;
    const bagType = document.getElementById('calc-bag-size').value;
    
    let baseBags = 580;
    let weightPerBag = 12.5;

    if (bagType === '10kg') weightPerBag = 10;
    if (bagType === '8kg') weightPerBag = 8;

    if (container === '20ft') {
        baseBags = Math.round(baseBags * 0.45);
    }

    const totalWeightKg = baseBags * weightPerBag;

    document.getElementById('res-bags').innerText = `${baseBags} Bags / Cartons`;
    document.getElementById('res-weight').innerText = `${totalWeightKg.toLocaleString()} KG (${(totalWeightKg/1000).toFixed(2)} MT)`;
    document.getElementById('res-volume').innerText = container === '40ft' ? '95.2% CBM' : '92.0% CBM';
}

// Modal Handles
function openRFQModal() {
    document.getElementById('rfq-modal').classList.remove('hidden');
}

function closeRFQModal() {
    document.getElementById('rfq-modal').classList.add('hidden');
}

function openRFQForGrade() {
    const currentGrade = MAKHANA_GRADES.find(g => g.id === selectedGradeId);
    document.getElementById('rfq-grade-select').value = currentGrade.id > 4 ? currentGrade.id : 'all';
    openRFQModal();
}

function openRFQWithFreight() {
    openRFQModal();
}

function handleRFQSubmit(e) {
    e.preventDefault();
    alert('Thank you for your RFQ submission! Our export desk will email FOB/CIF quotes within 12 hours.');
    closeRFQModal();
}