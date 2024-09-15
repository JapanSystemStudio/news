
document.addEventListener("DOMContentLoaded", function () {
    // 投稿データのサンプル (JSON形式)


    const postList = document.getElementById("post-list");
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const tagFilter = document.getElementById("tag-filter");
    const sortSelect = document.getElementById("sort-select");
    const backButton = document.getElementById("back-button");

    if (!postList || !searchInput || !categoryFilter || !tagFilter || !sortSelect || !backButton) {
        console.error("必要な要素がHTMLに存在しません。");
        return;
    }

    // タグフィルタのオプションを動的に生成
    function populateTagFilter() {
        const uniqueTags = new Set();
        posts.forEach(post => {
            post.tags.forEach(tag => uniqueTags.add(tag));
        });

        tagFilter.innerHTML = '<option value="">タグを選択</option>'; // 初期オプション
        uniqueTags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            tagFilter.appendChild(option);
        });
    }

    function renderPosts(postsToRender) {
        postList.innerHTML = '';
        postsToRender.forEach(post => {
            const postItem = document.createElement("div");
            postItem.classList.add("post-item");
            postItem.innerHTML = `
                <h3>${highlightText(post.title)}</h3>
                <p>${highlightText(post.subtitle)}</p>
                <p>${post.date}</p>
                <p>タグ: ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(', ')}</p>
            `;
            postItem.addEventListener("click", function () {
                showPostDetail(post);
            });
            postList.appendChild(postItem);
        });
    }

    function showPostDetail(post) {
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById("post-title").textContent = post.title;
        document.getElementById("post-subtitle").textContent = post.subtitle;
        document.getElementById("post-date").textContent = post.date;
        document.getElementById("post-content").textContent = post.content;
        document.getElementById("post-detail").classList.add('active');
        window.location.hash = '#post-detail';
    }

    function filterPosts() {
        const query = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const tag = tagFilter.value;
        let filteredPosts = posts.filter(post =>
            (query === '' || post.title.toLowerCase().includes(query) || post.subtitle.toLowerCase().includes(query) || post.content.toLowerCase().includes(query)) &&
            (category === '' || post.category === category) &&
            (tag === '' || post.tags.includes(tag))
        );

        switch (sortSelect.value) {
            case 'date-asc':
                filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'date-desc':
                filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'title-asc':
                filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                filteredPosts.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }

        renderPosts(filteredPosts);
    }

    function highlightText(text) {
        const query = searchInput.value.toLowerCase();
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    function showTabFromHash() {
        const hash = window.location.hash || '#home';
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        const activeTab = document.querySelector(hash);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }

    function handleBackButtonClick() {
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById("home").classList.add('active');
        window.location.hash = '#home';
    }

    searchInput.addEventListener("input", filterPosts);
    categoryFilter.addEventListener("change", filterPosts);
    tagFilter.addEventListener("change", filterPosts);
    sortSelect.addEventListener("change", filterPosts);
    backButton.addEventListener("click", handleBackButtonClick);
//----
    populateTagFilter(); // タグフィルタのオプションを生成
    showTabFromHash();
    window.addEventListener('hashchange', showTabFromHash);

    // 初期表示
    renderPosts(posts);
    const profileForm = document.getElementById("profile-form");
    const saveProfileButton = document.getElementById("save-profile");
    
    function saveProfile() {
        const name = document.getElementById("profile-name").value;
        const email = document.getElementById("profile-email").value;
        const bio = document.getElementById("profile-bio").value;
        
        localStorage.setItem("profile-name", name);
        localStorage.setItem("profile-email", email);
        localStorage.setItem("profile-bio", bio);
        
        alert("プロフィールが保存されました。");
    }

    saveProfileButton.addEventListener("click", saveProfile);

    function loadProfile() {
        const name = localStorage.getItem("profile-name") || "";
        const email = localStorage.getItem("profile-email") || "";
        const bio = localStorage.getItem("profile-bio") || "";
        
        document.getElementById("profile-name").value = name;
        document.getElementById("profile-email").value = email;
        document.getElementById("profile-bio").value = bio;
    }
    
    loadProfile();

    // 設定保存処理
    const settingsForm = document.getElementById("settings-form");
    const saveSettingsButton = document.getElementById("save-settings");
    
    function saveSettings() {
        const theme = document.getElementById("theme-select").value;
        const notifications = document.getElementById("notifications").checked;
        
        localStorage.setItem("theme", theme);
        localStorage.setItem("notifications", notifications);
        
        alert("設定が保存されました。");
        applySettings();
    }

    saveSettingsButton.addEventListener("click", saveSettings);

    function loadSettings() {
        const theme = localStorage.getItem("theme") || "light";
        const notifications = localStorage.getItem("notifications") === "true";
        
        document.getElementById("theme-select").value = theme;
        document.getElementById("notifications").checked = notifications;
    }

    function applySettings() {
        const theme = localStorage.getItem("theme") || "light";
        if (theme === "dark") {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }

    loadSettings();
    applySettings();

});
