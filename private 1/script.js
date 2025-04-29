// Course materials data
const courseMaterials = {
    // 100 Level - First Semester
    phy101: [
        { name: "PHY 101 Lecture Notes", url: "https://drive.google.com/uc?export=download&id=" },
        { name: "PHY 101 Past Questions", url: "https://drive.google.com/uc?export=1gv2xaB9SSCCDmwu9-KQO-ddAwgIsYZRy" },
        { name: "PHY 101 Textbook", url: "https://drive.google.com/uc?export=download&id=PHY101_FILE_ID_3" }
    ],
    mth101: [
        { name: "MTH 101 Lecture Notes", url: "https://drive.google.com/uc?export=download&id=MTH101_FILE_ID_1" },
        { name: "MTH 101 Past Questions", url: "https://drive.google.com/uc?export=download&id=MTH101_FILE_ID_2" }
    ],
    chm101: [
        { name: "CHM 101 Lecture Notes", url: "https://drive.google.com/uc?export=download&id=CHM101_FILE_ID_1" },
        { name: "CHM 101 Practical Guide", url: "https://drive.google.com/uc?export=download&id=CHM101_FILE_ID_2" }
    ],
    // Add all other courses similarly
    phy102: [
        { name: "PHY 102 Lecture Notes", url: "https://drive.google.com/uc?export=download&id=PHY102_FILE_ID_1" }
    ],
    mth102: [
        { name: "MTH 102 Lecture Notes", url: "https://drive.google.com/uc?export=download&id=MTH102_FILE_ID_1" }
    ]
    // Continue for all courses
};

document.addEventListener('DOMContentLoaded', function() {
    // Level selection
    const levelButtons = document.querySelectorAll('[data-level]');
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all level buttons
            levelButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all level contents
            document.querySelectorAll('.level-content').forEach(content => {
                content.classList.add('d-none');
            });
            
            // Show selected level content
            const level = this.getAttribute('data-level');
            document.getElementById(`level-${level}`).classList.remove('d-none');
        });
    });
    
    // Semester selection within each level
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-semester]')) {
            const semester = e.target.getAttribute('data-semester');
            const parent = e.target.closest('.level-content');
            
            // Remove active class from all semester buttons in this level
            parent.querySelectorAll('[data-semester]').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Hide all semester contents in this level
            parent.querySelectorAll('.semester-content').forEach(content => {
                content.classList.add('d-none');
            });
            
            // Show selected semester content
            const levelId = parent.id.split('-')[1];
            const semesterId = semester === 'first' ? 
                (levelId === '100' ? 'first-semester' : `first-semester-${levelId}`) :
                (levelId === '100' ? 'second-semester' : `second-semester-${levelId}`);
            
            document.getElementById(semesterId).classList.remove('d-none');
        }
    });
    
    // Course button click handler
    document.addEventListener('click', function(e) {
        if (e.target.matches('.course-btn')) {
            const courseCode = e.target.getAttribute('data-course');
            showCourseMaterials(courseCode, e.target.textContent.trim());
        }
    });
});

function showCourseMaterials(courseCode, courseName) {
    const modalTitle = document.getElementById('materialsModalLabel');
    const materialsList = document.getElementById('materialsList');
    
    modalTitle.textContent = `${courseName} Materials`;
    materialsList.innerHTML = '';
    
    if (courseMaterials[courseCode] && courseMaterials[courseCode].length > 0) {
        courseMaterials[courseCode].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'd-flex justify-content-between align-items-center p-3 border-bottom';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = item.name;
            nameSpan.className = 'fw-medium';
            
            const downloadBtn = document.createElement('a');
            downloadBtn.href = item.url;
            downloadBtn.className = 'btn btn-sm btn-primary';
            downloadBtn.innerHTML = `<i class="fas fa-download me-2"></i> Download`;
            downloadBtn.target = '_blank';
            downloadBtn.download = item.name;
            
            itemDiv.appendChild(nameSpan);
            itemDiv.appendChild(downloadBtn);
            materialsList.appendChild(itemDiv);
        });
    } else {
        materialsList.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-folder-open fa-3x text-muted mb-3"></i>
                <p class="text-muted">No materials available for this course yet.</p>
                <p>Check back later or contact your department.</p>
            </div>
        `;
    }
    
    const modal = new bootstrap.Modal(document.getElementById('materialsModal'));
    modal.show();
}






